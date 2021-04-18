import { Col, Row, Container, Card, ListGroup, ListGroupItem, CardDeck, Button, Modal, Image, ModalBody } from 'react-bootstrap';
import OpponentDeck from "../OpponentDeck";
import PlayerDeck from "../PlayerDeck";
import PlayerCards from "../PlayerCards";
import DeckDiscardPiles from "../DeckDiscardPiles";
import React, { useState, useEffect } from 'react';

// function Layout4players({playertable, orderarray, visibility}){
function Layout4players({visibility}){
    const [border, setBorder] = useState("none");
    const [card_played, setCard_played] = useState(false);
    return (<Container hidden={visibility}>
        <Row>
            <Col/>
            <Col>
                {/*<OpponentDeck opponent={orderarray[2]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateborder={setBorder} setCard_played={setCard_played}/>*/}
                <OpponentDeck opponent={null}/>
            </Col>
            <Col/>
        </Row>
        <Row>
            <Col>
                {/*<OpponentDeck opponent={orderarray[3]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateborder={setBorder} setCard_played={setCard_played}/>*/}
                <OpponentDeck opponent={null}/>
            </Col>
            <Col>
                {/*<DeckDiscardPiles playertable={playertable} playeronturn={playertable.playerOnTurn}/>*/}
                <DeckDiscardPiles/>
            </Col>
            <Col>
                {/*<OpponentDeck opponent={orderarray[1]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateborder={setBorder} setCard_played={setCard_played}/>*/}
                <OpponentDeck opponent={null}/>
            </Col>
        </Row>
        <Row>
            <Col/>
            <Col>
                {/*<PlayerDeck player={orderarray[0]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateborder={setBorder} setCard_played={setCard_played}/>*/}
                <PlayerDeck player={null} border={border} updateborder={setBorder} setCard_played={setCard_played}/>
            </Col>
            <Col/>
        </Row>
        <Row>
            <Col/>
            <Col xs={8}>
                {/*<PlayerCards player={orderarray[0]} updateborder={setBorder} card_played={card_played} setCard_played={setCard_played}/>*/}
                <PlayerCards player={null} updateborder={setBorder} card_played={card_played} setCard_played={setCard_played}/>
            </Col>
            <Col/>
        </Row>
    </Container>);
}
export default Layout4players;