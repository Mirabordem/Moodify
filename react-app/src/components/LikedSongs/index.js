import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, NavLink, useParams } from "react-router-dom";
import { getAllAlbums } from "../../store/albums";
import { getAllPlaylists } from "../../store/playlists";
import { getAllSongs } from "../../store/songs";
import fetchAll from "../utils";
import SongList from "../SongList";

export default function LikedSongs() {
  const user = useSelector((state) => state.session.user);
  let userLikedSongIds = [];

  let history = useHistory();
  if (user) {
    userLikedSongIds = user.likedSongs;
  } else {
    history.push("/");
  }

  const dispatch = useDispatch();
  const [pageType, setPageType] = useState("likes");

  useEffect(() => {
    fetchAll(dispatch, getAllAlbums, getAllPlaylists, getAllSongs);
  }, []);

  return (
    <div className="likedSongs-container">
      <div className="likes-id-top-info">
        {/* <img
          className="likes-id-cover-img"
          src=""
        /> */}
        <div id="likes-id-info-words">
          <div>
            <h1>Liked Songs</h1>
          </div>
          <p className="likes-release-info">
            {user?.username} · {userLikedSongIds?.length}
          </p>
        </div>
      </div>
      <div id="likes-id-song-list">
        <SongList pageType={pageType} />
      </div>
    </div>
  );
}
