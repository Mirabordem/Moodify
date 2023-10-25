import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import DeleteSongModal from "../DeleteSongModal";
import EditSongModal from "../EditSongModal";

export default function SongUpdateButton({ user }) {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, []);

  const ulClassName = "song-update-dropdown1" + (showMenu ? "" : " hidden");

  return (
    <div className="song-update-dropdown1" ref={ulRef}>
      <button className="song-update-button" onClick={openMenu}>
        <i className="fas fa-ellipsis-h"></i>
      </button>
      <div className={ulClassName}>
        {user ? (
          <div className="dropdown1">
            <OpenModalButton
              buttonText="Edit Song"
              modalComponent={<EditSongModal />}
            />
            <OpenModalButton
              buttonText="Delete Song"
              modalComponent={<DeleteSongModal />}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
