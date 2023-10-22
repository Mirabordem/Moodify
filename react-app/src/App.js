import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Home from './components/Home'
import SideMenu from './components/SideMenu'
import AlbumDetails from './components/AlbumDetails'
import Playlists from './components/Playlists'
import MusicPlayer from './components/MusicPlayer'
import IndividPlaylist from './components/IndividPlaylist'
import './components/SideMenu/sideMenu.css'


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="container">
      <Navigation isLoaded={isLoaded} />
      <div className='side-menu'>
      <SideMenu isLoaded={isLoaded} />
      </div>
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/albums/:id'>
            <AlbumDetails />
          </Route>
          <Route exact path='/playlists/all'>
            <Playlists />
          </Route>
          <Route exact path='/playlists/:id'>
            <IndividPlaylist />


          </Route>
        </Switch>
      )}

      <MusicPlayer />
    </div>
  );
}

export default App;
