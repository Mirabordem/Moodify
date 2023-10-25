import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton/index";
import { useSongPlayer } from "../../context/SongPlayer";
import './SongList.css';




export default function SongList({ songs, artist }) {
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
    setSongList(songs);
  }, []);

  const setSongs = (song) => {
    setCurrentSong(song);
    const index = songs.findIndex((item) => item.id === song.id);
    setCurrentSongIndex(index);

    if (index === 0) {
      setNextSong(songs[index + 1]);
      setPrevSong(null);
    } else if (index === songs.length - 1) {
      setPrevSong(songs[index - 1]);
      setNextSong(null);
    } else {
      setPrevSong(songs[index - 1]);
      setNextSong(songs[index + 1]);
    }

    if (isPlaying === true) {
      setPlayAnyway(true);
    }
    setIsPlaying(true);
  };

  const songListMap = songs.map((song) => {
    const minutes = Math.trunc(song.songLength / 60);
    const seconds = song.songLength % 60;
    const runTime = `${minutes}:${seconds}`;


    return (
      <li
        className="song-li"
        style={{ listStyle: "none" }}
        key={song.id}
        onClick={() => setSongs(song)}
      >
        <span className="song-info1">{song.trackNumber}</span>
        <div className="vertical-title">
          <span className="song-info2">{song.name}</span>
          <span className="song-info3">{artist}</span>
        </div>
        <div className="song-info4">
          <div className="song-actions-container">
            <i className="far fa-heart"></i>
            </div>
            <span className="song-info">{runTime}</span>
            <button className="song-menu">
              <i className="fas fa-ellipsis-h"></i>
            </button>

        </div>
      </li>
    );
  });

  return (
    <div>
      <div className="album-id-song-list">
      <div className="line-element-cross"># </div>
      <div className="line-element-title">Title</div>
      <i className="far fa-clock"></i>
      </div>
      <div className="horizontal-line"></div>
      <ul>{songListMap}</ul>
    </div>
  );
}
