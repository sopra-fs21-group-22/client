import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { authApi, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { withRouter, useHistory, Link, useRouteMatch, } from 'react-router-dom';
import { Col, Row, Container, Card, ListGroup, ListGroupItem, CardDeck, Button, Modal, Image, ModalBody } from 'react-bootstrap';
import UserStatus from '../../views/design/UserStatus';
import "../../views/design/styling.css";
import OpponentDeck from "../../views/design/OpponentDeck";

function Lobby() {
    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(async () => {
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


    return (
        <>
        <Container>
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
            <Row>
                <Col/>
                <Col>
                    <OpponentDeck user={null}/>
                </Col>
                <Col/>
            </Row>
            <Row>
                <Col>
                    <OpponentDeck user={null}/>
                </Col>
                <Col>

                </Col>
                <Col>
                    <OpponentDeck user={null}/>
                </Col>
            </Row>
            <Row>
                <Col/>
                <Col/>
                <Col>
                    <Button variant="primary" onClick={startGame}>Start Game</Button>
                    <Button onClick={leaveGame}>Leave</Button>
                </Col>
            </Row>
        </Container >
        </>
        
    );
}

export default withRouter(Lobby);