
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteTheReview } from "../../store/reviews";
import './DeleteReviewModal.css'

export default function DeleteReviewModal({ reviewId }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleYes = (e) => {
    e.preventDefault();
    dispatch(deleteTheReview(reviewId));
    closeModal()

  };

  return (
    <div className="delete-review-container">
      <div className="delete-review-title">Confirm Delete</div>
      <div className="delete-review-text">
        Are you sure you want to delete this review?
      </div>
      <button onClick={handleYes} className="delete-button button-yes">
        Yes (Delete Review)
      </button>
      <button onClick={closeModal} className="delete-button button-no">
        No (Keep Review)
      </button>
    </div>
  );
}
