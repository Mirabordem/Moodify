import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllAlbums } from "../../store/albums";
import { getAllPlaylists } from "../../store/playlists";
import { getAllSongs } from "../../store/songs";
import fetchAll from "../utils";
import "./AlbumDetails.css";
import SongList from "../SongList";
import AlbumUpdateButton from "./AlbumUpdateButton";




export default function AlbumDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const album = useSelector((state) => state.albums[id]);
  const songs = useSelector((state) => state.songs);
  const [minutes, setMinutes] = useState(0)
  const [releaseDate, setReleaseDate] = useState(0)
  const [releaseYear, setReleaseYear] = useState(0)
  const [totalNumberOfSongs, setTotalNumberOfSongs] = useState(album?.albumSongs.length)
  const [totalAlbumLength, setTotalAlbumLength] = useState(0)
  const [newSongs, setNewSongs] = useState(true)
  const sessionUser = useSelector((state) => state.session.user);




  useEffect(() => {
   let newAlbumLength = totalAlbumLength
    // console.log('IN THE USEEFFECT>>>>>>>>>>')
   if(album && newSongs) {
    // console.log('HIT IF STATEMENT!!!!')
     for (let songId of album.albumSongs) {
       const song = songs[songId];
      //  newAlbumTracks.push(song);
       newAlbumLength += song?.songLength;
     }
     setTotalAlbumLength(newAlbumLength)
     const mins = Math.trunc(newAlbumLength / 60);
     setMinutes(mins)
     const relDate = new Date(album?.releaseDate);
     setReleaseDate(relDate)
     const relYear = relDate.getFullYear();
     setReleaseYear(relYear)
     setTotalNumberOfSongs(album?.albumSongs.length)
     setNewSongs(false)

   }

    // setAlbumTracks(newAlbumTracks)
  }, [minutes, releaseDate, releaseYear, totalNumberOfSongs, totalAlbumLength, newSongs, setNewSongs,songs,album])

  //took out song length conditional below
  if (!album || !Object.values(songs).length) {
    // dispatch(thunkGetAllAlbums());

    fetchAll(dispatch, getAllAlbums, getAllPlaylists, getAllSongs);
    return null;
  }


  let defaultAlbumLength = 0;
  for (let songId of album.albumSongs) {
    const song = songs[songId];
    if (song){
    defaultAlbumLength += song.songLength;}
  }

  const defaultMinutes = Math.trunc(defaultAlbumLength / 60);
  const defaultReleaseDate = new Date(album.releaseDate);
  const defaultReleaseYear = defaultReleaseDate.getFullYear();
  const defaultTotalSongs = album.albumSongs.length;

  return (
    <div className="album-page-container">
      <div className="album-id-top-info">
        <img className="album-id-cover-img" src={album.coverImageUrl} />
        <div id="album-id-info-words">
          <p className="info-album-p">Album</p>
          <div>
            <p className="album-title-page">{album.title}</p>
          </div>

          <p className="album-release-info">
            {album.artist} • {releaseYear ? releaseYear : defaultReleaseYear} • {totalNumberOfSongs ? totalNumberOfSongs : defaultTotalSongs} songs •{" "}
            {minutes ? minutes : defaultMinutes} min
          </p>


        </div>
      </div>

      <div className="album-id-functions-3">

      <button
          className="play-button"
          // onClick={playFirstSong}
        >
          <span className="play-arrow"></span>
        </button>
        <AlbumUpdateButton user={sessionUser} albumId={album.id} />
      </div>

      <div id="album-id-song-list">
        <SongList
        artist={album.artist}
        album={album}
        />
      </div>
    </div>
  );
}
