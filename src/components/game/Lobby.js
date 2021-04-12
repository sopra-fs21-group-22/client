import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, authApi, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { withRouter, useHistory, Link, useRouteMatch, } from 'react-router-dom';
import { Col, Row, Container, Card, ListGroup, ListGroupItem, CardDeck, Button, ModalBody } from 'react-bootstrap';
import UserStatus from '../../views/design/UserStatus';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import "../../views/design/styling.css";
import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import PlayerModel from '../shared/models/PlayerModel';
import User from '../shared/models/User';

function Lobby({currUser, currPlayer, updatePlayer}) {
    const history = useHistory();
    const [player, setPlayer] = useState(null);

    useEffect(async () => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData == null) {
            return
        }
        const currentUser = new User(userData);
        setPlayer(currentUser);
        updatePlayer(currentUser)
        console.log("incoming");
        console.log(currPlayer);
        try {

        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }, []);
//Buttons
    function leaveGame() {
        history.push("/game/dashboard");
    }
    function startGame(){
        setShow_rolechoose(true);
    }
    const chooseRole = () => {
        setShow_rolechoose(false);
        setShow_roledisplay(true);
    }
    function roledisplayokay(){
        setShow_roledisplay(false);
    }
    function testbutton(){
        console.log("before");
        currUser = "sufe";
        console.log(currUser);
        console.log(localStorage.getItem('user'));
        console.log("after");
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
    
    const [rolecard_border1, setRolecard_border1] = useState(0);
    const [rolecard_border2, setRolecard_border2] = useState(0);
    const [rolecard_border3, setRolecard_border3] = useState(0);
    const [rolecard_border4, setRolecard_border4] = useState(0);
    const [choose_rolecard_disabled, setChoose_rolecard_disabled] = useState(true);
    const [player_role, setPlayer_role] = useState("defaultrole");
    const [role_information_text, setRole_information_text] = useState("this is some default role information");

    const role_information = (
        <Popover>
            <Popover.Title as="h3">{player_role}</Popover.Title>
            <Popover.Content>
                {role_information_text}
            </Popover.Content>
        </Popover>
    );


    return (
        <>
        <Container>
            <br></br>
            <OverlayTrigger trigger="click" placement="top" overlay={role_information}>
                <Button variant="success">Show role information</Button>
            </OverlayTrigger>
            {<Modal show={show_roledisplay} centered animation size="sm"> 
                <Modal.Header className="lobbymodalheader">
                    <Modal.Title>Your role:</Modal.Title>
                </Modal.Header>
                <Modal.Body className="lobbymodalbody" centered>
                    <Image src="/images/back.jpeg" className="lobbyimage"/>
                </Modal.Body>
                <Modal.Footer className="lobbymodalfooter">
                    <Button variant="primary" onClick={roledisplayokay}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>}
            

            {<Modal className="lobbymodal" show={show_rolechoose} centered backdrop="static" keyboard={false} animation size="xl">
                <Modal.Header className="lobbymodalheader">
                    <Modal.Title>Choose a role card</Modal.Title>
                </Modal.Header>
                <Modal.Body className="lobbymodalbody" centered>
                    <Row>
                        <Col className="lobbycolumn">
                            <Image className="lobbyimage" id="1" src="/images/back.jpeg" onClick={() => addBordertoImage1()}
                            style={{borderWidth: rolecard_border1}}/>
                        </Col>
                        <Col className="lobbycolumn">
                            <Image className="lobbyimage" id="2" src="/images/back.jpeg" onClick={() => addBordertoImage2()}
                            style={{borderWidth: rolecard_border2}}/>
                        </Col>
                        <Col className="lobbycolumn">
                            <Image className="lobbyimage" id="3" src="/images/back.jpeg" onClick={() => addBordertoImage3()}
                            style={{borderWidth: rolecard_border3}}/>
                        </Col>
                        <Col className="lobbycolumn">
                            <Image className="lobbyimage" id="4" src="/images/back.jpeg" onClick={() => addBordertoImage4()}
                            style={{borderWidth: rolecard_border4}}/>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className="lobbymodalfooter">
                    <Button variant="primary" onClick={chooseRole} disabled={choose_rolecard_disabled}>
                        Choose
                    </Button>
                </Modal.Footer>
            </Modal>}
                <Button variant="primary" onClick={startGame}>Start Game</Button>
                <Button onClick={leaveGame}>Leave</Button>
                <Button onClick={testbutton}>test</Button>
        </Container >
        </>
        
    );
}

export default withRouter(Lobby);