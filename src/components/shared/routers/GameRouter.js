import React from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import GameDashboard from "../../game/GameDashboard";
import ProfilePage from "../../game/ProfilePage";
import ProfilePageEdit from "../../game/ProfilePageEdit";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

function GameRouter({ currUser, base, updateUser }) {

  /**
   * "base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
   */
  return (
    <Container>
      <Route
        exact
        path={`${base}/dashboard`}
        render={() => <GameDashboard currUser={currUser} />}
      />

      <Route
        exact
        path={`${base}`}
        render={() => <Redirect to={`${base}/dashboard`} />}
      />
      <Route
        exact
        path={`${base}/dashboard/`}
        render={() => <Redirect to={`${base}/dashboard`} />}
      />
      <Route
        path={`${base}/dashboard/:id`}
        exact
        component={() => <ProfilePage currUser={currUser} />}
      />
      <Route
        path={`${base}/dashboard/:id/edit`}
        exact
        component={() => <ProfilePageEdit updateUser={updateUser} currUser={currUser} />}
      />
    </Container>
  );
}
/*
* Don't forget to export your component!
 */
export default GameRouter;
