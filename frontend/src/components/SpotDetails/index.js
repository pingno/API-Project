import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllSpots, getSpot } from "../../store/spots";
import "./SingleSpot.css";
import Reviews from "../SpotReviews/index";

export default function SpotDetails() {
  //need to get owner of spot information
  //firstName, lastName
  //need to get reviews for spot

  const dispatch = useDispatch();
  const { spotId } = useParams();

  const spotsObj = useSelector((state) => state.spots);
  console.log("SPOTS OBJ", spotsObj);

  const spotsArr = Object.values(spotsObj);
  console.log("SPOTS ARR", spotsArr);

  const theSpot = spotsArr[spotId - 1];
  console.log("THE SPOT ", theSpot);

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  if (!theSpot) return null;

  const handleClick = async (e) => {
    e.preventDefault();
    alert("Feature coming soon!");
  };

  return (
    <>
    <div id="spot-detail-container">
      <h2 id="first-row-details">{theSpot.name}</h2>
      <h4 id="second-row-details">
        {theSpot.city}, {theSpot.state}, {theSpot.country}
      </h4>
      <div id="images-banner">
        <img id="main-image" src={theSpot.previewImage} />
      </div>

      {/* right column images */}
      {/* <img src={theSpot.previewImage} />
      <img src={theSpot.previewImage} />
      <img src={theSpot.previewImage} />
      <img src={theSpot.previewImage} /> */}

      <div id="description-container">

        <div id="description-left-column">
          <p>Hosted by {/* owner firstName, lastName */}</p>
          <div>{theSpot.description}</div>
        </div>
        
        <div id="description-right-column">
          <div id="right-column-row-one">
            <div>${theSpot.price} night</div>

            <div id="star">
              <i class="fa-solid fa-star"></i>
              <div>{theSpot.avgRating}</div>
              {/*numReviews */}
            </div>
          </div>
          <div id="right-column-row-two">
            <button className="reserve-button" onClick={handleClick}>
              Reserve
            </button>
          </div>
        </div>
      </div>

      <div id="review-container"></div>
    </div>


    <div>
      <Reviews theSpot={theSpot}/>
    </div>
    </>
  );
}
