import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import {
  ThunkAddSongToPlaylist,
  ThunkRemoveSongToPlaylist,
} from "../../store/playlists";
import { useState, useEffect, useRef } from "react";
import { useSongPlayer } from "../../context/SongPlayer";
import AddSongPlaylistModal from "../AddSongPlaylistModal";

export default function PlaylistSongUpdate({ songId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const song = useSelector((state) => state.songs[songId]);
  const { id } = useParams();
  console.log(
    "🚀 ~ file: PlayListSongUpdate.js:18 ~ PlaylistSongUpdate ~ id:",
    id
  );

  const playlists = useSelector((state) => state.playlists);
  const playlist = useSelector((state) => state.playlists[id]);
  const [showMenu, setShowMenu] = useState(false);
  const [showNestedMenu, setShowNestedMenu] = useState(false);
  const ulRef = useRef();
  const {
    songQueue,
    setSongQueue,
    setCurrentSong,
    setNextSong,
    setPrevSong,
    currentSongIndex,
    currentSong,
    setIsPlaying,
  } = useSongPlayer();

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

  const addSongPlaylist = (
    <OpenModalButton
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

  if (user) {
    return (
      <div ref={ulRef}>
        {/* <button
                      style={{ cursor: "pointer" }}
                      className="start"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowNestedMenu(!showNestedMenu);
                      }}
                    >
                      <span className="menu-icon1">
                        <FontAwesomeIcon icon={faPlus} />
                      </span>{" "}
                      Add Song to Playlist
                    </button> */}
        {addSongPlaylist}
        <div className="dropdown1">
          <button
            style={{ cursor: "pointer" }}
            className="start"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showNestedMenu);
              dispatch(ThunkRemoveSongToPlaylist(playlist.id, songId));
              if (currentSong === song) {
                const idx = songQueue.indexOf(song);
                let oldSongQueue = songQueue;
                oldSongQueue.splice(idx, 1);
                if (oldSongQueue[currentSongIndex])
                  setCurrentSong(oldSongQueue[currentSongIndex]);
                if (oldSongQueue[currentSongIndex + 1])
                  setNextSong(oldSongQueue[currentSongIndex + 1]);
                if (oldSongQueue[currentSongIndex - 1])
                  setPrevSong(oldSongQueue[currentSongIndex - 1]);
                setIsPlaying(false);
                setSongQueue([...oldSongQueue]);
              }
            }}
          >
            Remove Song from Playlist
          </button>
          <div className={nestedDropDown}>
            <div className="dropdown6">{playlistsMap}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div ref={ulRef}>
        <div className="profile-small-button">
          <OpenModalButton
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
