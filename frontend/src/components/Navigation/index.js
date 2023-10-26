// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const history = useHistory()

  const redirectHome = (e) => {
    e.preventDefault()

    history.push('/')
  }

  //header
  return (
    <>
      <div id="header-container" >
        <div  id="top-left" onClick={redirectHome}>
        <img src="https://res.cloudinary.com/american-bath-group/image/upload/v1647346547/websites-product-info-and-content/shared/lookups/thumbnails/clarion-air-massage-icon.jpg" className="icon"></img>
        <h1>skybnb</h1>
        </div>

        <nav>
          <ul id="top-right">
            
            {sessionUser && (
              <NavLink exact to="/spots/new" id="new-spot-link">
              Create a New Spot
            </NavLink>
            )}
              
          

            {isLoaded && (
              <li>
                <ProfileButton user={sessionUser} />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navigation;
