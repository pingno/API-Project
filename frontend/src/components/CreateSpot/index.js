import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createASpot } from "../../store/spots";
import "./CreateForm.css";

export default function CreateSpot() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [previewImageURL, setPreviewImageURL] = useState("");
  const [imageURL1, setImageURL1] = useState("");
  const [imageURL2, setImageURL2] = useState("");
  const [imageURL3, setImageURL3] = useState("");
  const [imageURL4, setImageURL4] = useState("");
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
    if (!previewImageURL) errorList.url = "Preview image required";

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

    let spotImages = [previewImageURL];

    if (imageURL1) spotImages.push(imageURL1);
    if (imageURL2) spotImages.push(imageURL2);
    if (imageURL3) spotImages.push(imageURL3);
    if (imageURL4) spotImages.push(imageURL4);

    const response = await dispatch(createASpot(newSpot, spotImages));

    if (!response.errors) {
      history.push(`/spots/${response}`);
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
    setPreviewImageURL("");
    setImageURL1("");
    setImageURL2("");
    setImageURL3("");
    setImageURL4("");
  };

  useEffect(() => {
    yesSubmitted(false);

    setErrors({});
  }, [submitted]);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="create-form-field">
        <h1>Create a new Spot</h1>

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
            className="input1"
          />
          {errors.address && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.address}</p>
          )}
        </div>


        <div className="city-state">
          <div style={{ display: "flex" }}>

            <div style={{ width: "100%" }}>
              <label className="label">City</label>
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
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
                className="input1"
              />
            </div>

          </div>

          {errors.city && (
            <span style={{ fontSize: "10px", color: "red", paddingRight: "5px" }}>*{errors.city}</span>
          )}
          {errors.state && (
            <span style={{ fontSize: "10px", color: "red" }}>*{errors.state}</span>
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
            className="input1"
          />
        </div>

        <div className="section-gap" />
        <p className="section-title">Liven up your spot with photos</p>
        <p className="section-description">
          Submit a link to at least one photo to publish your spot
        </p>

        <input
          type="url"
          placeholder="Preview Image URL"
          value={previewImageURL}
          onChange={(e) => setPreviewImageURL(e.target.value)}
          className="image-input input1"
        />
        {errors.url && (
          <p style={{ fontSize: "10px", color: "red" }}>*{errors.url}</p>
     
        )}

        <input
          type="url"
          placeholder="Image URL"
          value={imageURL1}
          onChange={(e) => setImageURL1(e.target.value)}
          className="image-input input1 "
        />
        <input
          type="url"
          placeholder="Image URL"
          value={imageURL2}
          onChange={(e) => setImageURL2(e.target.value)}
          className="image-input input1"
        />
        <input
          type="url"
          placeholder="Image URL"
          value={imageURL3}
          onChange={(e) => setImageURL3(e.target.value)}
          className="image-input input1"
        />
        <input
          type="url"
          placeholder="Image URL"
          value={imageURL4}
          onChange={(e) => setImageURL4(e.target.value)}
          className="image-input input1"
        />
<div className="section-gap" />
        <div className="create-form-button">
          <button type="submit">Create Spot</button>
        </div>
      </form>
    </div>
  );
}
