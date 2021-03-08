import React, { useState } from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { useHistory, withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

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
  const history = useHistory();

  const login = async () => {
    try {
      const requestBody = JSON.stringify({
        username: username,
        password: password,
      });
      // TODO
      const response = await api.post('/auth/authenticate', requestBody);

      user = new User(response.data);

      user.username = username;

      // udate the parent Component
      updateUser(user);

      // Store the token into the local storage.
      localStorage.setItem('token', user.token);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      history.push(`/game`);
    } catch (error) {
      alert("Username or password is incorrect!");
      alert(error);
    }
  }


  return (
    <BaseContainer>
      <FormContainer>
        <Form>
          <Label>Username</Label>
          <InputField
            placeholder="Enter here.."
            onChange={e => setUsername(e.target.value)}

          />
          <Label>Password</Label>
          <InputField
            type="password"
            placeholder="Enter here.."
            onChange={e => setPassword(e.target.value)}

          />
          <a href="/register">Click here to register</a>
          <ButtonContainer>
            <Button
              disabled={!username || !password}
              width="50%"
              onClick={() => {
                login();
              }}
            >
              Login
              </Button>
          </ButtonContainer>
        </Form>
      </FormContainer>
    </BaseContainer>
  );

}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Login);
