import { setUser } from "./session";

const ALL_PLAYLISTS = "playlists/getPlaylists";
// const ONE_PLAYLIST = "playlists/onePlaylist"
const ADD_PLAYLIST = "playlists/createPlaylist";
const UPDATE_PLAYLIST = "playlists/updatePlaylist";
const DELETE_PLAYLIST = "playlists/deletePlaylist";

export const getAllPlaylists = (playlists) => {
  return {
    type: ALL_PLAYLISTS,
    playlists,
  };
};

export const createPlaylist = (playlist) => {
  return {
    type: ADD_PLAYLIST,
    playlist,
  };
};

export const updatePlaylist = (playlist) => {
  return {
    type: UPDATE_PLAYLIST,
    playlist,
  };
};

export const deletePlaylist = (playlistId) => {
  return {
    type: DELETE_PLAYLIST,
    playlistId,
  };
};

// thunks

export const ThunkDeletePlaylist = (id) => async (dispatch) => {
  const res = await fetch(`/api/playlists/${id}/delete`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json()
    dispatch(deletePlaylist(id));
    dispatch(setUser(data.user))
    return data;
  } else {
    const data = await res.json()
    return data
  }
};

export const ThunkCreatePlaylist = (formData) => async (dispatch) => {
    const res = await fetch(`/api/playlists/new`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(createPlaylist(data.playlist))
      dispatch(setUser(data.user));
      return data.playlist;

    } else {
      const data = await res.json()
      return data
    }
};

export const ThunkEditPlaylist = (formData, playlistId) => async (dispatch) => {
  const res = await fetch(`/api/playlists/${playlistId}/edit`, {
    method: "PUT",
    body: formData,
  });

  if (res.ok) {
    const realNewPlaylist = await res.json();
    const returnPlaylist = { ...realNewPlaylist };
    await dispatch(updatePlaylist(realNewPlaylist));
    return returnPlaylist;

  } else {
    const data = await res.json()
    return data
  }
};

export const ThunkAddSongToPlaylist = (playlistId, songId) => async dispatch => {
    const res = await fetch(`/api/playlists/${playlistId}/songs/${songId}`)

    if (res.ok) {
      const playlist = await res.json()
      dispatch(updatePlaylist(playlist))
      return playlist
    } else {
      const data = await res.json()
      return data
    }
}

export const ThunkRemoveSongToPlaylist = (playlistId, songId) => async dispatch => {
    const res = await fetch(`/api/playlists/${playlistId}/songs/${songId}/remove`)

    if (res.ok) {
      const playlist = await res.json()
      dispatch(updatePlaylist(playlist))
      return playlist
    } else {
      const data = await res.json()
      return data
    }
}

const initialState = {};
const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_PLAYLISTS:
      const playlistsObj = {};
      action.playlists.forEach((playlist) => {
        playlistsObj[playlist.id] = playlist;
      });
      return playlistsObj;
    case ADD_PLAYLIST:
      return { ...state, [action.playlist.id]: action.playlist };
    case UPDATE_PLAYLIST:
      return { ...state, [action.playlist.id]: action.playlist };
    case DELETE_PLAYLIST:
      const newState = { ...state };
      delete newState[action.playlistId];
      return newState;
    default:
      return state;
  }
};

export default playlistReducer;
