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

export const deleteAlbum = (albumId) => {
  return {
    type: DELETE_ALBUM,
    albumId,
  };
};

// thunks

export const thunkGetAllAlbums = () => async (dispatch) => {
  console.log("THUNK GET ALBUMS");

  const res = await fetch("/api/albums");

  if (res.ok) {
    const albums = await res.json();
    dispatch(getAllAlbums(albums));
    return albums;
  } else {
    const errors = res.json();
    return errors;
  }
};

export const ThunkCreateAlbum = (formData) => async (dispatch) => {
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
    else {
        console.log('THERE WAS AN ERROR IN MAKING THE POST')
        const errors= await res.json()
        return errors
    }

}

export const ThunkEditAlbum = (formData,albumId) => async (dispatch) => {
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
    else {
        console.log('THERE WAS AN ERROR IN MAKING THE POST')
        const errors= await res.json()
        return {errors}
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
  const response = await fetch(`/api/albums/${id}/delete`, {
    method: "DELETE",
  });
  dispatch(deleteAlbum());
  return response;
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
      delete newState[action.albumId];
      return newState;
    default:
      return state;
  }
};

export default albumReducer;
