// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useHistory, NavLink } from "react-router-dom/cjs/react-router-dom.min";


function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={openMenu} className="profile-button">
        <div className="button-content">
        <i className="fa-solid fa-bars" />
        <i className="fas fa-user-circle" />

        </div>
        
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
          
            <li className="loggedin-elements">Hello, {user.firstName}</li>
            <li className="loggedin-elements">{user.email}</li>

          <li>
            <NavLink exact to="/spots/current" className="manage-stuff-elements">
              Manage Spots
            </NavLink>
          </li>
        
        {/* <li>
        <NavLink exact to="/reviews/current" className="manage-stuff-elements">
              Manage Reviews
            </NavLink>

        </li> */}
           
    
            <li>
              <button onClick={logout} id="profile-logout">Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;