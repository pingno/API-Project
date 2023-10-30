import "./DeleteSpotModal.css";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteTheSpot, getAllSpots } from "../../store/spots";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function DeleteSpotModal({ spotId }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();

  // console.log("SPOT ID", spotId)

  const handleYes = (e) => {
    e.preventDefault();
    dispatch(deleteTheSpot(spotId))
    .then(closeModal())
  };

  return (
    <div className="delete-spot-container">
      <div className="delete-spot-title">Confirm Delete</div>
      <div className="delete-spot-text">
        Are you sure you want to remove this spot from the listings?
      </div>
      <button onClick={handleYes} className="delete-button button-yes">
        Yes (Delete Spot)
      </button>
      <button onClick={closeModal} className="delete-button button-no">
        No (Keep Spot)
      </button>
    </div>
  );
}
