import {Card} from "react-bootstrap";
import React from "react";
import ChatInput from "./ChatInput";


function ChatPopUp({player, playertable, height, width}) {

    const chat = playertable.chat.messages;
    const messages = chat.map((m) =>
        <p key={m.id}>{m.name + ": " + m.content + "\n"}</p>
    );


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