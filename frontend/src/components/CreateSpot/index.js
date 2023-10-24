import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createASpot } from "../../store/spots";
import "./CreateForm.css";

export default function CreateSpot() {
  const dispatch = useDispatch();
  const history = useHistory();

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

  const [errorMessages, setErrorMessages] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSpot = {
      country,
      address,
      city,
      state,
      description,
      name,
      price,
    };

    const theSpot = await dispatchEvent(createASpot(newSpot));


    if (latitude) newSpot.latitude = latitude;
    if (longitude) newSpot.longitude = longitude;

    // if (previewImageURL) newSpot.previewImage = previewImageURL;

    // const newSpotImage = await SpotImage.create({ url, preview: true })
    // await newSpot.addSpotImage(newSpotImage)

    // if(imageURL1)
    // if(imageURL2)
    // if(imageURL3)
    // if(imageURL4)

    

    if (newSpot.errors) {
    }

    if (newSpot) {
      setErrorMessages({});
      history.push(`/spots/${newSpot.id}`);
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
  };

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
            onChange={setCountry}
            required
          />
          {/* {errors.country && <p>{errors.country}</p>} */}
        </div>
        <div>
          <label className="label">Street Address</label>
          <input
            type="text"
            placeholder="Street Address"
            onChange={setAddress}
            required
          />
        </div>
        <div>
          <label className="label">City</label>
          <input type="text" placeholder="City" onChange={setCity} required />
          <label className="label">State</label>
          <input type="text" placeholder="State" onChange={setState} required />
        </div>

        <div>
          <label className="label">Latitude</label>
          <input type="text" placeholder="Latitude" onChange={setLatitude} />
          <label className="label">Longitude</label>
          <input type="text" placeholder="Longitude" onChange={setLongitude} />
        </div>
        <div className="section-gap"/>
        <p className="section-title">Describe your place to guests</p>
        <p className="section-description">
          Mention the best features of your place, any special amentities like
          fast wifi or parking, and what you love about the neighborhood
        </p>
        <input
          type="text"
          placeholder="Description"
          onChange={setDescription}
          required
        />
        <div className="section-gap"/>
        <p className="section-title">Create a title for your spot</p>
        <p className="section-description">
          Catch guests' attention with a spot title that highlights what makes
          your place special
        </p>

        <input
          type="text"
          placeholder="Name of your spot"
          onChange={setName}
          required
        />
        <div className="section-gap"/>
        <p className="section-title">Set a base price for your spot</p>
        <p className="section-description">
          Competitive pricing can help your listing stand out and rank higher in
          search results
        </p>
        <input
          type="number"
          placeholder="Price per night (USD)"
          onChange={setPrice}
          required
        />
        <div className="section-gap"/>
        <p className="section-title">Liven up your spot with photos</p>
        <p className="section-description">
          Submit a link to at least one photo to publish your spot
        </p>

        <input
          type="url"
          placeholder="Preview Image URL"
          onChange={setPreviewImageURL}
          className="image-input"
        />

        <input type="url" placeholder="Image URL" onChange={setImageURL1} className="image-input"/>
        <input type="url" placeholder="Image URL" onChange={setImageURL2} className="image-input"/>
        <input type="url" placeholder="Image URL" onChange={setImageURL3} className="image-input"/>
        <input type="url" placeholder="Image URL" onChange={setImageURL4} className="image-input"/>

        <div className="create-form-button">
          <button type="submit">Create Spot</button>
        </div>
      </form>
    </div>
  );
}
