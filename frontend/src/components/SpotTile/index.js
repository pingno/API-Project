import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import './SpotTile.css'

export default function SpotTile({ spot }) {
  
  const history = useHistory();

  const handleClick = () => {
    history.push(`/spots/${spot.id}`);
  };
  
  return (
    <>
      {/* <li key={spot.id}> */}
  
        <div className="spot-container"  key={spot.id} onClick={handleClick} title={spot.name}>
          <img
            className="spot-image"
            // src={`${spot.previewImage}`}
            src={spot.previewImage}
            alt={spot.name}
          />

          <div className="first-row">
            <div>{spot.city}, {spot.state}</div>
            
            <div className="spot-review">
              <i className="fa-solid fa-star"></i>
              {spot.avgRating ? spot.avgRating.toFixed(1) : <p>New</p>}
            
            </div>
          </div>

          <div className="second-row spot-pricing">
            <label>${spot.price} night</label>
          </div>
        </div>

      {/* </li> */}
    </>
  );
}
