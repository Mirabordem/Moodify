import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-container'>
			<NavLink exact to="/">
				<img className="Moodify-logo" alt="" src=''></img>
			</NavLink>
		  {isLoaded && (
			<div className='nav-profile'>
				{sessionUser ? (
					<NavLink className='new-album' to='/albums/new'>
						Create Album
					</NavLink>
				) : null}
			  <ProfileButton user={sessionUser} />
			  </div>
		  )}
		  </div>
	  );
	}

	export default Navigation;



// 	return (
// 		<ul>
// 			<li>
// 				<NavLink exact to="/">Home</NavLink>
// 			</li>
// 			{isLoaded && (
// 				<li>
// 					<ProfileButton user={sessionUser} />
// 				</li>
// 			)}
// 		</ul>
// 	);
// }

// export default Navigation;
