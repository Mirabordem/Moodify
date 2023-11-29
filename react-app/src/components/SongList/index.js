import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSongPlayer } from "../../context/SongPlayer";
import "./SongList.css";
import { getAllAlbums } from "../../store/albums";
import { getAllPlaylists } from "../../store/playlists";
import { getAllSongs } from "../../store/songs";
import fetchAll from "../utils";
import { ThunkAddLike, ThunkDeleteLike } from "../../store/session";
import SongUpdateButton from "./SongUpdateButton";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function SongList({
  pageType,
  artist,
  songAdded,
  setSongAdded,
}) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [openPlaylistId,setOpenPlaylistId]=useState(null)
  const [songList, setSongList] = useState([])
  const user = useSelector((state) => state.session.user);
  const album = useSelector((state) => state.albums[id]);
  const albumSongs = useSelector(state => state.albums[id].albumSongs)
  const playlist = useSelector(state => state.playlists[id])
  const songs = useSelector((state) => state.songs);
  const handlePlaylistButtonClick = (playlistId) => {
    if (openPlaylistId === playlistId) {
      setOpenPlaylistId(null);
    } else {
      setOpenPlaylistId(playlistId);
    }
  };

  let userLikedSongIds = [];
  if (user) {
    userLikedSongIds = user.likedSongs;
  }

  const {
    isPlaying,
    setIsPlaying,
    nextSong,
    setNextSong,
    currentSong,
    setCurrentSong,
    prevSong,
    setPrevSong,
    songQueue,
    setSongQueue,
    playAnyway,
    setPlayAnyway,
    currentSongIndex,
    setCurrentSongIndex,
    setBigButtonStatus,
    setQueueTitle
  } = useSongPlayer();

  let emptyHeart = null;
  let filledHeart = null;

  useEffect(() => {
    songListMap = []
  },[album, playlist])

  useEffect(() => {
    if (pageType === "playlist") {
      let songTracks = []
      for (let songId of playlist.songsOnPlaylist) {
        songTracks.push(songs[songId]);
        if (!songQueue.length) setSongQueue(songTracks)
      }
      setSongList(songTracks)
    } else if (pageType === "likes") {
      let songTracks = []
      for (let likeId of userLikedSongIds) {
        songTracks.push(songs[likeId]);
        if (!songQueue.length) setSongQueue(songTracks)
      }
      setSongList(songTracks)
    } else {
      let songTracks = []
      for (let songId of albumSongs) {
        songTracks.push(songs[songId]);
        if (!songQueue.length) setSongQueue(songTracks)
      }
      setSongList(songTracks)
    }
  }, [songs, playlist, album, user, id, albumSongs]);

  if (!Object.values(songs).length) {
    fetchAll(dispatch, getAllAlbums, getAllPlaylists, getAllSongs);
    return null;
  }

  const setSongs = (song) => {
    setSongQueue(songList)
    setCurrentSong(song);
    if(album?.title) {
      setQueueTitle(album?.title)
    } else if (playlist?.name) {
      setQueueTitle(playlist?.name)
    }

    const index = songList.findIndex((item) => item.name === song.name);

    setCurrentSongIndex(index);

    if (index === 0) {
      setNextSong(songQueue[index + 1]);
      setPrevSong(null);
    } else if (index === songs.length - 1) {
      setPrevSong(songQueue[index - 1]);
      setNextSong(null);
    } else {
      setPrevSong(songQueue[index - 1]);
      setNextSong(songQueue[index + 1]);
    }

    if (isPlaying === true) {
      setPlayAnyway(true);
    }
    setIsPlaying(true);
    setBigButtonStatus('pause')
  };

  let songListMap = songList?.map((song) => {
    if (song) {
      const handleLike = (e) => {
        e.stopPropagation();
        if (user) {
          const id = song.id;
          dispatch(ThunkAddLike(id));
        }
        heart = filledHeart;
      };
      const handleDislike = (e) => {
        e.stopPropagation();
        if (user) {
          const id = song.id;
          dispatch(ThunkDeleteLike(id));
          if(currentSong === song && !playlist) {
            const idx = songQueue.indexOf(song)
            let oldSongQueue = songQueue;
            oldSongQueue.splice(idx, 1)
            if (oldSongQueue[currentSongIndex]) setCurrentSong(oldSongQueue[currentSongIndex])
            if (oldSongQueue[currentSongIndex + 1]) setNextSong(oldSongQueue[currentSongIndex + 1])
            if (oldSongQueue[currentSongIndex - 1]) setPrevSong(oldSongQueue[currentSongIndex - 1])
            setIsPlaying(false)
            setSongQueue([...oldSongQueue])
          }
        }
        heart = emptyHeart;
      };

      emptyHeart = (
        <i className="far fa-heart empty-heart1" onClick={handleLike}></i>
      );

      filledHeart = (
        <i
          className="fas fa-heart"
          style={{ color: "rgb(95, 195, 146)" }}
          onClick={handleDislike}
        ></i>
      );

      let heart = null;
      if (userLikedSongIds.includes(song.id)) {
        heart = filledHeart;
      } else heart = emptyHeart;

      const minutes = Math.trunc(song.songLength / 60);
      const seconds = song.songLength % 60;
      const runTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

      let displayNumber = null;
      if (pageType !== "album") {
        const displayNumberIndex =
          songList?.findIndex((item) => item.name === song.name) + 1;
        displayNumber = (
          <span className="song-info1">{displayNumberIndex}</span>
        );
      } else {
        displayNumber = <span className="song-info1">{song.trackNumber}</span>;
      }

      return (
        <li
          className="song-li"
          style={{ listStyle: "none" }}
          key={song.id}
          onClick={() => setSongs(song)}
        >
          <span className="song-info1">{displayNumber}</span>
          <div className="vertical-title">
            <span className="song-info2">{song.name}</span>
            <span className="song-info3">{artist}</span>
          </div>
          <div className="song-info4">
            <div className="song-actions-container">{heart}</div>

            <span className="song-info">{runTime}</span>
            <div className="song-menu">
              {
                <SongUpdateButton
                  user={user}
                  songId={song.id}
                  pageType={pageType}
                  playlistId={playlist?.id}
                  albumOwner={album?.userOwner}
                  isOpen={openPlaylistId === song.id}
                  handlePlaylistButtonClick={() => handlePlaylistButtonClick(song.id)}
                />
              }
            </div>
          </div>
        </li>
      );
    }
  });

  return (
    <div>
      <div className="album-id-song-list">
        <div className="line-element-cross"># </div>
        <div className="line-element-title">Title</div>
        <i className="far fa-clock"></i>
      </div>
      <div className="horizontal-line"></div>
      <ul>{songListMap}</ul>
    </div>
  );
}
