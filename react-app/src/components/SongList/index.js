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
  const { songContextVal } = useSongPlayer();
  const { isPlaying } = songContextVal;
  console.log("here is songContextVal!!!!!!!", isPlaying);
  const songList = songs.map((song) => {
    const minutes = Math.trunc(song.songLength / 60);
    const seconds = song.songLength % 60;
    const runTime = `${minutes}:${seconds}`;
    return (
      <li className="song-li" key={song.id}>
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
      <ul>{songList}</ul>
    </div>
  );
}
