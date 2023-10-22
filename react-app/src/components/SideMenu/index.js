import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, NavLink, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/index";
import { useModal } from "../../context/Modal";
import "./sideMenu.css"





export default function SideMenu() {
    const history = useHistory()


    return (
        <div className="side-menu">

        <h1>THIS IS THE SIDEMENU COMPONENT</h1>

        <li>
            <button onClick={(e)=>{
                 history.push('/playlists/all');

            }}
            > All Playlists</button>
        <li>
        <button onClick={(e)=>{
                 history.push('/playlists/1');

            }}
            > replace w/ individ playlist</button>
        </li>
        </li>
        </div>
    )

    }
