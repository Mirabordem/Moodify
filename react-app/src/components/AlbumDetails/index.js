import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, NavLink, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/index";
import { useModal } from '../../context/Modal';
import "./albumDetails.css"


export default function AlbumDetails() {


    return (
        <div className='main_window_container'>
        <h1>THIS IS THE ALBUMDETAILS COMPONENT</h1>
        </div>
    )

    }
