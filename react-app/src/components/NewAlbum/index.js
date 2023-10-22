import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, NavLink, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/index";
import { useModal } from '../../context/Modal';
import './newAlbum.css'




export default function NewAlbum() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [albumCover,setAlbumCover] = useState(null)
    const [errors, setErrors] = useState([]);

    const handleAlbumCoverChange = (e) => {
        setAlbumCover(e.target.files[0]);
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch((email, password));
        if (data) {
          setErrors(data);
        }
      };


    return (

        <div className="newAlbum-container">
      <h1 className='h1'>Create Album</h1>
      <form onSubmit={handleSubmit} className='newAlbum-form'>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className='caLabel'>
          Title
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className='caLabel'>
          Release Date
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          </label>
          <label className='caLabel'>
          Artist
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          </label>
          <label className='caLabel'>
            Album Cover


          <input
            type="file"
            value={email}
            onChange={handleAlbumCoverChange}
            accept='image/*'
            required
          />
        </label>

        <button type="submit">Create Album</button>
      </form>
      </div>




    )

    }
