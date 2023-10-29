import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateSpot, getSpot } from "../../store/spots";
import "./UpdateForm.css";

export default function UpdateSpot() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots[spotId]);

  console.log("SPOT TO EDIT", spot);

  const [country, setCountry] = useState(spot ? spot.country : "");
  const [address, setAddress] = useState(spot ? spot.address : "");
  const [city, setCity] = useState(spot ? spot.city : "");
  const [state, setState] = useState(spot ? spot.state : "");
  const [latitude, setLatitude] = useState(spot ? spot.lat : "");
  const [longitude, setLongitude] = useState(spot ? spot.lng : "");
  const [description, setDescription] = useState(spot ? spot.description : "");
  const [name, setName] = useState(spot ? spot.name : "");
  const [price, setPrice] = useState(spot ? spot.price : "");

  const [errors, setErrors] = useState({});
  const [submitted, yesSubmitted] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorList = {};

    if (!address) errorList.address = "Street address is required";
    if (!city) errorList.city = "City is required";
    if (!state) errorList.state = "State is required";
    if (!country) errorList.country = "Country is required";
    if (isNaN(latitude) || latitude < -90 || latitude > 90)
      errorList.lat = "Latitude is not valid";
    if (isNaN(longitude) || longitude < -180 || longitude > 180)
      errorList.lng = "Longitude is not valid";
    if (!name || name.length > 50 || name.length < 0)
      errorList.name = "Name must be less than 50 characters";
    if (!description) errorList.description = "Description is required";
    if (description.length < 30)
      errorList.description = "Description must be atleast 30 characters";
    if (!price || price < 1) errorList.price = "Price per day is required";

    if (Object.values(errorList).length > 0) {
      setErrors(errorList);
      return;
    }

    const newSpot = {
      ownerId: user.id,
      country,
      address,
      city,
      state,
      description,
      name,
      price,
    };

    if (latitude) newSpot.lat = latitude;
    if (longitude) newSpot.lng = longitude;

    let data = await dispatch(updateSpot(newSpot, spotId));

    // console.log("DATA", data)

    if (!data.errors) {
      history.push(`/spots/${data.id}`);
      yesSubmitted(true);
      reset();
    }
  };

  const reset = () => {
    setCountry("");
    setAddress("");
    setCity("");
    setState("");
    setLatitude("");
    setLongitude("");
    setDescription("");
    setName("");
    setPrice("");
  };

  useEffect(() => {
    yesSubmitted(false);
    setErrors({});
    dispatch(getSpot(spotId));
  }, [dispatch, submitted]);

  useEffect(() => {
    if(spot){
        setCountry(spot.country)
        setAddress(spot.address)
        setCity(spot.city)
        setState(spot.state)
        setLatitude(spot.lat)
        setLongitude(spot.lng)
        setDescription(spot.description)
        setName(spot.name)
        setPrice(spot.price)
    }
  }, [spot])


  if (spot === undefined) return null;

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="update-form-field">
        <h1>Update your Spot</h1>

        <p className="section-title">Where's your place located?</p>
        <p className="section-description">
          Guests will only get your exact address once they booked a reservation
        </p>
        <div>
          <label className="label">Country</label>
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="input1"
          />
          {errors.country && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.country}</p>
          )}
        </div>
        <div>
          <label className="label">Street Address</label>
          <input
            type="text"
            placeholder="Street Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="input1"
          />
          {errors.address && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.address}</p>
          )}
        </div>


        <div className="city-state">
          <div style={{ display: "flex" }}>

            <div style={{ width: "100%" }} >
              <label className="label">City</label>
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="input1"
              />
            </div>

            <div className='comma'> , </div>

            <div>
              <label className="label">State</label>
              <input
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                className="input1"
              />
            </div>

          </div>

          {errors.city && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.city}</p>
          )}
          {errors.state && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.state}</p>
          )}
        </div>



        <div style={{ display: "flex" }} className="lat-lng">

          <div style={{ width: "100%" }}>
            <label className="label">Latitude</label>
            <input
              type="text"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="input2"
            />
          </div>

          <div className='comma'> , </div>

          <div>
            <label className="label">Longitude</label>
            <input
              type="text"
              placeholder="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="input2"
            />
          </div>

        </div>

        <div style={{ display: "flex", gap: "5px" }}>
          {errors.lat && (
            <p style={{ fontSize: "10px", color: "red" }}>{errors.lat}</p>
          )}
          {errors.lng && (
            <p style={{ fontSize: "10px", color: "red" }}>{errors.lng}</p>
          )}
        </div>

        <div className="section-gap" />
        <p className="section-title">Describe your place to guests</p>
        <p className="section-description">
          Mention the best features of your place, any special amentities like
          fast wifi or parking, and what you love about the neighborhood
        </p>
        <input
          type="textarea"
          placeholder="Please write at least 30 characters"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="input-textarea"
          required
          className="input1"
        />
        {errors.description && (
          <p style={{ fontSize: "10px", color: "red" }}>
            *{errors.description}
          </p>
        )}
        <div className="section-gap" />
        <p className="section-title">Create a title for your spot</p>
        <p className="section-description">
          Catch guests' attention with a spot title that highlights what makes
          your place special
        </p>

        <input
          type="text"
          placeholder="Name of your spot"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input1"
        />
        {errors.name && (
          <p style={{ fontSize: "10px", color: "red" }}>*{errors.name}</p>
        )}

        <div className="section-gap" />
        <p className="section-title">Set a base price for your spot</p>
        <p className="section-description">
          Competitive pricing can help your listing stand out and rank higher in
          search results
        </p>

        {errors.price && (
          <p style={{ fontSize: "10px", color: "red" }}>*{errors.price}</p>
        )}
        <div style={{ display: "flex", gap: "5px" }}>
          <div> $ </div>
          <input
            type="number"
            placeholder="Price per night (USD)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="input1"
          />
        </div>

        <div className="section-gap" />


        <div className="update-form-button">
          <button type="submit">Update your Spot</button>
        </div>
      </form>
    </div>
  );
}
