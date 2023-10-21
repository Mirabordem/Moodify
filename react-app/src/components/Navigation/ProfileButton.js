import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div>
      <button className="profile-button" onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
           <div className="dropdown">
           <p className="text">
             Hello, <strong>{user.username}!</strong>
           </p>
           <p className="email"> {user.email}</p>
           {/* <NavLink
             style={{ color: "black", textDecoration: "none" }}
             onClick={closeMenu}
             to="/user/:id/profile"
           >
             <div className="link">
                Your profile
             </div>
           </NavLink> */}
           <div className="line"></div>
           <button className="logout-button" onClick={handleLogout}>
             Log Out
           </button>
         </div>
       ) : (
         <div>
           <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
         </div>
       )}
     </div>
   </div>
 );
}

//           <>
//             <li>{user.username}</li>
//             <li>{user.email}</li>
//             <li>
//               <button onClick={handleLogout}>Log Out</button>
//             </li>
//           </>
//         ) : (
//           <>
//             <OpenModalButton
//               buttonText="Log In"
//               onItemClick={closeMenu}
//               modalComponent={<LoginFormModal />}
//             />

//             <OpenModalButton
//               buttonText="Sign Up"
//               onItemClick={closeMenu}
//               modalComponent={<SignupFormModal />}
//             />
//           </>
//         )}
//       </ul>
//     </>
//   );
// }

export default ProfileButton;
