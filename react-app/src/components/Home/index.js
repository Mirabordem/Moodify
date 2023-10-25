import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./home.css";
import { getAllAlbums } from "../../store/albums";
import { getAllPlaylists } from "../../store/playlists";
import { getAllSongs } from "../../store/songs";
import fetchAll from "../utils";
import SideMenu from "../SideMenu";

export default function Home() {
  const albums = useSelector((state) => state.albums);
  const dispatch = useDispatch();

  const albumsArray = Object.values(albums);

  useEffect(() => {
    fetchAll(dispatch, getAllAlbums, getAllPlaylists, getAllSongs);
  }, []);

  if (!albumsArray.length) {
    return null;
  }

  const albumCards = albumsArray.map((album) => {
    return (
      <NavLink
        className="card sample-card album-card"
        key={album.id}
        exact
        to={`albums/${album.id}`}
      >
        <div className="card-image">
          <img className="album-image" src={album.coverImageUrl} alt={`Cover for ${album.title}`} />
        </div>
        <div className="card-info-container">
          <p className="album-title1">{album.title}</p>
          <p className="album-title">{album.artist}</p>
        </div>
      </NavLink>
    );
  });

  return (
    <div className="page-container">
      <SideMenu />
      <div className="content-container">
        <div className="main_window_container">
          <div className="homeText">
            <h1>Welcome to Moodify!</h1>
          </div>
          <div className="home-h3">
            <NavLink exact to="/albums" className="homeAlbums">
              All Albums
            </NavLink>
          </div>
          <div className="album-cards-container">
            {albumCards}
          </div>
        </div>
      </div>
    </div>
  );
}
