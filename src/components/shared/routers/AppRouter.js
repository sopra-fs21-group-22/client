import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import Register from "../../register/Register";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../login/Login";
import ProfilePage from "../../game/ProfilePage";
import Header from "../../../views/Header";
import User from "../models/User";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
function AppRouter() {

  const [user, setUser] = useState(null);

  const updateUser = (newUser) => {
    setUser(newUser);
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    console.log("USERDATA");
    const currentUser = new User(userData);

    console.log(currentUser);
    if (currentUser) {
      updateUser(currentUser);
    } else {
      console.log("Not updating user.");
    }
  }, [])

  return (
    <BrowserRouter>
      <Header user={user} updateUser={updateUser} height={"100"} />
      <Switch>
        <div>
          <Route
            path="/game"
            render={() => (
              <GameGuard>
                <GameRouter currUser={user} base={"/game"} />
              </GameGuard>
            )}
          />
          <Route
            path="/login"
            exact
            render={() => (
              <LoginGuard>
                <Login user={user} updateUser={updateUser} />
              </LoginGuard>
            )}
          />
          <Route
            path="/register"
            exact
            render={() => (
              <LoginGuard>
                <Register user={user} />
              </LoginGuard>
            )}
          />
          <Route path="/" exact render={() => <Redirect to={"/game"} />} />
          <Route path="/game/dashboard/:id" component={ProfilePage} />
        </div>
      </Switch>
    </BrowserRouter>
  );

}
/*
* Don't forget to export your component!
 */
export default AppRouter;
