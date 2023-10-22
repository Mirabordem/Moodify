import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from "../OpenModalButton/index";
import NewAlbum from '../NewAlbum';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-container'>
			{/* <NavLink exact to="/">
				<img className="Moodify-logo" alt="" src='https://image.jimcdn.com/app/cms/image/transf/none/path/sd0536822daf447dd/image/ic66b618ce0da0dd7/version/1697907185/image.jpg'></img>
			</NavLink> */}
		  {isLoaded && (
			<div className='nav-profile'>
				{sessionUser ? (
					

<OpenModalButton
className="new-album"
buttonText="Create Album"
modalComponent={<NewAlbum/>}
/>
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
