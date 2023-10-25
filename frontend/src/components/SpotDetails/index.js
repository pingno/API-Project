import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpot } from "../../store/spots";
import "./SingleSpot.css";
import Reviews from "../ReviewsList";


export default function SpotDetails() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const theSpot = useSelector((state) => state.spots[spotId]);
  console.log("A SPOT", theSpot);

  useEffect(() => {
    dispatch(getSpot(spotId));
  }, [dispatch]);


  if (!theSpot?.Owner && !theSpot?.numReviews) return null;

  const handleClick = async (e) => {
    e.preventDefault();
    alert("Feature coming soon!");
  };



  let oneReview;
  let moreReviews;
  if (theSpot.numReviews == 1) oneReview = theSpot.numReviews;
  if (theSpot.numReviews > 1) moreReviews = theSpot.numReviews;

 

  return (
    <>
      <div id="spot-detail-container">
        <h2 id="first-row-details">{theSpot.name}</h2>
        <h4 id="second-row-details">
          {theSpot.city}, {theSpot.state}, {theSpot.country}
        </h4>
        <div id="images-banner">
          {theSpot.SpotImages.length > 0 && <img id="main-image" src={theSpot.SpotImages[0].url}/> }
        </div>

        {/* right column images */}
        {/* <img src={theSpot.previewImage} />
      <img src={theSpot.previewImage} />
      <img src={theSpot.previewImage} />
      <img src={theSpot.previewImage} /> */}

        <div id="description-container">
          <div id="description-left-column">
            {/* <p>Hosted by {theSpot.Owner.firstName} {theSpot.Owner.lastName}</p> */}
            <div>{theSpot.description}</div>
          </div>

          <div id="description-right-column">
            <div id="right-column-row-one">
              <div>${theSpot.price} night</div>

              <div id="star">
                <i className="fa-solid fa-star"></i>
                <div id="avg-rating">{theSpot.avgRating}</div>
                {oneReview && <div> · {oneReview} Review</div>}
                {moreReviews && <div> · {moreReviews} Reviews</div>}
              </div>
            </div>
            <div id="right-column-row-two">
              <button className="reserve-button" onClick={handleClick}>
                Reserve
              </button>
            </div>
          </div>
        </div>
      </div>

      
      <div>
        <Reviews theSpot={theSpot} />
      </div>
    </>
  );
}
