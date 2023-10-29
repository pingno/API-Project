import { useSelector } from "react-redux/es/hooks/useSelector";
import "./ManageReviews.css";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal";

export default function ManageReviewsList() {
  const sessionUser = useSelector((state) => state.session.user);
  const myReviews = Object.values(useSelector((state) => state.reviews));

  if (!myReviews.length) return null;

  const allReviews = myReviews.filter(
    (review) => review.userId === sessionUser.id
  );

  console.log("ALL MY REVIEWS", allReviews);

  return (
    <div className="manage-reviews-container">
       <div className="manage-reviews-title">Manage Reviews</div>

      <div className="reviewslist-container">
        {allReviews.map((review) => {
          let month = review.createdAt.split("-")[1];
          let year = review.createdAt.split("-")[0];

          return (
            <div key={review.id}>
              <div className="review-tile" key={review.id}>
                <div className="review-first-name">
                  {review.User?.firstName}
                </div>
                <div className="review-date">
                  {month} {year}
                </div>
                <div className="review-description">{review.review}</div>
              </div>

              <div>Update</div>

              <OpenModalButton
                buttonText={"Delete"}
                modalComponent={<DeleteReviewModal reviewId={review.id} />}
              />
            </div>
          );
        })}
      </div> 
    </div>
  );
}
