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
    <div className="album-update-dropdown13" ref={ulRef}>
      <button
        style={{ background: "transparent", border: "none", color: "#000" }}
        onClick={(e) => {
          e.stopPropagation();
          setShowMenu(!showMenu);
        }}
      >
        <div className="album-dots-container1">
          <span className="album-big-dots2">...</span>
        </div>
      </button>
      <div className={ulClassName}>
        {user ? (
          <div className="dropdown2">
            <OpenModalButton
              buttonText={
                <>
                  <span className="menu-icon">
                    <FontAwesomeIcon icon={faTrash} />
                  </span>{" "}
                  Delete Playlist
                </>
              }
              modalComponent={<DeletePlaylistModal playlistId={playlistId} />}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
