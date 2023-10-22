import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, NavLink, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/index";
import { useModal } from '../../context/Modal';
import "./home.css"

export default function Home() {
let albumId=1
// //get rid of above value when we start dynamic mapping
const playlistIds = useSelector(state => state.user.userPlaylists)
const albums = useSelector(state => state.albums)
const playlists = useSelector(state => state.playlists)

const albumsArray = Object.values(albums)
const albumsSample = []
for (let i = 0; i <= 4; i++) {
    albumsSample.push(albumsArray[i])
}

const playlistsSample = []
for (let id of playlistIds) {
    if (playlistsSample.length <= 4) playlistsSample.push(playlists[id])
}





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
        <div className='card-container sample-container'>
        <div className="cards-list-title">
                <h3>My Playlists</h3>
                <NavLink exact to='/playlists'>All My Playlists</NavLink>
            </div>
            <div className='card-map-div'>
              {playlistCards}
            </div>
        </div>
    </div>



)

}
