import { useState } from "react"
import { useParams } from "react-router-dom";
import { useModal } from '../../context/Modal';
import { useDispatch } from "react-redux";
import { thunkCreateSong } from "../../store/songs";

export default function CreateSong() {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {closeModal} = useModal()
    const [name, setname] = useState('')
    const [trackNumber, setTrackNumber] = useState(0)
    const [audioUrl, setAudioUrl] = useState('')
    const [songLength, setSongLength] = useState(1)

    const submitSong = async e => {
        e.preventDefault()

        const newSong = new FormData()

            newSong.append('name', name)
            newSong.append('track_number', trackNumber)
            newSong.append("audio_url", audioUrl)
            newSong.append("song_length", songLength)

        const data = await dispatch(thunkCreateSong(newSong, albumId))
        closeModal()
    }

    return (
        <div>
            <h1>Add Song to Album</h1>
            <form
            onSubmit={submitSong}
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
                    value={trackNumber}
                    onChange={e => setTrackNumber(e.target.value)}
                    />
                </label>
                <label>
                    <input
                    type="file"
                    value={audioUrl}
                    onChange={e => setAudioUrl(e.target.value)}
                    />
                </label>
                <label>
                    <input
                    type="number"
                    value={songLength}
                    onChange={e => setSongLength(e.target.value)}
                    />
                </label>
                <button type="submit">Add Song</button>
            </form>
        </div>
    )
}
