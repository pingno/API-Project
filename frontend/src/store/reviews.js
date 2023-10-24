import { csrfFetch } from "./csrf";
export const RECEIVE_REVIEW = 'reviews/RECEIVE_REVIEW';
export const RECEIVE_REVIEWS = 'reviews/RECEIVE_REVIEWS';
export const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';
export const RESET_REVIEWS = 'reviews/RESET_REVIEWS';

export const receiveReview = review => ({
  type: RECEIVE_REVIEW,
  review
});

export const receiveReviews = reviews => ({
  type: RECEIVE_REVIEWS,
  reviews
});

export const removeReview = reviewId => ({
  type: REMOVE_REVIEW,
  reviewId
});

export const resetReviews = () => ({
  type: RESET_REVIEWS,
});



// export const createReview = (review, spotId) => async (dispatch) => {
//   const req = await csrfFetch(`/api/spots/${spotId}/reviews`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ review })
//   });
//   const data = await req.json();
//   const createdReview = data;
//   dispatch(receiveReview(createdReview));
//   return createdReview;
// };

// export const editReview = (review) => async (dispatch) => {
//   const req = await csrfFetch(`/api/reviews/${review.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(review)
//   });
//   const data = await req.json();
//   const editedReview = data;
//   dispatch(receiveReview(editedReview));
//   return editedReview;
// };

// export const deleteReview = (reviewId) => async (dispatch) => {
//   await fetch(`/api/reviews/${reviewId}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json"
//     }
//   });
//   dispatch(removeReview(reviewId));
//   return reviewId;
// };

export const getReviewsforSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

  if(response.ok){
    const spotReviews = await response.json();
    dispatch(receiveReviews(spotId))
    return spotReviews
  }

}



export const getAllReviews = state => {
  return state?.reviews ? Object.values(state.reviews) : [];
};

// export const getReviewsForSpot = spotId => state => {
//   return state?.reviews ? Object.values(state.reviews).filter(review => review.petId === petId) : [];
// };

export const getReview = reviewId => state => {
  return state?.reviews ? state.reviews[reviewId] : null;
};

const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_REVIEW:
      return { ...state, [action.review.id]: action.review };
    case RECEIVE_REVIEWS:
      return { ...state, ...action.reviews };
    case REMOVE_REVIEW: {
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    }
    // case REMOVE_PET: {
    //   const newState = { ...state };
    //   for (let review of state) {
    //     if (review.petId === action.petId) {
    //       delete newState[review.id];
    //     }
    //   }
    //   return newState;
    // }
    case RESET_REVIEWS:
      return {};
    default:
      return state;
  }
};

export default reviewsReducer;