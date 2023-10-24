import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, NavLink, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/index";
import { useModal } from "../../context/Modal";
import { thunkGetAllAlbums } from "../../store/albums";
import { getAllAlbums } from "../../store/albums";
import { getAllPlaylists } from "../../store/playlists";
import { getAllSongs } from "../../store/songs";
import NewAlbum from "../NewAlbum";
import fetchAll from "../utils";
import "./AlbumDetails.css";
import SongList from "../SongList";
import DeleteAlbumModal from "../DeleteAlbumModal";

export default function AlbumDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const album = useSelector((state) => state.albums[id]);
  const songs = useSelector((state) => state.songs);

  if (!album || !Object.values(songs).length) {
    // dispatch(thunkGetAllAlbums());
    fetchAll(dispatch, getAllAlbums, getAllPlaylists, getAllSongs);
    return null;
  }

  const album_tracks = [];
  for (let songId of album.albumSongs) {
    album_tracks.push(songs[songId]);
  }
  console.log(
    "🚀 ~ file: index.js:26 ~ AlbumDetails ~ album_tracks:",
    album_tracks
  );

  return (
    <div className="page-container">
      <div className="album-id-top-info">
        {/* <div className="album-id-cover-img"> */}
        <img className="album-id-cover-img" src={album.coverImageUrl} />
        {/* </div> */}
        <div id="album-id-info-words">
          <p>Album</p>
          <div>
            <p className="album-title">{album.title}</p>
          </div>
          <div id="album-id-tiny-info">
            <h5>{album.artist}</h5>
            <h5>{album.releaseDate}</h5>
            <h5 className="amount-songs">
              Amount of songs here, Length of album here
            </h5>
            {/* <h5>Length of album here</h5> */}
          </div>
        </div>
      </div>

      <div id="album-id-functions">
        <button>Play album from beginning</button>
        <OpenModalButton
          className="new-album"
          buttonText="Edit Album"
          modalComponent={<NewAlbum formType="Edit" albumId={id} />}
        />
        <OpenModalButton
          buttonText="Delete"
          modalComponent={<DeleteAlbumModal />}
        />
        <h5>Additional functions here if you are album owner</h5>
      </div>
      <div id="album-id-song-list">
        <SongList songs={album_tracks} artist={album.artist} />
      </div>
    </div>
  );
}
