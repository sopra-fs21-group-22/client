import React from "react";
import {Container, Row, Col, Image} from "react-bootstrap";
import "./styling/playing_field_styling.css";

// export default function DeckDiscardPiles({playertable}){
export default function DeckDiscardPiles(){
    return (
        <Container className="deck-discard-pile_container">
            <Row>
                <Col>
                    <Image className="deck-discard-pile_image-card" src="/images/back.jpeg"/>
                </Col>
                <Col>
                    {/*<Image className="deck-discard-pile_image-card" src={`/images/cards/${playertable.discardPile.topCard.getId()}.jpeg`}/>*/}
                    <Image className="deck-discard-pile_image-card" src="/images/back.jpeg"/>
                </Col>
            </Row>
        </Container>
    )
}