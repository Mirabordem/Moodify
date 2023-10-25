import React, { useEffect, useRef, useState } from "react";
import ReactSlider from "react-slider";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, NavLink, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/index";
import { useModal } from "../../context/Modal";
import { useSongPlayer } from "../../context/SongPlayer";

/*
what do we need?
- way for music player to know what song to play including all info
- way for music player to know and play next song when song ends or button is hit
- list of songs: playlist or album, current song, next song, song progress, previous song
- functionality: play, pause, next, restart, slider bar, prev song, volume?, like?
- isPlaying, nextSong, currentSong, prevSong , songLength, currentPercent
We need context for isPlaying, nextSong, currentSong, prevSong other two are calculated from song
*/

export default function MusicPlayer() {
  //   const [skipped, setSkipped] = useState(false);
  const audio = useRef();
  // const user = useSelector(state => state.user)
  const [songProgress, setSongProgress] = useState();
  const {
    isPlaying,
    setIsPlaying,
    nextSong,
    setNextSong,
    currentSong,
    setCurrentSong,
    prevSong,
    setPrevSong,
    songList,
    setSongList,
    playAnyway,
    setPlayAnyway,
    currentSongIndex,
    setCurrentSongIndex,
  } = useSongPlayer();

  useEffect(() => {
    if (isPlaying) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
    if (playAnyway) {
      audio.current.play();
      setPlayAnyway(false);
    }
  }, [isPlaying, playAnyway]);

//   useEffect(() => {
//     if (isPlaying && user) {
//       audio.current.play();
//     } else if (!isPlaying && user) {
//       audio.current.pause();
//     } else if (isPlaying && !user) {
//       alert("Sign in to play songs")
//     }
//     if (playAnyway && user) {
//       audio.current.play();
//       setPlayAnyway(false);
//     }

// }, [isPlaying, playAnyway, user]);

  const playNext = () => {
    if (nextSong) {
      setPrevSong(currentSong);
      setCurrentSong(nextSong);
      if (currentSongIndex !== songList.length - 1) {
        setNextSong(songList[currentSongIndex + 1]);
        setCurrentSongIndex(currentSongIndex + 1);
      }
    }
    if (isPlaying === true) {
      setPlayAnyway(true);
    }
    setIsPlaying(true);
  };

  const playPrev = () => {
    if (prevSong) {
      setNextSong(currentSong);
      setCurrentSong(prevSong);
      if (currentSongIndex !== 0) {
        setPrevSong(songList[currentSongIndex - 1]);
        setCurrentSongIndex(currentSongIndex - 1);
      }
    }
    if (isPlaying === true) {
      setPlayAnyway(true);
    }
    setIsPlaying(true);
  };

  return (
    <div className="musicPlayer">
      <audio src={currentSong.audioUrl} ref={audio} />
      <span onClick={() => playPrev()}>Prev</span>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {!isPlaying ? "Play" : "Pause"}
      </button>
      <span onClick={() => playNext()}>Next</span>
      <ReactSlider />
    </div>
  );
}
