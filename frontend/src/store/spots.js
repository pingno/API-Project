import { csrfFetch } from "./csrf"

const GET_SPOT = 'spots/GET_SPOT'
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS'
const ADD_SPOT = 'spots/ADD_SPOT'
const EDIT_SPOT = 'spots/EDIT_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'


const getTheSpot = (spot) => ({
    type: GET_SPOT,
    spot
})

const getSpots = (spots) => ({
    type: GET_ALL_SPOTS,
    spots
})

const createSpot = (spot) => ({
    type: ADD_SPOT,
    spot
})



//Get Spot by Id
export const getSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    if(response.ok) {
        const spot = await response.json();
        dispatch(getTheSpot(spot))
        return spot
    }
}


//Get All Spots
export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`)
    console.log(" RESPONSE ", response)

    if(response.ok) {
        const spots = await response.json();
        dispatch(getSpots(spots))
        return spots
    }
}

//Create a new spot
export const createASpot = (payload) => async (dispatch) => {

    console.log( "PAYLOAD ", payload)
    const response = await csrfFetch(`/api/spots`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    if(response.ok) {
        const spot = await response.json()
        dispatch(createSpot(spot))
        return spot
    } else {
        const errors = await response.json();
        return errors;
    }
}

let newState;

const spotsReducer = (state = {}, action) => {
    switch(action.type) {

        //All Spots
        case GET_ALL_SPOTS:
        const allSpots = {}
        action.spots.Spots.forEach(spot => {
            allSpots[spot.id] = spot
        })
        return allSpots

        //Get A Spot
        case GET_SPOT:
            {
                return {...state, [action.spot.id]: {...action.spot}} //check
            }
        

        //Create A Spot
        case ADD_SPOT:
            newState = {...state, [action.spot.id]: action.spot}
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
}

export default spotsReducer;