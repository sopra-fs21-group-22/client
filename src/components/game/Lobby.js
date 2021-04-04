import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { authApi, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { withRouter, useHistory, Link, useRouteMatch, } from 'react-router-dom';
import { Col, Row, Container, Card, ListGroup, ListGroupItem, CardDeck, Button } from 'react-bootstrap';
import UserStatus from '../../views/design/UserStatus';

function Lobby() {
    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(async () => {
        try {

        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }, []);


    return (
        <Container>
            <Button>klik me</Button>
        </Container >
    );
}

export default withRouter(Lobby);