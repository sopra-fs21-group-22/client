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

    const chat = playertable.chat.messages;
    const messages = chat.map((m) =>
        <p key={m.id}>{m.name + ": " + m.content + "\n"}</p>
    );

    /*

    const fs = require('fs');
    const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const textToSpeech = new TextToSpeechV1({
        authenticator: new IamAuthenticator({
            apikey: 'iqO6r3YxfmAdLYpqcrnYybt-PJv62Rhl1R5gDsvaUIEz',
        }),
        serviceUrl: 'https://api.eu-de.text-to-speech.watson.cloud.ibm.com/instances/6ea074c8-5433-4f28-a047-f15ce3b6f6ce/v1/synthesize',
    });

    const synthesizeParams = {
        text: 'Hello world',
        accept: 'audio/mp3',
        voice: 'en-US_AllisonV3Voice',
    };

    textToSpeech.synthesize(synthesizeParams)
        .then(response => {
            // only necessary for wav formats,
            // otherwise `response.result` can be directly piped to a file
            console.log("Test1");
            //return textToSpeech.repairWavHeaderStream(response.result);
            return response.result;
        })
        .then(buffer => {
            console.log("Test2");
            fs.writeFileSync('hello_world.mp3', buffer);
        })
        .catch(err => {
            console.log('error:', err);
        });



    document.querySelector('#button').onclick = function() {
        fetch('/api/text-to-speech/token')
            .then(function(response) {
                return response.json();
            })
            .then(function(token) {
                const audio = WatsonSpeech.TextToSpeech.synthesize(Object.assign(token, {
                    text: document.querySelector('#text').value,
                }));
                audio.onerror = function(err) {
                    console.log('audio error: ', err);
                };
            });
    };

     */
    /*
            iam_apikey: 'iqO6r3YxfmAdLYpqcrnYybt-PJv62Rhl1R5gDsvaUIEz',
        url: 'https://api.eu-de.text-to-speech.watson.cloud.ibm.com/instances/6ea074c8-5433-4f28-a047-f15ce3b6f6ce/v1/synthesize'
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