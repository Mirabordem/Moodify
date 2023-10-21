

const ALL_PLAYLISTS = "playlists/getPlaylists"
// const ONE_PLAYLIST = "playlists/onePlaylist"
const ADD_PLAYLIST = "playlists/createPlaylist"
// const UPDATE_PLAYLIST = "playlists/updatePlaylist"
const DELETE_PLAYLIST = "playlists/deletePlaylist"



export const getAllPlaylists = (playlists) => {
    return {
        type: ALL_PLAYLISTS,
        playlists
    }
}

export const createPlaylist = (playlist) => {
    return {
        type: ADD_PLAYLIST,
        playlist
    }
}

export const deletePlaylist = (playlistId) => {
    return {
        type: DELETE_PLAYLIST,
        playlistId
    }
}

// thunks

initialState = {}
const playlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_PLAYLISTS:
            const playlistsObj = {}
            action.playlists.forEach(playlist => {
                playlistsObj[playlist.id] = playlist
            })
            return playlistsObj
        case ADD_PLAYLIST:
            return {...state, [action.playlist.id]: action.playlist}
        case DELETE_PLAYLIST:
            const newState = {...state}
            delete newState[action.playlistId]
            return newState
        default:
            return state
    }
}
