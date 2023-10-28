import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllAlbums } from "../../store/albums";
import { getAllPlaylists } from "../../store/playlists";
import { getAllSongs } from "../../store/songs";
import fetchAll from "../utils";
import SongList from "../SongList";
import "./LikedSongs.css";

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
  <div loved-songs-container>
    <div className="likedSongs-container">

        <div id="likes-id-info-words">
        <img
          className="likes-id-cover-img"
          src="https://image.jimcdn.com/app/cms/image/transf/none/path/sd0536822daf447dd/image/ie41418ad09dd2166/version/1698458511/image.png"
        />
        <div className="middle-container">
          <div className="album-title-page1">
            Your Loved Songs
          </div>
          <p className="likes-release-info">
            {user?.username} • {userLikedSongIds?.length} songs
          </p>
        </div>

      </div>
      <div id="likes-id-song-list">
        <SongList pageType={pageType} />
      </div>
    </div>
    </div>
  );
}
