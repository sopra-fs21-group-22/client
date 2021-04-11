import React from 'react';
import { Col, Row, Container, Card, Figure, Image, Button } from 'react-bootstrap';
import "./styling.css";
import Life from "./Life";

export default function OpponentDeck({ user }) {
    return (
        <Container className="card-container">
            {/*first row for dynamite and sheriff star*/}
            <Row className="justify-content-md-center align-items-center">
                <Col>
                    <Figure>
                        <Figure.Image
                            width={60}
                            height={30}
                            alt="60x30"
                            src="/images/dynamite.png"/>
                    </Figure>
                </Col>
                <Col>
                    <Figure>
                        <Figure.Image
                            width={80}
                            height={80}
                            alt="80x80"
                            src="/images/sheriff.png"/>
                    </Figure>
                </Col>
                <Col/>
            </Row>
            {/*second row for profile, lives and amount of playable cards*/}
            <Row className="justify-content-md-center align-items-center">
                <Col>
                    <Figure className="profile">
                        {/*<Figure.Image
                            width={80}
                            height={80}
                            alt="80x80"
                            src={user.profilePicture ? user.profilePicture : "/images/character_cards/black_jack_p.jpeg"}/>*/}
                        <Figure.Image
                            width={80}
                            height={80}
                            alt="80x80"
                            src="/images/character_cards/black_jack_p.jpeg"
                        />
                        {/*<Figure.Caption>{user.username ? user.username : "undefined"}</Figure.Caption>*/}
                        <Figure.Caption>undefined</Figure.Caption>
                    </Figure>
                </Col>
                <Col>
                    <Row>
                        <Life/>
                    </Row>
                    <Row>
                        <Life/>
                    </Row>
                    <Row>
                        <Life/>
                    </Row>
                    <Row>
                        <Life/>
                    </Row>
                </Col>
            </Row>
            {/*third row for blue cards*/}
            <Row className="justify-content-md-center align-items-center">
                <Col>
                    <Figure>
                        {/*<Figure.Image
                            width={150}
                            height={100}
                            alt="150x100"
                            src={user.weapon ? user.weapon : "/images/back.jpeg"}/>*/}
                        <Figure.Image
                            width={80}
                            height={100}
                            alt="80x100"
                            src="/images/back.jpeg"/>
                        <Figure.Caption>weapon</Figure.Caption>
                    </Figure>
                </Col>
                <Col>
                    <Figure>
                        {/*<Figure.Image
                            width={150}
                            height={100}
                            alt="150x100"
                            src={user.horse ? user.horse : "/images/back.jpeg"}/>*/}
                        <Figure.Image
                            width={80}
                            height={100}
                            alt="80x100"
                            src="/images/back.jpeg"/>
                        <Figure.Caption>horse</Figure.Caption>
                    </Figure>
                </Col>
                <Col>
                    <Figure>
                        {/*<Figure.Image
                            width={150}
                            height={100}
                            alt="150x100"
                            src={user.barrel ? user.barrel : "/images/back.jpeg"}/>*/}
                        <Figure.Image
                            width={80}
                            height={100}
                            alt="80x100"
                            src="/images/back.jpeg"/>
                        <Figure.Caption>barrel</Figure.Caption>
                    </Figure>
                </Col>
            </Row>
        </Container>
    )
}