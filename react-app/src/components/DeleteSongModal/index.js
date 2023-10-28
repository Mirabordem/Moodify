import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { ThunkDeleteSong } from "../../store/songs";
import "./DeleteSongModal.css";

function DeleteSongModal({ songId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const id = songId;
  const [errors, setErrors] = useState({})

  const song = useSelector((state) => state.songs[id]);

  const handleDelete = async (e) => {
    e.preventDefault();
    let test=await dispatch(ThunkDeleteSong(songId));
    if (test){
      closeModal()
    }
  };

  return (
    <div className="signup-container5">
      <div className="new-h1">Confirm Delete</div>
      <div className="dm-confirm-txt">
        Are you sure you want to remove this song?
      </div>
      {errors.error && <p className="delete-song-errors">{errors.error}</p>}
      <div className="delete-buttons">
      <button className="signup-button1" onClick={handleDelete}>
        YES (delete this song)
      </button>
      <button className="signup-button1" onClick={closeModal}>
        NO (keep this song)
      </button>
      </div>
    </div>
  );
}

export default DeleteSongModal;
