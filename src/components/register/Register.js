import React, { useState } from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, authApi, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { Redirect, withRouter, useHistory } from 'react-router-dom';
import Login from '../login/Login';
import { Button, Container, Form } from 'react-bootstrap';
import "../../views/design/styling/custom_button_styling.css";
import ProgressBar from 'react-bootstrap/ProgressBar';
import useInterval from '../game/useInterval.js';


export default function Register({ currUser, updateUser }) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [passwordConf, setPasswordConf] = useState();
    const [formState, setFormState] = useState({
        passValidity: null,
        nameValidity: null
    });
    const history = useHistory();
    const [timer, setTimer] = useState(100);
    const interval = useInterval(async () => {
        if(timer!=0){
            setTimer(timer-5);
        }
        
        if(timer==0){
            setTimer(100);
        }
            }, 1000);

    const handleSubmit = async e => {
        try {
            e.preventDefault();


            const requestBody = JSON.stringify({
                "username": username,
                "password": password,

            })

            await api.post("/users", requestBody);

            const response = await api.post("/authenticate", requestBody);

            const user = new User(response.data);

            updateUser(user);

            localStorage.setItem("user", JSON.stringify(user));

            history.push('/game');

        } catch (error) {
            setFormState({
                nameValidity: true
            })
        }
    }

    return (
        <Container>
            <h1>important message to the group which is testing our game: play the game with exactly 4 players only. it won't work otherwise</h1>
            <ProgressBar max={100} now={timer*4} variant={"info"}></ProgressBar>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        placeholder="Enter here..."
                        onChange={e => setUsername(e.target.value)}
                        isInvalid={formState.nameValidity}
                    />
                    <Form.Control.Feedback type="invalid">
                        Username already taken!
          </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                        isInvalid={formState.passValidity}
                    />
                </Form.Group>
                <Form.Group controlId="passwordConfirmation">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={e => setPasswordConf(e.target.value)}
                        isInvalid={formState.passValidity}
                    />
                </Form.Group>
                <Button
                    id="custombutton"
                    type="submit"
                    disabled={!username || !password || password != passwordConf}
                    onClick={(e) => {
                        handleSubmit(e);
                    }}
                >
                    Register
        </Button>
            </Form>
        </Container>


    )
}

// </>