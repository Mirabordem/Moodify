import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from '../../context/Modal'
import { Link, useHistory, NavLink, useParams } from "react-router-dom";
import { ThunkCreatePlaylist, ThunkEditPlaylist } from "../../store/playlists";
import "./NewPlaylist.css"



export default function NewPlaylist({formType,userId}) {

    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [title,setTitle]= useState();
    const [albumCover, setAlbumCover]= useState();
    const [description,setDescription]=useState("")
    const [didPicChange, setDidPicChange] = useState(false)
    const [errors,setErrors] = useState(false)

    // const playlist = useSelector(state => state.albums[albumId]);

    // useEffect(() => {
    //     if (formType === 'Edit' && playlist) {
    //         setCover_image_url(playlist.coverImageUrl);
    //         setDescription(playlist.description)
    //         setName(playlist.title);


    //     }
    // }, [formType, playlist]);

    const handleAlbumCoverChange = (e) => {
        const ourPicture = e.target.files[0];
        setAlbumCover(ourPicture);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();

        formData.append('name', title);
        formData.append('description', description);


        if (formType === "Create") {
            formData.append('user_id', userId);

            formData.append('cover_image_url', albumCover);
            let test = await dispatch(ThunkCreatePlaylist(formData));
            console.log('PLAYLIST TEST CAME BACK LIKE',test)
            if (test) {
                history.push(`/playlists/${test.id}`);
                closeModal();
            }
        }
        // else if (formType === "Edit") {
        //     if (didPicChange) {
        //         formData.append('cover_image_url', albumCover);

        //     }
        //     let test2 = await dispatch(ThunkEditPlaylist(formData, playlistId));

        //     if (test2) {
        //         closeModal();
        //     }

        // }

    };




return (


        <div className="new_playlist_container">
            {formType === 'Edit' && (
                <h1 className='h1'>Edit Album</h1>
            )}

            {formType === 'Create' && (
                <h1 className='h1'>Create Album</h1>
            )}

            <form onSubmit={handleSubmit} encType="multipart/form-data" className='newPlaylist-form'>
                {/* <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul> */}
                <label className='caLabel'>
                    Name
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label className='caLabel'>
                    Description
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                    Playlist Cover

                    <input
                        type="file"
                        onChange={(e) => {
                            setDidPicChange(true)

                            handleAlbumCoverChange(e)
                        }}
                        accept='image/*'
                        required={formType === 'Create'}
                    />
                </label>

                <button type="submit">{formType === 'Create' ? 'Create Playlist' : 'Edit Playlist'}</button>
            </form>
        </div>
    )

}
