import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { ThunkAddSongToPlaylist } from "../../store/playlists";
import AddSongPlaylistModal from "../AddSongPlaylistModal";
import NewPlaylist from "../NewPlaylist";

export default function LikesSongUpdate({ songId, showMenu, setShowMenu }) {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.playlists);
  // const [showMenu, setShowMenu] = useState(false);
  const [showNestedMenu, setShowNestedMenu] = useState(false);
  const ulRef = useRef();

  useEffect(() => {
    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
        setShowNestedMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [setShowMenu, setShowNestedMenu, showMenu, showNestedMenu]);

  const nestedDropDown =
    "song-update-dropdown2" + (showNestedMenu ? "" : " hidden");

  const hideMenuOnClick = () => setShowMenu(false)

  let addSongPlaylist = (
    <OpenModalButton
      onButtonClick={hideMenuOnClick}
      buttonText={
        <>
          <span className="menu-icon1">
            <FontAwesomeIcon icon={faPlus} />
          </span>{" "}
          Add Song to Playlist
        </>
      }
      modalComponent={<AddSongPlaylistModal songId={songId} />}
    />
  );

  const currUserPlaylists = Object.values(playlists).filter((playlist) =>
    user?.userPlaylists.includes(playlist.id)
  );

  if (!currUserPlaylists.length) {
    addSongPlaylist = (
      <OpenModalButton
        onButtonClick={hideMenuOnClick}
        className="new-album-playlist1"
        buttonText={
          <>
            <span className="menu-icon1">
              <FontAwesomeIcon icon={faPlus} />
            </span>{" "}
            Create Playlist
          </>
        }
        modalComponent={<NewPlaylist formType="Create" userId={user.id} />}
      />
    );
  }

  const playlistsMap = currUserPlaylists.map((currPlaylist) => {
    return (
      <button
        style={{ cursor: "pointer" }}
        className="start"
        onClick={(e) => {
          e.stopPropagation();
          // console.log("user is:" user)
          if (user) {
            dispatch(ThunkAddSongToPlaylist(currPlaylist.id, songId));
            setShowNestedMenu(false);
            setShowMenu(false);
          }
        }}
      >
        {
          <>
            <span className="menu-icon"></span> {currPlaylist.name}
          </>
        }
      </button>
    );
  });

  if (user) {
    return <div ref={ulRef}>{addSongPlaylist}</div>;
  } else {
    return (
      <div ref={ulRef}>
        <div className="profile-small-button">
          <OpenModalButton
            onButtonClick={hideMenuOnClick}
            buttonText={
              <>
                <span className="menu-icon">
                  <FontAwesomeIcon icon={faSignInAlt} />
                </span>{" "}
                Login
              </>
            }
            modalComponent={<LoginFormModal />}
          />
        </div>
        <div className="horizontal-line1"></div>
        <div className="profile-small-button">
          <OpenModalButton
            onButtonClick={hideMenuOnClick}
            buttonText={
              <>
                <span className="menu-icon">
                  <FontAwesomeIcon icon={faUserPlus} />
                </span>{" "}
                Sign Up
              </>
            }
            modalComponent={<SignupFormModal />}
          />
        </div>
      </div>
    );
  }
  // } else {
  //     return null
  // }
}
