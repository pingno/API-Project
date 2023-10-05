const express = require('express')
const router = express.Router();
const sequelize = require('sequelize')
const { requireAuth, reqAuthorReview, reqAuthorization, reqAutBooking } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User, Booking } = require('../../db/models');
const user = require('../../db/models/user');
// const { handleValidationErrors } = require('../../utils/validation');



router.delete('/:imageId', requireAuth, async (req,res) => {

    const user = req.user
    const reviewImage = await ReviewImage.findByPk(req.params.imageId)
    
    if(!reviewImage){
        res.status(404).json({ message: "Review Image couldn't be found" })
    }
    
       const review = await reviewImage.getReview()
        if(user.id === review.userId){
            await reviewImage.destroy()
            res.json({ message: "Successfully deleted"  })
        
        } else {
            return res.status(403).json({ message: "Forbidden" })
        }
    
    })




module.exports = router;