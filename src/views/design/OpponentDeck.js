import React from 'react';
import { Col, Row, Container, Card, Figure, Image, Button } from 'react-bootstrap';
import "./styling/playing_field_styling.css";
import Life from "./Life";

export default function OpponentDeck({ opponent }) {
    /* function dead(){
        if (opponent.bullets < 1){
        return false;
        }
    }*/
    /*function greyedout(){
        if (opponent.bullets < 1){
            return "rgb(128, 128, 128, 0.8)";
        }
    }*/
    /*function opacity(){
        if (opponent.bullets < 1){
            return 0.8;
        }
    }*/
    return (
        <div>
            <p1 id="opponent-deck_div_p1"><b>He Dead</b></p1>
            <div id="opponent-deck_div" /*style={{opacity: {opacity}, backgroundColor={greyedout}}}*/>
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
                    {/*<Figure hidden={!opponent.gameRole == "SHERIFF">*/}
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
                            src={`/images/character_cards/${opponent.profilePicture.getId()}.jpeg`}/>*/}
                        <Figure.Image
                            width={80}
                            height={80}
                            alt="80x80"
                            src="/images/character_cards/black_jack_p.jpeg"
                        />
                        {/*<Figure.Caption>{opponent.username}</Figure.Caption>*/}
                        <Figure.Caption id="opponent-player-deck_figure-profile-picture">undefined</Figure.Caption>
                    </Figure>
                </Col>
                <Col>
                    <Row>
                        <Life/>
                        {/*<Life hidden={opponent.bullets < 5}/>*/}
                    </Row>
                    <Row>
                        <Life/>
                        {/*<Life hidden={opponent.bullets < 4}/>*/}
                    </Row>
                    <Row>
                        <Life/>
                        {/*<Life hidden={opponent.bullets < 3}/>*/}
                    </Row>
                    <Row>
                        <Life/>
                        {/*<Life hidden={opponent.bullets < 2}/>*/}
                    </Row>
                    <Row>
                        <Life/>
                        {/*<Life hidden={opponent.bullets < 1}/>*/}
                    </Row>
                </Col>
                <Col>
                    <Figure>
                    {/*<Figure hidden={opponent.hand.getPlayCards.length === 0}>*/}
                        <Figure.Image
                            width={80}
                            height={100}
                            alt="80x100"
                            src="/images/back.jpeg"/>
                        <Figure.Caption>{/*opponent.hand.getPlayCards.length*/} card(s) left</Figure.Caption>
                    </Figure>
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
                            src={`/images/weapons/${opponent.weapon.getId()}.jpeg`}/>*/}
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
                            src={`/images/horses/${opponent.horse.getId()}.jpeg`}/>*/}
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