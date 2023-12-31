import { updateAlbum } from "./albums";

const ALL_SONGS = "songs/allSongs";
const ADD_SONG = "songs/createSong";
const UPDATE_SONG = "songs/updateSong";
const DELETE_SONG = "songs/deleteSong";

// action creators

export const getAllSongs = (songs) => {
  return {
    type: ALL_SONGS,
    songs,
  };
};

export const createSong = (song) => {
  return {
    type: ADD_SONG,
    song,
  };
};

export const updateSong = (song) => {
  return {
    type: UPDATE_SONG,
    song,
  };
};

export const deleteSong = (songId) => {
  return {
    type: DELETE_SONG,
    songId,
  };
};

// thunks

export const thunkCreateSong = (newSong, albumId) => async (dispatch) => {
  const res = await fetch(`/api/albums/${albumId}/songs/new`, {
    method: "POST",
    body: newSong,
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(createSong(data.song));
    dispatch(updateAlbum(data.album));
    return data.song;
  } else {
    const data = await res.json();
    return data;
  }
};

export const thunkUpdateSong = (updatedSong, songId) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songId}`, {
    method: "PUT",
    body: updatedSong,
  });
  if (res.ok) {
    const data = await res.json();
    await dispatch(createSong(data.song));
    await dispatch(updateAlbum(data.album));
    return data.song;
  } else {
    const data = await res.json();
    return data;
  }
};

export const ThunkDeleteSong = (songId) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songId}/delete`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(deleteSong(songId));
    dispatch(updateAlbum(data.album));
    return data.message;
  } else {
    const data = await res.json();
    return data;
  }
};

// reducer

const initialState = {};

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_SONGS:
      const songsObj = {};
      action.songs.forEach((song) => {
        songsObj[song.id] = song;
      });
      return songsObj;
    case ADD_SONG:
      return { ...state, [action.song.id]: action.song };
    case UPDATE_SONG:
      return { ...state, [action.song.id]: action.song };
    case DELETE_SONG:
      const newState = { ...state };
      delete newState[action.songId];
      return newState;
    default:
      return state;
  }
};

export default songReducer;
