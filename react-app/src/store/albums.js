

const ALL_ALBUMS = "albums/getAlbums"
// const ONE_ALBUM = "albums/oneAlbum"
const ADD_ALBUM = "albums/createAlbum"
const UPDATE_ALBUM = "albums/updateAlbum"
const DELETE_ALBUM = "albums/deleteAlbum"

// action creators

export const getAllAlbums = (albums) => {
    return {
        type: ALL_ALBUMS,
        albums
    }
}


export const createAlbum = (album) => {
    return {
        type: ADD_ALBUM,
        album,
    }
}

export const updateAlbum = (album) => {
    return {
        type: UPDATE_ALBUM,
        album,
    }
}

export const deleteAlbum = (albumId) => {
    return {
        type: DELETE_ALBUM,
        albumId,
    }
}


// thunks


// reducer
const initialState = {};
const albumReducer = (state = initialState, action) => {
    switch(action.type) {
        case ALL_ALBUMS:
            const albumsObj = {};
            action.albums.forEach(album => {
                albumsObj[album.id] = album
            })
            return albumsObj
        case ADD_ALBUM:
            return {...state, [action.album.id]: action.album}
        case UPDATE_ALBUM:
            return {...state, [action.album.id]: action.album}
        case DELETE_ALBUM:
            const newState = {...state}
            delete newState[action.albumId]
            return newState
        default:
            return state;
    }
}


export default albumReducer
