import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, NavLink, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/index";
import { getAllAlbums } from "../../store/albums";
import { getAllPlaylists } from "../../store/playlists";
import { getAllSongs } from "../../store/songs";
import fetchAll from "../utils";
import SongList from "../SongList";

export default function PlaylistDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const playlist = useSelector((state) => state.playlists[id]);
  const songs = useSelector((state) => state.songs);

  if (!playlist || !Object.values(songs).length) {
    // dispatch(thunkGetAllAlbums());
    fetchAll(dispatch, getAllAlbums, getAllPlaylists, getAllSongs);
    return null;
  }

  const playlist_tracks = [];
  for (let songId of playlist.songsOnPlaylist) {
    playlist_tracks.push(songs[songId]);
  }

  return (
    <div className="playlist-page-container">
      <div className="playlist-id-top-info">
        <img className="playlist-id-cover-img" src={playlist.coverImageUrl} />
        <div id="playlist-id-info-words">
          <p className="info-playlist-p">Playlist</p>
          <div>
            <p className="playlist-title-page">{playlist.title}</p>
          </div>
          <p className="playlist-release-info">
            {playlist.description}, Amount of songs here, Length of playlist
            here
          </p>
        </div>
      </div>

      <div id="playlist-id-functions">
        <button>Play playlist from beginning</button>
        {/* <OpenModalButton
          className="new-album"
          buttonText="Edit Album"
        //   modalComponent={<NewAlbum formType="Edit" albumId={id} />}
        /> */}
        <OpenModalButton
          buttonText="add-Song"
          //   modalComponent={<CreateSong albumId={id} />}
        />
        <OpenModalButton
          buttonText="Delete"
          //   modalComponent={<DeleteAlbumModal albumId={id} />}
        />
      </div>
      <div id="playlist-id-song-list">
        <SongList songs={playlist_tracks} />
      </div>
    </div>
  );
}
