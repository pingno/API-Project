const express = require('express')
const router = express.Router();
const sequelize = require('sequelize')
const { setTokenCookie, requireAuth, reqAuthorization } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User, Booking } = require('../../db/models')
const { handleValidationErrors } = require('../../utils/validation');
const user = require('../../db/models/user');
const moment = require('moment')
const { check } = require('express-validator');
const { Op } = require("sequelize")



// const validateQuery = [
//     check('page')
//         .optional({values: "falsy"})
//         .isInt({ min: 1, max: 10})
//         .withMessage('Page must be greater than or equal to 1'),
//     check('size')
//         .optional({values: "falsy"})
//         .isInt({ min: 1, max: 20})
//         .withMessage('Size must be greater than or equal to 1'),
//     check('maxLat')
//         .optional({values: "falsy"})
//         .isFloat({ min: -90.0000000, max: 90.0000000})
//         .withMessage('Maximum latitude is invalid'),
//     check('minLat')
//         .optional({values: "falsy"})
//         .isFloat({ min: -90.0000000, max: 90.0000000})
//         .withMessage('Minimum latitude is invalid'),
//     check('minLng')
//         .optional({values: "falsy"})
//         .isFloat({ min: -180.0000000, max: 180.0000000})
//         .withMessage('Minimum longitude is invalid')
//         .custom(value => {
//             if(this.maxLng && value > this.maxLng) return false
//             else return true
//         })
//         .withMessage('Minimum longitude is invalid'),
//     check('maxLng')
//         .optional({values: "falsy"})
//         .isFloat({ min:-180.0000000, max: 180.0000000})
//         .withMessage('Maximum longitude is invalid')
//         .custom(value => {
//             if(value < this.minLng) return false
//             else return true
//         })
//         .withMessage('Maximum longitude is invalid'),
//     check('minPrice')
//         .optional({values: "falsy"})
//         .isFloat({ min: 0})
//         .withMessage('Minimum price must be greater than or equal to 0'),
//     check('maxPrice')
//         .optional({values: "falsy"})
//         .isFloat({ min: 0})
//         .withMessage('Maximum price must be greater than or equal to 0'),

//     handleValidationErrors
//     ]


//Get all spots COMPLETE
//COMPLETE
router.get('/', async (req,res,next) => {

let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query


let errorList = {}

    if(page < 1) errorList.page = "Page must be greater than or equal to 1"
    if(size < 1) errorList.size = "Size must be greater than or equal to 1"

    if(maxLat) maxLat = Number(maxLat)
    if(minLat) minLat = Number(minLat)
    if(maxLng) maxLng = Number(maxLng)
    if(minLng) minLng = Number(minLng)

    if(maxLat && minLat){
        if((maxLat < minLat) || (maxLat < -90 || maxLat > 90)) errorList.maxLat = "Maximum latitude is invalid"
        if((minLat > maxLat) || (minLat < -90 || minLat > 90)) errorList.minLat = "Minimum latitude is invalid"
    } else if (maxLat && (maxLat < -90 || maxLat > 90)) errorList.maxLat = "Maximum latitude is invalid"
    else if (minLat && (minLat < -90 || minLat > 90)) errorList.minLat = "Minimum latitude is invalid"

    if(minLng && maxLng){
        if((maxLng < minLng) || (maxLng < -180 || maxLng > 180)) errorList.maxLng = "Maximum longitude is invalid"
        if((minLng > maxLng) || (minLng < -180 || minLng > 180)) errorList.minLng = "Minimum longitude is invalid"
    } else if(minLng && (minLng < -180 || minLng > 180)) errorList.minLng = "Minimum longitude is invalid"
    else if(maxLng && (maxLng < -180 || maxLng > 180)) errorList.maxLng = "Maximum longitude is invalid"
   
    if(minPrice && minPrice < 0) errorList.minPrice = "Minimum price must be greater than or equal to 0"
    if(maxPrice && maxPrice < 0) errorList.maxPrice = "Maximum price must be greater than or equal to 0"
   

    if(Object.keys(errorList).length){
       return res.status(400).json({
            message: "Bad Request",
            errors: {...errorList}
        })
    }




const where = {}
const pagination = {}

if(minLat && maxLat) {
    where.lat = {[Op.between]: [minLat, maxLat]}
} else if (minLat){
    where.lat = {[Op.gte]: minLat}
} else if (maxLat){
    where.lat = {[Op.lte]: maxLat}
}

if(minLng && maxLng) {
    where.lng = {[Op.between]: [minLng, maxLat]}
} else if (minLng){
    where.lng = {[Op.gte]: minLng}
} else if (maxLng){
    where.lng = {[Op.lte]: maxLng}
}

if(minPrice && maxPrice){
    where.price = {[Op.between]: [minPrice, maxPrice]}
} else if (minPrice){
    where.price = {[Op.gte]: [minPrice]}
} else if (maxPrice){
    where.price = {[Op.lte]: [maxPrice]}
}


if(!page) page = 1
if(!size) size = 20
if(size > 20) size = 20

pagination.limit = size
pagination.offset = size * (page - 1)


const spots = await Spot.findAll({
    where: {
        ...where
    },
    ...pagination

}) //find all spots
const spotsJSON = spots.map(spots => spots.toJSON()) //turn each spot into JSON
const images = await SpotImage.findAll() //find all images

for(let i = 0; i < spotsJSON.length; i++){
    for(let j = 0; j < images.length; j++)
    if(images[j].spotId == spotsJSON[i].id){
        if(images[j].preview == true){
        spotsJSON[i].previewImage = images[j].url
        break
        } else {
            spotsJSON[i].previewImage = 'No preview available'
        }
    } else {
        spotsJSON[i].previewImage = 'No preview available'
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

res.json({ Spots:
    spotsJSON,
    page: Number(page),
    size: Number(size)
 })

})



//Get all Spots owned by the Current User
//DOUBLE CHECK previewImage
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
            if(images[j].preview == true){
            spotsJSON[i].previewImage = images[j].url
            break
            } else { spotsJSON[i].previewImage = 'No preview available'  }
        } else {
            spotsJSON[i].previewImage = 'No preview available'
        }
    }

for( let i = 0; i < spotsJSON.length; i++){
    const spot = spotsJSON[i]
    const reviews = await Review.findAll({
        where: {  spotId: spot.id  }
    })

    //maybe check if avg is true then assign key/value
    const avg = await Review.sum('stars', {
        where: {  spotId: spot.id   }
    }) / reviews.length

    spot.avgRating = avg
    delete spot.SpotImages
}

res.json({
    Spots: spotsJSON})

})

//Get details of a Spot from an Id
//COMPLETE
router.get('/:spotId', async (req, res, next) => {

    const numSpots = await Spot.count()
    if(req.params.spotId < 1 || req.params.spotId > numSpots || isNaN(parseInt(req.params.spotId))){
           return res.status(404).json({
                message: "Spot couldn't be found"
            })
    }

    const spot = await Spot.findByPk(req.params.spotId, {

    include: [
        {
            model: Review, 
            attributes: []
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
        where: { id: req.params.spotId },
        attributes: ['id','firstName','lastName']
    })

    spotJSON.Owner = user
    spotJSON.numReviews = await Review.count({
        where: { spotId: spotJSON.id  }
    })
    spotJSON.avgRating = await Review.sum('stars', {
        where: {  spotId: spotJSON.id   }
    }) / spotJSON.numReviews


    res.json(spotJSON)
})



//Create a Spot
//COMPLETE could refactor
router.post('/', requireAuth, async (req, res) => {

 const { address, city, state, country, lat, lng, name, description, price } = req.body

    let errorList = {}

    if(!address) errorList.address = "Street address is required"
    if(!city) errorList.city = "City is required"
    if(!state) errorList.state = "State is required"
    if(!country) errorList.country = "Country is required"
    if(!lat || isNaN(lat) || lat < -90 || lat > 90) errorList.lat = "Latitude is not valid"
    if(!lng || isNaN(lng) || lng < -180 || lng > 180) errorList.lng = "Longitude is not valid"
    if(!name || name.length > 50 || name.length < 0) errorList.name = "Name must be less than 50 characters"
    if(!description) errorList.description = "Description is required"
    if(!price || price < 1) errorList.price = "Price per day is required"

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
//COMPLETE
router.post('/:spotId/images', requireAuth, reqAuthorization, async(req, res) => {

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
//COMPLETE
router.put('/:spotId', requireAuth, reqAuthorization, async(req,res) => {

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
    if(!state) errorList.state = "State is required"
    if(!country) errorList.country = "Country is required"
    if(!lat || isNaN(lat) || lat < -90 || lat > 90) errorList.lat = "Latitude is not valid"
    if(!lng || isNaN(lng) || lng < -180 || lng > 180) errorList.lng = "Longitude is not valid"
    if(!name || name.length > 50 || name.length < 0) errorList.name = "Name must be less than 50 characters"
    if(!description) errorList.description = "Description is required"
    if(!price || price < 1) errorList.price = "Price per day is required"

    if(Object.keys(errorList).length){
       return res.status(400).json({
            message: "Bad Request",
            errors: {...errorList}
        })
    }

    const spot = await Spot.findByPk(req.params.spotId, {
        where: { ownerId: user.id }
    })

    await spot.update({
        address, city, state, country, lat, lng, name, description, price
    })

    res.json(spot)
})

//Delete a Spot
//COMPLETED
router.delete('/:spotId', requireAuth, reqAuthorization, async (req, res) => {

    const spot = await Spot.findByPk(req.params.spotId)
    if(!spot){  return res.status(404).json({  message: "Spot couldn't be found"  })   }

    await spot.destroy()
    res.json({  message: "Successfully deleted"  })

})


// PART 2

//Get all Reviews by a Spot's id 
//COMPLETED
router.get('/:spotId/reviews', async (req, res) => {

    const numSpots = await Spot.count()
    if(req.params.spotId < 1 || req.params.spotId > numSpots || isNaN(parseInt(req.params.spotId))){
           return res.status(404).json({  message: "Spot couldn't be found"   })
    }

    const reviews = await Review.findAll({
        where: { spotId: req.params.spotId },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    res.json({ Reviews: reviews })

})


//Create a Review for a Spot based on the Spot's id
//COMPLETED
router.post('/:spotId/reviews', requireAuth,  async (req, res) => {

    //Error response: Couldn't find a Spot with the specified id
    const numSpots = await Spot.count()
    if(req.params.spotId < 1 || req.params.spotId > numSpots || isNaN(parseInt(req.params.spotId))){
           return res.status(404).json({  message: "Spot couldn't be found"   })
    }

    const { review, stars } = req.body
    const { user } = req

    //Error Response: Body validations errors
    const errors = {}
        if(!review) errors.review = "Review text is required"
        if(!stars || stars < 1 || stars > 5)  errors.stars = "Stars must be an integer from 1 to 5"
    if(Object.keys(errors).length){
       return res.status(400).json({
            message: "Bad Request",
            errors: {...errors}
        })
    }

    const spot = await Spot.findByPk(req.params.spotId)

    const allReviews = await Review.findAll({
        raw:true,
        where:{
            userId: user.id,
            spotId: req.params.spotId
        }
    })

    //Error response: Review from the current user already exists for the Spot
    if(allReviews.length){
      return res.status(500).json({
            message: "User already has a review for this spot"
        })
    } 

   const newReview = await spot.createReview({ 
        userId: user.id,
        review,
        stars 
    })

    res.status(201).json(newReview)

})


//BOOKINGS

//Get all Bookings for a Spot based on the Spot's id
//COMPLETED
router.get('/:spotId/bookings', requireAuth, async (req, res) => {

    //Error response: Couldn't find a Spot with the specified id
    const spot = await Spot.findByPk(req.params.spotId)
    if(!spot) return res.status(404).json({message: "Spot couldn't be found"})
    
    const user = req.user
    //if you ARE the owner
      if(user && user.id === spot.ownerId){
        const booking = await Booking.findAll({
            where: {
                spotId: req.params.spotId
            },
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        })

        let bookingsArr = []
        booking.forEach(reservation => {
            
            bookingsArr.push({
                User: reservation.User,
                id: reservation.id,
                spotId: reservation.spotId,
                userId: reservation.userId,
                startDate: reservation.startDate.toISOString().slice(0,10),
                endDate: reservation.endDate.toISOString().slice(0,10),
                createdAt: reservation.createdAt,
                updatedAt: reservation.updatedAt
            })

        })

        res.json({
            Bookings: bookingsArr
        })

      } else {
        //if you ARE NOT the owner of the spot
        const booking = await Booking.findAll({
            where: {
                spotId: req.params.spotId
            },
            attributes: ['spotId', 'startDate', 'endDate']
        })

        let bookingsArr = []
        booking.forEach(reservation => {
            
            bookingsArr.push({
                spotId: reservation.spotId,
                startDate: reservation.startDate.toISOString().slice(0,10),
                endDate: reservation.endDate.toISOString().slice(0,10)
            })

        })

        res.json({
            Bookings: bookingsArr
        })

      }

})


//Create a Booking from a Spot based on the Spot's id
//COMPLETE
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
   
    //Error response: Couldn't find a Spot with the specified id
    const numSpots = await Spot.count()
    if(req.params.spotId < 1 || req.params.spotId > numSpots || isNaN(parseInt(req.params.spotId))){
           return res.status(404).json({  message: "Spot couldn't be found"   })
    }

    const { user } = req
    const { startDate, endDate } = req.body

    //Error response: Body validation errors
    if(endDate <= startDate){
        return res.status(400).json({
            message: "Bad Request",
            errors: { endDate: "endDate cannot be on or before startDate"}
        })
    }

    const bookings = await Booking.findAll({
        raw:true,
        where: {  spotId: req.params.spotId  }
    })

    const userStartDate = new Date (startDate).getTime()
    const userEndDate = new Date (endDate).getTime()

    const errors = {}
    bookings.forEach(reservation => {

        const reservationStartDate = new Date (reservation.startDate).getTime()
        const reservationEndDate = new Date (reservation.endDate).getTime()

            //if userInput start date is between a previous booking
        if(userStartDate >= reservationStartDate && userStartDate <= reservationEndDate){
            errors.startDate = "Start date conflicts with an existing booking"
        }  //if userInput end date is between a previous booking
        if(userEndDate >= reservationStartDate && userEndDate <= reservationEndDate){
            errors.endDate = "End date conflicts with an existing booking"
        }

        //if userInput startDate and endDate surrounds an existing booking
        if(userStartDate < reservationStartDate && reservationEndDate < userEndDate){
            errors.startDate = "Start date conflicts with an existing booking",
            errors.endDate = "End date conflicts with an existing booking"
        }
  

    })

    if(Object.keys(errors).length){
       return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {...errors}
        })
    }

    const spot = await Spot.findByPk(req.params.spotId)

    //Require proper authorization
    if(spot.ownerId != user.id){
        const booking = await spot.createBooking({
            userId: user.id,
            startDate,
            endDate
        })
        

    const bookingObj = {
        id: booking.id,
        spotId: booking.spotId,
        userId: user.id,
        startDate: booking.startDate.toISOString().slice(0,10),
        endDate: booking.endDate.toISOString().slice(0,10),
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt
    }   

    res.json(bookingObj)

    } else { //cannot book at your own spot
        return res.status(403).json({  message: "Forbidden"  })
    }

})






module.exports = router;