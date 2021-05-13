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
    ModalBody
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
// function Layout4players({visibility, hideCancel_PlayCard, updateHideCancel_PlayCard, ignoreRange, updateIgnoreRange, targetSelf, updateTargetSelf, targetEveryone, updateTargetEveryone, targetOnlyEnemies, updateTargetOnlyEnemies, updateCurr_card, curr_card}){
     const interval = useInterval(async () => {    
        /* console.log(`${playerList[0].user}layoutversion: ${playerList[0].bullets}`);
        console.log(`${playerList[1].user}layoutversion: ${playerList[1].bullets}`);
        console.log(`${playerList[2].user}layoutversion: ${playerList[2].bullets}`);
        console.log(`${playerList[3].user}layoutversion: ${playerList[3].bullets}`);
        console.log("sduifhsoduf"); */
        fillPlayerList();
        updateChatLog();
    }, 1000);     



    const [border, setBorder] = useState("none");
    const [card_played, setCard_played] = useState(false);
    const [fill_array, setFill_array] = useState(true);
    const [playerList, setPlayerList] = useState(orderarray);
    const [displayChat, setDisplayChat] = useState(false); // boolean whether the Chat Popup should be displayed or not
    const [newMessages, setNewMessages] = useState([]); // Array of new messages


    const updateBorder = (value) => {
        setBorder(value);
    }
    const updateCard_played = (value) => {
        setCard_played(value);
    }

    const updateFill_array = (value) => {
        setFill_array(value);
    }
    function checkForNewMessages() {
        if(updateChat.length > chat.length){

        }
    }

    function updateChatLog() { // fetches all chat messages from the backend
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
    function fillPlayerList(){
        let array=[];
        for (let x=0; x<orderarray.length; x++){
            array[x]=searchbyid(orderarray[x].id);
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
                <OpponentDeck opponent={playerList[2]} /* opponent={orderarray[2]} */ player={playerList[0]} playeronturn={playertable.playerOnTurn}
                              playertable={playertable} border={border} updateBorder={updateBorder}
                              updateCard_played={updateCard_played}
                              updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                              ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf}
                              updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone}
                              updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies}
                              updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                              updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array}
                              updateFill_array={updateFill_array}/>
                {/*<OpponentDeck opponent={null} playeronturn={null} border={border} updateBorder={updateBorder} playertable={null} updateCard_played={updateCard_played} updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf} updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone} updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                updateCurr_card={updateCurr_card} curr_card={curr_card}/>*/}
            </Col>
            <Col/>
        </Row>
        <Row>
            <Col>
                <OpponentDeck opponent={playerList[3]} /* opponent={orderarray[3]} */ player={playerList[0]} playeronturn={playertable.playerOnTurn}
                              playertable={playertable} border={border} updateBorder={updateBorder}
                              updateCard_played={updateCard_played}
                              updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                              ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf}
                              updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone}
                              updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies}
                              updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                              updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array}
                              updateFill_array={updateFill_array}/>
                {/*<OpponentDeck opponent={null} playeronturn={null} border={border} updateBorder={updateBorder} playertable={null} updateCard_played={updateCard_played} updateHideCancel_PlayCard={updateHideCancel_PlayCard}*/}
                {/*ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf} updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone} updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} updateTargetOnlyEnemies={updateTargetOnlyEnemies}*/}
                {/*updateCurr_card={updateCurr_card} curr_card={curr_card}/>*/}
            </Col>
            <Col>
                <DeckDiscardPiles playertable={playertable} playeronturn={playertable.playerOnTurn}/>
                {/*<DeckDiscardPiles/>*/}
            </Col>
            <Col>
                <OpponentDeck opponent={playerList[1]} /* opponent={orderarray[1]} */ player={playerList[0]} playeronturn={playertable.playerOnTurn}
                              playertable={playertable} border={border} updateBorder={updateBorder}
                              updateCard_played={updateCard_played}
                              updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                              ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf}
                              updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone}
                              updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies}
                              updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                              updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array}
                              updateFill_array={updateFill_array}/>
                {/*<OpponentDeck opponent={null} playeronturn={null} border={border} updateBorder={updateBorder} playertable={null} updateCard_played={updateCard_played} updateHideCancel_PlayCard={updateHideCancel_PlayCard}*/}
                {/*ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf} updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone} updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} updateTargetOnlyEnemies={updateTargetOnlyEnemies}*/}
                {/*updateCurr_card={updateCurr_card} curr_card={curr_card}/>*/}
            </Col>
        </Row>
        <Row>
            <Col/>
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
                {/*<PlayerDeck player={null} playeronturn={null} border={border} updateBorder={updateBorder} playertable={null} updateCard_played={updateCard_played} updateHideCancel_PlayCard={updateHideCancel_PlayCard}*/}
                {/*ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf} updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone} updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} updateTargetOnlyEnemies={updateTargetOnlyEnemies}*/}
                {/*updateCurr_card={updateCurr_card} curr_card={curr_card}/>*/}
            </Col>
            <Col/>
        </Row>
        <Row hidden={displayChat}>
            <ChatPopUp chat={chat} player={player} playertable={playertable}/>
        </Row>
        <Row>
            <Button id="custombutton" onClick={() => {setDisplayChat(!displayChat)}}>
                Chat
            </Button>
        </Row>
        <Row>
            <Col/>
            <Col xs={8}>
                <PlayerCards playeronturn={playertable.playerOnTurn} playertable={playertable} player={player}
                             updateBorder={updateBorder} card_played={card_played} updateCard_played={updateCard_played}
                             updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                             updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array}
                             updateFill_array={updateFill_array}/>
                {/*<PlayerCards player_table={null} player={null} updateBorder={updateBorder} card_played={card_played} updateCard_played={updateCard_played} updateHideCancel_PlayCard={updateHideCancel_PlayCard}*/}
                {/*updateCurr_card={updateCurr_card} curr_card={curr_card}/>*/}
            </Col>
            <Col/>
        </Row>
        <Button id="custombutton" hidden={hideCancel_PlayCard} block onClick={back}>Cancel</Button>
    </Container>);
}

export default Layout4players;