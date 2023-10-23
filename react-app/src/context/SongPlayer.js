import React, { useRef, useState, useContext, createContext } from "react";
import ReactDOM from "react-dom";

export const SongPlayerContext = createContext();
export const useSongPlayer = () => useContext(SongPlayerContext);

export default function SongPlayerProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [nextSong, setNextSong] = useState({});
  const [currentSong, setCurrentSong] = useState({});
  const [prevSong, setPrevSong] = useState({});


  return (
    <>
      <SongPlayerContext.Provider value={{
    isPlaying,
    setIsPlaying,
    nextSong,
    setNextSong,
    currentSong,
    setCurrentSong,
    prevSong,
    setPrevSong,
  }}>
        {children}
      </SongPlayerContext.Provider>
    </>
  );
}
