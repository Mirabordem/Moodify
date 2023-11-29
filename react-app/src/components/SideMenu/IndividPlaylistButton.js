import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import DeletePlaylistModal from "../DeletePlaylistModal";
import NewPlaylist from "../NewPlaylist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function PlaylistUpdateButton({ playlistId, isOpen, handlePlaylistButtonClick }) {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const user = useSelector((state) => state.session.user);


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
  const hideMenuOnClick = () => setShowMenu(false)

  return (
    <div className="album-update-dropdown13" ref={ulRef}>
      <button
        style={{ background: "transparent", border: "none", color: "#000" }}
        onClick={(e) => {
          e.stopPropagation();
          handlePlaylistButtonClick()
          setShowMenu(true);
        }}
      >
        <div className="album-dots-container1">
          <span className="album-big-dots2">...</span>
        </div>
      </button>
      {isOpen && user && showMenu && (
        <div className={ulClassName}>


          <div className="dropdown8">

            <OpenModalButton
              onButtonClick={hideMenuOnClick}
              buttonText={
                <>
                  <span className="menu-icon">
                    <FontAwesomeIcon icon={faEdit}/>
                  </span>{" "}
                  Update Playlist
                </>
              }
              modalComponent={<NewPlaylist formType="Edit" playlistId={playlistId} />}
              onItemClick={() => setShowMenu(false)}
            />
            <OpenModalButton
              onButtonClick={hideMenuOnClick}
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
        </div>
      )}
    </div>
  );
}
