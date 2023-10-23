import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, NavLink, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/index";
import { useModal } from "../../context/Modal";
import { thunkGetAllAlbums } from "../../store/albums";
import { getAllAlbums } from "../../store/albums";
import { getAllPlaylists } from "../../store/playlists";
import { getAllSongs } from "../../store/songs";
import fetchAll from "../utils";
import { useSongPlayer } from "../../context/SongPlayer";

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
    const index = songs.findIndex((item) => item.name === song.name);
    setCurrentSongIndex(index);
    if (index === 0) {
      setNextSong(songList[index + 1]);
    } else if (index === songList.length - 1) {
      setPrevSong(songList[index - 1]);
    } else {
      setPrevSong(songList[index - 1]);
      setNextSong(songList[index + 1]);
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
      <li className="song-li" key={song.id} onClick={() => setSongs(song)}>
        <span className="song-info">{song.trackNumber}</span>
        <span className="song-info">{song.name}</span>
        <span className="song-info">{artist}</span>
        <span className="song-info">
          <i class="fa-regular fa-heart"></i>
        </span>
        <span className="song-info">{runTime}</span>
        <span>
          <button className="song-menu">
            <i class="fa-solid fa-ellipsis"></i>
          </button>
        </span>
      </li>
    );
  });

  return (
    <div id="album-id-song-list">
      <ul>{songListMap}</ul>
    </div>
  );
}