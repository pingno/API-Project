import { csrfFetch } from "./csrf";

const GET_SPOT = "spots/GET_SPOT";
const GET_ALL_SPOTS = "spots/GET_ALL_SPOTS";
const ADD_SPOT = "spots/ADD_SPOT";
const DELETE_SPOT = "spots/REMOVE_SPOT"
const USER_SPOTS = "spots/USER_SPOTS"

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

const removeSpot = (spotId) => ({
  type: DELETE_SPOT,
  spotId
})


//DELETE SPOT THUNK
export const deleteTheSpot = (spotId) => async (dispatch) => {

  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE"
  })

  if(res.ok) {
    const data = await res.json()
   await dispatch(removeSpot(spotId))
   await dispatch(getAllSpots())
    return data;
  }
}

//USERS SPOTS
export const getMySpots = () => async(dispatch) => {
  const res = await csrfFetch(`/api/spots/current`)

  if(res.ok) {
    const data = await res.json()
    dispatch(getSpots(data))
    return data;
  }
}


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

  if (response.ok) {
    const spots = await response.json();
    dispatch(getSpots(spots));
    return spots;
  }
};


export const createASpot = (spot, spotImages) => async (dispatch) => {

  const res = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify({
      ...spot,
    }),
  });
  const newSpot = await res.json();

  await csrfFetch(`/api/spots/${newSpot.id}/images`, {
    method: "POST",
    body: JSON.stringify({
      url: spotImages[0],
      preview: true,
    }),
  });


  if (spotImages.length > 1) {
    await Promise.all(
      spotImages.splice(1).map(async (url) => {
        await csrfFetch(`/api/spots/${newSpot.id}/images`, {
          method: "POST",
          body: JSON.stringify({
            url,
            preview: false,
          }),
        });
      })
    )
  }

  await dispatch(createSpot(newSpot));
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
      newState = { ...state, [action.spot.id]: action.spot }; //check
      return newState
    //Create A Spot
    case ADD_SPOT:
      newState = { ...state, [action.spot.id]: action.spot };
      return newState;
    //Delete Spot
    case DELETE_SPOT:
      newState = {...state}
      delete newState[action.spotId]
      return newState

    default:
      return state;
  }
};

export default spotsReducer;
