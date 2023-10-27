import React, { useEffect,  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from '../../context/Modal';
import './newAlbum.css';
import { ThunkCreateAlbum, ThunkEditAlbum } from "../../store/albums";

export default function NewAlbum({ formType, albumId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const album = useSelector(state => state.albums[albumId]);

    const [title, setTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [artist, setArtist] = useState('');
    const [albumCover, setAlbumCover] = useState('');
    const [didPicChange, setDidPicChange] = useState(false)
    const [errors,setErrors] = useState(false)



    useEffect(() => {
        if (formType === 'Edit' && album) {
            setAlbumCover(album.coverImageUrl);
            setTitle(album.title);
            setArtist(album.artist);
            const releaseDate = new Date(album.releaseDate);
            const formattedDate = releaseDate.toISOString().split('T')[0];
            setReleaseDate(formattedDate);
        }
    }, [formType, album]);

    const handleAlbumCoverChange = (e) => {
        const ourPicture = e.target.files[0];
        setAlbumCover(ourPicture);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();

        formData.append('title', title);
        formData.append('release_date', releaseDate);
        formData.append('artist', artist);

        if (formType === "Create") {
            formData.append('cover_image_url', albumCover);
            let test = await dispatch(ThunkCreateAlbum(formData));
            if (test) {
                history.push(`/albums/${test.id}`);
                closeModal();
            }
        }
        else if (formType === "Edit") {
            if (didPicChange) {
                formData.append('cover_image_url', albumCover);

            }
            let test2 = await dispatch(ThunkEditAlbum(formData, albumId));

            if (test2) {
                closeModal();
            }

        }

    };


    return (


        <div className="signup-container6">
            {formType === 'Edit' && (
                <div className='new-h5'>Edit Album</div>
            )}

            {formType === 'Create' && (
                <div className='new-h5'>Create Album</div>
            )}

            <form onSubmit={handleSubmit} encType="multipart/form-data" className='signup-form5'>
                {/* <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul> */}
                <label className="login-label">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Title"
                    />
                </label>
                <label className="login-label">
                    <input
                        type="date"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                        required
                        placeholder="Release Date"
                    />
                </label>
                <label className="login-label">
                    <input
                        type="text"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        required
                        placeholder="Artist"
                    />
                </label>
                <label className="login-label">
                    {formType === 'Edit' && (
                        <div>
                            <p className="cac-1">Current Album Cover:</p>
                            <img className="cac-2" src={albumCover} alt='Album Cover' style={{ maxWidth: '200px', maxHeight: '200px' }} />
                        </div>
                    )}
                    </label>
                    <label class="custom-file-input">
                       Choose File
                    <input
                        className="cac-2"
                        type="file"
                        id="fileInput"
                        class="hidden-file-input"
                        onChange={(e) => {
                            setDidPicChange(true)

                            handleAlbumCoverChange(e)
                        }}
                        accept='image/*'
                        required={formType === 'Create'}
                        placeholder="Album Cover"
                    />
                </label>

                <button className="signup-button" type="submit">{formType === 'Create' ? 'Create Album' : 'Edit Album'}</button>
            </form>
        </div>
    )

}
