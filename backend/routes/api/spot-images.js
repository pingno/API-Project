const express = require('express')
const router = express.Router();
const sequelize = require('sequelize')
const { requireAuth, reqAuthorization } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User, Booking } = require('../../db/models');
const user = require('../../db/models/user');
// const { handleValidationErrors } = require('../../utils/validation');



//Delete a Spot Image
//COMPLETED
router.delete('/:imageId', requireAuth, async (req,res) => {

const user = req.user
const spotImage = await SpotImage.findByPk(req.params.imageId)

if(!spotImage){
    res.status(404).json({ message: "Spot Image couldn't be found" })
}

   const spot = await spotImage.getSpot()
    if(user.id === spot.ownerId){
        await spotImage.destroy()
        res.json({ message: "Successfully deleted"  })
    
    } else {
        return res.status(403).json({ message: "Forbidden" })
    }

})




module.exports = router;