import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAlbums } from "../store/albums";
import { getAllPlaylists } from "../store/playlists";
import { getAllSongs } from "../store/songs";

const fetchAll = (dispatch, getAllAlbums, getAllPlaylists, getAllSongs) => {
  fetch("/api/all")
    .then((res) => res.json())
    .then((data) => {
      dispatch(getAllAlbums(data.albums));
      dispatch(getAllPlaylists(data.playlists));
      dispatch(getAllSongs(data.songs));
    });
};

export default fetchAll;
