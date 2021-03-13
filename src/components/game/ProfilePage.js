import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { authApi, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { withRouter, useHistory, Link, useRouteMatch, } from 'react-router-dom';
import { Col, Row, Container, Card, ListGroup, ListGroupItem, CardDeck, Button } from 'react-bootstrap';
import UserStatus from '../../views/design/UserStatus';

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



function ProfilePage({ currUser, match }) {
    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(async () => {
        try {

            const response = await authApi().get(`/users/${match.params.id}`);

            // Get the returned users and update the state.
            setUser(response.data);

        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }, []);


    return (
        <Container>
            <CardDeck>
                {user ? (
                    <Card>
                        {/* Profile pic */}
                        {/* <Card.Img variant="top" src="holder.js/100px160" /> */}

                        <Card.Body>
                            <Card.Title>
                                <Row>

                                    <Button size="lg" variant="light" onClick={() => history.push("/game/dashboard")}><i className="fas fa-angle-left" ></i></Button>
                                    <Col className="text-center">
                                        <h2>{user.username + " "}
                                            <UserStatus user={user}></UserStatus>
                                        </h2>
                                    </Col>
                                    {user.id == currUser.id ?
                                        (
                                            <i className="fas fa-edit text" onClick={() => history.push(`/game/dashboard/${user.id}/edit`)}></i>
                                        ) : (
                                            null
                                        )
                                    }

                                </Row>
                            </Card.Title>
                            <Card.Text className="text-center">Birthday: {user.birthday ? user.birthday : "Unknown"}</Card.Text>
                            <Card.Text className="text-center">Joined on: {user.creationDate}</Card.Text>
                            {/* <Card.Text>
                            {user.signature ? user.signature : "(No signature yet)"}
                        </Card.Text> */}

                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted"></small>
                        </Card.Footer>
                    </Card>
                ) : (<Spinner />)}
                {/* <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                            This card has supporting text below as a natural lead-in to additional
        content.{' '}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in to
                            additional content. This card has even longer content than the first to
                            show that equal height action.
      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                </Card> */}
            </CardDeck>
        </Container >
    );
}

export default withRouter(ProfilePage);