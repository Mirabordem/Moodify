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
import CreateSong from "../CreateSongModal";
import DeleteAlbumModal from "../DeleteAlbumModal";

export default function AlbumDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const album = useSelector((state) => state.albums[id]);
  // const songs = useSelector((state) => state.songs);
  //took out song length conditional below
  if (!album) {
    // dispatch(thunkGetAllAlbums());
    fetchAll(dispatch, getAllAlbums, getAllPlaylists, getAllSongs);
    return null;
  }

  // const album_tracks = [];
  // for (let songId of album.albumSongs) {
  //   album_tracks.push(songs[songId]);
  // }

  return (
    <div className="album-page-container">
      <div className="album-id-top-info">
        {/* <div className="album-id-cover-img"> */}
        <img className="album-id-cover-img" src={album.coverImageUrl} />
        {/* </div> */}
        <div id="album-id-info-words">
          <p className="info-album-p">Album</p>
          <div>
            <p className="album-title-page">{album.title}</p>
          </div>

          <p className="album-release-info">
            {album.artist}, {album.releaseDate}, Amount of songs here, Length of
            album here
          </p>
          {/* <p className="amount-songs">Amount of songs here, Length of album here</p> */}
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
          buttonText="add-Song"
          modalComponent={<CreateSong
            albumId={id}
            />}
        />
        <OpenModalButton
          buttonText="Delete"
          modalComponent={<DeleteAlbumModal albumId={id} />}
        />
        <h5>Additional functions here if you are album owner</h5>
      </div>
      <div id="album-id-song-list">
        <SongList
        // songs={album_tracks}
        artist={album.artist}
        albumId={id}
        />
      </div>
    </div>
  );
}
