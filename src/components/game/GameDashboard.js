import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { api, authApi, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { withRouter, useHistory, Link } from 'react-router-dom';
import { Button, Container, Row, Col, ListGroup, } from 'react-bootstrap';
import UserStatus from '../../views/design/UserStatus';


function GameDashboard({ currUser }) {
  const [users, setUsers] = useState();


  useEffect(async () => {

    try {
      const response = await authApi().get('/users');

      // Get the returned users and update the state.
      setUsers(response.data);

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
                <Col><UserStatus user={currUser} /></Col>
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
                      <Col><UserStatus user={currUser} /></Col>

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

export default withRouter(GameDashboard);
