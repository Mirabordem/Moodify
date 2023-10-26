import React, { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import DeletePlaylistModal from "../DeletePlaylistModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";



export default function PlaylistUpdateButton({ user, playlistId }) {
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

    const ulClassName = "album-update-dropdown" + (showMenu ? "" : " hidden");

    return (
      <div className="album-update-dropdown1" ref={ulRef}>
        <button style={{ background: 'transparent', border: 'none', color: '#000' }} onClick={(e) => {
          e.stopPropagation();
          setShowMenu(!showMenu);
        }}>
            <div className="album-dots-container">
          <span className="album-big-dots1">...</span>
          </div>
        </button>
        <div className={ulClassName}>
          {user ? (
            <div className="dropdown2">
              <OpenModalButton
                buttonText={<><span className="menu-icon"><FontAwesomeIcon icon={faTrash} /></span> Delete Album</>}
                modalComponent={<DeletePlaylistModal playlistId={playlistId} />}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
