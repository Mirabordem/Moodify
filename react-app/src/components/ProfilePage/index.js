import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, NavLink, useParams } from "react-router-dom";
import "./ProfilePage.css"



export default function ProfilePage() {
    // const playlistIds = useSelector(state => state.user.userPlaylists)
    // const albums = useSelector(state => state.albums)
    // const playlists = useSelector(state => state.playlists)

    // const albumsArray = Object.values(albums)
    // const albumsSample = []
    // for (let i = 0; i <= 4; i++) {
    //     albumsSample.push(albumsArray[i])
    // }

    // const playlistsSample = []
    // for (let id of playlistIds) {
    //     if (playlistsSample.length <= 4) playlistsSample.push(playlists[id])
    // }

    // const albumCards = albumsSample.map(album =>{
    //     return (
    //         <NavLink
    //         className="card sample-card album-card"
    //         key={album.id}
    //         exact to={`albums/${album.id}`}
    //         >
    //             <div className="card-image-container">
    //                 <img src={album.coverImageUrl}/>
    //             </div>
    //             <div className="card-info-container">
    //                 <p>{album.title}</p>
    //                 <p>{album.artist}</p>
    //             </div>
    //         </NavLink>
    //     )
    // });

    // const playlistCards = playlistsSample.map(playlist =>{
    //     return (
    //         <NavLink
    //         className="card sample-card playlists-card"
    //         key={playlist.id}
    //         exact to={`playlistss/${playlist.id}`}
    //         >
    //             <div className="card-image-container">
    //                 <img src={playlist.coverImageUrl}/>
    //             </div>
    //             <div className="card-info-container">
    //                 <p>{playlist.name}</p>
    //                 {/* playlist description preview? */}
    //                 {/* number of tracks? */}
    //             </div>
    //         </NavLink>
    //     )
    // });




    return (

        <div className='main_window_container'>

            <h1 className='profile-header'>Profile-page</h1>
            {/* <div className='card-container cample-container'>
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
            </div> */}
        </div>



    )

    }
