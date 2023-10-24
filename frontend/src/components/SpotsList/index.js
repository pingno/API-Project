import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import "./SpotsList.css";
import SpotTile from "../SpotTile";



export default function SpotsList() {
  const dispatch = useDispatch();

  const spotsObj = useSelector((state) => state.spots);
  const spots = Object.values(spotsObj);
 

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  if (!spots) return null;

  return (
    <div className="spotlist-container">
      {spots.map((spot) => {
        return <div>
          <SpotTile spot={spot} />
        </div>
      })} 
    </div>

    
  );
}
