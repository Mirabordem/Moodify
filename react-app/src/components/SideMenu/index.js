import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, NavLink, useParams } from "react-router-dom";
import "./SideMenu.css"


export default function SideMenu() {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`side-menu ${isOpen ? "open" : ""}`}>
      <NavLink exact to="/">
				<img className="Moodify-logo" alt="" src='https://image.jimcdn.com/app/cms/image/transf/none/path/sd0536822daf447dd/image/ic66b618ce0da0dd7/version/1697907185/image.jpg'></img>
	  </NavLink>
      <button className="menu-toggle" onClick={toggleMenu}>
        Your Library
      </button>
      <ul>
        <li>
          <Link to="/playlists">All Playlists</Link>
        </li>
        <li>
          <Link to="/playlists/:id">My Playlist</Link>
        </li>
      </ul>
    </div>
  );
}

// export default function SideMenu() {
//     const history = useHistory()

//     return (
//         <div className="side-menu" >

//         <h1>THIS IS THE SIDEMENU COMPONENT</h1>

//         <li>
//             <button onClick={(e)=>{
//                  history.push('/playlists/all');

//             }}
//             > All Playlists</button>
//         <li>
//         <button onClick={(e)=>{
//                  history.push('/playlists/1');

//             }}
//             > replace w/ individ playlist</button>
//         </li>
//         </li>
//         </div>
//     )

//     }
