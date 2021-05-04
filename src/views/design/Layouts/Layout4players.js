import { Col, Row, Container, Card, ListGroup, ListGroupItem, CardDeck, Button, Modal, Image, ModalBody} from 'react-bootstrap';
import OpponentDeck from "../OpponentDeck";
import PlayerDeck from "../PlayerDeck";
import PlayerCards from "../PlayerCards";
import DeckDiscardPiles from "../DeckDiscardPiles";
import React, { useState, useEffect } from 'react';
import "../styling/custom_button_styling.css";

function Layout4players({playertable, orderarray, visibility, player, hideCancel_PlayCard, updateHideCancel_PlayCard, ignoreRange, updateIgnoreRange, targetSelf, updateTargetSelf, targetEveryone, updateTargetEveryone, targetOnlyEnemies, updateTargetOnlyEnemies, updateCurr_card, curr_card}){
// function Layout4players({visibility, hideCancel_PlayCard, updateHideCancel_PlayCard, ignoreRange, updateIgnoreRange, targetSelf, updateTargetSelf, targetEveryone, updateTargetEveryone, targetOnlyEnemies, updateTargetOnlyEnemies, updateCurr_card, curr_card}){
    const [border, setBorder] = useState("none");
    const [card_played, setCard_played] = useState(false);
    const [fill_array, setFill_array] = useState(true);

    const updateBorder = (value) => {
        setBorder(value);
    }
    const updateCard_played = (value) => {
        setCard_played(value);
    }

    const updateFill_array = (value) => {
        setFill_array(value);
    }

    

    function back(){
        updateHideCancel_PlayCard(true);
        updateBorder("none");
        updateTargetSelf(false);
        updateIgnoreRange(false);
        updateTargetOnlyEnemies(false);
        updateTargetEveryone(false);
        updateCurr_card(null);
    }
    return (<Container hidden={visibility}>
        <Button id="custombutton" hidden={hideCancel_PlayCard} block onClick={back}>Cancel</Button>
        <Row>
            <Col/>
            <Col>
                <OpponentDeck opponent={orderarray[2]} player={orderarray[0]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateBorder={updateBorder} updateCard_played={updateCard_played} updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf} updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone} updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array} updateFill_array={updateFill_array}/>
                {/*<OpponentDeck opponent={null} playeronturn={null} border={border} updateBorder={updateBorder} playertable={null} updateCard_played={updateCard_played} updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf} updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone} updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                updateCurr_card={updateCurr_card} curr_card={curr_card}/>*/}
            </Col>
            <Col/>
        </Row>
        <Row>
            <Col>
                <OpponentDeck opponent={orderarray[3]} player={orderarray[0]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateBorder={updateBorder} updateCard_played={updateCard_played} updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf} updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone} updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array} updateFill_array={updateFill_array}/>
                {/*<OpponentDeck opponent={null} playeronturn={null} border={border} updateBorder={updateBorder} playertable={null} updateCard_played={updateCard_played} updateHideCancel_PlayCard={updateHideCancel_PlayCard}*/}
                {/*ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf} updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone} updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} updateTargetOnlyEnemies={updateTargetOnlyEnemies}*/}
                {/*updateCurr_card={updateCurr_card} curr_card={curr_card}/>*/}
            </Col>
            <Col>
                <DeckDiscardPiles playertable={playertable} playeronturn={playertable.playerOnTurn}/>
                {/*<DeckDiscardPiles/>*/}
            </Col>
            <Col>
                <OpponentDeck opponent={orderarray[1]} player={orderarray[0]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateBorder={updateBorder} updateCard_played={updateCard_played} updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf} updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone} updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array} updateFill_array={updateFill_array}/>
                {/*<OpponentDeck opponent={null} playeronturn={null} border={border} updateBorder={updateBorder} playertable={null} updateCard_played={updateCard_played} updateHideCancel_PlayCard={updateHideCancel_PlayCard}*/}
                {/*ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf} updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone} updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} updateTargetOnlyEnemies={updateTargetOnlyEnemies}*/}
                {/*updateCurr_card={updateCurr_card} curr_card={curr_card}/>*/}
            </Col>
        </Row>
        <Row>
            <Col/>
            <Col>
                <PlayerDeck player={player} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateBorder={updateBorder} updateCard_played={updateCard_played} updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf} updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone} updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array} updateFill_array={updateFill_array}
                />
                {/*<PlayerDeck player={null} playeronturn={null} border={border} updateBorder={updateBorder} playertable={null} updateCard_played={updateCard_played} updateHideCancel_PlayCard={updateHideCancel_PlayCard}*/}
                {/*ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf} updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone} updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} updateTargetOnlyEnemies={updateTargetOnlyEnemies}*/}
                {/*updateCurr_card={updateCurr_card} curr_card={curr_card}/>*/}
            </Col>
            <Col/>
        </Row>
        <Row>
            <Col/>
            <Col xs={8}>
                <PlayerCards playertable={playertable} player={player} updateBorder={updateBorder} card_played={card_played} updateCard_played={updateCard_played} updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array} updateFill_array={updateFill_array}/>
                {/*<PlayerCards player_table={null} player={null} updateBorder={updateBorder} card_played={card_played} updateCard_played={updateCard_played} updateHideCancel_PlayCard={updateHideCancel_PlayCard}*/}
                {/*updateCurr_card={updateCurr_card} curr_card={curr_card}/>*/}
            </Col>
            <Col/>
        </Row>
    </Container>);
}
export default Layout4players;