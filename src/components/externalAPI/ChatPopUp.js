import {Button, Card, Form, FormControl, InputGroup} from "react-bootstrap";
import {authApi} from "../../helpers/api";
import React, {useState} from "react";


function ChatPopUp({chat, player, playertable}) {

    /*
    const messages = chat.map((m) =>
        <li key={m.id}>{m.name + ": " + m.content}</li>
    );
*/
    const arr = [{id: 1, name: "Mario", content: "I like hats"}, {id: 2, name: "Nad", content: "I like cats"}, {id: 3, name: "a", content: "I like mats"}, {id: 4, name: "b", content: "I like tatts"}, {id: 5, name: "c", content: "I like pats"}, {id: 6, name: "d", content: "I like rats"}]
    const messages = arr.map((m) =>
        <p key={m.id}>{m.name + ": " + m.content + "\n"}</p>
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
        <Card class="overflow-auto" style={{backgroundColor: "none", opacity: 0.8, maxHeight: 200}}>

            <Card.Header>Chat</Card.Header>
        <Card.Body>
            <div> {messages} </div>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Message"
                    aria-label="message"
                    aria-describedby="basic-addon2"
                    onChange={m => setMessage(m.target.value)}
                />
                <InputGroup.Append>
                    <Button id="custombutton" variant="outline-secondary" onClick={sendMessage(message) && this.target.value === ""}>Send</Button>
                </InputGroup.Append>
            </InputGroup>
        </Card.Body>
    </Card>
    );
}


export default ChatPopUp;