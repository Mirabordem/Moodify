import React, { useState } from "react";
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
  const [errors, setErrors] = useState({})
  const handleDelete = async (e) => {
    e.preventDefault();
    const data = await dispatch(ThunkDeleteAlbum(id))
    if (data.errors) {
      setErrors(data.errors)
    }
    closeModal();
    history.push(`/`);
  };

  return (
    <div className="signup-container5">
      <div className="new-h1">Confirm Delete</div>
      {errors.error && <p className="delete-album-errors">{errors.error}</p>}
      <div className="txt1">
        Are you sure you want to remove this album?
      </div>
      <button className="signup-button" onClick={handleDelete}>
        YES (delete album)
      </button>
      <button className="signup-button" onClick={closeModal}>
        NO (keep album)
      </button>
    </div>
  );
}

export default DeleteAlbumModal;
