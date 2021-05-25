import {Card} from "react-bootstrap";
import React, {useState} from "react";
import ChatInput from "./ChatInput";
import {authApi} from "../../helpers/api";


function ChatPopUp({chatMessages, player, playertable, height, width}) {

    const arr = [{
        id: 3,
        name: "a",
        content: "dä chat esch no hard coded"
    }, {id: 4, name: "b", content: "enlangetextohniabstandzomteschtewiedasusgsehd"}, {id: 5, name: "c", content: "bang!"}, {
        id: 6,
        name: "d",
        content: "wasauemmer"
    }, {id: 1, name: "e", content: "no!"}, {id: 2, name: "f", content: "en lange text met abstand zom teschte wie das usgsehd"}]
    const messages = arr.map((m) =>
        <p key={m.id}>{m.name + ": " + m.content + "\n"}</p>
    );

    /*
    const requestBody = JSON.stringify({
        content: "testContent",
        name: "testName",
    })
    console.log("playertable before: ", playertable);
    authApi().post(`/games/${playertable.id}/players/${player.id}/chat`, requestBody);
    console.log("playertable after: ", playertable);
*/

    return (
        <Card className="overflow-auto" style={{backgroundColor: "none", opacity: 0.8, maxHeight: height, maxWidth: width}}>

            <Card.Body>
                <div className="overflow-auto p-2 mb-1 mb-md-1 mr-md-1 bg-light"
                     style={{maxHeight: height-100}}>
                    {messages}
                </div>
                <ChatInput player={player} playertable={playertable}/>
            </Card.Body>
        </Card>
    );
}


export default ChatPopUp;