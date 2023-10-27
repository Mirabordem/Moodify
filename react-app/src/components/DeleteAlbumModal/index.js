import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
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
    <div className="signup-container5">
      <div className="new-h1">Confirm Delete</div>
      <div className="txt1">
        Are you sure you want to remove this album?
      </div>
      <button className="signup-button" onClick={handleDelete}>
        Yes (Delete Album)
      </button>
      <button className="signup-button" onClick={closeModal}>
        No (Keep Album)
      </button>
    </div>
  );
}

export default DeleteAlbumModal;
