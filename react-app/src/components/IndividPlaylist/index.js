import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllAlbums } from "../../store/albums";
import { getAllPlaylists } from "../../store/playlists";
import { getAllSongs } from "../../store/songs";
import fetchAll from "../utils";
import SongList from "../SongList";
import "./IndividPlaylist.css";
import IndividPlaylistButton from "../SideMenu/IndividPlaylistButton";



export default function PlaylistDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const playlist = useSelector((state) => state.playlists[id]);
  const songs = useSelector((state) => state.songs);
  const albums = useSelector((state)=> state.albums)
  const [pageType, setPageType] = useState('playlist')
  const user = useSelector((state) => state.session.user);

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
    //below is the default picture for new playlists. we can replace this easily
    picture = 'https://i.imgur.com/UFYut0H.jpg'
  }

  return (
    <div className="album-page-container">
      <div className="album-id-top-info">
        <img className="playlist-id-cover-img"
        // src={picture}
        src={playlist.coverImageUrl}
        alt="Playlist Cover"
      />
        <div id="album-id-info-words">
          <p className="info-album-p">Playlist</p>
          <div>
            <p className="album-title-page">{playlist.title}</p>
          </div>

          <p className="album-release-info">
            {playlist.description}, Amount of songs here, Length of playlist
            here
          </p>
        </div>
      </div>

      <div id="album-id-functions-3">
      <button
          className="play-button"
          // onClick={playFirstSong}
        >
          <span className="play-arrow"></span>
        </button>
        {/* <IndividPlaylistButton user={user} playlistId={playlist.id} /> */}
      </div>



      <div id="playlist-id-song-list">
        <SongList
        pageType={pageType}
        playlist={playlist}/>
      </div>



    </div>
  );
}
