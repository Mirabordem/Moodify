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
  const {
    setIsPlaying,
    setNextSong,
    currentSong,
    setCurrentSong,
    songQueue,
    setSongQueue,
    isPlaying,
    setCurrentSongIndex,
    bigButtonStatus,
    setBigButtonStatus,
    setPlayAnyway,
    pageTitle,
    setPageTitle,
    queueTitle,
    setQueueTitle
  } = useSongPlayer();
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
  const [emptyAggs, setEmptyAggs] = useState(false);
  // const [bigButtonStatus, setBigButtonStatus] = useState('play')



  useEffect(() => {
    let newNumberOfSongs = totalNumberOfSongs;
    let newAlbumLength = totalAlbumLength;
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

    if (emptyAggs === false) setEmptyAggs(true);
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
    emptyAggs,
  ]);

  useEffect(() => {
    if (
      !songQueue.length ||
      (songQueue[0]?.albumId !== id && !isPlaying) ||
      (songQueue[0]?.albumId === id && isPlaying)
    ) {
      let songTracks = [];
      if (album) {
        for (let songId of album.albumSongs) {
          songTracks.push(songs[songId]);
          setSongQueue(songTracks);
        }
      }
    }
  }, [songs, id]);

  useEffect(() => {
    if(pageTitle !== queueTitle) {
      setBigButtonStatus('play')
    }
  }, [pageTitle, queueTitle])

  useEffect(() => {
    setPageTitle(album?.title)
  }, [album])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [album])

  //took out song length conditional below
  if (!album || !Object.values(songs).length) {
    // dispatch(thunkGetAllAlbums());

    fetchAll(dispatch, getAllAlbums, getAllPlaylists, getAllSongs);
    return null;
  }

  const bigPlay = (e) => {
    console.log("isPlaying1", isPlaying)
    if (songQueue?.length) {
      if ((!currentSong?.name || pageTitle !== queueTitle) && bigButtonStatus === 'play') {
        setCurrentSong(songs[album.albumSongs[0]]);
        setNextSong(songs[album.albumSongs[1]]);
        if (pageTitle !== queueTitle) {
          setQueueTitle(album?.title)
          let songTracks = [];
          for (let songId of album.albumSongs) {
            songTracks.push(songs[songId]);
            setSongQueue(songTracks);
          }
        }
        setIsPlaying(true);
        setPlayAnyway(true)
        setBigButtonStatus('pause')
      }
      if (isPlaying) {
        console.log("isPlaying2", isPlaying)
        if(pageTitle === queueTitle) {
          console.log("isPlaying3", isPlaying)
          setIsPlaying(false);
          setBigButtonStatus('play')
        }
      }
      else {
        setIsPlaying(true);
        setBigButtonStatus('pause')
      }
    }
    console.log("isPlaying4", isPlaying)
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

  let editAlbumButton = null;
  if (user?.id === album.userOwner) {
    editAlbumButton = <AlbumUpdateButton user={user} albumId={album.id} />;
  }

  console.log("songQueue", songQueue)
  console.log("current Song", currentSong)
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
            {album.artist} • {releaseYear} • {album.totalTracks} songs •{" "}
            {album.totalPlayTime} min
          </p>
        </div>
      </div>

      <div className="album-id-functions-3">
        <button className="play-button-album" onClick={bigPlay}>
        {bigButtonStatus === 'pause' || (isPlaying && pageTitle === queueTitle) ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}
        </button>
        {editAlbumButton}
      </div>

      <div id="album-id-song-list">
        <SongList artist={album.artist} album={album} pageType={pageType} />
      </div>
    </div>
  );
}
