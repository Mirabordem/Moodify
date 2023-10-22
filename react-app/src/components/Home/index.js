import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, NavLink, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/index";
import { useModal } from '../../context/Modal';
import "./home.css"
import { thunkGetAllAlbums } from "../../store/albums";

export default function Home() {
const albums = useSelector(state => state.albums)
const dispatch = useDispatch()

const albumsArray = Object.values(albums)

if (!albumsArray.length) {
   dispatch(thunkGetAllAlbums())
   return null
}

const albumCards = albumsArray.map(album =>{
    return (
        <NavLink
        className="card sample-card album-card"
        key={album.id}
        exact to={`albums/${album.id}`}
        >
            <div className="card-image-container">
                <img src={album.coverImageUrl}/>
            </div>
            <div className="card-info-container">
                <p>{album.title}</p>
                <p>{album.artist}</p>
            </div>
        </NavLink>
    )
});

return (

    <div className='main_window_container'>

        <h1 className='homeText'>Welcome to Moodify!</h1>
        <div className='card-container cample-container'>
            <div className="cards-list-title">
                <h3>Albums</h3>
                <NavLink exact to='/albums'>All albums</NavLink>
            </div>
            <div className='card-map-div'>
                {albumCards}
            </div>
        </div>
    </div>



)

}
