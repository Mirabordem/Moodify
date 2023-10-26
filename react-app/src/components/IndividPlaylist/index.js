import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, NavLink, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/index";
import { getAllAlbums } from "../../store/albums";
import { getAllPlaylists } from "../../store/playlists";
import { getAllSongs } from "../../store/songs";
import fetchAll from "../utils";
import SongList from "../SongList";
import DeletePlaylistModal from "../DeletePlaylistModal";

export default function PlaylistDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const playlist = useSelector((state) => state.playlists[id]);
  const songs = useSelector((state) => state.songs);
  const albums = useSelector((state)=> state.albums)
  const [pageType, setPageType] = useState('playlist')

  if (!playlist || !Object.values(songs).length) {
    // dispatch(thunkGetAllAlbums());
    fetchAll(dispatch, getAllAlbums, getAllPlaylists, getAllSongs);
    return null;
  }

  const playlist_tracks = [];
  for (let songId of playlist.songsOnPlaylist) {
    playlist_tracks.push(songs[songId]);
  }

  let picture
  if (playlist.coverImageUrl!==null){
    picture=playlist.coverImageUrl
  }
  else if (playlist?.coverImageUrl=== null && playlist?.songsOnPlaylist.length>0){

    picture=albums[songs[playlist.songsOnPlaylist[0]].albumId].coverImageUrl

  }
  else {
    picture = 'https://i.imgur.com/UFYut0H.jpg'
  }

  console.log('picture right before the return is',picture)
  return (
    <div className="playlist-page-container">
      <div className="playlist-id-top-info">
        <img className="playlist-id-cover-img"
        src={picture}
        alt="Playlist Cover"
      />
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
          modalComponent={<DeletePlaylistModal playlistId={id} />}
        />
      </div>
      <div id="playlist-id-song-list">
        <SongList pageType={pageType} playlist={playlist}/>
      </div>
    </div>
  );
}
