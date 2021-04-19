import { Col, Row, Container, Card, ListGroup, ListGroupItem, CardDeck, Button, Modal, Image, ModalBody} from 'react-bootstrap';
import OpponentDeck from "../OpponentDeck";
import PlayerDeck from "../PlayerDeck";
import PlayerCards from "../PlayerCards";
import DeckDiscardPiles from "../DeckDiscardPiles";
import React, { useState, useEffect } from 'react';
import "../styling/custom_button_styling.css";

// function Layout4players({playertable, orderarray, visibility, hideCancel_PlayCard, setHideCancel_PlayCard, ignoreRange, setIgnoreRange, targetSelf, setTargetSelf, targetEveryone, setTargetEveryone, targetOnlyEnemies, setTargetOnlyEnemies}){
function Layout4players({visibility, hideCancel_PlayCard, setHideCancel_PlayCard, ignoreRange, setIgnoreRange, targetSelf, setTargetSelf, targetEveryone, setTargetEveryone, targetOnlyEnemies, setTargetOnlyEnemies}){
    const [border, setBorder] = useState("none");
    const [card_played, setCard_played] = useState(false);
    const [borderWidth, setBorderWidth] = useState(5);
    function back(){
        setHideCancel_PlayCard(true);
        setBorder("none");
        setBorderWidth(5);
        setTargetSelf(false);
        setIgnoreRange(false);
        setTargetOnlyEnemies(false);
    }
    return (<Container hidden={visibility}>
        <Button id="custombutton" hidden={hideCancel_PlayCard} block onClick={back}>oh shit go back</Button>
        <Row>
            <Col/>
            <Col>
                {/*<OpponentDeck opponent={orderarray[2]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateborder={setBorder} setCard_played={setCard_played} setHideCancel_PlayCard={setHideCancel_PlayCard}
                ignoreRange={ignoreRange} setIgnoreRange={setIgnoreRange} targetSelf={targetSelf} setTargetSelf={setTargetSelf} targetEveryone={targetEveryone} setTargetEveryone={setTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} setTargetOnlyEnemies={setTargetOnlyEnemies}
                borderWidth={borderWidth} setBorderWidth={setBorderWidth}/>*/}
                <OpponentDeck opponent={null} border={border} updateborder={setBorder} setCard_played={setCard_played} setHideCancel_PlayCard={setHideCancel_PlayCard}
                ignoreRange={ignoreRange} setIgnoreRange={setIgnoreRange} targetSelf={targetSelf} setTargetSelf={setTargetSelf} targetEveryone={targetEveryone} setTargetEveryone={setTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} setTargetOnlyEnemies={setTargetOnlyEnemies}
                borderWidth={borderWidth} setBorderWidth={setBorderWidth}/>
            </Col>
            <Col/>
        </Row>
        <Row>
            <Col>
                {/*<OpponentDeck opponent={orderarray[3]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateborder={setBorder} setCard_played={setCard_played} setHideCancel_PlayCard={setHideCancel_PlayCard}
                ignoreRange={ignoreRange} setIgnoreRange={setIgnoreRange} targetSelf={targetSelf} setTargetSelf={setTargetSelf} targetEveryone={targetEveryone} setTargetEveryone={setTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} setTargetOnlyEnemies={setTargetOnlyEnemies}
                borderWidth={borderWidth} setBorderWidth={setBorderWidth}/>*/}
                <OpponentDeck opponent={null} border={border} updateborder={setBorder} setCard_played={setCard_played} setHideCancel_PlayCard={setHideCancel_PlayCard}
                ignoreRange={ignoreRange} setIgnoreRange={setIgnoreRange} targetSelf={targetSelf} setTargetSelf={setTargetSelf} targetEveryone={targetEveryone} setTargetEveryone={setTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} setTargetOnlyEnemies={setTargetOnlyEnemies}
                borderWidth={borderWidth} setBorderWidth={setBorderWidth}/>
            </Col>
            <Col>
                {/*<DeckDiscardPiles playertable={playertable} playeronturn={playertable.playerOnTurn}/>*/}
                <DeckDiscardPiles/>
            </Col>
            <Col>
                {/*<OpponentDeck opponent={orderarray[1]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateborder={setBorder} setCard_played={setCard_played} setHideCancel_PlayCard={setHideCancel_PlayCard}
                ignoreRange={ignoreRange} setIgnoreRange={setIgnoreRange} targetSelf={targetSelf} setTargetSelf={setTargetSelf} targetEveryone={targetEveryone} setTargetEveryone={setTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} setTargetOnlyEnemies={setTargetOnlyEnemies}
                borderWidth={borderWidth} setBorderWidth={setBorderWidth}/>*/}
                <OpponentDeck opponent={null} border={border} updateborder={setBorder} setCard_played={setCard_played} setHideCancel_PlayCard={setHideCancel_PlayCard}
                ignoreRange={ignoreRange} setIgnoreRange={setIgnoreRange} targetSelf={targetSelf} setTargetSelf={setTargetSelf} targetEveryone={targetEveryone} setTargetEveryone={setTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} setTargetOnlyEnemies={setTargetOnlyEnemies}
                borderWidth={borderWidth} setBorderWidth={setBorderWidth}/>
            </Col>
        </Row>
        <Row>
            <Col/>
            <Col>
                {/*<PlayerDeck player={orderarray[0]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateborder={setBorder} setCard_played={setCard_played} setHideCancel_PlayCard={setHideCancel_PlayCard}
                ignoreRange={ignoreRange} setIgnoreRange={setIgnoreRange} targetSelf={targetSelf} setTargetSelf={setTargetSelf} targetEveryone={targetEveryone} setTargetEveryone={setTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} setTargetOnlyEnemies={setTargetOnlyEnemies}
                borderWidth={borderWidth} setBorderWidth={setBorderWidth}/>*/}
                <PlayerDeck player={null} border={border} updateborder={setBorder} setCard_played={setCard_played} setHideCancel_PlayCard={setHideCancel_PlayCard}
                ignoreRange={ignoreRange} setIgnoreRange={setIgnoreRange} targetSelf={targetSelf} setTargetSelf={setTargetSelf} targetEveryone={targetEveryone} setTargetEveryone={setTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} setTargetOnlyEnemies={setTargetOnlyEnemies}
                borderWidth={borderWidth} setBorderWidth={setBorderWidth}/>
            </Col>
            <Col/>
        </Row>
        <Row>
            <Col/>
            <Col xs={8}>
                {/*<PlayerCards player={orderarray[0]} updateborder={setBorder} card_played={card_played} setCard_played={setCard_played} hideCancel_PlayCard={hideCancel_PlayCard} setHideCancel_PlayCard={setHideCancel_PlayCard}
                ignoreRange={ignoreRange} setIgnoreRange={setIgnoreRange} targetSelf={targetSelf} setTargetSelf={setTargetSelf} targetEveryone={targetEveryone} setTargetEveryone={setTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} setTargetOnlyEnemies={setTargetOnlyEnemies}
                borderWidth={borderWidth} setBorderWidth={setBorderWidth}/>*/}
                <PlayerCards player={null} updateborder={setBorder} card_played={card_played} setCard_played={setCard_played} hideCancel_PlayCard={hideCancel_PlayCard} setHideCancel_PlayCard={setHideCancel_PlayCard}
                ignoreRange={ignoreRange} setIgnoreRange={setIgnoreRange} targetSelf={targetSelf} setTargetSelf={setTargetSelf} targetEveryone={targetEveryone} setTargetEveryone={setTargetEveryone} targetOnlyEnemies={targetOnlyEnemies} setTargetOnlyEnemies={setTargetOnlyEnemies}
                borderWidth={borderWidth} setBorderWidth={setBorderWidth}/>
            </Col>
            <Col/>
        </Row>
    </Container>);
}
export default Layout4players;