const express = require('express')
const router = express.Router();
const sequelize = require('sequelize')
const { requireAuth, reqAuthorReview, reqAuthorization } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User } = require('../../db/models')
// const { handleValidationErrors } = require('../../utils/validation');

//Get all Reviews of the Current User
//COMPLETE
router.get('/current', requireAuth, async (req, res) => {

    const { user } = req

    const reviews = await Review.findAll({
 
        where: { userId: user.id },
        include: [
        {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        },
        {
            model: Spot,
            attributes: {
                exclude: ['description', 'createdAt', 'updatedAt']
            }
        },
        {
            model: ReviewImage,
            attributes: ['id', 'url']
        }
    ]
    })


    let reviewsObj = reviews.map(review => review.toJSON())
    const images = await SpotImage.findAll() //find all images

    for(let i = 0; i < reviewsObj.length; i++){
        for(let j = 0; j < images.length; j++)
        if(images[j].spotId == reviewsObj[i].spotId){
            if(images[j].preview == true){
            reviewsObj[i].Spot.previewImage = images[j].url
            break
            } else {
                reviewsObj[i].Spot.previewImage = 'No preview available'
            }
        }
    }


    res.json({ Reviews: reviewsObj })

})



//Add an Image to a Review based on the Review's id
//COMPLETED
router.post('/:reviewId/images', requireAuth , reqAuthorReview, async (req, res) => {

    //Error response: Couldn't find a Review with the specified id
    const numReviews = await Review.count()
    if(req.params.reviewId < 1 || req.params.reviewId > numReviews || isNaN(parseInt(req.params.reviewId))){
           return res.status(404).json({  message: "Review couldn't be found"   })
    }

    const { url } = req.body
    const review = await Review.findByPk(req.params.reviewId) //find Review

    const allReviewImages = await ReviewImage.findAll({  where: {  reviewId: req.params.reviewId  }  })

    //Error response: Cannot add any more images because there is a maximum of 10 images per resource
    if(allReviewImages.length >= 10){  
        return res.status(403).json({ 
            message: "Maximum number of images for this resources was reached"
        })  
    }

    const newImage = await ReviewImage.create({ //create new ReviewImage
        url: url,
        reviewId: req.params.reviewId
    })

    await review.addReviewImage(newImage) //insert with Association

    const createdImage = await ReviewImage.findOne({  //find the new Review image
        where:{
            reviewId: req.params.reviewId,
            url
        },
        attributes: ['id', 'url']
    })

    res.json(createdImage)

})


//Edit a Review 
//COMPLETED
router.put('/:reviewId', requireAuth, reqAuthorReview, async (req, res) => {

    //Error response: Couldn't find a Review with the specified id
    const numReviews = await Review.count()
    if(req.params.reviewId < 1 || req.params.reviewId > numReviews || isNaN(parseInt(req.params.reviewId))){
           return res.status(404).json({  message: "Review couldn't be found"   })
    }

    const { review, stars } = req.body

    //Error Response: Body validation errors
    const errors = {}
    if(!review) errors.review = "Review text is required"
    if(!stars || stars < 1 || stars > 5)  errors.stars = "Stars must be an integer from 1 to 5"
        if(Object.keys(errors).length){
    res.status(400).json({
        message: "Bad Request",
        errors: {...errors}
    })
}

    const theReview = await Review.findByPk(req.params.reviewId)
    await theReview.update({  review, stars  })

    res.json(theReview)

})



//Delete a Review
//COMPLETED
router.delete('/:reviewId', requireAuth, reqAuthorReview, async (req, res) => {

    //Error response: Couldn't find a Review with the specified id
    const numReviews = await Review.count()
    if(req.params.reviewId < 1 || req.params.reviewId > numReviews || isNaN(parseInt(req.params.reviewId))){
           return res.status(404).json({  message: "Review couldn't be found"   })
    }

    const review = await Review.findByPk(req.params.reviewId)
    await review.destroy()

    res.json({  message: "Successfully deleted"  })

})




module.exports = router