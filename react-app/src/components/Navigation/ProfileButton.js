import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'; // Import the necessary icons



function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

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

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    setShowMenu(false)
    history.push(`/`);
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const hideMenuOnClick = () => setShowMenu(false);

  return (
    <div>
      <button className="profile-button" onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
           <div className="dropdown">
           <p className="text">
             Hello, <strong>{user.username}!</strong>
           </p>
           <p className="email"> {user.email}</p>
           <div className="line"></div>
           <button className="logout-button" onClick={handleLogout}>
             Log Out
           </button>
         </div>
       ) : (
         <div>
          <div className="profile-small-button">
           <OpenModalButton
              buttonText={<><span className="menu-icon"><FontAwesomeIcon icon={faSignInAlt} /></span> Login</>}
              onButtonClick={hideMenuOnClick}
              modalComponent={<LoginFormModal />}
            />
          </div>
          <div className="horizontal-line1"></div>
          <div className="profile-small-button">
            <OpenModalButton
              buttonText={<><span className="menu-icon"><FontAwesomeIcon icon={faUserPlus} /></span> Sign Up</>}
              onButtonClick={hideMenuOnClick}
              modalComponent={<SignupFormModal />}
            />
            </div>
         </div>
       )}
     </div>
   </div>
 );
}


export default ProfileButton;
