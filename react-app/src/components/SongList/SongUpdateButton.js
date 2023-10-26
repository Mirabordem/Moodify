import React, { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import DeleteSongModal from "../DeleteSongModal";
import CreateSong from "../CreateSongModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";



export default function SongUpdateButton({ user, songId }) {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();



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
      <button className="song-update-button" onClick={e => {
        e.stopPropagation()
        setShowMenu(!showMenu);
      }}>
        <i className="fas fa-ellipsis-h"></i>
      </button>
      <div className={ulClassName}>
        {user ? (
          <div className="dropdown1">
            <OpenModalButton

              buttonText={<><span className="menu-icon"><FontAwesomeIcon icon={faEdit} /></span> Edit Song</>}
              modalComponent={<CreateSong formType="edit" songId={songId} />}


            />
            <div className="horizontal-line1"></div>
            <OpenModalButton
              buttonText={<><span className="menu-icon"><FontAwesomeIcon icon={faTrash} /></span> Delete Song</>}
              modalComponent={<DeleteSongModal songId={songId}/>}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
