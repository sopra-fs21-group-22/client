import React, { useState } from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { Redirect, withRouter, useHistory } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import Login from '../login/Login';

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
  height: 440px;
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

export default function Register() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [passwordConf, setPasswordConf] = useState();
    const history = useHistory();


    const handleSubmit = async e => {
        e.preventDefault();
        const users = await api.get('/users');

        const usernames = users.data.map(userdata => userdata.username);
        if (usernames.includes(username)) {
            alert("Username already taken!");
            return
        }

        const requestBody = JSON.stringify({
            "username": username,
            "password": password,

        })

        const response = await api.post("/users", requestBody);

        const user = new User(response.data);
        console.log(user);

        localStorage.setItem("token", user.token);

        history.push('/game');

        // TODO
        // save user data

    }

    const handleSetUsername = async (e) => {
        // TODO (not required)
        // get username
        // check if already in use
        setUsername(e.target.value);
    }

    return (
        <BaseContainer>
            <FormContainer>
                <Form>
                    <Label>Username</Label>
                    <InputField
                        required
                        placeholder="Enter here.."
                        onChange={e => {
                            handleSetUsername(e);
                        }}
                    />
                    <Label>Password</Label>
                    <InputField
                        required
                        type="password"
                        placeholder="Enter here.."
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                    />
                    <Label>Confirm your password</Label>
                    <InputField
                        type="password"
                        placeholder="Enter here.."
                        onChange={e => {
                            setPasswordConf(e.target.value);
                        }}
                    />

                    <ButtonContainer>
                        <Button
                            disabled={!username || !password || passwordConf != password}
                            width="50%"
                            onClick={(e) => { handleSubmit(e) }}
                        >
                            Register
                        </Button>
                    </ButtonContainer>
                </Form>
            </FormContainer>
        </BaseContainer>
    )
}

// </>