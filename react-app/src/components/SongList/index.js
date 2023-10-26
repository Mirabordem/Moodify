import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton/index";
import { useSongPlayer } from "../../context/SongPlayer";
import "./SongList.css";
import { getAllAlbums } from "../../store/albums";
import { getAllPlaylists } from "../../store/playlists";
import { getAllSongs } from "../../store/songs";
import fetchAll from "../utils";
import { ThunkAddLike, ThunkDeleteLike } from "../../store/session";
import DeleteSongModal from "../DeleteAlbumModal";
import SongUpdateButton from "./SongUpdateButton";
import { sessionUser } from "../Navigation";


export default function SongList({
  pageType,
  artist,
  songAdded,
  setSongAdded,
  album,
  playlist,
}) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  let userLikedSongIds = [];
  if (user) {
    userLikedSongIds = user.likedSongs;
  }
  const songs = useSelector((state) => state.songs);

  // const album = useSelector(state => state.albums[albumId])
  // const [songsForRender, setSongsForRender] = useState([])
  const {
    isPlaying,
    setIsPlaying,
    nextSong,
    setNextSong,
    currentSong,
    setCurrentSong,
    prevSong,
    setPrevSong,
    songList,
    setSongList,
    playAnyway,
    setPlayAnyway,
    currentSongIndex,
    setCurrentSongIndex,
  } = useSongPlayer();

  let songTracks = [];

  let emptyHeart = null;
  let filledHeart = null;


  useEffect(() => {
    setSongList(songTracks);
  }, [songs]);

  if (!Object.values(songs).length) {
    fetchAll(dispatch, getAllAlbums, getAllPlaylists, getAllSongs);
    return null;
  }


  if (pageType === "playlist") {
    for (let songId of playlist.songsOnPlaylist) {
      songTracks.push(songs[songId]);
    }
  } else if (pageType === "likes") {
    for (let likeId of userLikedSongIds) {
      songTracks.push(songs[likeId]);
    }
  } else {
    for (let songId of album.albumSongs) {
      songTracks.push(songs[songId]);
    }
  }

  const setSongs = (song) => {
    setCurrentSong(song);

    const index = songTracks.findIndex((item) => item.name === song.name);

    setCurrentSongIndex(index);

    if (index === 0) {
      setNextSong(songs[index + 1]);
      setPrevSong(null);
    } else if (index === songs.length - 1) {
      setPrevSong(songs[index - 1]);
      setNextSong(null);
    } else {
      setPrevSong(songs[index - 1]);
      setNextSong(songs[index + 1]);
    }

    if (isPlaying === true) {
      setPlayAnyway(true);
    }
    setIsPlaying(true);
  };

  const songListMap = songTracks.map((song) => {
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
      }
      heart = emptyHeart;
    };
    const minutes = Math.trunc(song.songLength / 60);
    const seconds = song.songLength % 60;

    emptyHeart = <i className="far fa-heart" onClick={handleLike}></i>;
    filledHeart = <i class="fa-solid fa-heart" onClick={handleDislike}></i>;
    let heart = null;
    if (userLikedSongIds.includes(song.id)) {
      heart = filledHeart;
    } else heart = emptyHeart;

    const runTime = `${minutes}:${seconds < 10 ? '0': ''}${seconds}`;

    return (
      <li
        className="song-li"
        style={{ listStyle: "none" }}
        key={song.id}
        onClick={() => setSongs(song)}
      >
        <span className="song-info1">{song.trackNumber}</span>
        <div className="vertical-title">
          <span className="song-info2">{song.name}</span>
          <span className="song-info3">{artist}</span>
        </div>
        <div className="song-info4">

          <div className="song-actions-container">{heart}</div>
          <span className="song-info">{runTime}</span>
          <div className="song-menu">
            <SongUpdateButton user={user} songId={song.id} pageType={pageType} playlistId={playlist.id} />
          </div>

        </div>
      </li>
    );
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
