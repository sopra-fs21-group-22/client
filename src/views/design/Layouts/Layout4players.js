import {
    Col,
    Row,
    Container,
    Card,
    ListGroup,
    ListGroupItem,
    CardDeck,
    Button,
    Modal,
    Image,
    ModalBody, Toast
} from 'react-bootstrap';
import OpponentDeck from "../OpponentDeck";
import PlayerDeck from "../PlayerDeck";
import PlayerCards from "../PlayerCards";
import DeckDiscardPiles from "../DeckDiscardPiles";
import React, {useState, useEffect} from 'react';
import "../styling/custom_button_styling.css";
import useInterval from "../../../components/game/useInterval.js";
import PlayerModel from "../../../components/shared/models/PlayerModel.js";
import ChatPopUp from "../../../components/externalAPI/ChatPopUp";

function Layout4players({
                            playertable,
                            orderarray,
                            visibility,
                            player,
                            hideCancel_PlayCard,
                            updateHideCancel_PlayCard,
                            ignoreRange,
                            updateIgnoreRange,
                            targetSelf,
                            updateTargetSelf,
                            targetEveryone,
                            updateTargetEveryone,
                            targetOnlyEnemies,
                            updateTargetOnlyEnemies,
                            updateCurr_card,
                            curr_card,
                            updateChat,
                            chat
                        }) {
     const interval = useInterval(async () => {
        /* console.log(`${playerList[0].user}layoutversion: ${playerList[0].bullets}`);
        console.log(`${playerList[1].user}layoutversion: ${playerList[1].bullets}`);
        console.log(`${playerList[2].user}layoutversion: ${playerList[2].bullets}`);
        console.log(`${playerList[3].user}layoutversion: ${playerList[3].bullets}`);
        console.log("sduifhsoduf"); */
        fillPlayerList();
        updateChatLog();
        setNewMessage(false); //TODO delete this when coupled to backend
    }, 1000);


    const [border, setBorder] = useState("none");
    const [card_played, setCard_played] = useState(false);
    const [fill_array, setFill_array] = useState(true);
    const [playerList, setPlayerList] = useState(orderarray);
    const [displayChat, setDisplayChat] = useState(false); // boolean whether the Chat Popup should be displayed or not
    const [newMessage, setNewMessage] = useState(true); // Array of new messages
    const [show, setShow] = useState(false);


    const updateBorder = (value) => {
        setBorder(value);
    }
    const updateCard_played = (value) => {
        setCard_played(value);
    }

    const updateFill_array = (value) => {
        setFill_array(value);
    }

    //TODO instead of test message take the newest message from the chat dynamically
    const testMessage = {content: "Mech chamer ersch lösche wenns met em backend fonktioniert.", name: "testName"}

    function updateChatLog() { // fetches all chat messages from the backend
        if(playertable.chat.messages.length > chat.length){
            setNewMessage(true);
        }
        updateChat(playertable.chat.messages);
    }


    function back() {
        updateHideCancel_PlayCard(true);
        updateBorder("none");
        updateTargetSelf(false);
        updateIgnoreRange(false);
        updateTargetOnlyEnemies(false);
        updateTargetEveryone(false);
        updateCurr_card(null);
    }

    function fillPlayerList() {
        let array = [];
        for (let x = 0; x < orderarray.length; x++) {
            array[x] = searchbyid(orderarray[x].id);
        }
        setPlayerList(array);
    }

    function searchbyid(id) {
        for (let x = 0; x < playertable.players.length; x++) {
            if (playertable.players[x].id == id) {
                let a = new PlayerModel(playertable.players[x]);
                return a;
            }
        }
    }

    return (<Container hidden={visibility}>
        <Row>
            <Col/>
            <Col>
                <OpponentDeck opponent={playerList[2]} player={playerList[0]} playeronturn={playertable.playerOnTurn}
                              playertable={playertable} border={border} updateBorder={updateBorder}
                              updateCard_played={updateCard_played}
                              updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                              ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf}
                              updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone}
                              updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies}
                              updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                              updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array}
                              updateFill_array={updateFill_array}/>
            </Col>
            <Col/>
        </Row>
        <Row>
            <Col>
                <OpponentDeck opponent={playerList[3]} player={playerList[0]} playeronturn={playertable.playerOnTurn}
                              playertable={playertable} border={border} updateBorder={updateBorder}
                              updateCard_played={updateCard_played}
                              updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                              ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf}
                              updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone}
                              updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies}
                              updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                              updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array}
                              updateFill_array={updateFill_array}/>
            </Col>
            <Col>
                <DeckDiscardPiles playertable={playertable} playeronturn={playertable.playerOnTurn}/>
            </Col>
            <Col>
                <OpponentDeck opponent={playerList[1]} player={playerList[0]} playeronturn={playertable.playerOnTurn}
                              playertable={playertable} border={border} updateBorder={updateBorder}
                              updateCard_played={updateCard_played}
                              updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                              ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf}
                              updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone}
                              updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies}
                              updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                              updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array}
                              updateFill_array={updateFill_array}/>
            </Col>
        </Row>
        <Row>
            <Button id="custombutton" style={{height: 50, marginTop: 20, marginLeft: 20}} onClick={() => {
                setDisplayChat(!displayChat)
            }}>
                Chat
            </Button>
            <Col hidden={displayChat}>
                <ChatPopUp chatMessages={chat} player={player} playertable={playertable}/>
            </Col>
            <Col style={{backgroundColor: "none", opacity: 0.8, marginBottom: 10, marginTop:10}} hidden={!displayChat}>

                <Toast show={newMessage} onClose={() => setShow(false)}  delay={2000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">{testMessage.name}</strong>
                    </Toast.Header>
                    <Toast.Body>{testMessage.content}</Toast.Body>
                </Toast>
            </Col>
            <Col>
                <PlayerDeck
                    player={player} playeronturn={playertable.playerOnTurn} playertable={playertable}
                    border={border} updateBorder={updateBorder} updateCard_played={updateCard_played}
                    updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                    ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf}
                    updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone}
                    updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies}
                    updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                    updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array}
                    updateFill_array={updateFill_array}
                />
            </Col>
            <Col/>
        </Row>
        <Row>
            <Col/>
            <Col xs={8}>
                <PlayerCards playeronturn={playertable.playerOnTurn} playertable={playertable} player={player}
                             updateBorder={updateBorder} card_played={card_played} updateCard_played={updateCard_played}
                             updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                             updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array}
                             updateFill_array={updateFill_array}/>
            </Col>
            <Col/>
        </Row>
        <Button id="custombutton" hidden={hideCancel_PlayCard} block onClick={back}>Cancel</Button>
    </Container>);
}

export default Layout4players;