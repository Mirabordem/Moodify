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
  const [songList, setSongList] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState();
  const [songAdded, setSongAdded] = useState(false)

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
          songList,
          setSongList,
          playAnyway,
          setPlayAnyway,
          currentSongIndex,
          setCurrentSongIndex,
          songAdded,
          setSongAdded
        }}
      >
        {children}
      </SongPlayerContext.Provider>
    </>
  );
}
