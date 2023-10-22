import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, NavLink, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/index";
import { useModal } from "../../context/Modal";
import { thunkGetAllAlbums } from "../../store/albums";

export default function AlbumDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const album = useSelector((state) => state.albums[id]);

  if (!album) {
    dispatch(thunkGetAllAlbums());
    return null;
  }

  return (
    <div className="main_window_container">
      <div id="album-id-top-info">
        <div id="album-id-cover-img">
          <img src={album.coverImageUrl} />
        </div>
        <div id="album-id-info-words">
          <div id="album-id-title">
            <h1>{album.title}</h1>
          </div>
          <div id="album-id-tiny-info">
            <h5>{album.artist}</h5>
            <h5>{album.releaseDate}</h5>
            <h5>Amount of songs here</h5>
            <h5>Length of album here</h5>
          </div>
        </div>
      </div>
      {/* <div id="album-id-functions">
        <button>Play album from beginning</button>
        <h5>Additional functions here if you are album owner</h5>
      </div>
      <div id="album-id-song-list">
        <h5>List of songs and their components here</h5>
      </div> */}
    </div>
  );
}
