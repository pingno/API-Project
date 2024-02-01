import { csrfFetch } from "./csrf";

const GET_REVIEWS = "reviews/GET_REVIEWS";
const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";

const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews,
});

const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  reviewId,
});

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

export const deleteTheReview = (reviewId) => async (dispatch) => {
  await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  dispatch(removeReview(reviewId));
};

export const getReviewsforSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const spotReviews = await response.json();
    dispatch(getReviews(spotReviews));
    return spotReviews;
  }
};



export const createReview = (review, spotId) => async (dispatch) => {


  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  if (res.ok) {
  
    const createdReview = await res.json();
    dispatch(getReviewsforSpot(spotId));


    // dispatch(addReview(createdReview));
    return createdReview;
  }
};

let newState;

const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      newState = {};
      action.reviews.Reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;

    case REMOVE_REVIEW: {
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    }

    default:
      return state;
  }
};

export default reviewsReducer;
