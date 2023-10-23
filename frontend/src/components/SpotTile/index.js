import { useHistory } from "react-router-dom";
import './SpotTile.css'

export default function SpotTile({ spot }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/spots/${spot.id}`);
  };

  return (
    <>
      {/* <li key={spot.id}> */}
        <div className="spot-container" onClick={handleClick}>
          <img
            className="spot-image"
            src={`${spot.previewImage}`}
            alt={`${spot.name}`}
          />

          <div className="first-row">
            <div>{spot.city}{spot.state}</div>
            
            <div className="spot-review">
              <i class="fa-solid fa-star"></i>
              {spot.avgRating ? spot.avgRating : <p>N/A</p>}
            </div>
          </div>

          <div className="second-row spot-pricing">
            <div>${spot.price}</div>
          </div>
        </div>
      {/* </li> */}
    </>
  );
}
