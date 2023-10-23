import React, { useEffect, useImperativeHandle, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, NavLink, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/index";
import { useModal } from '../../context/Modal';
import './newAlbum.css';
import { ThunkCreateAlbum } from "../../store/albums";



export default function NewAlbum() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [title, setTitle] = useState('')
    const [releaseDate, setReleaseDate] = useState('')
    const [artist, setArtist] = useState('')
    // const [coverImage, setCoverImage] = useState('')
    // const [userOwner, setUserOwner] = useState('')
    const [albumCover, setAlbumCover] = useState('')
    // const [albumOwner, setAlbumOwner] = useState('')
    // const [albumSongs, setAlbumSongs] = useState('')
    const [imageLoading,setImageLoading] = useState(false)

    const [errors, setErrors] = useState([]);


    const handleAlbumCoverChange = (e) => {
        console.log('this e',e)
        console.log('this is e.target.files[0]',e.target.files[0])

        const ourPicture= e.target.files[0]
        console.log('THIS IS OUR PICTURE in NEWALBUM COMPONENT',ourPicture)
        setAlbumCover(ourPicture)
    }

    let userId = 1

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('title issss',title)
        let formData= new FormData()

        formData.append('cover_image_url',albumCover)
        formData.append('title',title)
        formData.append('release_date',releaseDate)
        formData.append('artist',artist)

        console.log('FORM DATA BEFORE SENDING IS',formData)
        await dispatch(ThunkCreateAlbum(formData))
    };


    return (
        <div className="newAlbum-container">
            <h1 className='h1'>Create Album</h1>
            <form onSubmit={handleSubmit}  encType="multipart/form-data" className='newAlbum-form'>
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
                    Album Cover


                    <input
                        type="file"
                        onChange={(e)=>{

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


// import React, { useEffect, useImperativeHandle, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { useModal } from '../../context/Modal';
// import './newAlbum.css';
// import { ThunkCreateAlbum } from "../../store/albums";


// export default function NewAlbum({ formType, albumId }) {
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const { closeModal } = useModal();


//     const album = useSelector(state => state.albums[albumId]);


//     const [title, setTitle] = useState('');
//     const [releaseDate, setReleaseDate] = useState('');
//     const [artist, setArtist] = useState('');
//     const [albumCover, setAlbumCover] = useState('');
//     const [imageLoading, setImageLoading] = useState(false);
//     const [errors, setErrors] = useState([]);
//     const [ourId, setOurId] = useState(albumId ? albumId : null)


//     useEffect(() => {
//         if (formType === 'Edit' && album) {
//             setAlbumCover(album.coverImageUrl);
//             setTitle(album.title);
//             setArtist(album.artist);
//             setReleaseDate(album.releaseDate);
//         }
//     }, [formType, album]);


//     const handleAlbumCoverChange = (e) => {
//         const ourPicture = e.target.files[0];
//         setAlbumCover(ourPicture);
//     };


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         let formData = new FormData();
//         formData.append('cover_image_url', albumCover);
//         formData.append('title', title);
//         formData.append('release_date', releaseDate);
//         formData.append('artist', artist);
//         let test = await dispatch(ThunkCreateAlbum(formData));
//         if (test) {
//             history.push(`/albums/${test.id}`);
//             closeModal();
//         }
//     };


//     return (


//         <div className="newAlbum-container">
//             <h1 className='h1'>Create Album</h1>
//             <form onSubmit={handleSubmit} encType="multipart/form-data" className='newAlbum-form'>
//                 {/* <ul>
//                     {errors.map((error, idx) => (
//                         <li key={idx}>{error}</li>
//                     ))}
//                 </ul> */}
//                 <label className='caLabel'>
//                     Title
//                     <input
//                         type="text"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <label className='caLabel'>
//                     Release Date
//                     <input
//                         type="date"
//                         value={releaseDate}
//                         onChange={(e) => setReleaseDate(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <label className='caLabel'>
//                     Artist
//                     <input
//                         type="text"
//                         value={artist}
//                         onChange={(e) => setArtist(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <label className='caLabel'>
//                     {formType === 'Edit' && (
//                         <div>
//                             <p>Current Album Cover:</p>
//                             <img src={albumCover} alt='Album Cover' style={{ maxWidth: '200px', maxHeight: '200px' }} />
//                         </div>
//                     )}
//                     Album Cover




//                     <input
//                         type="file"
//                         onChange={(e) => {


//                             handleAlbumCoverChange(e)
//                         }}
//                         accept='image/*'
//                         required
//                     />
//                 </label>


//                 <button type="submit">Create Album</button>
//             </form>
//         </div>
//     )

// }
