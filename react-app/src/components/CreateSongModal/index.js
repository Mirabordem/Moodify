import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useModal } from '../../context/Modal';
import { useDispatch } from "react-redux";
import { thunkCreateSong } from "../../store/songs";

export default function CreateSong({albumId}) {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {closeModal} = useModal()
    const [name, setname] = useState('')
    const [trackNumber, setTrackNumber] = useState(1)
    const [audioUrl, setAudioUrl] = useState('')
    const [songLength, setSongLength] = useState(1)

    console.log(audioUrl)

    useEffect(() => {

    })

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
