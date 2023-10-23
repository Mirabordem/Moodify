import React, { useEffect, useRef, useState } from "react";
import ReactSlider from "react-slider";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, NavLink, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/index";
import { useModal } from "../../context/Modal";
import "./MusicPlayer.css";
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
  const audio = useRef()
  const [songProgress, setSongProgress] = useState()
  const {
    isPlaying,
    setIsPlaying,
    nextSong,
    setNextSong,
    currentSong,
    setCurrentSong,
    prevSong,
    setPrevSong, } = useSongPlayer();
    console.log("🚀 ~ file: index.js:32 ~ MusicPlayer ~ isPlaying:", isPlaying)

  useEffect(() => {
    if(isPlaying) {
      audio.current.play()
    }
    else {
      audio.current.pause()
    }

  }, [isPlaying])

  console.log(isPlaying)

  // const playPause = e => {
  //   setIsPlaying(!isPlaying)
  // }

  return (
    <div className="musicPlayer">
      <audio src={currentSong.audioUrl} ref={audio}/>
      <span>Prev</span>
      <button onClick={() => setIsPlaying(!isPlaying)}>{!isPlaying ? 'Play' : 'Pause'}</button>
      <span>Next</span>
      <ReactSlider />
    </div>
  );
}
