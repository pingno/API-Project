const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User, Spot, Review, Booking } = require('../db/models');


const { secret, expiresIn } = jwtConfig;


// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token.
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const token = jwt.sign(
      { data: safeUser },
      secret,
      { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );
  
    const isProduction = process.env.NODE_ENV === "production";
  
    // Set the token cookie
    res.cookie('token', token, {
      maxAge: expiresIn * 1000, // maxAge in milliseconds
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction && "Lax"
    });
  
    return token;
  };


  const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;
    req.user = null;
  
    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
      if (err) {
        return next();
      }
      try {
        const { id } = jwtPayload.data;
        req.user = await User.findByPk(id, {
          attributes: {
            include: ['email', 'createdAt', 'updatedAt']
          }
        });
      } catch (e) {
        res.clearCookie('token');
        return next();
      }
  
      if (!req.user) res.clearCookie('token');
  
      return next();
    });
  };


  // If there is no current user, return an error
const requireAuth = function (req, _res, next) {
    if (req.user) return next();
  
    const err = new Error('Authentication required');
    err.title = 'Authentication required';
    err.errors = { message: 'Authentication required' };
    err.status = 401;
    return next(err);
  }


const reqAuthorization = async function (req, res, next) {
  
  const user = req.user
  const spot = await Spot.findByPk(req.params.spotId)

  if(!spot){
    return res.status(404).json({
      message: "Spot couldn't be found"
    })
  }

  if(user.id === spot.ownerId) return next()

  const err = new Error('Forbidden')
  err.errors = { message: 'Forbidden' }
  err.status = 403;
  return next(err)
}


const reqAuthorReview = async function (req, res, next){ 
  const user = req.user
  const review = await Review.findByPk(req.params.reviewId)

  if(!review){
    return res.status(404).json({
      message: "Review couldn't be found"
    })
  }

  if(user.id === review.userId) return next()
  const err = new Error('Forbidden')
  err.errors = { message: 'Forbidden'}
  err.status = 403;
  return next(err)

}

const reqAutBooking = async function (req, res, next){

  const user = req.user
  const booking = await Booking.findByPk(req.params.bookingId)

  if(!booking){
    return res.status(404).json({
      message: "Booking couldn't be found"
    })
  }

  if(user.id === booking.userId) return next()

  const err = new Error('Forbidden')
  err.errors = { message: 'Forbidden'}
  err.status = 403;
  return next(err)

}









module.exports = { 
  setTokenCookie, 
  restoreUser, 
  requireAuth, 
  reqAuthorization,
  reqAuthorReview,
  reqAutBooking
 };