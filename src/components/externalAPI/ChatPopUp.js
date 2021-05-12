import {Button, Card, Form, FormControl, InputGroup} from "react-bootstrap";
import {authApi} from "../../helpers/api";
import React, {useState} from "react";

function ChatPopUp({chat, player, playertable}) {

    const messages = chat.map((m) =>
        <li key={m.id}>m.content</li>
    );

    function sendMessage(message) {
        const requestBody = JSON.stringify({
            "content": message,
            "name": player.user,
        })
        //TODO: uncomment
        //authApi().post(`/games/${playertable.id}/players/${player.id}/chat`, requestBody)
    }

    const [message, setMessage] = useState("");

    return(
        <Card style={{backgroundColor: "none", opacity: 0.8}}>
        <Card.Header>Chat</Card.Header>
        <Card.Body>
            <ul> {messages} </ul>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Message"
                    aria-label="message"
                    aria-describedby="basic-addon2"
                    onChange={m => setMessage(m.target.value)}
                />
                <InputGroup.Append>
                    <Button id="custombutton" variant="outline-secondary" onClick={sendMessage(message)}>Send</Button>
                </InputGroup.Append>
            </InputGroup>
        </Card.Body>
    </Card>
    );
}

export default ChatPopUp;