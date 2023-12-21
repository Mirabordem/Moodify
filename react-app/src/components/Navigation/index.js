import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from "../OpenModalButton/index";
import NewAlbum from '../NewAlbum';
import toggleSideMenu from './mobileView';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();

	return (
		<div className='nav-container'>
			{sessionUser && (
			<div className='farLeft'>
			<button className='signup-button20' onClick={toggleSideMenu}>
          Menu
        </button>


		<button className='signup-button20' onClick={()=>{

		history.push('/')}}>
          Home
        </button>


			</div>
			)}
			{!sessionUser && (
				<div className='a90Wide'> </div>
			)}
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
