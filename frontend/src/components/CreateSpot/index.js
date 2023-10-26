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

  const handleSubmit = (e) => {
    e.preventDefault();

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


     dispatch(createASpot(newSpot, spotImages))
      .then((newSpotId) => {
        history.push(`/spots/${newSpotId}`);
      });

    yesSubmitted(true)

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
    reset();
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
            required
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
          />
          {errors.address && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.address}</p>
          )}
        </div>
        <div>
          <label className="label">City</label>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          {errors.city && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.city}</p>
          )}
          <label className="label">State</label>
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
          {errors.state && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.state}</p>
          )}
        </div>

        <div>
          <label className="label">Latitude</label>
          <input
            type="text"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
          {errors.lat && (
            <p style={{ fontSize: "10px", color: "red" }}>{errors.lat}</p>
          )}
          <label className="label">Longitude</label>
          <input
            type="text"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
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
        <input
          type="number"
          placeholder="Price per night (USD)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
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
          className="image-input"
        />
        {errors.url && (
          <p style={{ fontSize: "10px", color: "red" }}>*{errors.url}</p>
        )}

        <input
          type="url"
          placeholder="Image URL"
          value={imageURL1}
          onChange={(e) => setImageURL1(e.target.value)}
          className="image-input"
        />
        <input
          type="url"
          placeholder="Image URL"
          value={imageURL2}
          onChange={(e) => setImageURL2(e.target.value)}
          className="image-input"
        />
        <input
          type="url"
          placeholder="Image URL"
          value={imageURL3}
          onChange={(e) => setImageURL3(e.target.value)}
          className="image-input"
        />
        <input
          type="url"
          placeholder="Image URL"
          value={imageURL4}
          onChange={(e) => setImageURL4(e.target.value)}
          className="image-input"
        />

        <div className="create-form-button">
          <button type="submit">Create Spot</button>
        </div>
      </form>
    </div>
  );
}
