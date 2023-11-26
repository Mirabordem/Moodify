import React, { useState, useEffect, useRef } from "react";
import {
  ThunkAddSongToPlaylist,
  ThunkRemoveSongToPlaylist,
} from "../../store/playlists";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
// import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import AlbumDropDown from "./AlbumDropdown";
import PlaylistSongUpdate from "./PlayListSongUpdate";
import LikesSongUpdate from "./LikesSongUpdate"


export default function SongUpdateButton({
  songId,
  pageType,
  playlistId,
  albumOwner,
  isOpen,
  handlePlaylistButtonClick
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [showNestedMenu, setShowNestedMenu] = useState(false);
  const playlists = useSelector((state) => state.playlists);
  const dispatch = useDispatch();
  const ulRef = useRef();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
        setShowNestedMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [user, pageType, setShowMenu, setShowNestedMenu, showMenu, showNestedMenu]);

  const currUserPlaylists = Object.values(playlists).filter((playlist) =>
    user?.userPlaylists.includes(playlist.id)
  );
  const playlistsMap = currUserPlaylists.map((playlist) => {
    return (
      <button
        style={{ cursor: "pointer" }}
        className="start"
        onClick={(e) => {
          e.stopPropagation();
          // console.log("user is:" user)
          if (user) {
            dispatch(ThunkAddSongToPlaylist(playlist.id, songId));
            setShowNestedMenu(false);
          }
        }}
      >
        {
          <>
            <span className="menu-icon"></span> {playlist.name}
          </>
        }
      </button>
    );
  });

  const ulClassName = "song-update-dropdown1" + (showMenu ? "" : " hidden");

  const nestedUlClassName =
    "song-update-dropdown2" + (showNestedMenu ? "" : " hidden");

  return (
    <div className="song-update-dropdown1" ref={ulRef}>
      <button
        style={{ background: "transparent", color: "#000" }}
        className="song-update-button"
        onClick={(e) => {
          e.stopPropagation();
          handlePlaylistButtonClick()
          setShowMenu(true);
          // setShowMenu(!showMenu);
        }}
      >
        <i className="fas fa-ellipsis-h"></i>
      </button>
      {isOpen && user && showMenu && (
      <div className={ulClassName}>
        <div className="dropdown1a">
          {pageType === 'album' && <AlbumDropDown songId={songId} albumOwner={albumOwner} setShowMenu={setShowMenu} showMenu={showMenu}/>}
          {pageType === 'playlist' && <PlaylistSongUpdate songId={songId} playlistsMap={playlistsMap} setShowMenu={setShowMenu} showMenu={showMenu}/>}
          {pageType === 'likes' && <LikesSongUpdate songId={songId} setShowMenu={setShowMenu} showMenu={showMenu}/>}
        </div>
      </div>
      )}
    </div>
  );
}
