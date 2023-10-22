import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, NavLink, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/index";
import { useModal } from '../../context/Modal';
import "./home.css"

export default function Home() {
let albumId=1
//get rid of above value when we start dynamic mapping

return (

    <div className='main_window_container'>

    <h1 className='homeText'>THIS IS THE HOME COMPONENT</h1>
     <p>
        1. albums
        2. side menu:  button- my playlist, 
     </p>
    <div className='link-container'>

    <Link to={`/albums/${albumId}`}>im an album click me</Link>
    </div>

    </div>



)

}
