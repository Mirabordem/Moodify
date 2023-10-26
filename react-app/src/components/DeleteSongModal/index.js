import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { ThunkDeleteSong } from "../../store/songs";

function DeleteSongModal({ songId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const id = songId;

  console.log('inside deleteSongModal SONG ID IS',songId)

  const song = useSelector((state) => state.songs[id]);

  const handleDelete = async (e) => {
    e.preventDefault();
    let test=await dispatch(ThunkDeleteSong(songId));
    if (test){
      closeModal()
    }
  };

  return (
    <div className="login-container">
      <h1 className="new-h1">Confirm Delete</h1>
      <h3 className="dm-confirm-txt">
        Are you sure you want to remove this song?
      </h3>
      <div className="delete-buttons">
      <button className="login-button" onClick={handleDelete}>
        Yes (Delete This Song)
      </button>
      <button className="login-button" onClick={closeModal}>
        No (Keep This Song)
      </button>
      </div>
    </div>
  );
}

export default DeleteSongModal;
