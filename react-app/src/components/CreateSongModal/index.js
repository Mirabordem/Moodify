import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateSong } from "../../store/songs";
import { useSongPlayer } from "../../context/SongPlayer";

export default function CreateSong({albumId}) {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {songAdded, setSongAdded} = useSongPlayer()
    const {closeModal} = useModal()
    const [name, setname] = useState('')
    const [trackNumber, setTrackNumber] = useState(1)
    const [audioUrl, setAudioUrl] = useState('')
    const [songLength, setSongLength] = useState(1)

    console.log(audioUrl)
    // setSongAdded(false)

    const submitSong = async e => {
        e.preventDefault()

        const newSong = new FormData()

            newSong.append('name', name)
            newSong.append('track_number', trackNumber)
            newSong.append("audio_url", audioUrl)
            newSong.append("song_length", songLength)

        const data = await dispatch(thunkCreateSong(newSong, albumId))
        setSongAdded(!songAdded)
        closeModal()
    }

    return (
        <div>
            <h1>Add Song to Album</h1>
            <form
            onSubmit={submitSong}
            encType="multipart/form-data"
            >
                <label>
                    <input
                    type="text"
                    value={name}
                    onChange={e => setname(e.target.value)}
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
                <button type="submit">Add Song</button>
            </form>
        </div>
    )
}
