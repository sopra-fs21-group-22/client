import { Col, Row, Container, Card, ListGroup, ListGroupItem, CardDeck, Button, Modal, Image, ModalBody} from 'react-bootstrap';
import OpponentDeck from "../OpponentDeck";
import PlayerDeck from "../PlayerDeck";
import PlayerCards from "../PlayerCards";
import DeckDiscardPiles from "../DeckDiscardPiles";
import React, { useState, useEffect } from 'react';
import "../styling/custom_button_styling.css";

// function Layout4players({playertable, orderarray, visibility, player_id, playersinreach hideCancel_PlayCard, updateHideCancel_PlayCard, ignoreRange, updateIgnoreRange, targetSelf, updateTargetSelf, targetEveryone, updateTargetEveryone, targetOnlyEnemies, updateTargetOnlyEnemies, updateM, m}){
function Layout4players({visibility, hideCancel_PlayCard, updateHideCancel_PlayCard, ignoreRange, updateIgnoreRange, targetSelf, updateTargetSelf, targetEveryone, updateTargetEveryone, targetOnlyEnemies, updateTargetOnlyEnemies, updateM, m}){
    const [border, setBorder] = useState("none");
    const [card_played, setCard_played] = useState(false);

    const updateBorder = (value) => {
        setBorder(value);
    }
    const updateCard_played = (value) => {
        setCard_played(value);
    }
    

    async function back(){
        console.log(m);
        updateHideCancel_PlayCard(true);
        updateBorder("none");
        updateTargetSelf(false);
        updateIgnoreRange(false);
        updateTargetOnlyEnemies(false);
        updateTargetEveryone(false);
    }
    return (<Container hidden={visibility}>
        <Button id="custombutton" hidden={hideCancel_PlayCard} block onClick={back}>Cancel</Button>
        <Row>
            <Col/>
            <Col>
                {/*<OpponentDeck opponent={orderarray[2]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateborder={updateBorder} updateCard_played={updateCard_played} updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf} updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone} updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                updateM={updateM}m={m}/>*/}
                <OpponentDeck opponent={null} playeronturn={null} border={border} updateBorder={updateBorder} playertable={null} updateCard_played={updateCard_played} updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf} updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone} updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                updateM={updateM}m={m}/>
            </Col>
            <Col/>
        </Row>
        <Row>
            <Col>
                {/*<OpponentDeck opponent={orderarray[3]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateborder={updateBorder} updateCard_played={updateCard_played} updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf} updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone} updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                updateM={updateM}m={m}/>*/}
                <OpponentDeck opponent={null} playeronturn={null} border={border} updateBorder={updateBorder} playertable={null} updateCard_played={updateCard_played} updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf} updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone} updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                updateM={updateM}m={m}/>
            </Col>
            <Col>
                {/*<DeckDiscardPiles playertable={playertable} playeronturn={playertable.playerOnTurn}/>*/}
                <DeckDiscardPiles/>
            </Col>
            <Col>
                {/*<OpponentDeck opponent={orderarray[1]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateborder={updateBorder} updateCard_played={updateCard_played} updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf} updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone} updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                updateM={updateM}m={m}/>*/}
                <OpponentDeck opponent={null} playeronturn={null} border={border} updateBorder={updateBorder} playertable={null} updateCard_played={updateCard_played} updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf} updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone} updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                updateM={updateM}m={m}/>
            </Col>
        </Row>
        <Row>
            <Col/>
            <Col>
                {/*<PlayerDeck player={orderarray[0]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateborder={updateBorder} updateCard_played={updateCard_played} updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf} updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone} updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                updateM={updateM}m={m}
                />*/}
                <PlayerDeck player={null} playeronturn={null} border={border} updateBorder={updateBorder} playertable={null} updateCard_played={updateCard_played} updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf} updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone} updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                updateM={updateM}m={m}/>
            </Col>
            <Col/>
        </Row>
        <Row>
            <Col/>
            <Col xs={8}>
                {/*<PlayerCards playertable={playertable} player={orderarray[0]} updateBorder={updateBorder} card_played={card_played} updateCard_played={updateCard_played} updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                updateM={updateM}m={m}/>*/}
                <PlayerCards player_table={null} player={null} updateBorder={updateBorder} card_played={card_played} updateCard_played={updateCard_played} updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                updateM={updateM}m={m}/>
            </Col>
            <Col/>
        </Row>
    </Container>);
}
export default Layout4players;