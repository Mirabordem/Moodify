import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./newAlbum.css";
import { ThunkCreateAlbum, ThunkEditAlbum } from "../../store/albums";

export default function NewAlbum({ formType, albumId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const album = useSelector((state) => state.albums[albumId]);
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [artist, setArtist] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false)
  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("Drag and drop or");
  const [dragging, setDragging] = useState(false);
  const [photo, setPhoto] = useState(null);


  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    setPhoto(file);
    setUploadStatus("Photo ready for upload");
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setUploadStatus("Photo ready for upload");
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (formType === "Edit" && album) {
      setPhoto(album.coverImageUrl);
      setTitle(album.title);
      setArtist(album.artist);
      const releaseDate = new Date(album.releaseDate);
      const formattedDate = releaseDate.toISOString().split("T")[0];
      setReleaseDate(formattedDate);
    }
  }, [formType, album]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    setLoading(true)

    formData.append("title", title);
    formData.append("release_date", releaseDate);
    formData.append("artist", artist);

    if (formType === "Create") {
      formData.append("cover_image_url", photo);
      let data = await dispatch(ThunkCreateAlbum(formData));

      if (data?.title) {


        history.push(`/albums/${data.id}`);
        closeModal();
      } else if (data?.errors) {
        setErrors(data.errors);
        setLoading(false)
      }
    } else if (formType === "Edit") {
        formData.append("cover_image_url", photo);
      let data = await dispatch(ThunkEditAlbum(formData, albumId));
      setLoading(false)

      if (data?.title) {

        history.push(`/albums/${data.id}`);
        closeModal();
      } else if (data?.errors) {
        setErrors(data.errors);
        setLoading(false)
      }
    }
    setLoading(false)
  };


  const loadingClass = loading ? "is-loading" : "not-loading"
  const albumErrorsClass = Object.values(errors).length ? "album-form-errors all-validation-errors" : "no-album-errors"

  return (
    <div className="new-album-main-container">
      <div className="signup-container6">
        {formType === "Edit" && <div className="new-h5">Edit Album</div>}

        {formType === "Create" && <div className="new-h5">Create Album</div>}
        {errors.message && (
          <p className={albumErrorsClass}>
            {errors.message}
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="signup-form5"
        >
            {errors.title && (
              <p className={albumErrorsClass}>
                {errors.title}
              </p>
            )}
          <label className="login-label">
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
            {errors.release_date && (
              <p className={albumErrorsClass}>
                {errors.release_date}
              </p>
            )}
          <label className="login-label">
            Release Date
            <input
              type="date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              required
            />
          </label>
            {errors.artist && (
              <p className={albumErrorsClass}>
                {errors.artist}
              </p>
            )}
          <label className="login-label">
            Artist
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              required
            />
          </label>

          {formType === "Edit" && !photoPreview && (
            <label className="login-label">
            <div className='specialOps'>
              <p className="cac-1">Current Album Cover:</p>
              <img
                className="cac-2"
                src={photo}
                alt="Album Cover"
              />
            </div>
            </label>
          )}

          <label className="custom-file-input">
          <p className="file-album-cover">Album Cover</p>

          <div className="photo-container ">
            <div
              id="drop-area"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className={dragging ? "dragging" : ""}
            >
              {photoPreview ? (
                <img
                  className="new-album-image"
                  src={photoPreview}
                  alt="Photo Preview"
                />

              ) : (
                <div className="upload-text">Drag or Upload Your File</div>
              )}
            </div>
            <div className="choose-file">
            {!photoPreview && (
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleFileSelect}
              />
              )}
            {errors.cover_image_url && (
              <p className={albumErrorsClass}>
                {errors.cover_image_url}
              </p>

            )}
            </div>
          </div>
          </label>
          <button className="signup-button10" type="submit">
            {formType === "Create" ? "Create Album" : "Edit Album"}
          </button>
        </form>
      </div>
      <div className={loadingClass}>Loading...</div>
    </div>
  );
}
