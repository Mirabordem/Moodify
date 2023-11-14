import React, { useEffect, useRef, useState } from "react";
import ReactSlider from "react-slider";
import { useSongPlayer } from "../../context/SongPlayer";
import { useSelector } from "react-redux";
import "./MusicPlayer.css";

export default function MusicPlayer() {

  const audio = useRef();
  const allSongs = useSelector(state => state.songs)
  const [songProgress, setSongProgress] = useState();
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
    currentVolume,
    setVolume,
    shuffle,
    setShuffle
  } = useSongPlayer();

  useEffect(() => {
    if (isPlaying) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
    if (playAnyway) {
      audio.current.play();
      setPlayAnyway(false);
    }
  }, [isPlaying, playAnyway]);

  const albums = useSelector((state) => state.albums);

  const playNext = () => {
    if (nextSong && currentSongIndex !== songQueue.length - 1) {
      setPrevSong(songQueue[currentSongIndex]);
      setCurrentSong(songQueue[currentSongIndex + 1]);
      setCurrentSongIndex(currentSongIndex + 1);
    }
    if (isPlaying === true) {
      setPlayAnyway(true);
    }
    setIsPlaying(true);
  };

  const playPrev = () => {
    if (prevSong && currentSongIndex !== 0) {
      setNextSong(songQueue[currentSongIndex]);
      setCurrentSong(songQueue[currentSongIndex - 1]);
      setCurrentSongIndex(currentSongIndex - 1);
    }
    if (isPlaying === true) {
      setPlayAnyway(true);
    }
    setIsPlaying(true);
  };

  const shuffleSongs = (songsArr) => {
   return songsArr.sort(() => Math.random() - 0.5)
  }

  const progress = () => {
    const duration = audio.current.duration
    const currentTime = audio.current.currentTime

  }


  return (
    <div className="musicPlayer">
      <audio
        src={currentSong?.audioUrl}
        ref={audio}
        onTimeUpdate={progress}
        onEnded={() => playNext()}
      />

      <div className="track-parent">
        <div className="track-info">
          <p className="song-name">{currentSong?.name}</p>
          <p className="artist-name">{albums[currentSong?.albumId]?.artist}</p>
        </div>
      </div>
      <div className='controls-progress'>
        <div className="controls">
          <button
          onClick={() => playPrev()}
          disabled={!currentSong?.name}
          >
            Previous</button>
          <div className="dot5">•</div>
          <button
            onClick={() => {
              if (songQueue?.length && currentSong?.name) {
                setIsPlaying(!isPlaying);
              }
              else {
                const newQueue = shuffleSongs(Object.values(allSongs))
                setSongQueue(newQueue)
                setCurrentSong(newQueue[0])
                setNextSong(newQueue[1])
                setIsPlaying(true)
              }
            }}
            // disabled={!currentSong?.name}
          >
            {!isPlaying ? "Play" : "Pause"}
          </button>
          <div className="dot5">•</div>
          <button
          onClick={() => playNext()}
          disabled={!currentSong?.name}
          >
            Next</button>
        </div>
      </div>
      <div className="volume-control">
        <input
          type="range"
          min="0"
          max="100"
          value={currentVolume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </div>
    </div>
  );
}
