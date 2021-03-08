import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { Button } from '../../views/design/Button';
import { withRouter, useHistory, Link, } from 'react-router-dom';
import { Col, Row, Container } from 'react-bootstrap';

// const Container = styled(BaseContainer)`
//   color: white;
//   text-align: center;
// `;

// const Users = styled.ul`
//   list-style: none;
//   padding-left: 0;
// `;

// const PlayerContainer = styled.li`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//  `;



export default function ProfilePage({ match }) {
    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(async () => {
        try {
            const response = await api.get(`/auth/users/${match.params.id}`);
            // delays continuous execution of an async operation for 1 second.
            // This is just a fake async call, so that the spinner can be displayed
            // feel free to remove it :)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Get the returned users and update the state.
            setUser(response.data);

            // This is just some data for you to see what is available.
            // Feel free to remove it.
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

            // See here to get more data.
            console.log(response);
        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }, []);


    return (
        <Container>
            <Row>
                <Col><h1>Hello World</h1></Col>
            </Row>
        </Container>
    );
}

