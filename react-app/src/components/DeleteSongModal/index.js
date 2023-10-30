import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { ThunkDeleteSong } from "../../store/songs";
import "./DeleteSongModal.css";
import { useSongPlayer } from "../../context/SongPlayer";

function DeleteSongModal({ songId }) {
  const dispatch = useDispatch();
  const {songQueue, setSongQueue, setCurrentSong, setNextSong, setPrevSong, currentSongIndex, currentSong, setIsPlaying} = useSongPlayer()
  const { closeModal } = useModal();
  const id = songId;
  const [errors, setErrors] = useState({})
  const song = useSelector((state) => state.songs[id]);
  const holdSong = song
  const handleDelete = async (e) => {
    e.preventDefault();
    const idx = songQueue.indexOf(song)
    let data = await dispatch(ThunkDeleteSong(songId));
    if (data.errors){
      setErrors(data.errors)
    } else {
      if(currentSong === holdSong) {
        let oldSongQueue = songQueue;
        oldSongQueue.splice(idx, 1)
        if (oldSongQueue[currentSongIndex]) setCurrentSong(oldSongQueue[currentSongIndex])
        if (oldSongQueue[currentSongIndex + 1]) setNextSong(oldSongQueue[currentSongIndex + 1])
        if (oldSongQueue[currentSongIndex - 1]) setPrevSong(oldSongQueue[currentSongIndex - 1])
        setIsPlaying(false)
        setSongQueue([...oldSongQueue])
      }
      closeModal()
    }
  };

  return (
    <div className="signup-container5">
      <div className="new-h1">Confirm Delete</div>
      <div className="dm-confirm-txt">
        Are you sure you want to remove this song?
      </div>
      {errors.error && <p className="delete-song-errors all-validation-errors">{errors.error}</p>}
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
