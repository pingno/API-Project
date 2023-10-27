import { useSelector, useDispatch } from "react-redux";
import { getReviewsforSpot } from "../../store/reviews";
import { useEffect } from "react";
import "./ReviewList.css";
import { useState } from "react";

import PostReviewModal from "../PostReviewModal";
import OpenModalButton from "../OpenModalButton";

import ReviewTile from "../ReviewTile";

export default function Reviews({ theSpot }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  console.log("USER", user);
  // console.log("THE SPOT", theSpot)

  const [isOwner, setIsOwner] = useState(false);
  const [madeReview, setMadeReview] = useState(false);

  //All reviews
  const spotReviewsObj = useSelector((state) => state.reviews);
  const spotReviewsArr = Object.values(spotReviewsObj);

  // console.log(" SPOT REVIEWS OBJ", spotReviewsObj);
  // console.log("SPOT REVIEWS ARR ", spotReviewsArr);

  //sort reviews newest first
  spotReviewsArr.sort((review1, review2) => {
    const d1 = new Date(review1.createdAt);
    const d2 = new Date(review2.createdAt);
    return d2 - d1;
  });

  //if 1 review or more
  let oneReview;
  let moreReviews;
  if (theSpot.numReviews === 1) oneReview = theSpot.numReviews;
  if (theSpot.numReviews > 1) moreReviews = theSpot.numReviews;

  useEffect(() => {
    dispatch(getReviewsforSpot(theSpot.id));
    //if owner of spot
    if (user.id === theSpot.ownerId) setIsOwner(true);
    
    //if made review yet
    spotReviewsArr.forEach((review) => {
      if (review.userId === user.id) setMadeReview(true);
    });


  }, [dispatch, madeReview, isOwner]);

  if (spotReviewsArr.length === 0) return null;

  return (
    <div className="reviews-container">
      <div className="review-header">
        <i className="fa-solid fa-star"></i>
        {theSpot.avgRating ? <div>{theSpot.avgRating.toFixed(1)}</div> : "New"}

        {oneReview && <div> · {oneReview} Review</div>}
        {moreReviews && <div> · {moreReviews} Reviews</div>}
      </div>

      {isOwner === false ||
        (madeReview === false && (
          <OpenModalButton
            buttonText={"Post Your Review"}
            modalComponent={<PostReviewModal theSpot={theSpot} />}
          />
        ))}

      {spotReviewsArr.length !== 0 ? (
        <div className="reviews-list-container">
          {spotReviewsArr.map((review) => (
            <ReviewTile review={review} />
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
