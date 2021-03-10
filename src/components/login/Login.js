import React, { useState } from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { useHistory, withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import { Form, Container } from 'react-bootstrap';

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
function Login({ user, updateUser }) {

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
      const requestBody = JSON.stringify({
        username: username,
        password: password,
      });
      // TODO
      const response = await api.post('/authenticate', requestBody);

      user = new User(response.data);


      // udate the parent Component
      updateUser(user);

      // Store the token into the local storage.
      localStorage.setItem('user', JSON.stringify(user));

      localStorage.setItem('token', user.jwt);

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
          variant="primary"
          type="submit"
          disabled={!username || !password}
          onClick={(e) => {
            login(e);
          }}
        >
          Submit
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
