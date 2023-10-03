const express = require('express')
const router = express.Router();
const sequelize = require('sequelize')
const { setTokenCookie, requireAuth, reqAuthorization } = require('../../utils/auth');
const { Spot, SpotImage, Review, User } = require('../../db/models')
const { handleValidationErrors } = require('../../utils/validation');

// const validateSpot = [
//     check('address')
//       .exists({ checkFalsy: true })
//       .withMessage('Street address is required'),
//     check('city')
//       .exists({ checkFalsy: true })
//       .withMessage('City is required'),
//     check('state')
//       .exists({ checkFalsy: true})
//       .withMessage('State is required'),
//     check('country')
//       .exists({ checkFalsy: true })
//       .withMessage('Country is required'),
//     check('lat')
//       .exists({ checkFalsy: true })
//       .withMessage('Latitude is not valid'),
//     check('lng')
//       .exists({ checkFalsy: true })
//       .withMessage('Longitude is not valid'),
//     check('name')
//       .exists({ checkFalsy: true })
//       .isLength({ min: 0, max: 50 })
//       .withMessage('Name must be less than 50 characters'),
//     check('description')
//       .exists({ checkFalsy: true })
//       .withMessage('Description is required'),
//     check('country')
//       .exists({ checkFalsy: true })
//       .withMessage('Price per day is required'),
//     handleValidationErrors
//   ];


//Get all spots
router.get('/', async (req,res,next) => {

const spots = await Spot.findAll() //find all spots
const spotsJSON = spots.map(spots => spots.toJSON()) //turn each spot into JSON
const images = await SpotImage.findAll() //find all images

for(let i = 0; i < spotsJSON.length; i++){
    for(let j = 0; j < images.length; j++)
    if(images[j].spotId == spotsJSON[i].id){
        if(images[j].preview === true){
        spotsJSON[i].previewImage = images[j].url
        } else {
            spotsJSON[i].previewImage = 'No preview available'
        }
    }
}

for( let i = 0; i < spotsJSON.length; i++){
    const spot = spotsJSON[i]
    const reviews = await Review.findAll({
        where: { spotId: spot.id }
    })

const avg = await Review.sum('stars', { where: { spotId: spot.id } }) / reviews.length
spot.avgRating = avg

}

res.json({ Spots: spotsJSON })

})



//Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req,res,next) => {

    const { user } = req //deconstruct user from request
    const spots = await Spot.findAll({ //find all spots the user owns
        where: { ownerId: user.id }
    })

    const spotsJSON = spots.map(spot => spot.toJSON())
    const images = await SpotImage.findAll() //find all images

    for(let i = 0; i < spotsJSON.length; i++){
        for(let j = 0; j < images.length; j++)
        if(images[j].spotId == spotsJSON[i].id){
            if(images[j].preview === true){
            spotsJSON[i].previewImage = images[j].url
            } else { spotsJSON[i].previewImage = 'No preview available'  }
        }
    }

for( let i = 0; i < spotsJSON.length; i++){
    const spot = spotsJSON[i]
    const reviews = await Review.findAll({
        where: {  spotId: spot.id  }
    })

    const avg = await Review.sum('stars', {
        where: {  spotId: spot.id   }
    }) / reviews.length

    spot.avgRating = avg
    delete spot.SpotImages
}

res.json(spotsJSON)

})

//Get details of a Spot from an Id
router.get('/:spotId', async (req, res, next) => {

    const numSpots = await Spot.count()
    if(req.params.spotId < 1 || req.params.spotId > numSpots || isNaN(parseInt(req.params.spotId))){
           return res.status(404).json({
                message: "Spot couldn't be found"
            })
    }

    const spot = await Spot.findByPk(req.params.spotId, {
    attributes: {
            include: [
             [sequelize.fn('COUNT', sequelize.col("Reviews.review")), 'numReviews'],
             [sequelize.fn('AVG', sequelize.col("Reviews.stars")), 'avgRating'],
            ]},

    include: [
        {
            model: Review, 
            attributes: [] // don't return any associated data from Challenges
        },
        {
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
        },
    ]
    })

    const spotJSON = spot.toJSON()
    const user = await User.findOne({
        raw: true,
        where: {
            id: req.params.spotId
        },
        attributes: ['id','firstName','lastName']
    })

    spotJSON.Owner = user
    res.json(spotJSON)
})



//Create a Spot
router.post('/', requireAuth, async (req, res) => {

 const { address, city, state, country, lat, lng, name, description, price } = req.body

    let errorList = {}

    if(!address) errorList.address = "Street address is required"
    if(!city) errorList.city = "City is required"
    if(!country) errorList.country = "Country is required"
    if(isNaN(lat) || lat < -90 || lat > 90) errorList.lat = "Latitude is not valid"
    if(isNaN(lng) || lng < -180 || lng > 180) errorList.lng = "Longitude is not valid"
    if(name.length > 50 || name.length < 0) errorList.name = "Name must be less than 50 characters"
    if(!description) errorList.description = "Description is required"
    if(!price) errorList.price = "Price per day is required"

    if(Object.keys(errorList).length){
       return res.status(400).json({
            message: "Bad Request",
            errors: {...errorList}
        })
    }

    const { user } = req

 const spot = await Spot.create({
    ownerId: user.id,
    address, city, state, country, lat, lng, name, description, price
 })



res.status(201).json(spot)

})


//Add an Image to a Spot based on the Spot's Id
router.post('/:spotId/images', requireAuth, async(req, res) => {

//if no such spot
const numSpots = await Spot.count()
if(req.params.spotId < 1 || req.params.spotId > numSpots || isNaN(parseInt(req.params.spotId))){
      return res.status(404).json({  message: "Spot couldn't be found"  })
}

    const { user } = req
    const { url, preview } = req.body
    const spot = await Spot.findOne({
        where: { ownerId: user.id }
    })

    const newSpotImage = await SpotImage.create({ url, preview })

    await spot.addSpotImage(newSpotImage)
    const spotObj = { id: newSpotImage.id, url, preview }
    
    res.json(spotObj)

})



//Edit a Spot
router.put('/:spotId', requireAuth, async (req,res) => {

    const numSpots = await Spot.count()
    if(req.params.spotId < 1 || req.params.spotId > numSpots || isNaN(parseInt(req.params.spotId))){
          return res.status(404).json({
                message: "Spot couldn't be found"
            })
    }
  
    const { user } = req
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    let errorList = {}

    if(!address) errorList.address = "Street address is required"
    if(!city) errorList.city = "City is required"
    if(!country) errorList.country = "Country is required"
    if(isNaN(lat) || lat < -90 || lat > 90) errorList.lat = "Latitude is not valid"
    if(isNaN(lng) || lng < -180 || lng > 180) errorList.lng = "Longitude is not valid"
    if(name.length > 50 || name.length < 0) errorList.name = "Name must be less than 50 characters"
    if(!description) errorList.description = "Description is required"
    if(!price) errorList.price = "Price per day is required"

    if(Object.keys(errorList).length){
       return res.status(400).json({
            message: "Bad Request",
            errors: {...errorList}
        })
    }

    const spot = await Spot.findByPk(req.params.spotId, {
        where: { id: user.id }
    })

    await spot.update({
        address, city, state, country, lat, lng, name, description, price
    })

    res.json(spot)
})

//Delete a Spot
router.delete('/:spotId', requireAuth, reqAuthorization, async (req, res) => {

    const spot = await Spot.findByPk(req.params.spotId)
    if(!spot){  return res.status(404).json({  message: "Spot couldn't be found"  })   }

    await spot.destroy()
    res.json({  message: "Successfully deleted"  })

})



module.exports = router;