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
