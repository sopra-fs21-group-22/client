import React from "react";
import {Container, Row, Col, Image} from "react-bootstrap";


export default function PlayerCards({ user }){
    return (
        <Container className="shelf">
            <Row>
                <Col>
                    <Image className="card" src="/images/back.jpeg"/>
                </Col>
                <Col>
                    <Image className="card" src="/images/back.jpeg"/>
                </Col>
                <Col>
                    <Image className="card" src="/images/back.jpeg"/>
                </Col>
                <Col>
                    <Image className="card" src="/images/back.jpeg"/>
                </Col>
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