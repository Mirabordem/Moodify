import React, { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import DeleteAlbumModal from "../DeleteAlbumModal";
import NewAlbum from "../NewAlbum";
import CreateSong from "../CreateSongModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";


export default function AlbumUpdateButton({ user, albumId }) {
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
          <span className="album-big-dots">...</span>
          </div>
        </button>
        <div className={ulClassName}>
          {user ? (
            <div className="dropdown5">
              <OpenModalButton
                className="new-album"
                buttonText={<><span className="menu-icon"><FontAwesomeIcon icon={faEdit} /></span> Edit Album</>}
                modalComponent={<NewAlbum formType="Edit" albumId={albumId} />}
              />
              <div className="horizontal-line2"></div>
              <OpenModalButton
                buttonText={<><span className="menu-icon"><FontAwesomeIcon icon={faPlus} /></span> Add Song</>}
                modalComponent={<CreateSong albumId={albumId} />}
              />
              <div className="horizontal-line2"></div>
              <OpenModalButton
                buttonText={<><span className="menu-icon"><FontAwesomeIcon icon={faTrash} /></span> Delete Album</>}
                modalComponent={<DeleteAlbumModal albumId={albumId} />}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
