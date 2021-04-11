import React from "react";
import {Container, Row, Col, Image} from "react-bootstrap";

export default function DeckDiscardPiles(){
    return (
        <Container className="deck-discard">
            <Row>
                <Col>
                    <Image className="card" src="/images/back.jpeg"/>
                </Col>
                <Col>
                    <Image className="card" src="/images/back.jpeg"/>
                </Col>
            </Row>
        </Container>
    )
}