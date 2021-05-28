import {Button, FormControl, InputGroup} from "react-bootstrap";
import React, {Component} from "react";
import {authApi} from "../../helpers/api";
import {synthesizeSpeech} from "./synthesizeSpeech";

class ChatInput extends Component {
    constructor(props, context, player, playertable) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);

        this.state = {
            value: '',
            player: player,
            playertable: playertable,
            sending: false,
        };
    }

    async sendMessage() {
        this.state.sending = true;
        try {
            const requestBody = JSON.stringify({
                "content": this.state.value,
                "name": this.props.player.user,
            });
            await authApi().put(`/games/${this.props.playertable.id}/players/${this.props.player.id}/chat`, requestBody);
            this.setState({value: ""});
            console.log("player: ", this.props.player);
        } catch (error) {
            console.warn(error);
        } finally {
            this.state.sending = false;
        }
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({value: e.target.value});
    }

    onKeyUp(event) {
        if (event.charCode === 13) { // 13 is an identifier for the enter key
            this.sendMessage();
        }
    }


    render() {
        return (
            <InputGroup
                controlId="formBasicText"
            >
                <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="Message"
                    onChange={e => this.handleChange(e)}
                    onKeyPress={this.onKeyUp}
                />
                <InputGroup.Append>
                    <Button id="custombutton"
                            disabled={!this.state.value || this.state.sending}
                            variant="outline-secondary"
                            onClick={(e) => {
                                this.sendMessage()

                            }}

                    >Send</Button>
                    <Button hidden onClick={()=>synthesizeSpeech("en-IN-PrabhatNeural", "text to speech, hell yeah")}>click me</Button>

                </InputGroup.Append>
            </InputGroup>
        );
    }
}

export default ChatInput;