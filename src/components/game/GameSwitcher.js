import "../../views/design/styling/custom_button_styling.css";
import useInterval from "../game/useInterval.js";
import React, {useState, useEffect} from 'react';
import Lobby from '../game/Lobby';
import {Spinner} from '../../views/design/Spinner';
import {
    Col,
    Row,
    Container,
    Card,
    ListGroup,
    ListGroupItem,
    CardDeck,
    Button,
    Modal,
    Image,
    ModalBody
} from 'react-bootstrap';
import {api, authApi, handleError} from '../../helpers/api';
import {withRouter, useHistory, Link, useRouteMatch,} from 'react-router-dom';
import PlayerTable from '../shared/models/PlayerTable';
import PlayerModel from "../shared/models/PlayerModel";


function GameSwitcher({
                          currUser,
                          currPlayer_table,
                          updatePlayer_table,
                          orderArray,
                          updateOrderArray,
                          currPlayer,
                          updateCurrPlayer
                      }) {
    const interval = useInterval(async () => {
        //if(loop){

        const playertable_response = await authApi().get(`/games/${currPlayer_table.id}/players`);
        let currPt = new PlayerTable(playertable_response.data);
        updatePlayer_table(currPt);

        const currPlayer_response = await authApi().get(`/games/${currPlayer_table.id}/players/${currUser.id}`);
        let currP = new PlayerModel(currPlayer_response.data);
        updateCurrPlayer(currP);

        var readycounter = 0;
        //readycounter=43;
        //console.log(`allplayersreadyyyyyyyy: ${readycounter}`);
        if (currPlayer_table.players.length > 3) {
            for (let x = 0; x < currPlayer_table.players.length; x++) {
                if (currPlayer_table.players[x].ready == true) {
                    readycounter++;
                }
                /*else{
                    break;
                }*/
            }
            if (currPlayer_table.players.length == readycounter) {
                setAllplayersready(true);
            }
        }

        //console.log(currPlayer_table.players[0].ready);
        if (allplayersready) {
            //setCondition(true);

            correctOrder();
            setLoop(false);
            setHidden(false);
        }
        //}   

    }, 3000);
    const [condition, setCondition] = useState(false);
    const [status, setStatus] = useState(false);
    const [ready_button_text, setReady_button_text] = useState("Ready up");
    const [ready_button_color, setReady_button_color] = useState("success");
    const history = useHistory();
    const [loop, setLoop] = useState(true);
    const [allplayersready, setAllplayersready] = useState(false);
    const [hidden, setHidden] = useState(true);


    function correctOrder() {
        let current_array = [];
        for (let i = 0; i < currPlayer_table.players.length; i++) {
            if (currUser.id === currPlayer_table.players[i].id) {
                current_array[0] = searchbyid(currUser.id);
            }
        }
        for (let i = 0; i < currPlayer_table.players.length - 1; i++) {
            current_array[i + 1] = searchbyid(current_array[i].rightNeighbor);
        }
        updateOrderArray(current_array);
    }

    function searchbyid(id) {
        for (let x = 0; x < currPlayer_table.players.length; x++) {
            if (currPlayer_table.players[x].id == id) {
                let a = new PlayerModel(currPlayer_table.players[x]);
                return a;
            }
        }
    }

    function push() {
        const id = currPlayer_table.id;
        const target = "/game/dashboard/lobby/public/" + id;
        history.push(target);
    }

    function toggleReady() {
        if (status) {
            setStatus(false);
            setReady_button_text("Ready up");
            setReady_button_color("success");
            let justputthis = false; //setStatus doesn't update fast enough, so we just put this one in the requestBody
            const requestBody = JSON.stringify({
                status: justputthis
            })
            authApi().put(`/games/${currPlayer_table.id}/players/${currUser.id}/ready`, requestBody);
        } else {
            setStatus(true);
            setReady_button_text("Unready");
            setReady_button_color("danger");
            let justputthis = true; //setStatus doesn't update fast enough, so we just put this one in the requestBody
            const requestBody = JSON.stringify({
                status: justputthis
            })
            authApi().put(`/games/${currPlayer_table.id}/players/${currUser.id}/ready`, requestBody);
        }
        //TODO: comment this to have a functioning game. this is only here to be able to reach the game screen without actually starting a game
        //setupRole();
        //setShow_rolechoose(true);
    }


    /*switch(condition){
        case false:
            return(
                <Container>
                <p>Waiting for players to join...</p>
                <br></br>
                <Spinner></Spinner>
                <br></br><br></br>
                <Button variant={ready_button_color} onClick={toggleReady}>{ready_button_text}</Button>
                </Container>
            );
        case true:
            return <Lobby></Lobby>;
        
    }*/
    return (
        <Container>
            <p>Waiting for players to join...</p>
            <br></br>
            <Spinner></Spinner>
            <br></br><br></br>
            <Button variant={ready_button_color} onClick={toggleReady}>{ready_button_text}</Button>
            <Button onClick={push} hidden={hidden}>Go to game</Button>
        </Container>
    );
}

export default GameSwitcher;