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
    /*const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);*/
    return (
        <Container>
        {/*
            <Modal show={show} onHide={handleClose} centered backdrop="static" animation>
                <Modal.Header closeButton>
                    <Modal.Title>Choose a role card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image src="/images/back.jpeg"/>
                    <Image src="/images/back.jpeg"/>
                    <Image src="/images/back.jpeg"/>
                    <Image src="/images/back.jpeg"/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        jetzt registrieren
                    </Button>
                </Modal.Footer>
        </Modal>*/}
        
        
        
            
                <h1>hello text</h1>
                <Button onClick={handleClick} block>Leave</Button>
            </Container >
            
        
    );
}

export default withRouter(Lobby);