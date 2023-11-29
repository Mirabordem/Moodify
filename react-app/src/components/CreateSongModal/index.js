import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateSong, thunkUpdateSong } from "../../store/songs";
import { useSongPlayer } from "../../context/SongPlayer";
import "./CreateSongModal.css";

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
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (formType === 'edit' && currentSong) {
            setName(currentSong.name)
            setTrackNumber(currentSong.trackNumber)
            setAudioUrl(currentSong.audioUrl)
            setSongLength(currentSong.songLength)
        }
    }, [currentSong])



    const submitSong = async e => {
        e.preventDefault()
        setLoading(true)


        if(formType !== 'edit') {
            const newSong = new FormData()
            newSong.append('name', name)
            newSong.append('track_number', trackNumber)
            newSong.append("song_length", songLength)
            newSong.append("audio_url", audioUrl)

            const data = await dispatch(thunkCreateSong(newSong, albumId))

            if (data?.errors) {
                setErrors(data.errors);
            } else if (data?.name) {
                setLoading(false)

                closeModal();
            }
            setSongAdded(!songAdded)
        } else {
            const updatedSong = new FormData()
            if(changeAudioURL) updatedSong.append("audio_url", audioUrl);
            updatedSong.append('name', name)
            updatedSong.append('track_number', trackNumber)
            updatedSong.append("song_length", songLength)

            const data = await dispatch(thunkUpdateSong(updatedSong, songId))
            if (data?.name) {
                setLoading(false)

                closeModal();
            } else if (data?.errors) {
                setErrors(data.errors);
            }
        }
    }


    const loadingClass2 = loading ? "is-loading2" : "not-loading2"
    const songErrorsClass = Object.values(errors).length ? "song-form-errors all-validation-errors" : "no-song-errors"

    return (
        <div className="signup-container7">
            <div className="new-h2">{formType === 'edit' ? 'Update Song' : 'Add Song to Album'}</div>
            <form
            onSubmit={submitSong}
            encType="multipart/form-data"
            className='signup-form'
            >
                {errors.message && <p className={songErrorsClass}>{errors.message}</p>}
                {errors.name && <p className={songErrorsClass}>{errors.name}</p>}
                <label className='login-label'>
                    Name
                    <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                </label>
                {errors.track_number && <p className={songErrorsClass}>{errors.track_number}</p>}
                <label className='login-label'>
                    Track Number
                    <input
                    className="input-number color"
                    type="number"
                    min={1}
                    value={trackNumber}
                    onChange={e => setTrackNumber(e.target.value)}
                    />
                </label>
                {errors.song_length && <p className={songErrorsClass}>{errors.song_length}</p>}
                <label className='login-label'>
                    Duration
                    <input
                    className="input-number color"
                    type="number"
                    min={1}
                    value={songLength}
                    onChange={e => setSongLength(e.target.value)}
                    />
                </label>
                {errors.audio_url && <p className={songErrorsClass}>{errors.audio_url}</p>}
                <label class="custom-file-input">
                    ➤ Choose Audio File
                    <input
                    type="file"
                    accept='audio/*'
                    onChange={e => {
                        setChangeAudioURL(true);
                        setAudioUrl(e.target.files[0]);
                      }}
                    />
                </label>
                <button className="signup-button" type="submit">{formType === 'edit' ? 'Update Song' : 'Add Song'}</button>
            </form>
            <div className={loadingClass2}>Loading...</div>
        </div>
    )
}
