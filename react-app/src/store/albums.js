const ALL_ALBUMS = "albums/getAlbums";
// const ONE_ALBUM = "albums/oneAlbum"
const ADD_ALBUM = "albums/createAlbum";
const UPDATE_ALBUM = "albums/updateAlbum";
const DELETE_ALBUM = "albums/deleteAlbum";

// action creators

export const getAllAlbums = (albums) => {
  return {
    type: ALL_ALBUMS,
    albums,
  };
};

export const createAlbum = (album) => {
  return {
    type: ADD_ALBUM,
    album,
  };
};

export const updateAlbum = (album) => {
  return {
    type: UPDATE_ALBUM,
    album,
  };
};

export const deleteAlbum = (id) => {
  return {
    type: DELETE_ALBUM,
    id,
  };
};

// thunks

export const thunkGetAllAlbums = () => async (dispatch) => {

  const res = await fetch("/api/albums");

  if (res.ok) {
    const albums = await res.json();
    dispatch(getAllAlbums(albums));
    return albums;
  } else {
    const data = res.json();
    return data.erros;
  }
};

export const ThunkCreateAlbum = (formData) => async (dispatch) => {
  try {
    const res = await fetch(`/api/albums/new`, {
      method: 'POST',
      body: formData
    });
    if (res.ok) {
        const realNewAlbum = await res.json();
        const returnAlbum={...realNewAlbum}
        await dispatch(createAlbum(realNewAlbum))
        return returnAlbum
    }
  } catch (err) {
    console.log('THERE WAS AN ERROR IN MAKING THE POST')
    const data = await err.json()
    return data.errors
  }
}

export const ThunkEditAlbum = (formData,albumId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/albums/${albumId}/edit`, {
      method: 'PUT',
      body: formData
    });
    if (res.ok) {
        const realNewAlbum = await res.json();
        const returnAlbum={...realNewAlbum}
        await dispatch(updateAlbum(realNewAlbum))
        return returnAlbum
    }
  } catch (err) {
    console.log('THERE WAS AN ERROR IN MAKING THE POST')
        const data = await err.json()
        return data.errors
  }
}

// export const ThunkEditAlbum = (formData, albumId) => async (dispatch) => {
//   const res = await fetch(`/api/albums/${albumId}/edit`, {
//     method: "PUT",
//     body: formData,
//   });
//   if (res.ok) {
//     const realNewAlbum = await res.json();
//     const returnAlbum = { ...realNewAlbum };
//     await dispatch(updateAlbum(realNewAlbum));
//     return returnAlbum;
//   } else {
//     console.log("THERE WAS AN ERROR IN MAKING THE POST");
//     const errors = await res.json();
//     return { errors };
//   }
// };

export const ThunkDeleteAlbum = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/albums/${id}/delete`, {
      method: "DELETE",
    });
    dispatch(deleteAlbum(id));
    return response;
  } catch (err) {
    const data = await err.json()
    return data.errors
  }
};

// reducer
const initialState = {};
const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_ALBUMS:
      const albumsObj = {};
      action.albums.forEach((album) => {
        albumsObj[album.id] = album;
      });
      return albumsObj;
    case ADD_ALBUM:
      return { ...state, [action.album.id]: action.album };
    case UPDATE_ALBUM:
      return { ...state, [action.album.id]: action.album };
    case DELETE_ALBUM:
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default albumReducer;
