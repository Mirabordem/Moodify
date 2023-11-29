import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from '../../context/Modal'
import { ThunkCreatePlaylist, ThunkEditPlaylist } from "../../store/playlists";
import "./NewPlaylist.css"

export default function NewPlaylist({ formType, userId, playlistId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false)

    const playlist = useSelector(state => state.playlists[playlistId]);

    useEffect(() => {
      if (formType === 'Edit' && playlist) {
        setDescription(playlist.description);
        setName(playlist.name);
      }
    }, [formType, playlist]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      let formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);

      setLoading(true)



      if (formType === "Create") {
        formData.append('user_id', userId);

        try {
          const data = await dispatch(ThunkCreatePlaylist(formData));

          if (data?.name) {

            closeModal();
          } else if (data?.errors) {
            setErrors(data.errors);
          }
        } catch (error) {
          console.error("An error occurred:", error.message);
        }
      } else if (formType === "Edit") {
        try {
          const response = await dispatch(ThunkEditPlaylist(formData, playlistId));
          if (response.errors) {
            setErrors(response.errors);
          } else {
            setLoading(false)

            closeModal();
          }
        } catch (error) {
          console.error("An error occurred:", error.message);
        }
      }
      setLoading(false)
    };

    const loadingClass1 = loading ? "is-loading1" : "not-loading1"
    const playlistErrorsClass = Object.values(errors).length ? "playist-form-errors all-validation-errors" : "no-playlist-errors"


  return (
    <div className="signup-container3">
      {formType === 'Edit' && (
        <div className="new-h1">Edit Playlist</div>
      )}

      {formType === 'Create' && (
        <div className='new-h1'>Create Playlist</div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className='signup-form'>
        {errors.message && <p className={playlistErrorsClass}>{errors.message}</p>}
        {errors.name && <p className={playlistErrorsClass}>{errors.name}</p>}
        <label className='login-label'>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors.description && <p className={playlistErrorsClass}>{errors.description}</p>}
        <label className='login-label'>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <button className="signup-button" type="submit">{formType === 'Create' ? 'Create Playlist' : 'Edit Playlist'}</button>
        <button type="button" className="signup-button" onClick={closeModal}>
          Cancel
        </button>
      </form>
      <div className={loadingClass1}>Loading...</div>
    </div>
  );
}
