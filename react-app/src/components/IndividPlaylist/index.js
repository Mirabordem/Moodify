import React, { useState, useEffect,useRef } from "react";
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

  // const [isOpen, setIsOpen] = useState(false);
  // const [showMenu, setShowMenu] = useState(false)




  const {
    setIsPlaying,
    setNextSong,
    currentSong,
    setCurrentSong,
    songQueue,
    setSongQueue,
    isPlaying,
  } = useSongPlayer()

  useEffect(() => {
    let newNumberOfSongs = totalNumberOfSongs;
    let newPlaylistLength = totalPlaylistLength;
    // console.log('IN THE USEEFFECT>>>>>>>>>>')
    if (playlist && newSongs) {
      for (let songId of playlist.songsOnPlaylist) {
        const song = songs[songId];
        //  newAlbumTracks.push(song);
        newPlaylistLength += song?.songLength;
      }
      setTotalPlaylistLength(newPlaylistLength);
      const mins = Math.trunc(newPlaylistLength / 60);
      setMinutes(mins);
      setTotalNumberOfSongs(newNumberOfSongs);
      setNewSongs(false);
    }

    // setAlbumTracks(newAlbumTracks)
  }, [
    minutes,
    totalNumberOfSongs,
    totalPlaylistLength,
    newSongs,
    setNewSongs,
    songs,
    playlist
  ]);

  useEffect(() => {
    if (!songQueue.length ||
      (songQueue[0].id !== playlist.songsOnPlaylist[0] && !isPlaying) ||
      (songQueue[0].id === playlist.songsOnPlaylist[0] && isPlaying)) {
      let songTracks = []
      if (playlist){
        for (let songId of playlist.songsOnPlaylist) {
          songTracks.push(songs[songId]);
           setSongQueue(songTracks)
        }
      }
    }
  }, [songs, id])


  const bigPlay = e => {
    console.log(songQueue)
    if(songQueue.length) {
      if(!currentSong.name || songQueue[0].id !== playlist?.songsOnPlaylist[0]) {
        setCurrentSong(songs[playlist.songsOnPlaylist[0]])
        setNextSong(songs[playlist.songsOnPlaylist[1]])
        if(songQueue[0].id !== playlist.songsOnPlaylist[0]) {
          let songTracks = []
          for (let songId of playlist.songsOnPlaylist) {
            songTracks.push(songs[songId]);
             setSongQueue(songTracks)
          }
        }
        setIsPlaying(true)
      }
      if(isPlaying) {
        setIsPlaying(false);
      } else {
        setIsPlaying(true)
      }

    }
  };

  if (!playlist || !Object.values(songs).length) {
    // dispatch(thunkGetAllAlbums());
    fetchAll(dispatch, getAllAlbums, getAllPlaylists, getAllSongs);
    return null;
  }

  // const playlist_tracks = [];
  // for (let songId of playlist.songsOnPlaylist) {
  //   playlist_tracks.push(songs[songId]);
  // }

  let defaultPlaylistLength = 0;
  for (let songId of playlist.songsOnPlaylist) {
    const song = songs[songId];
    if (song) {
      defaultPlaylistLength += song.songLength;
    }
  }

  const defaultMinutes = Math.trunc(defaultPlaylistLength / 60);
  const defaultTotalSongs = playlist.songsOnPlaylist.length;


  let picture = playlist.coverImageUrl || 'https://image.jimcdn.com/app/cms/image/transf/none/path/sd0536822daf447dd/image/if3eb5db5d38cc3d3/version/1698413261/image.png';

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

          <p className="album-release-info">
            {playlist.description}
          </p>
          <p className="album-release-info1">{totalNumberOfSongs ? totalNumberOfSongs : defaultTotalSongs} songs • {minutes ? minutes : defaultMinutes} min</p>
        </div>
      </div>

      <div id="album-id-functions-4">
      <button
          className="play-button"
          onClick={bigPlay}
        >
          {/* conditionally render play arrow and pause bars with isPlaying variable */}
          <span className="play-arrow"></span>
        </button>
        {/* <button
          className="play-button"
          // onClick={playFirstSong}
        >
          <span className="play-arrow"></span>
        </button> */}
        {/* <IndividPlaylistButton user={user} playlistId={playlist.id} /> */}
      </div>

      <div id="playlist-id-song-list">
        <SongList pageType={pageType} playlist={playlist} />
      </div>
    </div>
  );
}









// export default function PlaylistDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();

//   const playlist = useSelector((state) => state.playlists[id]);
//   const songs = useSelector((state) => state.songs);
//   const albums = useSelector((state)=> state.albums)
//   const [pageType, setPageType] = useState('playlist')
//   const user = useSelector((state) => state.session.user);

//   if (!playlist || !Object.values(songs).length) {
//     // dispatch(thunkGetAllAlbums());
//     fetchAll(dispatch, getAllAlbums, getAllPlaylists, getAllSongs);
//     return null;
//   }

//   const playlist_tracks = [];
//   for (let songId of playlist.songsOnPlaylist) {
//     playlist_tracks.push(songs[songId]);
//   }

//   let picture
//   if (playlist.coverImageUrl!==null){
//     picture=playlist.coverImageUrl
//   }
//   else if (playlist?.coverImageUrl=== null && playlist?.songsOnPlaylist.length>0){

//     picture=albums[songs[playlist.songsOnPlaylist[0]].albumId].coverImageUrl

//   }
//   else {
//     //below is the default picture for new playlists. we can replace this easily
//     picture = 'https://i.imgur.com/UFYut0H.jpg'
//   }

//   return (
//     <div className="album-page-container">
//       <div className="album-id-top-info">
//         <img className="playlist-id-cover-img"
//         // src={picture}
//         src={playlist.coverImageUrl}
//         alt="Playlist Cover"
//       />
//         <div id="album-id-info-words">
//           <p className="info-album-p">Playlist</p>
//           <div>
//             <p className="album-title-page">{playlist.title}</p>
//           </div>

//           <p className="album-release-info">
//             {playlist.description}, Amount of songs here, Length of playlist
//             here
//           </p>
//         </div>
//       </div>

//       <div id="album-id-functions-3">
//       <button
//           className="play-button"
//           // onClick={playFirstSong}
//         >
//           <span className="play-arrow"></span>
//         </button>
//         {/* <IndividPlaylistButton user={user} playlistId={playlist.id} /> */}
//       </div>



//       <div id="playlist-id-song-list">
//         <SongList
//         pageType={pageType}
//         playlist={playlist}/>
//       </div>



//     </div>
//   );
// }
