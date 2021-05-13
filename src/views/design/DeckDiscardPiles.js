import React from "react";
import {Container, Row, Col, Image} from "react-bootstrap";
import "./styling/playing_field_styling.css";

export default function DeckDiscardPiles({playertable, playeronturn}){

    function getTopDiscardCard() {
        const curr = playertable.discardPile.topCard;
        return `/images/play_cards/${curr.color}_${curr.card}_${curr.suit}_${curr.rank}.png`
    }
    return (
        <Container className="deck-discard-pile_container">
            <Row>
                <Col>
                    {/*always remains the back, so no changes TODO: change if shuffle is implemented*/}
                    <Image className="deck-discard-pile_image-card" src="/images/back.png"/>
                </Col>
                <Col>
                    {playertable.discardPile.amountCards > 0 ? (
                        <Image className="deck-discard-pile_image-card" src={getTopDiscardCard()}/>
                    ):null}
                    {/*<Image className="deck-discard-pile_image-card" src="/images/back.png"/>*/}
                </Col>
            </Row>
        </Container>
    )
}