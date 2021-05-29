import "../../views/design/styling/custom_button_styling.css";
import useInterval from "./useInterval.js";
import React, {useState, useEffect} from 'react';
import Lobby from './Lobby';
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
import Badge from 'react-bootstrap/Badge';
import Popover from 'react-bootstrap/Popover';
import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';


function WaitingRoom({
                          currUser,
                          currPlayer_table,
                          updatePlayer_table,
                          orderArray,
                          updateOrderArray,
                          currPlayer,
                          updateCurrPlayer,
                          tableId,
                          playerId,
                          updateTableId,
                          updatePlayerId
                      }) {
    const interval = useInterval(async () => {
        //if(loop){
        // console.log(`tableid: ${tableId}`);

        let playertable_response;
        playertable_response = await authApi().get(`/games/${tableId}/players`);
        let currPt = new PlayerTable(playertable_response.data);
        updatePlayer_table(currPt);

        let currPlayer_response;
        currPlayer_response = await authApi().get(`/games/${tableId}/players/${playerId}`);
        // console.log(`player: ${currPlayer_response.data}`);
        let currP = new PlayerModel(currPlayer_response.data);
        updateCurrPlayer(currP);

        if (!buffer){
            var readycounter = 0;
            if (currPlayer_table.players.length > 3) {
                for (let x = 0; x < currPlayer_table.players.length; x++) {
                    if (currPlayer_table.players[x].ready == true) {
                        readycounter++;
                    }
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
            const id = tableId;
            const target = "/game/dashboard/lobby/public/" + id;
            history.push(target);
        }
        }
        
        setBuffer(false);
        //}   
    }, 3000);
  
    const [condition, setCondition] = useState(false);
    const [status, setStatus] = useState(false);
    const [ready_button_text, setReady_button_text] = useState("Ready up");
    const [ready_button_color, setReady_button_color] = useState("success");
    const history = useHistory();
    const [loop, setLoop] = useState(true);
    const [allplayersready, setAllplayersready] = useState(false);
    const [buffer, setBuffer] = useState(true);

    const game_information = (
        <Popover id="role-info_popover">
            {/* <Popover.Title id="role-info_popover_title"><b>title</b></Popover.Title> */}
            <Popover.Content id="role-info_popover_content">
                You need atleast 4 players and atmost 7 players to start a game
            </Popover.Content>
        </Popover>
    )


    function correctOrder() {
        let current_array = [];
        for (let i = 0; i < currPlayer_table.players.length; i++) {
            if (playerId === currPlayer_table.players[i].id) {
                current_array[0] = searchbyid(playerId);
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

    function toggleReady() {
        if (status) {
            setStatus(false);
            setReady_button_text("Ready up");
            setReady_button_color("success");
            let justputthis = false; //setStatus doesn't update fast enough, so we just put this one in the requestBody
            const requestBody = JSON.stringify({
                status: justputthis
            })
            authApi().put(`/games/${tableId}/players/${playerId}/ready`, requestBody);
        } else {
            setStatus(true);
            setReady_button_text("Unready");
            setReady_button_color("danger");
            let justputthis = true; //setStatus doesn't update fast enough, so we just put this one in the requestBody
            const requestBody = JSON.stringify({
                status: justputthis
            })
            authApi().put(`/games/${tableId}/players/${playerId}/ready`, requestBody);
        }
        localStorage.removeItem("cards");
    }
     function leave(){
        authApi().delete(`/games/${tableId}/players/${playerId}`);
        updatePlayerId(null);
        updateTableId(null);
        history.push("/game/dashboard");
     }

    return (
        <Container>
            <br/>
            
            <br/><br/>
            
            {!currPlayer_table || !currPlayer ? (
                <p style={{textAlign:"center"}}><Spinner/><br/><b>Loading...</b></p>
            ) : (
                <>
                {currPlayer_table.gameStatus=="ONGOING" ? (
                    <>
                    
                    <p style={{textAlign:"center"}}><Spinner/><br/><b>Game in progress. Redirecting...</b></p>
                    </>
                ) : (
                    <>
                    <p style={{textAlign:"center", fontSize:50}}><b>Waiting for players to join...</b><br/><Spinner/></p>
            
                    {
                        <ListGroup>
                        <ListGroup.Item>
                            <Row>
                                <Col>Username</Col>
                                <Col>Status</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item variant="primary">
                                <Row>
                                    <Col>{currPlayer.user}</Col>
                                    <Col>{currPlayer.ready ? <Badge variant="success">Ready</Badge> : <Badge variant="danger">Not ready</Badge>}</Col>
                                </Row>
                            </ListGroup.Item>
    
                        {
                            // removing logged in user as they already are in the list
                            currPlayer_table.players.filter((player) => player.user != currPlayer.user)
                            .map((player) => (
                                    <ListGroup.Item key={player.id}>
                                        <Row>
                                            <Col>{player.user}</Col>
                                            <Col>{player.ready ? <Badge variant="success">Ready</Badge> : <Badge variant="danger">Not ready</Badge>}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                    </ListGroup>}
                    
                    <br></br>
                    <Button variant={ready_button_color} disabled={currPlayer_table.gameStatus=="ONGOING"} onClick={toggleReady}>{ready_button_text}</Button>
                    <Button onClick={leave} variant="danger">Leave game</Button>
                    <OverlayTrigger trigger="click" placement="right" overlay={game_information} rootClose>
                        <Button id="custombutton">Info</Button>
                    </OverlayTrigger>
                    </>
                )}
                </>
            )}
            
        </Container>
    );
}

export default WaitingRoom;