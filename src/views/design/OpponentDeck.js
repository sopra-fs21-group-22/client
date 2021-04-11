import React, {useState} from 'react';
import { Col, Row, Container, Card, CardGroup, Image, Button } from 'react-bootstrap';
import "./styling.css";

export default function OpponentDeck({ user }) {
    return (
        <Container className="card-container">
            <CardGroup>
                <Row>
                    <Col>
                        <Image className="icon-dynamite" src="/images/dynamite.png"/>
                    </Col>
                    <Col>
                        <Image className="icon-sheriff" src="/images/sheriff.png"/>
                    </Col>
                    <Col/>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            {/*<Card.Img src={user.profilePicture ? user.profilePicture : "../../../public/images/character_cards/black_jack_p.png"}/>*/}
                            <Card.Img className="profile-picture" src="/images/character_cards/black_jack_p.jpeg"/>
                            <Card.ImgOverlay>
                                <Card.Img src="/images/jail.png"/>
                            </Card.ImgOverlay>
                            {/*<Card.Title>{user.username ? user.username : "undefined"}</Card.Title>*/}
                            <Card.Title>undefined</Card.Title>
                        </Card>
                    </Col>
                    <Col>
                        <Row>
                            <Image className="icon-bullet" src="/images/bullet.png"/>
                        </Row>
                        <Row>
                            <Image className="icon-bullet" src="/images/bullet.png"/>
                        </Row>
                        <Row>
                            <Image className="icon-bullet" src="/images/bullet.png"/>
                        </Row>
                        <Row>
                            <Image className="icon-bullet" src="/images/bullet.png"/>
                        </Row>
                    </Col>
                    <Col>
                        <Image className="card" src="/images/back.jpeg"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            {/*<Card.Img src={user.weapon ? user.weapon : "../../../public/images/back.jpeg"}/>*/}
                            <Card.Img className="card" src="/images/back.jpeg"/>
                            <Card.Body>weapon</Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            {/*<Card.Img src={user.horse ? user.horse : "../../../public/images/back.jpeg"}/>*/}
                            <Card.Img className="card" src="/images/back.jpeg"/>
                            <Card.Body>horse</Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            {/*<Card.Img src={user.barrel ? user.barrel : "../../../public/images/back.jpeg"}/>*/}
                            <Card.Img className="card" src="/images/back.jpeg"/>
                            <Card.Body>barrel</Card.Body>
                        </Card>
                    </Col>
                </Row>
            </CardGroup>
        </Container>
    )
}