import { useSelector, useDispatch } from "react-redux";
import { getReviewsforSpot } from "../../store/reviews";
import { useEffect } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import ReviewTile from "../ReviewTile";
import "./ReviewList.css";

export default function Reviews({ theSpot }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  // //All reviews
  const spotReviewsObj = useSelector((state) => state.reviews);
  const spotReviewsArr = Object.values(spotReviewsObj);

  // console.log(" SPOT REVIEWS OBJ", spotReviewsObj);
  // console.log("SPOT REVIEWS ARR ", spotReviewsArr);

  let oneReview;
  let moreReviews;
  if (theSpot.numReviews === 1) oneReview = theSpot.numReviews;
  if (theSpot.numReviews > 1) moreReviews = theSpot.numReviews;

  useEffect(() => {
    dispatch(getReviewsforSpot(theSpot.id));
  }, [dispatch, theSpot]);

  if (!spotReviewsArr) return null;

  return (
    <>
      <div className="review-header">
        <i class="fa-solid fa-star"></i>
        {theSpot.avgRating ? <div>{theSpot.avgRating.toFixed(1)}</div> : "New"}

        {oneReview && <div> · {oneReview} Review</div>}
        {moreReviews && <div> · {moreReviews} Reviews</div>}
      </div>

      {/* {spotReviewsArr.forEach(review => review.userId != user.id) && (
              <NavLink exact to="/spots/new" id="post-your-review">
              Post Your Review
            </NavLink>
            )} */}

      {spotReviewsArr.length !== 0 ? (
        <div className="reviews-list-container">
          {spotReviewsArr.map((review) => {
            console.log(" REVIEW ", review);
            let month = review.createdAt.split("-")[1];
            let year = review.createdAt.split("-")[0];

            return (
              <>
                <div className="review-tile">
                  <div className="review-first-name">
                    {review.User.firstName}
                  </div>
                  <div className="review-date">
                    {month} {year}
                  </div>
                  <div className="review-description">{review.review}</div>
                </div>
              </>
            );
          })}
        </div>
      ) : <p>"Be the first to post a review!</p>}
    </>
  );
}

// ordered reviews MUST BE NEWER FIRST (DOUBLE CHECK)
// const orderedReviews = spotReviewsArr.sort((review1, review2) => {

//   // new Date().getTime()
//   if (review1.createdAt < review2.createdAt) {
//     return -1;
//   }
//   if (review2.createdAt > review1.createdAt) {
//     return 1;
//   }
//   return 0;
// });
