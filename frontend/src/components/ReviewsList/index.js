import { useSelector, useDispatch } from "react-redux";
import { getReviewsforSpot } from "../../store/reviews";
import { useEffect, useState } from "react";
import "./ReviewList.css";

import PostReviewModal from "../PostReviewModal";
import OpenModalButton from "../OpenModalButton";

import ReviewTile from "../ReviewTile";

export default function Reviews({ theSpot }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [reviewsLoaded, setReviewsLoaded] = useState(false)

  //All reviews
  const spotReviewsObj = useSelector((state) => state.reviews);
  const spotReviewsArr = Object.values(spotReviewsObj);

  console.log(" SPOT REVIEWS OBJ", spotReviewsObj);
  console.log("SPOT REVIEWS ARR ", spotReviewsArr);

  //sort reviews newest first
  spotReviewsArr.sort((review1, review2) => {
    const d1 = new Date(review1.createdAt);
    const d2 = new Date(review2.createdAt);
    return d2 - d1;
  });

  let spotRating;
  if (spotReviewsArr.length) {
    spotRating =
      spotReviewsArr.reduce((acc, curr) => acc + curr.stars, 0) /
      spotReviewsArr.length;
  }

  useEffect(() => {
    dispatch(getReviewsforSpot(theSpot.id)).then(() => setReviewsLoaded(true))
  }, [dispatch]);

  let madeReview;
  if (user) {
    madeReview = spotReviewsArr.find((review) => review.userId === user.id);
  }

  if(reviewsLoaded === false) return null

  return (
    <div className="reviews-container">
      <div className="review-header">
        <i className="fa-solid fa-star"></i>

        {spotReviewsArr.length ? (
          <>
            {spotRating.toFixed(1)} · {spotReviewsArr.length}{" "}
            {spotReviewsArr.length === 1 ? "review" : "reviews"}
          </>
        ) : (
          <div>New</div>
        )}
      </div>

      {user && user.id !== theSpot.ownerId && !madeReview && (
        <OpenModalButton
          buttonText={"Post Your Review"}
          modalComponent={<PostReviewModal theSpot={theSpot} />}
        />
      )}

      {spotReviewsArr.length !== 0 ? (
        <div className="reviews-list-container">
          {spotReviewsArr.map((review) => (
            <ReviewTile review={review} key={review.id}/>
          ))}
        </div>
      ) : (
        <div>
          <p>"Be the first to post a review!</p>
        </div>
      )}
    </div>
  );
}
