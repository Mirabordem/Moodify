import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateSong, thunkUpdateSong } from "../../store/songs";
import { useSongPlayer } from "../../context/SongPlayer";

export default function CreateSong({formType, albumId, songId}) {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {songAdded, setSongAdded} = useSongPlayer()
    const currentSong = useSelector(state => state.songs[songId])
    const {closeModal} = useModal()
    const [name, setName] = useState('')
    const [trackNumber, setTrackNumber] = useState(1)
    const [audioUrl, setAudioUrl] = useState('')
    const [songLength, setSongLength] = useState(1)
    const [changeAudioURL, setChangeAudioURL] = useState(false)

    useEffect(() => {
        if (formType === 'edit' && currentSong) {
            setName(currentSong.name)
            setTrackNumber(currentSong.trackNumber)
            setAudioUrl(currentSong.audioUrl)
            setSongLength(currentSong.songLength)
        }
    }, [currentSong])
    console.log("FORM TYPE!!!", formType)
    const submitSong = async e => {
        e.preventDefault()


        if(formType !== 'edit') {
            const newSong = new FormData()
            newSong.append('name', name)
            newSong.append('track_number', trackNumber)
            newSong.append("song_length", songLength)
            newSong.append("audio_url", audioUrl)

            const data = await dispatch(thunkCreateSong(newSong, albumId))

            setSongAdded(!songAdded)
        } else {
            const updatedSong = new FormData()
            if(changeAudioURL) updatedSong.append("audio_url", audioUrl);
            updatedSong.append('name', name)
            updatedSong.append('track_number', trackNumber)
            updatedSong.append("song_length", songLength)

            const result = await dispatch(thunkUpdateSong(updatedSong, songId))
        }

        closeModal()
    }

    return (
        <div>
            <h1 style={{color:"green"}}>{formType === 'edit' ? 'Update Song' : 'Add Song to Album'}</h1>
            <form
            onSubmit={submitSong}
            encType="multipart/form-data"
            >
                <label>
                    <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                </label>
                <label>
                    <input
                    type="number"
                    min={1}
                    value={trackNumber}
                    onChange={e => setTrackNumber(e.target.value)}
                    />
                </label>
                <label>
                    <input
                    type="number"
                    min={1}
                    value={songLength}
                    onChange={e => setSongLength(e.target.value)}
                    />
                </label>
                <label >
                    Choose Audio File
                    <input
                    type="file"
                    accept='audio/*'
                    onChange={e => setAudioUrl(e.target.files[0])}
                    />
                </label>
                <button type="submit">{formType === 'edit' ? 'Update Song' : 'Add Song'}</button>
            </form>
        </div>
    )
}
