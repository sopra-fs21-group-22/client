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


    /*
    sendMessage() {
        const requestBody = JSON.stringify({
            "content": this.state.value,
            "name": this.props.player.user,
        })
        console.log("before: ", this.props.player.id);
        console.log("message before: ", this.state.value);
        const playertable = this.props.playertable;
        const player = this.props.player;
        authApi().post(`/games/${playertable.id}/players/${player.id}/chat`, requestBody);
        console.log("after: ", this.props);
        console.log("message after: ", this.state.value);
    }

     */

    handleChange(e) {
        this.setState({value: e.target.value});
    }
    


    render() {
        return (
            <form>
                <InputGroup
                    controlId="formBasicText"
                >
                    <FormControl
                        type="text"
                        value={this.state.value}
                        placeholder="Message"
                        onChange={this.handleChange}
                    />
                    <InputGroup.Append>
                        <Button id="custombutton"
                                variant="outline-secondary"
                                onClick={() => {this.sendMessage()
                                    this.state.value = " "
                                }}>Send</Button>
                    </InputGroup.Append>
                </InputGroup>
            </form>
        );
    }
}

export default ChatInput;