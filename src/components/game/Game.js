import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { api, authApi, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { withRouter, useHistory, Link } from 'react-router-dom';
import { Button, Container, Row, Col, ListGroup, } from 'react-bootstrap';


function Game({ currUser }) {
  const [users, setUsers] = useState();


  useEffect(async () => {

    try {
      const response = await authApi().get('/users');
      // delays continuous execution of an async operation for 1 second.
      // This is just a fake async call, so that the spinner can be displayed
      // feel free to remove it :)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get the returned users and update the state.
      setUsers(response.data);

      // This is just some data for you to see what is available.
      // Feel free to remove it.
      // console.log('request to:', response.request.responseURL);
      // console.log('status code:', response.status);
      // console.log('status text:', response.statusText);
      // console.log('requested data:', response.data);

      // // See here to get more data.
      // console.log(response);
    } catch (error) {
      alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }
  }, []);


  return (
    <Container>
      {!users ? (
        <Spinner />
      ) : (

        <div>
          <br></br>
          <h4>All Users</h4>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>Username</Col>
                <Col>ID</Col>
                <Col>Join Date</Col>
                <Col>Status</Col>
              </Row>
            </ListGroup.Item>

            {// showing the currently logged in user
            }
            <ListGroup.Item variant="primary">
              <Row>
                <Col>
                  <Link to={`/game/dashboard/${currUser.id}`}>{currUser.username} (You)</Link>
                </Col>
                <Col>{currUser.id}</Col>
                <Col>{currUser.creationDate}</Col>
                <Col>{currUser.status}</Col>
              </Row>
            </ListGroup.Item>

            {
              // removing logged in user as they already are in the list
              users.filter((user) => user.username != currUser.username)
                .map((user) => (
                  <ListGroup.Item key={user.id}>
                    <Row>
                      <Col>
                        <Link to={`/game/dashboard/${user.id}`}>{user.username}</Link>
                      </Col>
                      <Col>{user.id}</Col>
                      <Col>{user.creationDate}</Col>
                      <Col>{user.status}</Col>

                    </Row>
                  </ListGroup.Item>
                ))}
          </ListGroup>
        </div>

      )
      }
    </Container >
  )
}

export default withRouter(Game);
