import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import NewPlaylist from "../NewPlaylist";
import OpenModalButton from "../OpenModalButton/index";
import "./SideMenu.css";
import IndividPlaylistButton from "./IndividPlaylistButton";

export default function SideMenu() {

  const [openPlaylistId,setOpenPlaylistId]=useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  const handlePlaylistButtonClick = (playlistId) => {
    if (openPlaylistId === playlistId) {
      setOpenPlaylistId(null);
    } else {
      setOpenPlaylistId(playlistId);
    }
  };



  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const user = useSelector((state) => state.session.user);
  const playlists = useSelector((state) => state.playlists);

  const dispatch = useDispatch();

  useEffect(() => {}, [user]);

  useEffect(() => {}, [playlists]);

  if (user) {
    console.log(Object.values(user.userPlaylists));
  }

  let likedSongs = null;

  if (user?.likedSongs.length) {
    likedSongs = (
      <NavLink to="/likes">
        <li>Liked Songs</li>
      </NavLink>
    );
  }

  let userPlaylists = [];
  if (user?.userPlaylists) {
    userPlaylists = Object.values(user.userPlaylists);
    console.log(userPlaylists);
  }

  const userPlaylistMap = userPlaylists.map((id) => {
    if (playlists[id]?.name) {
      return (
        <div key={id} className="playlist-menu-container">
          <div>
            <IndividPlaylistButton  playlistId={id} isOpen={openPlaylistId === id}  handlePlaylistButtonClick={() => handlePlaylistButtonClick(id)}/>
          </div>
          <NavLink to={`/playlists/${id}`}>
            <li className="li1">{playlists[id]?.name}</li>
          </NavLink>
        </div>
      );
    }
  });

  let sideMenuOptions = null;
  if (user) {
    sideMenuOptions = (
      <div>
        <button className="menu-toggle" onClick={toggleMenu}>
          Your Library
        </button>
        <ul className="ul-container">
          {/* <li>
          <NavLink to="/albums" className="loved-songs">
            <i className="fas fa-music"></i>
            My Albums
          </NavLink>
        </li> */}

          <li>
            <NavLink to="/likes" className="loved-songs">
              <i className="fas fa-heart"></i> Loved Songs
            </NavLink>
          </li>
          <li className="playlist-heather">
            <i className="fas fa-list"></i> My Playlists
            {sessionUser?.id && (
              <OpenModalButton
                className="new-album-playlist1"
                buttonText={
                  <span
                    style={{
                      color: "rgb(95, 195, 146)",
                      marginLeft: "8px",
                      fontSize: "22px",
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "rgb(166, 149, 157)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "rgb(95, 195, 146)";
                    }}
                  >
                    +
                  </span>
                }
                modalComponent={
                  <NewPlaylist formType="Create" userId={sessionUser.id} />
                }
              />
            )}
          </li>
          <div className="horizontal-line4"></div>
        </ul>
        <ul>{userPlaylistMap}</ul>
      </div>
    );
  }

  return (
    <div className={`side-menu ${isOpen ? "open" : ""}`}>
      <div className="logo-container">
        <NavLink exact to="/">
          <img
            className="Moodify-logo"
            alt=""
            src="https://image.jimcdn.com/app/cms/image/transf/none/path/sd0536822daf447dd/image/ic66b618ce0da0dd7/version/1697907185/image.jpg"
          />
        </NavLink>
      </div>
      {sideMenuOptions}
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useHistory, NavLink, useParams } from "react-router-dom";
// import { getAllAlbums } from "../../store/albums";
// import { getAllPlaylists } from "../../store/playlists";
// import { getAllSongs } from "../../store/songs";
// import fetchAll from "../utils";
// import NewPlaylist from "../NewPlaylist";
// import OpenModalButton from "../OpenModalButton/index";
// import "./SideMenu.css";
// import IndividPlaylistButton from './IndividPlaylistButton';
// import { ThunkCreatePlaylist, ThunkEditPlaylist } from "../../store/playlists";

// export default function SideMenu() {
//   const [isOpen, setIsOpen] = useState(false);
//   const sessionUser = useSelector((state) => state.session.user);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const user = useSelector((state) => state.session.user);
//   const playlists = useSelector((state) => state.playlists);

//   const dispatch = useDispatch();

//   useEffect(() => {}, [user]);

//   useEffect(() => {}, [playlists]);

//   if (user) {
//     console.log(Object.values(user.userPlaylists));
//   }

//   let likedSongs = null;

//   if (user?.likedSongs.length) {
//     likedSongs = (
//       <NavLink to="/likes">
//         <li>Liked Songs</li>
//       </NavLink>
//     );
//   }

//   // if (user?.userPlaylists) {
//   //   let userPlaylists = Object.values(user.userPlaylists);
//   // } else {
//   //   let userPlaylists = null;
//   // }

//   let userPlaylists = [];
//   if (user?.userPlaylists) {
//     userPlaylists = Object.values(user.userPlaylists);
//     console.log(userPlaylists);
//   }

//   const userPlaylistMap = userPlaylists.map((id) => {
//     if (playlists[id]?.name) {
//       return (
//         <NavLink key={id} to={`/playlists/${id}`}>
//           <li>{playlists[id]?.name}</li>
//         </NavLink>
//       );
//     }
//   });

//   return (
//     <div className={`side-menu ${isOpen ? "open" : ""}`}>
//       <div className="logo-container">
//         <NavLink exact to="/">
//           <img
//             className="Moodify-logo"
//             alt=""
//             src="https://image.jimcdn.com/app/cms/image/transf/none/path/sd0536822daf447dd/image/ic66b618ce0da0dd7/version/1697907185/image.jpg"
//           />
//         </NavLink>
//       </div>
//       <button className="menu-toggle" onClick={toggleMenu}>
//         Your Library
//       </button>
//       <ul className="ul-container">
//         <li>
//           <NavLink to="/playlists">
//             <i className="fas fa-list"></i> My Playlists
//           </NavLink>
//           {sessionUser?.id && (
//             <OpenModalButton
//               className="new-album-playlist"
//               buttonText="+"
//               modalComponent={
//                 <NewPlaylist formType="Create" userId={sessionUser.id} />
//               }
//             />
//           )}
//         </li>
//         <li>
//           <NavLink to="/albums">
//             <i className="fas fa-music"></i>
//             My Albums
//           </NavLink>
//         </li>
//       </ul>
//       {
//         <ul>
//           {likedSongs}
//           {userPlaylistMap}
//         </ul>
//       }

//     </div>
//   );
// }
