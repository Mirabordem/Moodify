import { updateAlbum } from "./albums"


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
            // headers: {"Content-Type":"multipart/form-data"},
            body: newSong
        });
        if(res.ok){
            const newData = await res.json()
            dispatch(createSong(newData.song))
            dispatch(updateAlbum(newData.album))
            return newData
        }
    } catch (err) {
        const errors = err.json()
        return errors
    }
}

export const thunkUpdateSong = (updatedSong, songId) => async dispatch => {
    try{
        const res = await fetch(`/api/songs/${songId}`, {
            method: "PUT",
            // headers: {"Content-Type":"multipart/form-data"},
            body: updatedSong
        });
        if(res.ok){
            const newData = await res.json()
            dispatch(createSong(newData.song))
            dispatch(updateAlbum(newData.album))
            return newData
        }
    } catch (err) {
        const errors = err.json()
        return errors
    }
}


export const ThunkDeleteSong = (songId) => async (dispatch) => {

        const response = await fetch(`/api/songs/${songId}/delete`, {
          method: "DELETE",
        });
        if (response.ok){
            const song= await response.json()

            await dispatch(deleteSong(songId));
            return song
        }

//   catch (error) {
//         const err=await error.json()
//         return err

//     }
  };



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
