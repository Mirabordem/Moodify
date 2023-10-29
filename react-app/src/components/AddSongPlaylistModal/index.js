import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { ThunkAddSongToPlaylist } from "../../store/playlists";

function AddSongPlaylistModal({ songId }) {
  const { closeModal } = useModal();

  const user = useSelector((state) => state.session.user);
  const playlists = useSelector((state) => state.playlists);
  const dispatch = useDispatch();

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
          if (user) {
            dispatch(ThunkAddSongToPlaylist(currPlaylist.id, songId));
            closeModal();
            // setShowNestedMenu(false);
            // setShowMenu(false);
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

  return <div>{playlistsMap}</div>;
}

export default AddSongPlaylistModal;
