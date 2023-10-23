// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import SpotsList from "./components/SpotsList";

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
          <Route path="/">
            <SpotsList />
          </Route>
          <Route path="/spots">

          </Route>
          <Route path="/spots/current">

          </Route>
          <Route path="/spots/:spotId">

          </Route>
          <Route path="/spots/:spotId/edit">

          </Route>
          <Route path="/spots/new">

          </Route>
          <Route>
            404 Page could not be found
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
