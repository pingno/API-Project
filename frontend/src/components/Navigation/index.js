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
      <div id="header-container" >
        <div  id="top-left" >
        <img src="https://i.pinimg.com/736x/f0/e7/d4/f0e7d47ed7a68b24e04885286211c0e9--water-symbol-water-tribe.jpg" className="icon"></img>
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
