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
  console.log(id);
  const response = await fetch(`/api/playlists/${id}/delete`, {
    method: "DELETE",
  });
  await dispatch(deletePlaylist());
  return response;
};

export const ThunkCreatePlaylist = (formData) => async (dispatch) => {
  const res = await fetch(`/api/playlists/new`, {
    method: "POST",
    body: formData,
  });
  if (res.ok) {
    const realNewPlaylist = await res.json();
    const returnPlaylist = { ...realNewPlaylist };
    await dispatch(createPlaylist(realNewPlaylist));
    return returnPlaylist;
  } else {
    console.log("THERE WAS AN ERROR IN MAKING THE POST");
    const errors = await res.json();
    return errors;
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
    console.log("THERE WAS AN ERROR IN MAKING THE POST");
    const errors = await res.json();
    return { errors };
  }
};

export const ThunkAddSongToPlaylist = (playlistId, songId) => async dispatch => {
  try {
    const res = await fetch(`/api/playlists/${playlistId}/songs/${songId}`)

    if (res.ok) {
      const playlist = await res.json()
      dispatch(updatePlaylist(playlist))
      return playlist
    }
  } catch (err) {
    const errors = await err.json()
    return errors
  }
}

export const ThunkRemoveSongToPlaylist = (playlistId, songId) => async dispatch => {
  try {
    const res = await fetch(`/api/playlists/${playlistId}/songs/${songId}/remove`)

    if (res.ok) {
      const playlist = await res.json()
      dispatch(updatePlaylist(playlist))
      return playlist
    }
  } catch (err) {
    const errors = await err.json()
    return errors
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
