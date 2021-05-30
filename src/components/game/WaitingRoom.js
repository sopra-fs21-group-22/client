import "../../views/design/styling/custom_button_styling.css";
import "../../views/design/styling/lobby_styling.css";
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
    ModalBody, Tooltip, Carousel, CarouselItem
} from 'react-bootstrap';
import {api, authApi, handleError} from '../../helpers/api';
import {withRouter, useHistory, Link, useRouteMatch,} from 'react-router-dom';
import PlayerTable from '../shared/models/PlayerTable';
import PlayerModel from "../shared/models/PlayerModel";
import Badge from 'react-bootstrap/Badge';
import Popover from 'react-bootstrap/Popover';
import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import QuickGuide from "../../views/design/QuickGuide";


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

        if (!buffer) {
            if (currPlayer_table.players.length === everybodyReady(currPlayer_table)) {
                setAllplayersready(true);
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
    const [show_Guide, setShow_Guide] = useState(false);

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

    function everybodyReady(currPlayer_table) {
        let readycounter = 0;
        if (currPlayer_table.players.length > 3) {
            for (let x = 0; x < currPlayer_table.players.length; x++) {
                if (currPlayer_table.players[x].ready == true) {
                    readycounter++;
                }
            }
        }
        return readycounter;
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

    function leave() {
        authApi().delete(`/games/${tableId}/players/${playerId}`);
        updatePlayerId(null);
        updateTableId(null);
        history.push("/game/dashboard");
    }

    function openGuide() {
        setShow_Guide(true);
    }

    function closeGuide() {
        setShow_Guide(false);
    }

    const quick_guide_tip = (
        <Tooltip id="guide-tooltip">Already read the <b>"Quick Guide"?</b> It helps understanding the game in just a few
            steps!</Tooltip>
    )

    return (
        <Container>
            <br/>

            <br/><br/>

            {(!currPlayer_table || !currPlayer || currPlayer_table.gameStatus === "ENDED") ? (
                <p style={{textAlign: "center"}}><Spinner/><br/><b>Loading...</b></p>
            ) : (
                <>
                    {currPlayer_table.gameStatus === "ONGOING" ? (
                        <p style={{textAlign: "center"}}><Spinner/><br/><b>Game in progress. Redirecting...</b></p>
                    ) : (
                        <>
                            <p style={{textAlign: "center"}}>
                                {currPlayer_table.players.length < 4 ? (
                                    <>
                                        <Spinner/><br/><b>Waiting for players to join...</b><br/>
                                    </>
                                ) : (
                                    <>
                                        {currPlayer_table.players.length !== everybodyReady(currPlayer_table) ? (
                                            <>
                                                <Spinner/><br/><b>Waiting for everybody to be ready...</b><b/>
                                            </>
                                        ) : (
                                            <b>Ready!</b>
                                        )}
                                    </>
                                )}
                            </p>
                            <br/>
                            {<ListGroup>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Username</Col>
                                        <Col>Status</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item variant="primary">
                                    <Row>
                                        <Col>{currPlayer.user}</Col>
                                        <Col>{currPlayer.ready ? <Badge variant="success">Ready</Badge> :
                                            <Badge variant="danger">Not ready</Badge>}</Col>
                                    </Row>
                                </ListGroup.Item>

                                {
                                    // removing logged in user as they already are in the list
                                    currPlayer_table.players.filter((player) => player.user != currPlayer.user).map((player) => (
                                        <ListGroup.Item key={player.id}>
                                            <Row>
                                                <Col>{player.user}</Col>
                                                <Col>{player.ready ?
                                                    <Badge variant="success">Ready</Badge> :
                                                    <Badge variant="danger">Not ready</Badge>}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>}
                            <br/>
                            <p style={{textAlign: "right"}}>
                                {currPlayer_table.players.length < 4 ? (
                                    <span style={{border: "solid", padding: "10px"}}>
                                        <b>{currPlayer_table.players.length}/7</b> players are in this lobby, at least four are necessary!
                                    </span>
                                ) : (currPlayer_table.players.length === 7 ? (
                                    <span style={{border: "solid", padding: "10px"}}>
                                        <b>{currPlayer_table.players.length}/7</b> players are in this lobby, the lobby is full!
                                    </span>
                                    ) : (
                                        <span style={{border: "solid", padding: "10px"}}>
                                            <b>{currPlayer_table.players.length}/7</b> players are in this lobby
                                        </span>
                                    )
                                )}
                            </p>

                            <OverlayTrigger trigger="hover" placement="top" overlay={quick_guide_tip}>
                                <Button variant={ready_button_color}
                                        disabled={currPlayer_table.gameStatus === "ONGOING"}
                                        onClick={toggleReady}>{ready_button_text}</Button>
                            </OverlayTrigger>
                            <div className="lobby-divider"/>
                            <Button onClick={leave} variant="danger">Leave game</Button>
                            <div className="lobby-divider"/>
                            <Button onClick={openGuide} variant="dark">Quick Guide</Button>
                        </>
                    )}
                </>
            )}
            {<Modal show={show_Guide} centered animation size="lg" backdrop="static" keyboard={false}
                    animation>
                <Modal.Header id="chosen-role_modal_header">
                    <Modal.Title id="carousel-header" centered>
                        Quick Guide
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body id="chosen-role_modal_body" centered>
                    <QuickGuide/>
                </Modal.Body>
                <Modal.Footer id="chosen-role_modal_footer">
                    <Button id="custombutton" onClick={closeGuide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>}
        </Container>
    );
}

export default (WaitingRoom);