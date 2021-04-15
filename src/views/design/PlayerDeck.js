
import { Col, Row, Container, Card, Figure, Image, Button } from 'react-bootstrap';
import "./styling/playing_field_styling.css";
import Life from "./Life";
import React, { useState, useEffect } from 'react';

export default function PlayerDeck({ player }) {
    const [deadmessage, setDeadmessage] = useState(true);
    /*if (!deadmessage){
        setDeadmessage(false);
    }*/
    return (
        <div>
            <p1 id="player-deck_div_p1" /*hidden={deadmessage}*/><b>You Dead</b></p1>
            <div id="player-deck_div">
        <Container className="opponent-player-deck_container-card">
        
            {/*first row for dynamite and sheriff star*/}
            <Row className="justify-content-md-center align-items-center">
                <Col>
                    <Figure>
                    {/*<Figure hidden={!opponent.dynamite}>*/}
                        <Figure.Image
                            width={60}
                            height={30}
                            alt="60x30"
                            src="/images/icons/dynamite.png"/>
                    </Figure>
                </Col>
                <Col>
                    <Figure>
                    {/*<Figure hidden={!player.gameRole == "SHERIFF">*/}
                        <Figure.Image
                            width={80}
                            height={80}
                            alt="80x80"
                            src="/images/icons/sheriff.png"/>
                    </Figure>
                </Col>
                <Col/>
            </Row>
            {/*second row for profile, lives and amount of playable cards*/}
            <Row className="justify-content-md-center align-items-center">
                <Col>
                    <Figure>
                        {/*<Figure.Image
                            width={80}
                            height={80}
                            alt="80x80"
                            src={`/images/character_cards/${player.profilePicture.getId()}.jpeg`}/>*/}
                        <Figure.Image
                            width={80}
                            height={80}
                            alt="80x80"
                            src="/images/character_cards/black_jack_p.jpeg"
                        />
                        {/*<Figure.Caption>{player.username}</Figure.Caption>*/}
                        <Figure.Caption id="opponent-player-deck_figure-profile-picture">undefined</Figure.Caption>
                    </Figure>
                </Col>
                <Col>
                    <Row>
                        <Life/>
                        {/*<Life hidden={player.bullets < 5}/>*/}
                    </Row>
                    <Row>
                        <Life/>
                        {/*<Life hidden={player.bullets < 4}/>*/}
                    </Row>
                    <Row>
                        <Life/>
                        {/*<Life hidden={player.bullets < 3}/>*/}
                    </Row>
                    <Row>
                        <Life/>
                        {/*<Life hidden={player.bullets < 2}/>*/}
                    </Row>
                    <Row>
                        <Life/>
                        {/*<Life hidden={player.bullets < 1}/>*/}
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
                            src={`/images/weapons/${player.weapon.getId()}.jpeg`}/>*/}
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
                            src={`/images/horses/${player.horse.getId()}.jpeg`}/>*/}
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
                            src={user.barrel ? user.barrel : "/images/barrel.jpeg"}/>*/}
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
        </div>
        </div>
    )
}