import React, { useEffect, useRef, useState } from "react";
import ReactSlider from "react-slider";
import { useSongPlayer } from "../../context/SongPlayer";
import { useSelector } from "react-redux";
import "./MusicPlayer.css";

/*
what do we need?
- way for music player to know what song to play including all info
- way for music player to know and play next song when song ends or button is hit
- list of songs: playlist or album, current song, next song, song progress, previous song
- functionality: play, pause, next, restart, slider bar, prev song, volume?, like?
- isPlaying, nextSong, currentSong, prevSong , songLength, currentPercent
We need context for isPlaying, nextSong, currentSong, prevSong other two are calculated from song
*/

export default function MusicPlayer() {
  //   const [skipped, setSkipped] = useState(false);
  const audio = useRef();
  // const user = useSelector(state => state.session.user)
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

  //   useEffect(() => {
  //     if (isPlaying && user) {
  //       audio.current.play();
  //     } else if (!isPlaying && user) {
  //       audio.current.pause();
  //     } else if (isPlaying && !user) {
  //       alert("Sign in to play songs")
  //     }
  //     if (playAnyway && user) {
  //       audio.current.play();
  //       setPlayAnyway(false);
  //     }

  // }, [isPlaying, playAnyway, user]);

  const playNext = () => {
    console.log("prevSong", prevSong);
    console.log("currentSong", currentSong);
    console.log("nextSong", nextSong);
    if (nextSong) {
      setPrevSong(songQueue[currentSongIndex]);
      setCurrentSong(songQueue[currentSongIndex + 1]);
      setCurrentSongIndex(currentSongIndex + 1);
      if (currentSongIndex !== songQueue.length - 1) {
        setNextSong(songQueue[currentSongIndex + 1]);
      }
      // if (!prevSong.name) {
      //   setPrevSong()
      // }
    }
    if (isPlaying === true) {
      setPlayAnyway(true);
    }
    setIsPlaying(true);
  };

  const playPrev = () => {
    console.log("prevSong", prevSong);
    console.log("currentSong", currentSong);
    console.log("nextSong", nextSong);
    if (prevSong) {
      setNextSong(songQueue[currentSongIndex]);
      setCurrentSong(songQueue[currentSongIndex - 1]);
      setCurrentSongIndex(currentSongIndex - 1);
      if (currentSongIndex !== 0) {
        setPrevSong(songQueue[currentSongIndex - 1]);
      }
    }
    if (isPlaying === true) {
      setPlayAnyway(true);
    }
    setIsPlaying(true);
  };

  return (
    <div className="musicPlayer">
      <audio
        src={currentSong?.audioUrl}
        ref={audio}
        onEnded={() => playNext()}
      />

      <div className="track-parent">
        <div className="track-info">
          <p className="song-name">{currentSong?.name}</p>
          <p className="artist-name">{albums[currentSong?.albumId]?.artist}</p>
        </div>
      </div>

      <div className="controls">
        <button onClick={() => playPrev()}>Previous</button>
        <div className="dot5">•</div>
        <button
          onClick={() => {
            if (songQueue.length && currentSong.name) setIsPlaying(!isPlaying);
          }}
        >
          {!isPlaying ? "Play" : "Pause"}
        </button>
        <div className="dot5">•</div>
        <button onClick={() => playNext()}>Next</button>
      </div>

      <div className="progress-bar">
        <ReactSlider value={songProgress} />
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











// import React, { useEffect, useRef, useState } from "react";
// import ReactSlider from "react-slider";
// import { useSongPlayer } from "../../context/SongPlayer";
// import { useSelector } from "react-redux";

// /*
// what do we need?
// - way for music player to know what song to play including all info
// - way for music player to know and play next song when song ends or button is hit
// - list of songs: playlist or album, current song, next song, song progress, previous song
// - functionality: play, pause, next, restart, slider bar, prev song, volume?, like?
// - isPlaying, nextSong, currentSong, prevSong , songLength, currentPercent
// We need context for isPlaying, nextSong, currentSong, prevSong other two are calculated from song
// */

// export default function MusicPlayer() {
//   //   const [skipped, setSkipped] = useState(false);
//   const audio = useRef();
//   // const user = useSelector(state => state.session.user)
//   const [songProgress, setSongProgress] = useState();
//   const {
//     isPlaying,
//     setIsPlaying,
//     nextSong,
//     setNextSong,
//     currentSong,
//     setCurrentSong,
//     prevSong,
//     setPrevSong,
//     songQueue,
//     setSongQueue,
//     playAnyway,
//     setPlayAnyway,
//     currentSongIndex,
//     setCurrentSongIndex,
//   } = useSongPlayer();

//   useEffect(() => {
//     if (isPlaying) {
//       audio.current.play();
//     } else {
//       audio.current.pause();
//     }
//     if (playAnyway) {
//       audio.current.play();
//       setPlayAnyway(false);
//     }
//   }, [isPlaying, playAnyway]);

//   const albums = useSelector((state) => state.albums);

//   //   useEffect(() => {
//   //     if (isPlaying && user) {
//   //       audio.current.play();
//   //     } else if (!isPlaying && user) {
//   //       audio.current.pause();
//   //     } else if (isPlaying && !user) {
//   //       alert("Sign in to play songs")
//   //     }
//   //     if (playAnyway && user) {
//   //       audio.current.play();
//   //       setPlayAnyway(false);
//   //     }

//   // }, [isPlaying, playAnyway, user]);

//   const playNext = () => {
//     console.log('prevSong', prevSong)
//     console.log('currentSong', currentSong)
//     console.log('nextSong', nextSong)
//     if (nextSong) {
//       setPrevSong(songQueue[currentSongIndex]);
//       setCurrentSong(songQueue[currentSongIndex + 1]);
//       setCurrentSongIndex(currentSongIndex + 1);
//       if (currentSongIndex !== songQueue.length - 1) {
//         setNextSong(songQueue[currentSongIndex + 1]);
//       }
//       // if (!prevSong.name) {
//       //   setPrevSong()
//       // }
//     }
//     if (isPlaying === true) {
//       setPlayAnyway(true);
//     }
//     setIsPlaying(true);
//   };

//   const playPrev = () => {
//     console.log('prevSong', prevSong)
//     console.log('currentSong', currentSong)
//     console.log('nextSong', nextSong)
//     if (prevSong) {
//       setNextSong(songQueue[currentSongIndex]);
//       setCurrentSong(songQueue[currentSongIndex - 1]);
//       setCurrentSongIndex(currentSongIndex - 1);
//       if (currentSongIndex !== 0) {
//         setPrevSong(songQueue[currentSongIndex - 1]);
//       }
//     }
//     if (isPlaying === true) {
//       setPlayAnyway(true);
//     }
//     setIsPlaying(true);
//   };

//   return (
//     <div className="musicPlayer">
//       <audio
//         src={currentSong.audioUrl}
//         ref={audio}
//         onEnded={() => playNext()}
//       />
//       <div>
//         <p>{currentSong?.name}</p>
//         <p>{albums[currentSong?.albumId]?.artist}</p>
//       </div>
//       <span onClick={() => playPrev()}>Prev</span>
//       <button onClick={() =>  {
//         if(songQueue.length && currentSong.name) setIsPlaying(!isPlaying)
//       }}>
//         {!isPlaying ? "Play" : "Pause"}
//       </button>
//       <span onClick={() => playNext()}>Next</span>
//       <ReactSlider />
//     </div>
//   );
// }
