import {Button, Container, Form, FormControl, InputGroup} from "react-bootstrap";
import React, {Component} from "react";
import {authApi} from "../../helpers/api";
import {synthesizeSpeech} from "./synthesizeSpeech";

/*
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import "..externalAPI/SpeakerOutPut.js"; */


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

    /*
        async sendMessage(e) {
            console.log("testtest");
            console.log(e);
            /*
            e.preventDefault();
            try {
                const requestBody = JSON.stringify({
                    "content": this.state.value,
                    "name": this.props.player.user,
                })
                console.log("before");
                const bla = await authApi().put(`/games/${this.props.playertable.id}/players/${this.props.player.id}/chat`, requestBody);
                console.log("bla ", bla);
                console.log("after");
                this.setState({value: ""});

            } catch (e) {
                console.log(e);
            }
                }
     */


    async sendMessage() {
        this.state.sending = true;
        console.log("before", this.state.sending);
        try {
            const requestBody = JSON.stringify({
                "content": this.state.value,
                "name": this.props.player.user,
            });
            await authApi().put(`/games/${this.props.playertable.id}/players/${this.props.player.id}/chat`, requestBody);
            await this.characterToSpeech();
            this.setState({value: ""});
            console.log("player: ", this.props.player);
        } catch (error) {
            console.warn(error);
        } finally {
            this.state.sending = false;
            console.log("before", this.state.sending);
        }
    }

    async characterToSpeech(){
        let character_response = await authApi().get(`/games/${this.props.playertable.id}/players/${this.props.player.id}/characters`);
        const characterName = character_response.data.name;

        /*  const voices=["en-PH-JamesNeural", "en-US-GuyNeural", "en-GB-LibbyNeural", "en-IE-ConnorNeural", "en-CA-LiamNeural", "en-IN-PrabhatNeural", "en-AU-NatashaNeural"];
            const characters=["elgringo", "willythekid", "rosedoolan", "paulregret", "jourdonnais", "bartcassidy", "suzylafayette"]; */
        let voice = "";
        switch(characterName){
            case "elgringo":
                voice = "en-PH-JamesNeural";
                break;
            case "willythekid":
                voice = "en-US-GuyNeural";
                break;
            case "rosedoolan":
                voice = "en-GB-LibbyNeural";
                break;
            case "paulregret":
                voice = "en-IE-ConnorNeural";
                break;
            case "jourdonnais":
                voice = "en-CA-LiamNeural";
                break;
            case "bartcassidy":
                voice = "en-IN-PrabhatNeural";
                break;
            case "suzylafayette":
                voice = "en-AU-NatashaNeural";
                break;
        }
        synthesizeSpeech(voice, this.state.value);
        console.log("voice: ", voice);
        console.log("character: ", characterName);
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