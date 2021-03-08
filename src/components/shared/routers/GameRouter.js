import React from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import Game from "../../game/Game";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

function GameRouter({ currUser, base }) {

  /**
   * "base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
   */
  return (
    <Container>
      <Route
        exact
        path={`${base}/dashboard`}
        render={() => <Game currUser={currUser} />}
      />

      <Route
        exact
        path={`${base}`}
        render={() => <Redirect to={`${base}/dashboard`} />}
      />
    </Container>
  );
}
/*
* Don't forget to export your component!
 */
export default GameRouter;
