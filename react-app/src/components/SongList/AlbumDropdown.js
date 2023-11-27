import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import CreateSong from "../CreateSongModal";
import DeleteSongModal from "../DeleteSongModal";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { ThunkAddSongToPlaylist } from "../../store/playlists";
import AddSongPlaylistModal from "../AddSongPlaylistModal";
import NewPlaylist from "../NewPlaylist";

export default function AlbumDropDown({ songId, albumOwner, showMenu, setShowMenu }) {
  // console.log("🚀 ~ file: AlbumDropdown.js:18 ~ AlbumDropDown ~ songId:", songId)
  const user = useSelector((state) => state.session.user);
  const { id } = useParams();
  const playlists = useSelector((state) => state.playlists);
  const dispatch = useDispatch();
  const album = useSelector((state) => state.albums[id]);
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

  const currUserPlaylists = Object.values(playlists).filter((playlist) =>
    user?.userPlaylists.includes(playlist.id)
  );

  const hideMenuOnClick = () => setShowMenu(false)

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

  // if (pageType === 'album'){
  if (user && albumOwner === user.id) {
    return (
      <div>
        <div ref={ulRef} className="album-dropdown">
          <>
            <OpenModalButton
              onButtonClick={hideMenuOnClick}
              buttonText={
                <>
                  <span className="menu-icon">
                    <FontAwesomeIcon icon={faEdit} />
                  </span>{" "}
                  Edit Song
                </>
              }
              modalComponent={<CreateSong formType="edit" songId={songId} />}
            />
            <div className="horizontal-line1"></div>
            <OpenModalButton
              onButtonClick={hideMenuOnClick}
              buttonText={
                <>
                  <span className="menu-icon">
                    <FontAwesomeIcon icon={faTrash} />
                  </span>{" "}
                  Delete Song
                </>
              }
              modalComponent={<DeleteSongModal songId={songId} />}
            />
            <div className="horizontal-line1"></div>
          </>
          {/* <button
                      style={{ cursor: "pointer" }}
                      className="start"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowNestedMenu(true);
                      }}
                    >
                      <span className="menu-icon1">
                        <FontAwesomeIcon icon={faPlus} />
                      </span>{" "}
                      Add Song to Playlist
                    </button> */}
          {addSongPlaylist}
        </div>
        {/* <div className={nestedDropDown}>
          <div className="dropdown6">{playlistsMap}</div>
        </div> */}
      </div>
    );
  } else if (user && albumOwner !== user.id) {
    return (
      <div ref={ulRef}>
        {/* <button
          style={{ cursor: "pointer" }}
          className="start"
          onClick={(e) => {
            e.stopPropagation();
            setShowNestedMenu(true);
          }}
        >
          <span className="menu-icon1">
            <FontAwesomeIcon icon={faPlus} />
          </span>{" "}
          Add Song to Playlist
        </button>
        <div
          className={nestedDropDown}
          onClick={(e) => {
            e.stopPropagation();
            setShowNestedMenu(false);
            setShowMenu(false);
          }}
        >
          <div className="dropdown6">{playlistsMap}</div>
        </div> */}
        {addSongPlaylist}
      </div>
    );
  } else {
    return (
      <div>
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
