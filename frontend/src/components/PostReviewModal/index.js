import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { createReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import "./ReviewModal.css";

export default function PostReviewModal({theSpot}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [review, setReview] = useState("");
  const [stars, setStars] = useState(4);
  const [errors, setErrors] = useState({});

  // const [disabled, setDisabled] = useState(false);

  const disabled = review.length < 10 || stars === 0;

  let newReview = {
    review,
    stars,
  };

  // useEffect(() => {
  //   if(review.length < 10 || stars === 0) setDisabled(true)
  // },[review, stars])

  // console.log("MY SPOT", theSpot)

  const handleSubmit = (e) => {
  
    setErrors({});

    return dispatch(createReview(newReview, theSpot.id))
      .then(closeModal)

      // .catch(async (res) => {
      //   const data = await res.json();
      //   if (data && data.errors) {
      //     setErrors(data.errors);
      //   }
      // });


  };

  return (
    <div className="post-review-block">
      <div className="post-review-header">How was your stay?</div>
      {/* {errors.review && (
        <p style={{ fontSize: "10px", color: "red" }}>{errors.review}</p>
      )} */}
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
        className="review-text"
      />

      {/* {errors.stars && (
        <p style={{ fontSize: "10px", color: "red" }}>{errors.stars}</p>
      )} */}
      <div className="stars-row">
        <div>{stars}</div>

        <div onClick={(e) => setStars(1)}>
          <i className="fa fa-star review-star"></i>
        </div>
        <div onClick={(e) => setStars(2)}>
          <i className="fa fa-star review-star"></i>
        </div>

        <div onClick={(e) => setStars(3)}>
          <i className="fa fa-star review-star"></i>
        </div>

        <div onClick={(e) => setStars(4)}>
          <i className="fa fa-star review-star"></i>
        </div>

        <div onClick={(e) => setStars(5)}>
          <i className="fa fa-star review-star"></i>
        </div>

        <div className="text-star">Stars</div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={disabled}
        className="review-button"
      >
        Submit Your Review
      </button>
    </div>
  );
}
