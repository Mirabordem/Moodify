import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, NavLink, useParams } from "react-router-dom";
import "./SideMenu.css"


export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`side-menu ${isOpen ? "open" : ""}`}>
      <div className="logo-container">
        <img className="Moodify-logo" src="https://image.jimcdn.com/app/cms/image/transf/none/path/sd0536822daf447dd/image/ic66b618ce0da0dd7/version/1697907185/image.jpg" alt="Your Logo" />
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        Your Library
      </button>
      <ul className="ul-container">
        <li>
          <NavLink to="/playlists">My Playlists</NavLink>
        </li>
        {/* <li>
          <NavLink to="/playlists/:id">Playlists - 1</NavLink>
        </li> */}
        <li>
          <NavLink to="/albums">My Albums</NavLink>
        </li>
      </ul>
    </div>
  );
};

//   const history = useHistory();
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className={`side-menu ${isOpen ? "open" : ""}`}>
//       <NavLink exact to="/">
// 				<img className="Moodify-logo" alt="" src='https://image.jimcdn.com/app/cms/image/transf/none/path/sd0536822daf447dd/image/ic66b618ce0da0dd7/version/1697907185/image.jpg'></img>
// 	  </NavLink>
//       <button className="menu-toggle" onClick={toggleMenu}>
//         Your Library
//       </button>
//       <ul>
//         <li>
//           <Link to="/playlists">All Playlists</Link>
//         </li>
//         <li>
//           <Link to="/playlists/:id">My Playlist</Link>
//         </li>
//       </ul>
//     </div>
//   );
// }
