import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import SideMenu from "./components/SideMenu";
import AlbumDetails from "./components/AlbumDetails";
import Playlists from "./components/Playlists";
import MusicPlayer from "./components/MusicPlayer";
import IndividPlaylist from "./components/IndividPlaylist";
import ProfilePage from "./components/ProfilePage";
import LikedSongs from "./components/LikedSongs";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="container">
      <Navigation isLoaded={isLoaded} />
      <div className="side-menu">
        <SideMenu isLoaded={isLoaded} />
      </div>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          {/* <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          {/* <Route exact path='/albums/new'>
            <NewAlbum />
          </Route> */}
          <Route exact path="/albums/:id">
            <AlbumDetails />
          </Route>
          <Route exact path="/playlists">
            <Playlists />
          </Route>
          {/* <Route path='/playlists/new'>
            <NewPlaylist />
          </Route> */}
          <Route exact path="/likes">
            <LikedSongs />
          </Route>
          <Route exact path="/playlists/:id">
            <IndividPlaylist />
          </Route>
        </Switch>
      )}
      <MusicPlayer />
    </div>
  );
}

export default App;
