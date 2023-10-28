import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import NewPlaylist from "../NewPlaylist";
import OpenModalButton from "../OpenModalButton/index";
import "./SideMenu.css";
import IndividPlaylistButton from "./IndividPlaylistButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";


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

//   let userPlaylists = [];
//   if (user?.userPlaylists) {
//     userPlaylists = Object.values(user.userPlaylists);
//     console.log(userPlaylists);
//   }

//   const userPlaylistMap = userPlaylists.map((id) => {
//     if (playlists[id]?.name) {
//       return (
//         <div key={id} className="playlist-menu-container">
//           <div>
//             <IndividPlaylistButton user={user} playlistId={id} />
//           </div>
//           <NavLink to={`/playlists/${id}`}>
//             <li className="li1">{playlists[id]?.name}</li>
//           </NavLink>
//         </div>
//       );
//     }
//   });

//   let sideMenuOptions = null;
//   if (user) {
//     sideMenuOptions = (
//       <div>
//         <button className="menu-toggle" onClick={toggleMenu}>
//           Your Library
//         </button>
//         <ul className="ul-container">
//           {/* <li>
//           <NavLink to="/albums" className="loved-songs">
//             <i className="fas fa-music"></i>
//             My Albums
//           </NavLink>
//         </li> */}

//           <li>
//             <NavLink to="/likes" className="loved-songs">
//               <i className="fas fa-heart"></i> Loved Songs
//             </NavLink>
//           </li>
//           <li className="playlist-heather">
//             <i className="fas fa-list"></i> My Playlists
//             {sessionUser?.id && (
//               <OpenModalButton
//                 className="new-album-playlist1"
//                 buttonText={
//                   <span
//                     style={{
//                       color: "rgb(95, 195, 146)",
//                       marginLeft: "8px",
//                       fontSize: "22px",
//                       transition: "color 0.3s",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.target.style.color = "rgb(166, 149, 157)";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.target.style.color = "rgb(95, 195, 146)";
//                     }}
//                   >
//                     +
//                   </span>
//                 }
//                 modalComponent={
//                   <NewPlaylist formType="Create" userId={sessionUser.id} />
//                 }
//               />
//             )}
//           </li>
//           <div className="horizontal-line4"></div>
//         </ul>
//         <ul>{userPlaylistMap}</ul>
//       </div>
//     );
//   }

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
//       <button className="side-login">
//           OPEN MOODIFY
//       </button>
//       {sideMenuOptions}
//     </div>
//   );
// }


















export default function SideMenu() {

  const [openPlaylistId,setOpenPlaylistId]=useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false)
  const sessionUser = useSelector((state) => state.session.user);
  const ulRef = useRef();

  const showProfileMenu = useSelector((state) => state.session.showProfileMenu); // Change to match your store state
  const dispatch = useDispatch();

  const handlePlaylistButtonClick = (playlistId) => {
    if (openPlaylistId === playlistId) {
      setOpenPlaylistId(null);
    } else {
      setOpenPlaylistId(playlistId);
    }
  };



  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };



  const user = useSelector((state) => state.session.user);
  const playlists = useSelector((state) => state.playlists);
  const menuDispatch = useDispatch();

  // useEffect(() => {}, [user]);

  // useEffect(() => {}, [playlists]);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);
  const ulClassName = "profile-dropdown1" + (showMenu ? "" : " hidden");

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
        <button className="menu-toggle">
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
      {!user &&
         <button className="side-login" onClick={toggleMenu}>
        Open Moodify
      </button>
      }
      <div className="profile-small-button1">
       <div className={ulClassName} ref={ulRef}>
          <div className="profile-small-button">
           <OpenModalButton
              buttonText={<><span className="menu-icon"><FontAwesomeIcon icon={faSignInAlt} /></span> Login</>}
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
          </div>
          <div className="horizontal-line1"></div>
          <div className="profile-small-button">
            <OpenModalButton
              buttonText={<><span className="menu-icon"><FontAwesomeIcon icon={faUserPlus} /></span> Sign Up</>}
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            </div>
         </div>
         </div>

      {sideMenuOptions}
    </div>
  );
}
