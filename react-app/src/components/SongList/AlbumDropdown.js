import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import OpenModalButton from "../OpenModalButton"
import CreateSong from "../CreateSongModal"
import DeleteSongModal from "../DeleteSongModal"
import LoginFormModal from "../LoginFormModal"
import SignupFormModal from "../SignupFormModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react"




export default function AlbumDropDown({ songId, playlistsMap, nestedUlClassName, albumOwner }) {
    const user = useSelector(state => state.session.user)
    const {id} = useParams
    const album = useSelector(state => state.albums[id])
    const [showMenu, setShowMenu] = useState(false);
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

    // if (pageType === 'album'){
        if (user && albumOwner === user.id) {
            return (
                <div ref={ulRef}>
                    <>
                      <OpenModalButton
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
                </div>
            )
        } else if (user && album.userOwner !== user.id) {

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
                </div>
              )

        } else {
            return (
                <div>
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
