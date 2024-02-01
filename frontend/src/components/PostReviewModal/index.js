import React, { useEffect, useState } from "react";
// import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { createReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import "./ReviewModal.css";
import { useSelector } from "react-redux/es/hooks/useSelector";

import { FaStar } from 'react-icons/fa'



export default function PostReviewModal({ theSpot, setMadeReview }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const sessionUser = useSelector((state) => state.session.user);


  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});


  const disabled = review.length < 10 || stars === 0;


  const handleSubmit = (e) => {
    let newReview = {
      userId: sessionUser.id,
      review,
      stars,
    };

    setErrors({});

    return dispatch(createReview(newReview, theSpot.id)).then(closeModal());
  };

  return (
    <div className="post-review-block">
      <div className="post-review-header">How was your stay?</div>
      {errors.review && (
        <p style={{ fontSize: "10px", color: "red" }}>{errors.review}</p>
      )}
      <textarea
        value={review}
        placeholder="Leave your review here"
        onChange={(e) => setReview(e.target.value)}
        required
        className="review-text"
      />

      {errors.stars && (
        <p style={{ fontSize: "10px", color: "red" }}>{errors.stars}</p>
      )}
      <div className="stars-row">
     
        <div onClick={(e) => setStars(1)}>
          {/* <i className="fa fa-star review-star"></i> */}
          <i className={`fa fa-star ${stars < 1 ? "star-hidden": "star-show"}`}></i>
        </div>
        <div onClick={(e) => setStars(2)}>
          <i className={`fa fa-star ${stars < 2 ? "star-hidden": "star-show"}`}></i>
        </div>

        <div onClick={(e) => setStars(3)}>
          <i className={`fa fa-star ${stars < 3 ? "star-hidden": "star-show"}`}></i>
        </div>

        <div onClick={(e) => setStars(4)}>
          <i className={`fa fa-star ${stars < 4 ? "star-hidden": "star-show"}`}></i>
        </div>

        <div onClick={(e) => setStars(5)}>
          <i className={`fa fa-star ${stars < 5 ? "star-hidden": "star-show"}`}></i>
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

