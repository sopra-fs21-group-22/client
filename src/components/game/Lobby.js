import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, authApi, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { withRouter, useHistory, Link, useRouteMatch, } from 'react-router-dom';
import { Col, Row, Container, Card, ListGroup, ListGroupItem, CardDeck, Button, Modal, Image, ModalBody } from 'react-bootstrap';
import UserStatus from '../../views/design/UserStatus';
import "../../views/design/styling/lobby_styling.css";
import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import PlayerModel from '../shared/models/PlayerModel';
import User from '../shared/models/User';
import PlayerTable from '../shared/models/PlayerTable';
import ReactDOM from 'react-dom';
import App from '../../App';
import OpponentDeck from "../../views/design/OpponentDeck";
import PlayerDeck from "../../views/design/PlayerDeck";
import PlayerCards from "../../views/design/PlayerCards";
import DeckDiscardPiles from "../../views/design/DeckDiscardPiles";
import useInterval from "../game/useInterval.js";
import LayoutSwitcher from '../game/LayoutSwitcher';
import {forEach} from "react-bootstrap/ElementChildren";
import "../../views/design/styling/custom_button_styling.css";

function Lobby({currUser, currPlayer, updatePlayer, currPlayer_table, updatePlayer_table}) {
    const history = useHistory();
    const [count, setCount] = useState(0);
    const interval = useInterval(async () => {    
//repeating requests to keep player_table and player up to date
        //TODO: uncomment this once backend is ready
        {
        const response = await authApi().get(`/games/${currPlayer_table.id}/players/${currUser.id}`);    
        currPlayer = new PlayerModel(response.data);
        updatePlayer(currPlayer);
        localStorage.setItem('player', JSON.stringify(currPlayer));

        //get information about the other players
        const playertable_response = await authApi().get(`/games/${currPlayer_table.id}/players`);
        currPlayer_table = new PlayerTable(playertable_response.data);
        updatePlayer_table(currPlayer_table);
        // correctOrder();
        localStorage.setItem('player_table', JSON.stringify(currPlayer_table));
        }
        setCount(count + 1);  }, 5000);
    

    useEffect(async () => {
        const userData = JSON.parse(localStorage.getItem('player_table'));
        if (userData == null) {
            return
        }
        const currentPlayer_table = new PlayerTable(userData);
        updatePlayer_table(currentPlayer_table);
        console.log(currentPlayer_table);
        try {

        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }, []);
//Buttons
    async function leaveGame() {
        localStorage.removeItem('player_table');
        localStorage.removeItem('player');
        updatePlayer_table(null);
        updatePlayer(null);
        history.push("/game/dashboard");
    }

    const [status, setStatus] = useState(false);
    const [ready_button_text, setReady_button_text] = useState("Ready up");
    const [ready_button_color, setReady_button_color] = useState("success");
    async function toggleReady(){
        if (status){
            setStatus(false);
            setReady_button_text("Ready up");
            setReady_button_color("success");
            const requestBody = JSON.stringify({
                status: status
            })
            authApi().put(`/games/${currPlayer_table.id}/players/${currUser.id}/ready`, requestBody);
        }
        else{
            setStatus(true);
            setReady_button_text("Unready");
            setReady_button_color("danger");
            const requestBody = JSON.stringify({
                status: status
            })
            authApi().put(`/games/${currPlayer_table.id}/players/${currUser.id}/ready`, requestBody);
        }
        //TODO: uncomment this once backend is implemented
//get information about user
        

        {const response = await authApi().get(`/games/${currPlayer_table.id}/players/${currUser.id}`);
        currPlayer = new PlayerModel(response.data);
        updatePlayer(currPlayer);
        localStorage.setItem('player', JSON.stringify(currPlayer));
        setupRole();
        setShow_rolechoose(true);}
    }
    
    const chooseRole = () => {
        setShow_rolechoose(false);
        setShow_roledisplay(true);
    }
    function roledisplayokay(){
        setShow_roledisplay(false);
        setHidden_startgame(true);
        setHidden_gamefield(false);
    }

    function openRules(){
        setShow_rules(true);
    }

    function closeRules(){
        setShow_rules(false);
    }

    function resign(){
        //put mapping to set bullets = 0
    }

    function endTurn() {
        //put mapping to end turn
    }

    const [orderArray, setOrderArray] = useState([]);

    // function correctOrder(){
    //     const current_array = [];
    //     for (let player in currPlayer_table.players) {
    //         if(currPlayer.id === player.id) {
    //             current_array.join(currPlayer)
    //         }
    //     }
    //     for (let i = 0; i < playeramount - 1; i++) {
    //         current_array[i].rightNeighbor = current_array[i+1];
    //     }
    //
    //     setOrderArray(current_array);
    // }

//cardrole shinanigans
    async function setupRole(){
        //const role = currPlayer.gameRole; TODO: uncomment this once authApi().get('/games/{game_id}/players/{player_id}') is implemented in the backend
        const role="SHERIFF";
        switch(role){
            case "SHERIFF":
                setRole_picture_source("/images/role_cards/sheriff.png");
                setPlayer_role("Sheriff");
                setRole_information_text("Someone has to implement this role information on the sheriff...");
                break;
            case "DEPUTY":
                setRole_picture_source("/images/role_cards/deputy.png");
                setPlayer_role("Deputy");
                setRole_information_text("Someone has to implement this role information on the deputy...");
                break;
            case "OUTLAW":
                setRole_picture_source("/images/role_cards/outlaw.png");
                setPlayer_role("Outlaw");
                setRole_information_text("Someone has to implement this role information on the outlaw...");
                break;
            case "RENEGADE":
                setRole_picture_source("/images/role_cards/renegade.png");
                setPlayer_role("Renegade");
                setRole_information_text("Someone has to implement this role information on the renegade...");
                break;
            default:
                setRole_picture_source("/images/back.jpeg");
                break;
        }
    }

//highlight role cards
    function addBordertoImage1() {
        setRolecard_border1(5);
        setRolecard_border2(0);
        setRolecard_border3(0);
        setRolecard_border4(0);
        setChoose_rolecard_disabled(false);
    }
    function addBordertoImage2() {
        setRolecard_border1(0);
        setRolecard_border2(5);
        setRolecard_border3(0);
        setRolecard_border4(0);
        setChoose_rolecard_disabled(false);
    }
    function addBordertoImage3() {
        setRolecard_border1(0);
        setRolecard_border2(0);
        setRolecard_border3(5);
        setRolecard_border4(0);
        setChoose_rolecard_disabled(false);
    }
    function addBordertoImage4() {
        setRolecard_border1(0);
        setRolecard_border2(0);
        setRolecard_border3(0);
        setRolecard_border4(5);
        setChoose_rolecard_disabled(false);
    }

    const [show_rolechoose, setShow_rolechoose] = useState(false);
    const [show_roledisplay, setShow_roledisplay] = useState(false);
    const [show_roleinformation, setShow_roleinformation] = useState(false);
    const [hidden_gamefield, setHidden_gamefield] = useState(true);
    const [hidden_startgame, setHidden_startgame] = useState(false);
    const [show_rules, setShow_rules] = useState(false);

    const [rolecard_border1, setRolecard_border1] = useState(0);
    const [rolecard_border2, setRolecard_border2] = useState(0);
    const [rolecard_border3, setRolecard_border3] = useState(0);
    const [rolecard_border4, setRolecard_border4] = useState(0);
    const [choose_rolecard_disabled, setChoose_rolecard_disabled] = useState(true);
    const [player_role, setPlayer_role] = useState("defaultrole");
    const [role_information_text, setRole_information_text] = useState("this is some default role information");
    const [role_picture_source, setRole_picture_source] = useState();

    const role_information = (
        <Popover id="role-info_popover" >
            <Popover.Title id="role-info_popover_title"><b>{player_role}</b></Popover.Title>
            <Popover.Content id="role-info_popover_content">
                <Card id="role-info_popover_content_card">
                    <Card.Img id="role-info_popover_content_card_cardimg" variant="top" centered src={role_picture_source} />
                </Card>
                {role_information_text}
            </Popover.Content>
        </Popover>
    )
//use this button to walk through the different layouts
    async function changelayout(){
        if(playeramount==7){
            setPlayeramount(4);
        }
        else{
            setPlayeramount(playeramount+1);
        }
    }
    const [playeramount, setPlayeramount] = useState(4);
        
        return (
        <Container>
            
            <p1>constant updates counter. updates every 5 seconds: {count}</p1>
            <Button id="custombutton" onClick={changelayout}>change layout</Button>
            

            <br></br><br></br>

            {<Modal show={show_roledisplay} centered animation size="sm" rootClose animation>
                <Modal.Header id="chosen-role_modal_header">
                    <Modal.Title id="chosen-role_modal_header_title" centered><b>Your role:</b></Modal.Title>
                </Modal.Header>
                <Modal.Body id="chosen-role_modal_body" centered>
                    <Image src={role_picture_source} id="chosen-role_modal_body_image"/>
                </Modal.Body>
                <Modal.Footer id="chosen-role_modal_footer">
                    <Button id="custombutton" onClick={roledisplayokay}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>}

            {<Modal show={show_rules} centered animation size="sm" rootClose animation>
                <Modal.Header id="chosen-role_modal_header">
                    <Modal.Title id="chosen-role_modal_header_title" centered><b>Rules</b></Modal.Title>
                </Modal.Header>
                <Modal.Body id="chosen-role_modal_body" centered>
                    <Image src="/images/back.jpeg" id="chosen-role_modal_body_image"/>
                </Modal.Body>
                <Modal.Footer id="chosen-role_modal_footer">
                    <Button id="custombutton" onClick={closeRules}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>}
            

            {<Modal id="choose-role_modal" show={show_rolechoose} centered backdrop="static" keyboard={false} animation>
                <Modal.Header id="choose-role_modal_header">
                    <Modal.Title><b>Choose a role card</b></Modal.Title>
                </Modal.Header>
                <Modal.Body id="choose-role_modal_body">
                    <Row>
                        <Col id="choose-role_modal_body_row_col">
                            <Image id="choose-role_modal_body_row_col_image" src="/images/back.jpeg" onClick={() => addBordertoImage1()}
                            style={{borderWidth: rolecard_border1}}/>
                        </Col>
                        <Col id="choose-role_modal_body_row_col">
                            <Image id="choose-role_modal_body_row_col_image" src="/images/back.jpeg" onClick={() => addBordertoImage2()}
                            style={{borderWidth: rolecard_border2}}/>
                        </Col>
                        <Col id="choose-role_modal_body_row_col">
                            <Image id="choose-role_modal_body_row_col_image" src="/images/back.jpeg" onClick={() => addBordertoImage3()}
                            style={{borderWidth: rolecard_border3}}/>
                        </Col>
                        <Col id="choose-role_modal_body_row_col">
                            <Image id="choose-role_modal_body_row_col_image" src="/images/back.jpeg" onClick={() => addBordertoImage4()}
                            style={{borderWidth: rolecard_border4}}/>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer id="choose-role_modal_footer">
                    <Button id="custombutton" onClick={chooseRole} disabled={choose_rolecard_disabled}>
                        Choose
                    </Button>
                </Modal.Footer>
            </Modal>}

            {/*<LayoutSwitcher playeramount={playeramount} playertable={currPlayer_table} orderarray={orderArray} visibility={hidden_gamefield}/>*/}
            <LayoutSwitcher playeramount={playeramount} visibility={hidden_gamefield}/>

            <OverlayTrigger trigger="click" overlay={role_information} rootClose>
                <Button id="custombutton" >Show role information</Button>
            </OverlayTrigger>
            <Button variant={ready_button_color} onClick={toggleReady} hidden={hidden_startgame}>{ready_button_text}</Button>
            <Button onClick={endTurn} id="custombutton">End Turn</Button>
            <Button onClick={resign} id="custombutton">Resign</Button>
            <Button onClick={openRules} id="custombutton">Rules</Button>
            <Button onClick={leaveGame} id="custombutton">Leave</Button>
            <br></br>
            <br></br>
        </Container >
    );
}

export default withRouter(Lobby);