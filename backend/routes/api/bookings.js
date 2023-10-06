const express = require('express')
const router = express.Router();
const sequelize = require('sequelize')
const { requireAuth, reqAuthorReview, reqAuthorization, reqAutBooking } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User, Booking } = require('../../db/models');
const user = require('../../db/models/user');
// const { handleValidationErrors } = require('../../utils/validation');


// Get all of the Current User's Bookings
//COMPLETE
router.get('/current', requireAuth, async (req, res) => {

    const { user } = req
    const bookings = await Booking.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: Spot,
                attributes: {
                    exclude: ['description', 'createdAt', 'updatedAt']
                }
            }
        ],

    })


    let bookingsObj = bookings.map(booking => booking.toJSON())
    const images = await SpotImage.findAll() 

    for(let i = 0; i < bookingsObj.length; i++){
        for(let j = 0; j < images.length; j++)
        if(images[j].spotId == bookingsObj[i].spotId){
            if(images[j].preview === true){
            bookingsObj[i].Spot.previewImage = images[j].url
            break
            } else {
                bookingsObj[i].Spot.previewImage = 'No preview available'
            }
        } else {
            bookingsObj[i].Spot.previewImage = 'No preview available'
        }
    }

    res.json({  Bookings: bookingsObj  })

})


// Edit a Booking

router.put('/:bookingId', requireAuth, reqAutBooking, async (req, res) => {

    //Error response: Couldn't find a booking with specified id
    const numBookings = await Booking.count()
    if(req.params.bookingId < 1 || req.params.bookingId > numBookings || isNaN(parseInt(req.params.bookingId))){
           return res.status(404).json({  message: "Booking couldn't be found"   })
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
        where: {  userId: user.id  }
    })

    const currentDate = new Date().getTime()

    const userStartDate = new Date (startDate).getTime()
    const userEndDate = new Date (endDate).getTime()

    const errors = {}
    bookings.forEach(reservation => {

        const reservationStartDate = new Date (reservation.startDate).getTime()
        const reservationEndDate = new Date (reservation.endDate).getTime()

        //Error response: Can't edit a booking that's past the end date
        if(currentDate >= userEndDate){
           return res.status(403).json({
                message: "Past bookings can't be modified"
            })
        }

        if(userStartDate >= reservationStartDate && userStartDate <= reservationEndDate){
            errors.startDate = "Start date conflicts with an existing booking"
        }
        if(userEndDate >= reservationStartDate && userEndDate <= reservationEndDate){
            errors.endDate = "End date conflicts with an existing booking"
        }

    })

    if(Object.keys(errors).length){
       return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {...errors}
        })
    }


const booking = await Booking.findByPk(req.params.bookingId)

    const updatedBooking = await booking.update({
        startDate, endDate
    })

    res.json(updatedBooking)
})


// Delete a Booking
//COMPLETED?
router.delete('/:bookingId', requireAuth, reqAutBooking, async(req,res) => {

//Error response: Couldn't find a Booking with the specified id
const numBookings = await Booking.count()
    if(req.params.bookingId < 1 || req.params.bookingId > numBookings || isNaN(parseInt(req.params.bookingId))){
           return res.status(404).json({  message: "Booking couldn't be found"   })
    }

const booking = await Booking.findByPk(req.params.bookingId)

const currentDate = new Date().getTime()
const reservationStartDate = new Date (booking.startDate).getTime()
const reservationEndDate = new Date (booking.endDate).getTime()

//if current date is between a reservations start and end date, then they can't delete
if(currentDate >= reservationStartDate && currentDate <= reservationEndDate){
   return res.status(403).json({
        message: "Bookings that have been started can't be deleted"
    })
}


await booking.destroy()
res.json({
    message: "Successfully deleted"
})

})




module.exports = router;