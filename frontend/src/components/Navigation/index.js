// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  //header
  return (
    <>
      <div id="header-container">
        <div  id="top-left" >
        <img src="https://cdn3.iconfinder.com/data/icons/chinese-new-year-3/500/chinese-festival-traditional_14-512.png" className="icon"></img>
        <h1>skybnb</h1>
        </div>

        <nav>
          <ul id="top-right">
            
            {/* <li>
              <NavLink exact to="/">
                Home
              </NavLink>
            </li> */}

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
