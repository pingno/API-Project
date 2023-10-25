// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import SpotsList from "./components/SpotsList";
import SpotDetails from "./components/SpotDetails";
import CreateSpot from "./components/CreateSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route exact path="/">
            <SpotsList />
          </Route>

          <Route exact path="/spots/new">
            <CreateSpot />
          </Route>

          <Route exact path="/spots/:spotId">
            <SpotDetails />
          </Route>

          <Route path="/spots/:spotId/edit">

          </Route>

         
          <Route>404 Page could not be found</Route>
        </Switch>
      )}
    </>
  );
}

export default App;
