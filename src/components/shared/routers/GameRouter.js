import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {Redirect, Route} from "react-router-dom";
import GameDashboard from "../../game/GameDashboard";
import ProfilePage from "../../game/ProfilePage";
import ProfilePageEdit from "../../game/ProfilePageEdit";
import Lobby from "../../game/Lobby";
import WaitingRoom from "../../game/WaitingRoom";
import "../../../views/design/styling/lobby_styling.css";


const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

function GameRouter({currUser, base, updateUser, currPlayer_table, updatePlayer_table, tableId, updateTableId, playerId, updatePlayerId}) {

    /**
     * "base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
     */
    const [orderArray, setOrderArray] = useState([]);
    const [currPlayer, setCurrPlayer] = useState();
    const updateOrderArray = (newarray) => {
        setOrderArray(newarray);
    }
    const updateCurrPlayer = (currPlayer) => {
        setCurrPlayer(currPlayer);
    }
    
    return (
        <>
            <Route
                exact
                path={`${base}/dashboard`}
                render={() => <GameDashboard currUser={currUser} currPlayer_table={currPlayer_table}
                                             updatePlayer_table={updatePlayer_table}
                                             updatePlayerId={updatePlayerId}
                                             updateTableId={updateTableId}
                                             tableId={tableId} playerId={playerId}/>}
            />

            <Route
                exact
                path={`${base}`}
                render={() => <Redirect to={`${base}/dashboard`}/>}
            />
            <Route
                exact
                path={`${base}/dashboard/`}
                render={() => <Redirect to={`${base}/dashboard`}/>}
            />
            <Route
                path={`${base}/dashboard/:id`}
                exact
                component={() => <ProfilePage currUser={currUser}/>}
            />
            <Route
                path={`${base}/dashboard/:id/edit`}
                exact
                component={() => <ProfilePageEdit updateUser={updateUser} currUser={currUser}/>}
            />
            <Route
                exact
                path={`${base}/dashboard/lobby/:publicorprivate/:id`}
                render={() => <Lobby currUser={currUser} currPlayer_table={currPlayer_table}
                                     updatePlayer_table={updatePlayer_table} orderArray={orderArray}
                                     updateOrderArray={updateOrderArray} currPlayer={currPlayer}
                                     updateCurrPlayer={updateCurrPlayer}
                                     updatePlayerId={updatePlayerId}
                                     updateTableId={updateTableId}/>}
            />
            <Route
                exact
                path={`${base}/dashboard/lobby/:publicorprivate/waiting/:id`}
                render={() => <WaitingRoom currUser={currUser} currPlayer_table={currPlayer_table}
                                            updatePlayer_table={updatePlayer_table} orderArray={orderArray}
                                            updateOrderArray={updateOrderArray} currPlayer={currPlayer}
                                            updateCurrPlayer={updateCurrPlayer}
                                            tableId={tableId}
                                            playerId={playerId}
                                            updateTableId={updateTableId}
                                            updatePlayerId={updatePlayerId}/>}
            />

        </>
    );
}

/*
* Don't forget to export your component!
 */
export default GameRouter;
