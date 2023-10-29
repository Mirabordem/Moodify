import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { ThunkDeletePlaylist } from "../../store/playlists";

function DeletePlaylistModal({ playlistId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const id = playlistId;
  const [errors, setErrors] = useState({})

  const handleDelete = async (e) => {
    e.preventDefault();
    const data = await dispatch(ThunkDeletePlaylist(id))
    if(data?.errors) {
      setErrors(data.errors)
    } else {
      closeModal();
      history.push(`/`);
    }
  };

  return (
    <div className="signup-container5">
      <div className="new-h1">Confirm Delete</div>
      <div className="txt1">
        Are you sure you want to remove this playlist?
      </div>
      {errors.error && <p className="delete-playlist-errors all-validation-errors">{errors.error}</p>}
      <button className="signup-button" onClick={handleDelete}>
        YES (delete playlist)
      </button>
      <button className="signup-button" onClick={closeModal}>
        NO (keep playlist)
      </button>
    </div>
  );
}

export default DeletePlaylistModal;
