import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { authApi, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { withRouter, useHistory, Link, useRouteMatch, } from 'react-router-dom';
import { Col, Row, Container, Card, ListGroup, ListGroupItem, CardDeck, Button } from 'react-bootstrap';
import UserStatus from '../../views/design/UserStatus';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';

function Lobby() {
    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(async () => {
        try {

        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }, []);

    function handleClick() {
        history.push("/game/dashboard");
    }
    function handle_Rolecard_border() {
        setRolecard_border(5);
    }
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [rolecard_border, setRolecard_border] = useState(0);


    return (
        <Container>
        {
            <Modal show={show} onHide={handleClose} centered backdrop="static" animation size="xl"style={{
                width: 1000
        }}
                >
                <Modal.Header closeButton style={{
                    backgroundColor: "rgba(174, 136, 53, 0.7)"
            }}>
                    <Modal.Title>Choose a role card</Modal.Title>
                </Modal.Header>
                <Modal.Body centered style={{
                    backgroundColor: "rgba(174, 136, 53, 0.6)"
            }}>
                    <Row>
                        <Col md="auto">
                            <Image src="/images/back.jpeg" onClick={() => handle_Rolecard_border()} 
                            style={{
                                height: 250,
                                borderWidth: rolecard_border,
                                borderColor: "blueviolet",
                                borderStyle: "solid"
                              }}/>
                        </Col>
                        <Col md="auto">
                            <Image src="/images/back.jpeg" height="250"/>
                        </Col>
                        <Col md="auto">
                            <Image src="/images/back.jpeg" height="250"/>
                        </Col>
                        <Col md="auto">
                            <Image src="/images/back.jpeg" height="250"/>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer style={{
                    backgroundColor: "rgba(174, 136, 53, 0.6)",
                    borderWidth:0
            }}>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        jetzt registrieren
                    </Button>
                </Modal.Footer>
        </Modal>}
        
                <Button onClick={handleClick} block>Leave</Button>
            </Container >
            
        
    );
}

export default withRouter(Lobby);