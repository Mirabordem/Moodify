import React, { useRef, useState, useContext, createContext } from "react";
import ReactDOM from "react-dom";

export const SongPlayerContext = createContext();
export const useSongPlayer = () => useContext(SongPlayerContext);

export function SongPlayerProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [nextSong, setNextSong] = useState({});
  const [currentSong, setCurrentSong] = useState({});
  const [prevSong, setPrevSong] = useState({});

  const songContextVal = {
    isPlaying,
    setIsPlaying,
    nextSong,
    setNextSong,
    currentSong,
    setCurrentSong,
    prevSong,
    setPrevSong,
  };

  return (
    <>
      <SongPlayerContext.Provider value={songContextVal}>
        {children}
      </SongPlayerContext.Provider>
    </>
  );
}
