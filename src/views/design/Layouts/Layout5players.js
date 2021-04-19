import { Col, Row, Container, Card, ListGroup, ListGroupItem, CardDeck, Button, Modal, Image, ModalBody } from 'react-bootstrap';
import OpponentDeck from "../OpponentDeck";
import PlayerDeck from "../PlayerDeck";
import PlayerCards from "../PlayerCards";
import DeckDiscardPiles from "../DeckDiscardPiles";
import React, { useState, useEffect } from 'react';
import "../styling/custom_button_styling.css";

// function Layout4players({playertable, orderarray, visibility, hideCancel_PlayCard, setHideCancel_PlayCard}){
function Layout5players({visibility, hideCancel_PlayCard, setHideCancel_PlayCard}){
    const [border, setBorder] = useState("none");
    const [card_played, setCard_played] = useState(false);
    function back(){
        setHideCancel_PlayCard(true);
        setBorder("none");
    }
    return (<Container hidden={visibility}>
        <Button id="custombutton" hidden={hideCancel_PlayCard} block onClick={back}>oh shit go back</Button>
        <Row>
            <Col/>
            <Col>
                {/*<OpponentDeck opponent={orderarray[3]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateborder={setBorder} setCard_played={setCard_played} setHideCancel_PlayCard={setHideCancel_PlayCard}/>*/}
                <OpponentDeck opponent={null}/>
            </Col>
            <Col>
                {/*<OpponentDeck opponent={orderarray[2]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateborder={setBorder} setCard_played={setCard_played} setHideCancel_PlayCard={setHideCancel_PlayCard}/>*/}
                <OpponentDeck opponent={null}/>
            </Col>
            <Col/>
        </Row>
        <Row>
            <Col>
                {/*<OpponentDeck opponent={orderarray[4]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateborder={setBorder} setCard_played={setCard_played} setHideCancel_PlayCard={setHideCancel_PlayCard}/>*/}
                <OpponentDeck opponent={null}/>
            </Col>
            <Col>
                {/*<DeckDiscardPiles playertable={playertable}/>*/}
                <DeckDiscardPiles/>
            </Col>
            <Col>
                {/*<OpponentDeck opponent={orderarray[1]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateborder={setBorder} setCard_played={setCard_played} setHideCancel_PlayCard={setHideCancel_PlayCard}/>*/}
                <OpponentDeck opponent={null}/>
            </Col>
        </Row>
        <Row>
            <Col/>
            <Col>
                {/*<PlayerDeck player={orderarray[0]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateborder={setBorder} setCard_played={setCard_played} setHideCancel_PlayCard={setHideCancel_PlayCard}/>*/}
                <PlayerDeck player={null}/>
            </Col>
            <Col/>
        </Row>
        <Row>
            <Col/>
            <Col xs={8}>
                {/*<PlayerCards player={orderarray[0]} updateborder={setBorder} card_played={card_played} setCard_played={setCard_played} hideCancel_PlayCard={hideCancel_PlayCard} setHideCancel_PlayCard={setHideCancel_PlayCard}/>*/}
                <PlayerCards player={null}/>
            </Col>
            <Col/>
        </Row>
    </Container>);
}
export default Layout5players;