import useInterval from "../../components/game/useInterval.js";
import React, { useState, useEffect } from 'react';
import { Col, Row, Container, Card, Figure, Image, Button } from 'react-bootstrap';
import "./styling/playing_field_styling.css";
import Life from "./Life";

export default function OpponentDeck({ opponent, playeronturn, border, updateBorder, playertable, updateCard_played, updateHideCancel_PlayCard, 
    ignoreRange, updateIgnoreRange, targetSelf, updateTargetSelf, targetEveryone, updateTargetEveryone, targetOnlyEnemies, updateTargetOnlyEnemies,
    borderWidth, updateBorderWidth}) {
    const interval = useInterval(async () => {    
        //repeating requests to keep stuff up-to-date
        //setPlayersInReach(api.get(`/${playertable.id}/players/${player_id}/targets`));
        /*if (opponent.bullets < 1){
            setOpacity(0.8);
            setHideDeadMessage(false);
            setBackgroundColor("#808080");
            updateBorderWidth(0);
        }
        if (opponent.id==playeronturn.id){
            setHighlightImage("solid");
        }
        if(opponent.id!=playeronturn.id){
            setHighlightImage("none");
        }
        isinreach();
        if (!isInReach){
            updateBorderWidth(0);
        }
        if (isInReach){
            updateBorderWidth(5);
        }
        
        */
        if (targetSelf){
            setTestWidth(0);
        }
        
        console.log("done");
        console.log(testWidth);
        console.log(targetSelf);
        console.log("uiwefnhwe");
        if (!targetSelf){
            setTestWidth(5);
        }

    }, 1000);
    function isinreach(){
        if (!ignoreRange){
            let x;
            for (x of playersInReach){
                if (x.id==opponent.id){
                    setPlayersInReach(true);
                }
            }
            setPlayersInReach(false);
        }
    }
    function selecttarget(){
        if (border=="solid" && testWidth>0){
            updateBorder("none");
            updateBorderWidth(5);
            setTestWidth(5);
            updateCard_played(true);
            //put mapping to add card to discard pile and remove it from hand of player
            /*const target_list = ?????;
            const requestBody = JSON.stringify({
                target_list: target_list //TODO: double check the name of the reqestBody parameter. also what are we getting back?
            });
            authApi().post(`/games/${player_table.id}/players/${player.id}/hand/${correct this one once cards have id's. card_id`, requestBody};*/
            updateHideCancel_PlayCard(true);
            updateTargetSelf(false);
            updateIgnoreRange(false);
            updateTargetOnlyEnemies(false);
        }
        else{
            alert("bruh");
        }
    }

    const [hidedeadmessage, setHideDeadmessage] = useState(true);
    const [opacity, setOpacity] = useState(1);
    const [backgroundColor, setBackgroundColor] = useState("none");
    const [highlightImage, setHighlightImage] = useState("none");
    const [playersInReach, setPlayersInReach] = useState(true);
    const [isInReach, setIsInReach] = useState(false);
    const [testWidth, setTestWidth] = useState(5);
    const [somevar, setSomevar] = useState(0);

    return (
        <div>
            <p1 id="opponent-deck_div_p1" hidden={hidedeadmessage}><b>He Dead</b></p1>
            <div style={{backgroundColor: backgroundColor,  opacity: opacity}}>
        <Container onClick={selecttarget} className="opponent-player-deck_container-card" style={{borderWidth: testWidth, borderColor: "yellow", borderStyle: border}}>
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
                        {/*<Figure.Image id="character-image_FigureImage" style={{borderStyle: highlightImage}}
                            width={80}
                            height={80}
                            alt="80x80"
                            src={`/images/character_cards/${opponent.profilePicture.getId()}.jpeg`}/>*/}
                        <Figure.Image id="character-image_FigureImage" style={{borderStyle: highlightImage}}
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