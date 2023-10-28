import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import OpenModalButton from "../OpenModalButton"
import LoginFormModal from "../LoginFormModal"
import SignupFormModal from "../SignupFormModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { ThunkRemoveSongToPlaylist } from "../../store/playlists"
import { useState, useEffect, useRef } from "react"



export default function PlaylistSongUpdate({ songId, playlistsMap, nestedUlClassName }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const {id} = useParams
    const playlist = useSelector(state => state.playlists[id])
    const [showMenu, setShowMenu] = useState(false);
    const [showNestedMenu, setShowNestedMenu] = useState(false);
    const ulRef = useRef()

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

        if (user) {
            return (
                <div ref={ulRef}>
                    <button
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
                    </button>
                  <div className={nestedUlClassName}>
                    <div className="dropdown6">{playlistsMap}</div>
                  </div>
                  <div className="dropdown1">
                  <button
                    style={{ cursor: "pointer" }}
                    className="start"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(!showNestedMenu);
                      dispatch(ThunkRemoveSongToPlaylist(playlist.id, songId));
                    }}
                  >
                    Remove Song from Playlist
                  </button>
                </div>
                </div>
              )
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
            )
        }
    // } else {
    //     return null
    // }

}
