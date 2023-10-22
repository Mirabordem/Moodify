import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, NavLink, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/index";
import { useModal } from '../../context/Modal';
import './MusicPlayer.css';





export default function MusicPlayer() {


    return (
        <div className='musicPlayer'>
        <h1>THIS IS THE MUSICPLAYER COMPONENT</h1>
        </div>
    )

    }
