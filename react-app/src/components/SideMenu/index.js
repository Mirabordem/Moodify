import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, NavLink, useParams } from "react-router-dom";
import NewPlaylist from "../NewPlaylist";
import OpenModalButton from "../OpenModalButton/index";

import "./SideMenu.css";

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {


  }, [sessionUser]);

  return (
    <div className={`side-menu ${isOpen ? "open" : ""}`}>
      <div className="logo-container">
        <NavLink exact to="/">
          <img
            className="Moodify-logo"
            alt=""
            src="https://image.jimcdn.com/app/cms/image/transf/none/path/sd0536822daf447dd/image/ic66b618ce0da0dd7/version/1697907185/image.jpg"
          />
        </NavLink>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        Your Library
      </button>
      <ul className="ul-container">
        <li>
          <NavLink to="/playlists">
          <i className="fas fa-list"></i> My Playlists
          </NavLink>
          {sessionUser?.id && (
          <OpenModalButton
          className="new-album-playlist"
          buttonText="+"
          modalComponent={<NewPlaylist formType="Create" userId={sessionUser.id} />}
        />) }

        </li>
        <li>
          <NavLink to="/albums">
          <i className="fas fa-music"></i>
          My Albums
          </NavLink>


        </li>
      </ul>
    </div>
  );
}
