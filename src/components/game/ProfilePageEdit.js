import React, { useState, useEffect } from 'react';
import { authApi, handleError } from '../../helpers/api';
import { Button } from '../../views/design/Button';
import { withRouter, useHistory } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';

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



function ProfilePageEdit({ currUser, match, updateUser }) {
    const [username, setUsername] = useState(currUser.username);
    const [birthday, setBirthday] = useState(currUser.birthday);
    const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authApi().put(`/users/${currUser.id}`, {
                username: username,
                birthday: birthday
            })
            // TODO
            if (!(username == currUser.username)) {
                localStorage.removeItem("user");
                updateUser(null);
                history.push("/login");
            } else {
                history.push(`/game/dashboard/${currUser.id}`)
            }

        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`)
        }

    }


    return (
        <>
            <Container>
                <Form >
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>New Username</Form.Label >
                        <Form.Control type="text" placeholder={currUser.username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group >

                    <Form.Group controlId="formBasicBirthday">
                        <Form.Label>Birthdate</Form.Label>
                        <Form.Control type="date" placeholder={currUser.birthday}
                            onChange={(e) => setBirthday(new Date(e.target.value))} />
                    </Form.Group>

                    <Button variant="primary" onClick={e => handleSubmit(e)}>
                        Submit
                        </Button>
                </Form >
            </Container >
        </>

    );
}

export default withRouter(ProfilePageEdit);