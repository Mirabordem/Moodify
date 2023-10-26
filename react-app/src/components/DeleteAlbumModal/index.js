import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { ThunkDeleteAlbum } from "../../store/albums";
import "./DeleteAlbumModal.css";

function DeleteAlbumModal({ albumId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const id = albumId;
  const album = useSelector((state) => state.albums[id]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(ThunkDeleteAlbum(id)).then(closeModal());
    history.push(`/`);
  };

  return (
    <div className="signup-container">
      <h1 className="dm-title-txt">Confirm Delete</h1>
      <h3 className="dm-confirm-txt">
        Are you sure you want to remove this album?
      </h3>
      <button className="dm-delete-button" onClick={handleDelete}>
        Yes (Delete Album)
      </button>
      <button className="dm-close-delete-button" onClick={closeModal}>
        No (Keep Album)
      </button>
    </div>
  );
}

export default DeleteAlbumModal;
