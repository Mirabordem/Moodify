

const ALL_SONGS = 'songs/allSongs'
// const ONE_SONG = 'songs/oneSong'
const ADD_SONG = 'songs/createSong'
const UPDATE_SONG = 'songs/updateSong'
const DELETE_SONG = 'songs/deleteSong'


// action creators

export const getAllSongs = (songs) => {
    return {
        type: ALL_SONGS,
        songs
    }
}

export const createSong = (song) => {
    return {
        type: ADD_SONG,
        song
    }
}

export const updateSong = (song) => {
    return {
        type: UPDATE_SONG,
        song
    }
}

export const deleteSong = (songId) => {
    return {
        type: DELETE_SONG,
        songId
    }
}


// thunks

export const thunkCreateSong = (newSong, albumId) => async dispatch => {
    try{
        const res = await fetch(`/api/albums/${albumId}/songs/new`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: newSong
        });
        if(res.ok){
            const newSong = res.json()
            dispatch(createSong(newSong))
            return newSong
        }
    } catch (err) {
        const errors = err.json()
        return errors
    }


}


// reducer

const initialState = {};

const songReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_SONGS:
            const songsObj = {}
            action.songs.forEach(song => {
                songsObj[song.id] = song
            })
            return songsObj
        case ADD_SONG:
            return {...state, [action.song.id]: action.song}
        case UPDATE_SONG:
            return {...state, [action.song.id]: action.song}
        case DELETE_SONG:
            const newState = {...state}
            delete newState[action.songId]
            return newState
        default:
            return state;
    }
}

export default songReducer
