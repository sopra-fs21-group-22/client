import {Button, FormControl, InputGroup} from "react-bootstrap";
import React, {Component} from "react";
import {authApi} from "../../helpers/api";/* 
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import "..externalAPI/SpeakerOutPut.js"; */


class ChatInput extends Component {
    constructor(props, context, player, playertable) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: '',
            player: player,
            playertable: playertable
        };
    }



    sendMessage(e) {
        e.preventDefault();
        try{
            const requestBody = JSON.stringify({
                "content": this.state.value,
                "name": this.props.player.user,
            })
            console.log("props before: ", this.props);
            console.log("message before: ", this.state.value);
            const playertable = this.props.playertable;
            const player = this.props.player;
            authApi().put(`/games/${playertable.id}/players/${player.id}/chat`, requestBody);

            console.log("props after: ", this.props);
            // console.log("message after: ", response);
            this.setState({value: " "});
            console.log("message after: ", this.state.value);
        } catch (e) {
            console.log(e);
        }

    }


    handleChange(e) {
        e.preventDefault();
        this.setState({value: e.target.value});
    }
    


    render() {
        return (
                <InputGroup
                    controlId="formBasicText"
                >
                    <input
                        type="text"
                        value={this.state.value}
                        placeholder="Message"
                        onChange={e => this.handleChange(e)}
                    />
                    <InputGroup.Append>
                        <Button id="custombutton"
                                variant="outline-secondary"
                                onClick={(e) => {this.sendMessage(e)}}>Send</Button>
                    </InputGroup.Append>
                </InputGroup>
        );
    }
}

export default ChatInput;