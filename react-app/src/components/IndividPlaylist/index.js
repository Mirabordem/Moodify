import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllAlbums } from "../../store/albums";
import { getAllPlaylists } from "../../store/playlists";
import { getAllSongs } from "../../store/songs";
import fetchAll from "../utils";
import SongList from "../SongList";
import "./IndividPlaylist.css";
import { useSongPlayer } from "../../context/SongPlayer";

export default function PlaylistDetails() {
  const {
    setIsPlaying,
    setNextSong,
    currentSong,
    setCurrentSong,
    songQueue,
    setSongQueue,
    isPlaying,
    bigButtonStatus,
    setBigButtonStatus,
    setPlayAnyway,
    newQueue,
    setNewQueue,
    pageTitle,
    setPageTitle,
    queueTitle,
    setQueueTitle
  } = useSongPlayer();
  const { id } = useParams();
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlists[id]);
  const songs = useSelector((state) => state.songs);
  const [pageType, setPageType] = useState("playlist");
  const user = useSelector((state) => state.session.user);
  const playlists = useSelector((state) => state.playlists);
  const [minutes, setMinutes] = useState(0);
  const [totalNumberOfSongs, setTotalNumberOfSongs] = useState(
    playlist?.songsOnPlaylist.length
  );
  const [totalPlaylistLength, setTotalPlaylistLength] = useState(0);
  const [newSongs, setNewSongs] = useState(true);

  useEffect(() => {
    let newNumberOfSongs = totalNumberOfSongs;
    let newPlaylistLength = totalPlaylistLength;
    if (playlist && newSongs) {
      for (let songId of playlist.songsOnPlaylist) {
        const song = songs[songId];
        newPlaylistLength += song?.songLength;
      }
      setTotalPlaylistLength(newPlaylistLength);
      const mins = Math.trunc(newPlaylistLength / 60);
      setMinutes(mins);
      setTotalNumberOfSongs(newNumberOfSongs);
      setNewSongs(false);
    }

  }, [
    minutes,
    totalNumberOfSongs,
    totalPlaylistLength,
    newSongs,
    setNewSongs,
    songs,
    playlist,
  ]);

  useEffect(() => {
    if (
      !songQueue.length ||
      (songQueue[0]?.id !== playlist.songsOnPlaylist[0] && !isPlaying) ||
      (songQueue[0]?.id === playlist.songsOnPlaylist[0] && isPlaying)
    ) {
      let songTracks = [];
      if (playlist) {
        for (let songId of playlist.songsOnPlaylist) {
          songTracks.push(songs[songId]);
          setSongQueue(songTracks);
        }
      }
    }
  }, [songs, id]);

  useEffect(() => {
    if(pageTitle === queueTitle) {
      setBigButtonStatus('pause')
    } else {
      setBigButtonStatus('play')
    }
  }, [pageTitle, queueTitle])

  useEffect(() => {
    setPageTitle(playlist?.name)
  }, [playlist])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [playlist])

  const bigPlay = (e) => {
    if (songQueue?.length && playlist.songsOnPlaylist.length) {
      if ((!currentSong?.name || pageTitle !== queueTitle) && bigButtonStatus === 'play') {
        setCurrentSong(songs[playlist.songsOnPlaylist[0]]);
        setNextSong(songs[playlist.songsOnPlaylist[1]]);
        if (pageTitle !== queueTitle) {
          setQueueTitle(playlist?.name)
          let songTracks = [];
          for (let songId of playlist.songsOnPlaylist) {
            songTracks.push(songs[songId]);
            setSongQueue(songTracks);
          }
        }
        setIsPlaying(true);
        setPlayAnyway(true)
        setBigButtonStatus('pause')
      }
      if (isPlaying) {
        if(pageTitle === queueTitle) {
          setIsPlaying(false);
          setBigButtonStatus('play')
        }
      } else {
        setIsPlaying(true);
        setBigButtonStatus('pause')
      }
    }
  };

  if (!playlist || !Object.values(songs).length) {
    fetchAll(dispatch, getAllAlbums, getAllPlaylists, getAllSongs);
    return null;
  }

  let defaultPlaylistLength = 0;
  for (let songId of playlist.songsOnPlaylist) {
    const song = songs[songId];
    if (song) {
      defaultPlaylistLength += song.songLength;
    }
  }

  let picture =
    playlist.coverImageUrl ||
    "https://image.jimcdn.com/app/cms/image/transf/none/path/sd0536822daf447dd/image/if3eb5db5d38cc3d3/version/1698413261/image.png";

  return (
    <div className="album-detail-page-container">
      <div className="album-id-top-info">
        <img
          className="playlist-id-cover-img"
          src={picture}
          alt="Playlist Cover"
        />
        <div id="album-id-info-words">
          {/* <p className="info-album-p">Playlist</p> */}
          <div>
            <p className="album-title-page1">{playlists[id]?.name}</p>
            {/* <p className="album-title-page">{playlist.title}</p> */}
          </div>

          <p className="album-release-info">{playlist.description}</p>
          {/* <p className="album-release-info1">
            {totalNumberOfSongs} songs • {minutes} min
          </p> */}

          <p className="album-release-info1">
            {playlist.totalTracks} songs • {playlist.totalPlayTime} min
          </p>
        </div>
      </div>

      <div id="album-id-functions-4">
      <button
      className={`play-button-playlist ${!playlist.songsOnPlaylist.length ? 'big-play-diabled-playlist' : ''}`} onClick={bigPlay}>
        {bigButtonStatus === 'pause' || (isPlaying && queueTitle === pageTitle) ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}
        </button>
      </div>

      <div id="playlist-id-song-list">
        <SongList pageType={pageType} playlist={playlist} />
      </div>
    </div>
  );
}
