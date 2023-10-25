import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, NavLink, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/index";
import { useModal } from "../../context/Modal";
import { thunkGetAllAlbums } from "../../store/albums";
import { getAllAlbums } from "../../store/albums";
import { getAllPlaylists } from "../../store/playlists";
import { getAllSongs } from "../../store/songs";
import NewAlbum from "../NewAlbum";
import fetchAll from "../utils";
import "./AlbumDetails.css";
import SongList from "../SongList";
import CreateSong from "../CreateSongModal";
import DeleteAlbumModal from "../DeleteAlbumModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';



export default function AlbumDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const album = useSelector((state) => state.albums[id]);
  const songs = useSelector((state) => state.songs);
  const [minutes, setMinutes] = useState(0)
  const [releaseDate, setReleaseDate] = useState(0)
  const [releaseYear, setReleaseYear] = useState(0)
  const [totalNumberOfSongs, setTotalNumberOfSongs] = useState(0)
  const [albumTracks, setAlbumTracks]= useState([])
  const [totalAlbumLength, setTotalAlbumLength] = useState(0)

  useEffect(() => {
   const newAlbumTracks = []
   const newAlbumLength = totalAlbumLength
    for (let songId of album.albumSongs) {
      const song = songs[songId];
      newAlbumTracks.push(song);
      totalAlbumLength += song.songLength;
    }
    setAlbumTracks(newAlbumTracks)
    setTotalAlbumLength(newAlbumLength)
    const mins = Math.trunc(newAlbumLength / 60);
    setMinutes(mins)
    const relDate = new Date(album.releaseDate);
    setReleaseDate(relDate)
    const relYear = relDate.getFullYear();
    setReleaseYear(relYear)
    const totalSongs = album_tracks.length;
    setTotalNumberOfSongs(totalSongs)
  }, [minutes, releaseDate, releaseYear, totalNumberOfSongs])

  //took out song length conditional below
  if (!album || !Object.values(songs).length) {
    // dispatch(thunkGetAllAlbums());

    fetchAll(dispatch, getAllAlbums, getAllPlaylists, getAllSongs);
    return null;
  }

  return (
    <div className="album-page-container">
      <div className="album-id-top-info">
        <img className="album-id-cover-img" src={album.coverImageUrl} />
        <div id="album-id-info-words">
          <p className="info-album-p">Album</p>
          <div>
            <p className="album-title-page">{album.title}</p>
          </div>

          <p className="album-release-info">
            {album.artist} • {releaseYear} • {totalNumberOfSongs} songs •{" "}
            {minutes} min
          </p>


        </div>
      </div>

      <div className="album-id-functions-3">
      <button style={{ background: 'transparent', border: 'none' }}>
          <img className="green-button-image"
            src="https://image.jimcdn.com/app/cms/image/transf/none/path/sd0536822daf447dd/image/ifd4a620d55cdf9ab/version/1698195083/image.png"
            alt="Play Music"
          />
        </button>


        <OpenModalButton
          className="new-album"
          buttonText="Edit Album"


          modalComponent={<NewAlbum formType="Edit" albumId={id} />}

        />
        <OpenModalButton
          buttonText="Add Song"
          // modalComponent={<CreateSong albumId={id} />}
        />
        <OpenModalButton
          buttonText="Delete"

          modalComponent={<DeleteAlbumModal albumId={id} />}


        />
      </div>
      <div id="album-id-song-list">
        <SongList
        // songs={album_tracks}
        artist={album.artist}
        album={album}
        />
      </div>
    </div>
  );
}
