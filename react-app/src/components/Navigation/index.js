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
		  {isLoaded && (
			<div className='nav-profile'>
				{sessionUser ? (


<OpenModalButton
className="new-album"
buttonText="Create Album"
modalComponent={<NewAlbum formType="Create" />}
/>
				) : null}
			  <ProfileButton user={sessionUser} />
			  </div>
		  )}
		  </div>
	  );
	}


	export default Navigation;
