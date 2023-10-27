import React, { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import DeleteSongModal from "../DeleteSongModal";
import SignupFormModal from "../SignupFormModal";
import CreateSong from "../CreateSongModal";
import { ThunkAddSongToPlaylist, ThunkRemoveSongToPlaylist } from "../../store/playlists"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';



export default function SongUpdateButton({ user, songId, pageType, playlistId,albumOwner }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showNestedMenu, setShowNestedMenu] = useState(false);
  const user2 = useSelector((state) => state.session.user);
  const playlists = useSelector(state => state.playlists)
  const dispatch = useDispatch()
  const ulRef = useRef();

  console.log('USER id IN SONG UPDATE BUTTON IS',user?.id)
  console.log('ALBUM  IN SONG UPDATE BUTTON IS',albumOwner)
  console.log('user2 is',user2)


  useEffect(() => {
    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
        setShowNestedMenu(false)
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [user2]);

  const currUserPlaylists = Object.values(playlists).filter(playlist => user?.userPlaylists.includes(playlist.id))
  const playlistsMap = currUserPlaylists.map(playlist => {
    return (
      <button
        style={{cursor: 'pointer'}}
        className='start'
        onClick={ e => {
          e.stopPropagation();
          // console.log("user is:" user)
            if (user) {
              dispatch(ThunkAddSongToPlaylist(playlist.id, songId));
              setShowNestedMenu(false)
          }
        }}>
          {<><span className="menu-icon"></span> {playlist.name}</>}
      </button>

    )
  })

  const ulClassName = "song-update-dropdown1" + (showMenu ? "" : " hidden");

  const nestedUlClassName = "song-update-dropdown2" + (showNestedMenu ? "" : " hidden");


  return (
    <div className="song-update-dropdown1" ref={ulRef}>
      <button className="song-update-button" onClick={e => {
        e.stopPropagation()
        setShowMenu(!showMenu);
      }}>
        <i className="fas fa-ellipsis-h"></i>
      </button>
      <div className={ulClassName}>
      <div className="dropdown1">
      {user2 && pageType === 'album' && user2.id === albumOwner && (
            <>
              <OpenModalButton
                buttonText={<><span className="menu-icon"><FontAwesomeIcon icon={faEdit} /></span> Edit Song</>}
                modalComponent={<CreateSong formType="edit" songId={songId} />}
              />
              <div className="horizontal-line1"></div>
              <OpenModalButton
                buttonText={<><span className="menu-icon"><FontAwesomeIcon icon={faTrash} /></span> Delete Song</>}
                modalComponent={<DeleteSongModal songId={songId}/>}
              />
              <div className="horizontal-line1"></div>
            </>
          )}
          {user2 && pageType === 'album' ? (<>
          <button
            style={{ cursor: 'pointer' }}
            className='start'
            onClick={e => {
              e.stopPropagation()
              setShowNestedMenu(!showNestedMenu);
            }}>
            <span className="menu-icon"><FontAwesomeIcon icon={faEdit} /></span> Add Song to Playlist
          </button>
          <div className={nestedUlClassName}>
            <div className="dropdown1">
              {playlistsMap}
            </div>
          </div>
          </>
          ) : (<div className="profile-small-button">
          <OpenModalButton
            buttonText={<><span className="menu-icon"><FontAwesomeIcon icon={faUserPlus} /></span> Sign Up</>}
            modalComponent={<SignupFormModal />}
          />
          </div>

          )}
          {user && pageType !== 'album' && (
            <button
              style={{ cursor: 'pointer' }}
              className='start'
              onClick={e => {
                e.stopPropagation()
                setShowMenu(!showNestedMenu);
                dispatch(ThunkRemoveSongToPlaylist(playlistId, songId))
              }}>
              Remove Song from Playlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
