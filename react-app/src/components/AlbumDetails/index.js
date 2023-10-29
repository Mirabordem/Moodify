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
import { useSongPlayer } from "../../context/SongPlayer";

export default function AlbumDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const album = useSelector((state) => state.albums[id]);
  const songs = useSelector((state) => state.songs);
  const [minutes, setMinutes] = useState(0);
  const [releaseDate, setReleaseDate] = useState(0);
  const [releaseYear, setReleaseYear] = useState(0);
  const [totalNumberOfSongs, setTotalNumberOfSongs] = useState(
    album?.albumSongs.length
  );
  const [totalAlbumLength, setTotalAlbumLength] = useState(0);
  const [newSongs, setNewSongs] = useState(true);
  const user = useSelector((state) => state.session.user);
  const [pageType, setPageType] = useState("album");

  const {
    setIsPlaying,
    setNextSong,
    currentSong,
    setCurrentSong,
    songQueue,
    setSongQueue,
    isPlaying,
    setCurrentSongIndex
  } = useSongPlayer();

  useEffect(() => {
    let newNumberOfSongs = totalNumberOfSongs;
    let newAlbumLength = totalAlbumLength;
    // console.log('IN THE USEEFFECT>>>>>>>>>>')
    if (album && newSongs) {
      for (let songId of album.albumSongs) {
        const song = songs[songId];
        //  newAlbumTracks.push(song);
        newAlbumLength += song?.songLength;
      }
      setTotalAlbumLength(newAlbumLength);
      const mins = Math.trunc(newAlbumLength / 60);
      setMinutes(mins);
      const relDate = new Date(album?.releaseDate);
      setReleaseDate(relDate);
      const relYear = relDate.getFullYear();
      setReleaseYear(relYear);
      setTotalNumberOfSongs(newNumberOfSongs);
      setNewSongs(false);
    }

    // setAlbumTracks(newAlbumTracks)
  }, [
    minutes,
    releaseDate,
    releaseYear,
    totalNumberOfSongs,
    totalAlbumLength,
    newSongs,
    setNewSongs,
    songs,
    album,
  ]);

  useEffect(() => {
    console.log("🚀 ~ file: index.js:77 ~ useEffect ~ songQueue[0]:", songQueue[0])

    if (!songQueue.length ||
      (songQueue[0].albumId !== id && !isPlaying) ||
      (songQueue[0].albumId === id && isPlaying)) {
      let songTracks = []
      if (album){
        for (let songId of album.albumSongs) {
          songTracks.push(songs[songId]);
           setSongQueue(songTracks)
        }
      }
    }
  }, [songs, id])

  //took out song length conditional below
  if (!album || !Object.values(songs).length) {
    // dispatch(thunkGetAllAlbums());

    fetchAll(dispatch, getAllAlbums, getAllPlaylists, getAllSongs);
    return null;
  }

  const bigPlay = e => {
    console.log('albumId for Queue', songQueue[0].albumId)
    console.log('albumId for current ALbum', id)
    console.log(songQueue)
    if(songQueue.length) {
      if(!currentSong.name || songQueue[0].albumId !== id) {
        setCurrentSong(songs[album.albumSongs[0]])
        setNextSong(songs[album.albumSongs[1]])
        if(songQueue[0].albumId !== id) {
          let songTracks = []
          for (let songId of album.albumSongs) {
            songTracks.push(songs[songId]);
             setSongQueue(songTracks)
          }
        }
        setIsPlaying(true)
      }
      if(isPlaying) {
        setIsPlaying(false);
      } else {
        setIsPlaying(true)
      }

    }
  };

  let defaultAlbumLength = 0;
  for (let songId of album.albumSongs) {
    const song = songs[songId];
    if (song) {
      defaultAlbumLength += song.songLength;
    }
  }

  const defaultMinutes = Math.trunc(defaultAlbumLength / 60);
  const defaultReleaseDate = new Date(album.releaseDate);
  const defaultReleaseYear = defaultReleaseDate.getFullYear();
  const defaultTotalSongs = album.albumSongs.length;

  return (
    <div className="album-detail-page-container">
      <div className="album-id-top-info">
        <img className="album-id-cover-img" src={album.coverImageUrl} />
        <div id="album-id-info-words">
          <p className="info-album-p">Album</p>
          <div>
            <p className="album-title-page">{album.title}</p>
          </div>

          <p className="album-release-info">
            {album.artist} • {releaseYear ? releaseYear : defaultReleaseYear} •{" "}
            {totalNumberOfSongs ? totalNumberOfSongs : defaultTotalSongs} songs
            • {minutes ? minutes : defaultMinutes} min
          </p>
        </div>
      </div>

      <div className="album-id-functions-3">
        <button className="play-button" onClick={bigPlay}>
          {/* conditionally render play arrow and pause bars with isPlaying variable */}
          <span className="play-arrow"></span>
        </button>
        <AlbumUpdateButton user={user} albumId={album.id} />
      </div>

      <div id="album-id-song-list">
        <SongList artist={album.artist} album={album} pageType={pageType} />
      </div>
    </div>
  );
}
