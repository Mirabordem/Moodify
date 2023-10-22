import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from "../OpenModalButton/index";

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




