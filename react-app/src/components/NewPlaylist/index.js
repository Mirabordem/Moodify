// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useModal } from '../../context/Modal'
// import { Link, useHistory, NavLink, useParams } from "react-router-dom";
// import { ThunkCreatePlaylist, ThunkEditPlaylist } from "../../store/playlists";
// import "./NewPlaylist.css"



// export default function NewPlaylist({formType,userId}) {

//     const dispatch = useDispatch();
//     const history = useHistory();
//     const { closeModal } = useModal();
//     const [title,setTitle]= useState();
//     const [albumCover, setAlbumCover]= useState();
//     const [description,setDescription]=useState("")
//     const [didPicChange, setDidPicChange] = useState(false)
//     const [errors, setErrors] = useState({})

//     // const playlist = useSelector(state => state.albums[albumId]);

//     // useEffect(() => {
//     //     if (formType === 'Edit' && playlist) {
//     //         setCover_image_url(playlist.coverImageUrl);
//     //         setDescription(playlist.description)
//     //         setName(playlist.title);


//     //     }
//     // }, [formType, playlist]);

//     const handleAlbumCoverChange = (e) => {
//         const ourPicture = e.target.files[0];
//         setAlbumCover(ourPicture);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         let formData = new FormData();

//         formData.append('name', title);
//         formData.append('description', description);


//         if (formType === "Create") {
//             if (didPicChange) {
//                 formData.append('cover_image_url', albumCover);
//             }
//             formData.append('user_id', userId);

//             let data = await dispatch(ThunkCreatePlaylist(formData));
//             if (data?.name) {
//                 history.push(`/playlists/${data.id}`);
//                 closeModal();
//             } else if (data?.errors) {

//                 console.log("🚀 ~ file: index.js:59 ~ handleSubmit ~ data.errors:", data.errors)
//                 setErrors(data.errors)
//             }
//         }
//         // else if (formType === "Edit") {
//         //     if (didPicChange) {
//         //         formData.append('cover_image_url', albumCover);

//         //     }
//         //     let test2 = await dispatch(ThunkEditPlaylist(formData, playlistId));

//         //     if (test2) {
//         //         closeModal();
//         //     }

//         // }

//     };




// return (


//         <div className="signup-container3">
//             {formType === 'Edit' && (
//                 <div className="new-h1">Edit Playlist</div>
//             )}

//             {formType === 'Create' && (
//                 <div className='new-h1'>Create Playlist</div>
//             )}

//             <form onSubmit={handleSubmit} encType="multipart/form-data" className='signup-form'>
//                 {/* <ul>
//                     {errors.map((error, idx) => (
//                         <li key={idx}>{error}</li>
//                         ))}
//                     </ul> */}
//                 {errors.message && <p className="add-playlist-errors all-validation-errors">{errors.message}</p>}
//                 {errors.name && <p className="add-playlist-errors all-validation-errors">{errors.name}</p>}
//                 <label className='login-label'>
//                     Name
//                     <input
//                         type="text"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         required
//                         // placeholder="Name"
//                     />
//                 </label>
//                 {errors.description && <p className="add-playlist-errors all-validation-errors">{errors.description}</p>}
//                 <label className='login-label'>
//                     Description
//                     <input
//                         type="text"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         required
//                         // placeholder="Description"
//                     />
//                 </label>
//                 <button className="signup-button" type="submit">{formType === 'Create' ? 'Create Playlist' : 'Edit Playlist'}</button>
//                 <button type="button" className="signup-button" onClick={closeModal}>
//                     Cancel
//                 </button>
//             </form>
//         </div>
//     )

// }





// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useModal } from '../../context/Modal'
// import { Link, useHistory, NavLink, useParams } from "react-router-dom";
// import { ThunkCreatePlaylist, ThunkEditPlaylist } from "../../store/playlists";
// import "./NewPlaylist.css"



// export default function NewPlaylist({formType,userId}) {

//     const dispatch = useDispatch();
//     const history = useHistory();
//     const { closeModal } = useModal();
//     const [title,setTitle]= useState();
//     const [albumCover, setAlbumCover]= useState();
//     const [cover_image_url, setCover_image_url]= useState();
//     const [name, setName] = useState("")
//     const [description,setDescription]=useState("")
//     const [didPicChange, setDidPicChange] = useState(false)
//     const [errors, setErrors] = useState({})
//     const { playlistId } = useParams();




//     const playlist = useSelector(state => state.albums[playlistId]);

//     useEffect(() => {
//         if (formType === 'Edit' && playlist) {
//             setCover_image_url(playlist.coverImageUrl);
//             setDescription(playlist.description)
//             setTitle(playlist.name);
//         }
//     }, [formType, playlist]);


//     useEffect(() => {
//         if (formType === 'Edit') {
//             console.log("Fetching playlist data for editing...");
//             console.log("Playlist ID:", playlistId);

//             // Make sure playlistId is available here
//             if (playlistId) {
//                 const fetchPlaylistData = async () => {
//                     const response = await fetch(`/api/playlists/${playlistId}`);
//                     const data = await response.json();

//                     console.log("Fetched playlist data:", data);

//                     // Update the state based on fetched data
//                     setCover_image_url(data.cover_image_url);
//                     setDescription(data.description);
//                     setName(data.name);
//                 };

//                 fetchPlaylistData();
//             }
//         }
//     }, [formType, playlistId]);


//     // const handleAlbumCoverChange = (e) => {
//     //     const ourPicture = e.target.files[0];
//     //     setAlbumCover(ourPicture);
//     // };



//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         let formData = new FormData();

//         formData.append('name', title);
//         formData.append('description', description);


//         if (formType === "Create") {
//             if (didPicChange) {
//                 formData.append('cover_image_url', albumCover);
//             }
//             if (formType === "Create") {
//             formData.append('user_id', userId);

//             let data = await dispatch(ThunkCreatePlaylist(formData));
//             if (data?.name) {
//                 history.push(`/playlists/${data.id}`);
//                 closeModal();
//             } else if (data?.errors) {

//                 console.log("🚀 ~ file: index.js:59 ~ handleSubmit ~ data.errors:", data.errors)
//                 setErrors(data.errors)
//             }
//         } else if (formType === "Edit") {
//             try {
//                 const response = await dispatch(ThunkEditPlaylist(formData, playlist.id));

//                 if (response.errors) {
//                     setErrors(response.errors);
//                 } else {
//                     closeModal();
//                 }
//             } catch (error) {
//                 console.error("An error occurred:", error.message);
//             }
//         }
//     }

//     };

// return (


//         <div className="signup-container3">
//             {formType === 'Edit' && (
//                 <div className="new-h1">Edit Playlist</div>
//             )}

//             {formType === 'Create' && (
//                 <div className='new-h1'>Create Playlist</div>
//             )}

//             <form onSubmit={handleSubmit} encType="multipart/form-data" className='signup-form'>
//                 {/* <ul>
//                     {errors.map((error, idx) => (
//                         <li key={idx}>{error}</li>
//                         ))}
//                     </ul> */}
//                 {errors.message && <p className="add-playlist-errors all-validation-errors">{errors.message}</p>}
//                 {errors.name && <p className="add-playlist-errors all-validation-errors">{errors.name}</p>}
//                 <label className='login-label'>
//                     Name
//                     <input
//                         type="text"
//                         value={title || ""}
//                         onChange={(e) => setTitle(e.target.value)}
//                         required
//                         // placeholder="Name"
//                     />
//                 </label>
//                 {errors.description && <p className="add-playlist-errors all-validation-errors">{errors.description}</p>}
//                 <label className='login-label'>
//                     Description
//                     <input
//                         type="text"
//                         value={description || ""}
//                         onChange={(e) => setDescription(e.target.value)}
//                         required
//                         // placeholder="Description"
//                     />
//                 </label>
//                 <button className="signup-button" type="submit">{formType === 'Create' ? 'Create Playlist' : 'Edit Playlist'}</button>
//                 <button type="button" className="signup-button" onClick={closeModal}>
//                     Cancel
//                 </button>
//             </form>
//         </div>
//     )

// }



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from '../../context/Modal'
import { useHistory, useParams } from "react-router-dom";
import { ThunkCreatePlaylist, ThunkEditPlaylist } from "../../store/playlists";
import "./NewPlaylist.css"

export default function NewPlaylist({ formType, userId, playlistId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [didPicChange, setDidPicChange] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false)

    const playlist = useSelector(state => state.playlists[playlistId]);

    useEffect(() => {
      if (formType === 'Edit' && playlist) {
        setDescription(playlist.description);
        setName(playlist.name);
      }
    }, [formType, playlist]);


    const handleSubmit = async (e) => {
      e.preventDefault();
      let formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);

      setLoading(true)



      if (formType === "Create") {
        formData.append('user_id', userId);

        try {
          const data = await dispatch(ThunkCreatePlaylist(formData));
          if (data?.name) {
            setLoading(false)

            closeModal();
          } else if (data?.errors) {
            setErrors(data.errors);
          }
        } catch (error) {
          console.error("An error occurred:", error.message);
        }
      } else if (formType === "Edit") {
        try {
          const response = await dispatch(ThunkEditPlaylist(formData, playlistId));
          if (response.errors) {
            setErrors(response.errors);
          } else {
            setLoading(false)

            closeModal();
          }
        } catch (error) {
          console.error("An error occurred:", error.message);
        }
      }
    };

    const loadingClass1 = loading ? "is-loading1" : "not-loading1"



  return (
    <div className="signup-container3">
      {formType === 'Edit' && (
        <div className="new-h1">Edit Playlist</div>
      )}

      {formType === 'Create' && (
        <div className='new-h1'>Create Playlist</div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className='signup-form'>
        {errors.message && <p className="add-playlist-errors all-validation-errors">{errors.message}</p>}
        {errors.name && <p className="add-playlist-errors all-validation-errors">{errors.name}</p>}
        <label className='login-label'>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors.description && <p className="add-playlist-errors all-validation-errors">{errors.description}</p>}
        <label className='login-label'>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <button className="signup-button" type="submit">{formType === 'Create' ? 'Create Playlist' : 'Edit Playlist'}</button>
        <button type="button" className="signup-button" onClick={closeModal}>
          Cancel
        </button>
      </form>
      <div className={loadingClass1}>Loading...</div>
    </div>
  );
}
