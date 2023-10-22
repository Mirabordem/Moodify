import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Home from './components/Home'
import SideMenu from './components/Home'
import AlbumDetails from './components/Home'
import Playlists from './components/Playlists'
import MusicPlayer from './components/MusicPlayer'


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="container">
      <Navigation isLoaded={isLoaded} />
      <SideMenu isLoaded={isLoaded} />
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
          <Route exact path='/playlists'>
          <Playlists />

          </Route>
        </Switch>
      )}

      <MusicPlayer />
    </>

  );
}
</div>
export default App;
