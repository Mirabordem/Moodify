import React, { useRef, useState, useContext, createContext } from "react";
import ReactDOM from "react-dom";

export const SongPlayerContext = createContext();
export const useSongPlayer = () => useContext(SongPlayerContext);

export default function SongPlayerProvider({ children }) {
  const [playAnyway, setPlayAnyway] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [nextSong, setNextSong] = useState({});
  const [currentSong, setCurrentSong] = useState({});
  const [prevSong, setPrevSong] = useState({});
  const [songQueue, setSongQueue] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songAdded, setSongAdded] = useState(false)
  const [currentVolume, setVolume] = useState(50);
  const [shuffle, setShuffle] = useState(false)
  const [bigButtonStatus, setBigButtonStatus] = useState('play')

  return (
    <>
      <SongPlayerContext.Provider
        value={{
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
          songAdded,
          setSongAdded,
          currentVolume,
          setVolume,
          shuffle,
          setShuffle,
          bigButtonStatus,
          setBigButtonStatus
        }}
      >
        {children}
      </SongPlayerContext.Provider>
    </>
  );
}
