import React, { useState } from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { useHistory, withRouter } from 'react-router-dom';
import { Form, Container, Button } from 'react-bootstrap';
import "../../views/design/styling/custom_button_styling.css";
import {synthesizeSpeech} from "../externalAPI/synthesizeSpeech.js";

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
function Login({ user, updateUser, updateTableId, updatePlayerId }) {

  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [formState, setFormState] = useState({
    passValidity: null,
    nameValidity: null
  })
  const history = useHistory();

  const login = async (e) => {
    e.preventDefault();
    try {
      //create requestBody used to send infos to backend
      const requestBody = JSON.stringify({
        username: username,
        password: password,
      });
      // TODO
      const response = await api.post('/authenticate', requestBody);

      user = new User(response.data);


      // udate the parent Component
      updateUser(user);
      updateTableId(user.tableId);
      updatePlayerId(user.player);

      // Store the user in localstorage
      localStorage.setItem('user', JSON.stringify(user));

      // Login successfully worked --> navigate to the route /game in the GameRouter
      history.push(`/game`);
    } catch (error) {
      setFormState({
        passValidity: true,
        nameValidity: true
      })
    }
  }

  return (

    <Container>
      <Button hidden onClick={()=>synthesizeSpeech("en-IN-PrabhatNeural", "text to speech, hell yeah")}>click me</Button>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            placeholder="Enter here..."
            onChange={e => setUsername(e.target.value)}
            isInvalid={formState.nameValidity}
          />
          <Form.Control.Feedback type="invalid">
            Wrong username or password!
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
        <Button
          id="custombutton"
          type="submit"
          disabled={!username || !password}
          onClick={(e) => {
            login(e);
          }}
        >
          Login
        </Button>
      </Form>
    </Container>
  );

}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Login);
