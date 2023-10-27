import { useSelector, useDispatch } from "react-redux";
import SpotTile from "../SpotTile";
import "./ManageSpots.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "../DeleteSpotModal";
import { useEffect } from "react";
import { getMySpots } from "../../store/spots";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function ManageSpotsList() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const mySpots = Object.values(useSelector((state) => state.spots));

  // useEffect(() => {
  //   dispatch(getMySpots())
  // }, [dispatch])

  if (!mySpots.length) return null;

  const newSpots = mySpots.filter((spots) => spots.ownerId === sessionUser.id);

  console.log("SPOTS FILTERED", newSpots);

  return (
    <div className="manage-spots-container">
      <div className="manage-spots-title">Manage Spots</div>

      <div className="cap">
        <NavLink exact to="/spots/new" id="create-spot-button">
          Create a New Spot
        </NavLink>
      </div>

      {newSpots.length > 0 && (
        <div className="spotlist-container">
          {newSpots.map((spot) => {
            return (
              <div key={spot.id}>
                <SpotTile spot={spot} />

                <NavLink exact to={`/spots/${spot.id}/edit`} id="update-delete-button"  >
                  Update
                </NavLink>

                <OpenModalButton
                  buttonText={"Delete"}
                  modalComponent={
                    <DeleteSpotModal
                      spotId={spot.id}
                      id="update-delete-button"
                    />
                  }
                />
              </div>
            );
          })}
          <div className="bottom-buttons-row">
            {/* <OpenModalButton
          buttonText={"Update"}
          modalComponent={<PostReviewModal theSpot={spot}/>}
        /> */}
          </div>
        </div>
      )}
    </div>
  );
}
