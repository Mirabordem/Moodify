import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { ThunkDeletePlaylist } from "../../store/playlists";

function DeletePlaylistModal({ playlistId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const id = playlistId;

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(ThunkDeletePlaylist(id)).then(closeModal());
    history.push(`/`);
  };

  return (
    <>
      <h1 className="dm-title-txt">Confirm Delete</h1>
      <h3 className="dm-confirm-txt">
        Are you sure you want to remove this playlist?
      </h3>
      <button className="dm-delete-button" onClick={handleDelete}>
        Yes (Delete Playlist)
      </button>
      <button className="dm-close-delete-button" onClick={closeModal}>
        No (Keep Playlist)
      </button>
    </>
  );
}

export default DeletePlaylistModal;
