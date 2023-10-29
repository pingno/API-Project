import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpot } from "../../store/spots";
import "./SingleSpot.css";
import Reviews from "../ReviewsList";
import { useState } from "react";
import { getReviewsforSpot } from "../../store/reviews";

export default function SpotDetails() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);

  const theSpot = useSelector((state) => state.spots[spotId]);
  const reviews = Object.values(useSelector((state) => state.reviews));

  let spotRating;
  if (reviews.length) {
    spotRating =
      reviews.reduce((acc, curr) => acc + curr.stars, 0) / reviews.length;
  }

  console.log("THE SPOT", theSpot);

  useEffect(() => {
    dispatch(getSpot(spotId));
  }, [dispatch]);

  if (!theSpot?.Owner && !theSpot?.numReviews) return null;
  if (!theSpot?.SpotImages) return null;

  const handleClick = async (e) => {
    e.preventDefault();
    alert("Feature coming soon!");
  };

  return (
    <> <div className="spot-page">

    
      <div id="spot-detail-container">
        <h2 id="first-row-details">{theSpot.name}</h2>
        <h4 id="second-row-details">
          {theSpot.city}, {theSpot.state}, {theSpot.country}
        </h4>

        <div id="images-container">
          {theSpot && <img className="img0" src={theSpot.SpotImages[0].url} />}

          {theSpot.SpotImages[1] && (
            <img className="img1" src={theSpot.SpotImages[1].url} />
          )}
          {theSpot.SpotImages[2] && (
            <img className="img2" src={theSpot.SpotImages[2].url} />
          )}
          {theSpot.SpotImages[3] && (
            <img className="img3" src={theSpot.SpotImages[3].url} />
          )}
          {theSpot.SpotImages[4] && (
            <img className="img4" src={theSpot.SpotImages[4].url} />
          )}
        </div>

        <div id="description-container">
          <div id="description-left-column">
            <p className="hosted-by">
              Hosted by {theSpot.Owner.firstName} {theSpot.Owner.lastName}
            </p>
            <div className="description">{theSpot.description}</div>
          </div>

          <div id="description-right-column">
            <div id="right-column-row-one">

              <div style={{display: "flex", gap: "2px"}}>
                <div className="price"> ${theSpot.price} </div>
                <div>night</div>
              </div>

              {reviews.length ? (
                <p className="starfield">
                  <i className="fa-solid fa-star"></i>
                  {spotRating.toFixed(1)} · {reviews.length}{" "}
                  {reviews.length === 1 ? "review" : "reviews"}
                </p>
              ) : (
                <div>
                  <i className="fa-solid fa-star"></i>New
                </div>
              )}
            </div>
            <div id="right-column-row-two">
              <button className="reserve-button" onClick={handleClick}>
                Reserve
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Reviews theSpot={theSpot} />
      
    </>
  );
}
