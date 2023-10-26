import { csrfFetch } from "./csrf";

const GET_SPOT = "spots/GET_SPOT";
const GET_ALL_SPOTS = "spots/GET_ALL_SPOTS";
const ADD_SPOT = "spots/ADD_SPOT";


const getTheSpot = (spot) => ({
  type: GET_SPOT,
  spot,
});

const getSpots = (spots) => ({
  type: GET_ALL_SPOTS,
  spots,
});

const createSpot = (spot) => ({
  type: ADD_SPOT,
  spot,
});



//Get Spot by Id
export const getSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spot = await response.json();
    dispatch(getTheSpot(spot));
    return spot;
  }
};

//Get All Spots
export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`);
  console.log(" RESPONSE ", response);

  if (response.ok) {
    const spots = await response.json();
    dispatch(getSpots(spots));
    return spots;
  }
};


export const createASpot = (spot, spotImages) => async (dispatch) => {

  // console.log(" INCOMING SPOT IMAGES ", spotImages);

  const res = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify({
      ...spot,
    }),
  });
  const newSpot = await res.json();

  // console.log("NEW SPOT", newSpot)

  await csrfFetch(`/api/spots/${newSpot.id}/images`, {
    method: "POST",
    body: JSON.stringify({
      url: spotImages[0],
      preview: true,
    }),
  });

  // console.log("IMAGE 0", spotImages[0])
  // console.log("IMAGE 1", spotImages[1])
  // console.log("TEST 1", await test1.json());

  if (spotImages.length > 1) {
    spotImages.splice(1).map(async (url) => {
      await csrfFetch(`/api/spots/${newSpot.id}/images`, {
        method: "POST",
        body: JSON.stringify({
          url,
          preview: true,
        }),
      });
    });
  }

  dispatch(createSpot(newSpot));
  return newSpot.id;
};

let newState;

const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    //All Spots
    case GET_ALL_SPOTS:
      newState = {};
      action.spots.Spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;

    //Get A Spot
    case GET_SPOT:
      return { ...state, [action.spot.id]: { ...action.spot } }; //check
    //Create A Spot
    case ADD_SPOT:
      newState = { ...state, [action.spot.id]: action.spot };
      return newState;


    //Edit A Spot
    // case EDIT_SPOT:

    //     return {...state}
    //delete a spot
    // case DELETE_SPOT:
    //     const newState = { ...state }
    //     delete newState[action.spotId]
    //     return newState
    default:
      return state;
  }
};

export default spotsReducer;
