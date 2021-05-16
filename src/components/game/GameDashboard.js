import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {api, authApi, handleError} from '../../helpers/api';
import Player from '../../views/Player';
import {Spinner} from '../../views/design/Spinner';
import {withRouter, useHistory, Link} from 'react-router-dom';
import {Button, Container, Row, Col, ListGroup,} from 'react-bootstrap';
import UserStatus from '../../views/design/UserStatus';
import User from '../shared/models/User';
import {Redirect} from 'react-router-dom';
import PlayerTable from '../shared/models/PlayerTable';
import "../../views/design/styling/custom_button_styling.css";


function GameDashboard({currUser, currPlayer_table, updatePlayer_table, updatePlayerId, updateTableId, tableId, playerId}) {
    const [users, setUsers] = useState();

    const [lobby1, setLobby1] = useState({name: "lobbynameuno", player_count: "4/7", type: "public"});
    const [lobby2, setLobby2] = useState({name: "lobbynameduo", player_count: "3/7", type: "private"});
    const [lobbylist, setLobbylist] = useState([lobby1, lobby2]);
    const [lobbies, setLobbies] = useState(lobbylist);
    const [showrejoin, setRejoin] = useState(true);
    const [showjoin, setJoin] = useState(true);


    useEffect(async () => {

        try {

            const response = await authApi().get('/users');
            // Get the returned users and update the state.
            setUsers(response.data);
            //TODO: FOR PRIVATE LOBBIES add api.get for list of open lobbies OR merge it with the upper request
            //const anotherresponse = await authApi().get(/*TODO: add a url*/);
            //setLobbies(anotherresponse.data);
            //TODO: remove this when lobbies are implemented. testing stuff


        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }, []);
    /*async function Join(e) {
      let history = useHistory();

      e.preventDefault();
      //authApi().put("/lobbies");
     // return <Redirect to='/profile' />;
      history.push(`/game/gurkewasser`);

    }*/


    let history = useHistory();

    async function join_public_lobby() {
        const response = await authApi().put("/games/lobbies");
        updatePlayerId(response.data.player);
        updateTableId(response.data.tableId);
        const id = response.data.tableId;

        /*let currPt = new PlayerTable(response.data);
        updatePlayer_table(currPt);
        //localStorage.setItem('player_table', JSON.stringify(currPlayer_table));
        const id = currPt.id;*/
        const target = "/game/dashboard/lobby/public/waiting/" + id;
        history.push(target);
    }

    async function rejoin() {
        const target = "/game/dashboard/lobby/public/waiting/" + tableId;
        history.push(target);
        
    }
    function klik(){
        console.log(`tableid: ${tableId}`);
        console.log(`playerid: ${playerId}`);
    }


    return (


        <Container>
            <Button onClick={klik}>asd</Button>
            {!users ? (
                <Spinner/>
            ) : (

                <div>
                    <h4>Join public lobby</h4>
                    {/*TODO: use this code for the private lobbies later on*/}
                    {/*<ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>Lobbyname</Col>
                <Col>Players</Col>
                <Col>Type</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item variant="secondary">
              <Row>
                <Col>somelobbyname</Col>
                <Col>4/7</Col>
                <Col>public</Col>
              </Row>
            </ListGroup.Item>

            
              lobbies.map((lobby) => (
                 <Link to={`/game/dashboard/lobby/${lobby.name}`}>
                  <ListGroup.Item>
                    <Row>
                      <Col>{lobby.name}</Col>
                      <Col>{lobby.player_count}</Col>
                      <Col>{lobby.type}</Col>
                    </Row>
                  </ListGroup.Item>
                </Link>
              ))

          </ListGroup>*/}
                    <br></br>
                    {!tableId ? (
                    <Button id="custombutton" onClick={join_public_lobby} block>join game</Button>
                    ) : (
                    <Button id="custombutton" onClick={rejoin} block>re-join game</Button>
                    )}
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
                                <Col><UserStatus user={currUser}/></Col>
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
                                            <Col><UserStatus user={user}/></Col>

                                        </Row>
                                    </ListGroup.Item>
                                ))}
                    </ListGroup>
                </div>

            )
            }
        </Container>

    )
}

export default withRouter(GameDashboard);
