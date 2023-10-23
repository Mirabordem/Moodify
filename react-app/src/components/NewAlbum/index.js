import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from '../../context/Modal';
import './newAlbum.css';
import { ThunkCreateAlbum } from "../../store/albums";

export default function NewAlbum({ formType, albumId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const album = useSelector(state => state.albums[albumId]);

    const [title, setTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [artist, setArtist] = useState('');
    const [albumCover, setAlbumCover] = useState('');
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [ourId, setOurId] = useState(albumId ? albumId : null)

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
        if (formType === "Create") {
            let formData = new FormData();
            formData.append('cover_image_url', albumCover);
            formData.append('title', title);
            formData.append('release_date', releaseDate);
            formData.append('artist', artist);
            let test = await dispatch(ThunkCreateAlbum(formData));
            if (test) {
                history.push(`/albums/${test.id}`);
                closeModal();
            }
        }
        else if (formType ===)

    };

    return (

        <div className="newAlbum-container">
            {formType === 'Edit' && (
                <h1 className='h1'>Edit Album</h1>
            )}

            {formType === 'Create' && (
                <h1 className='h1'>Create Album</h1>
            )}

            <form onSubmit={handleSubmit} encType="multipart/form-data" className='newAlbum-form'>
                {/* <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul> */}
                <label className='caLabel'>
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label className='caLabel'>
                    Release Date
                    <input
                        type="date"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                        required
                    />
                </label>
                <label className='caLabel'>
                    Artist
                    <input
                        type="text"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        required
                    />
                </label>
                <label className='caLabel'>
                    {formType === 'Edit' && (
                        <div>
                            <p>Current Album Cover:</p>
                            <img src={albumCover} alt='Album Cover' style={{ maxWidth: '200px', maxHeight: '200px' }} />
                        </div>
                    )}
                    Album Cover


                    <input
                        type="file"
                        onChange={(e) => {

                            handleAlbumCoverChange(e)
                        }}
                        accept='image/*'
                        required
                    />
                </label>

                <button type="submit">Create Album</button>
            </form>
        </div>




    )

}
