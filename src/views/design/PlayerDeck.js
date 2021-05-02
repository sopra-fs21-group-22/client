import useInterval from "../../components/game/useInterval.js";
import { Col, Row, Container, Card, Figure, Image, Button } from 'react-bootstrap';
import "./styling/playing_field_styling.css";
import Life from "./Life";
import React, { useState, useEffect } from 'react';

export default function PlayerDeck({ player, playeronturn, border, updateBorder, playertable, updateCard_played, updateHideCancel_PlayCard,
     ignoreRange, updateIgnoreRange, targetSelf, updateTargetSelf, targetEveryone, updateTargetEveryone, targetOnlyEnemies, updateTargetOnlyEnemies, updateCurr_card, curr_card, fill_array, updateFill_array}) {
    const interval = useInterval(async () => {    
        //repeating requests to keep stuff up-to-date
        setupTargetHighlighting(curr_card);
        if (player.bullets < 1){
            setOpacity(0.8);
            setHideDeadmessage(false);
            setBackgroundColor("#808080");
        }
        if (playeronturn != null && player.id === playeronturn.id){
            setHighlightImage("solid");
        }
        if(playeronturn != null && player.id !== playeronturn.id){
            setHighlightImage("none");
        }
        // while (opponent.bullets>0 && isInReach){
            //TODO: put below if-checks inside this while loop
            if (targetSelf){
                setWidth(5);
            }
            if (targetEveryone){
                setWidth(5);
            }
            if (targetOnlyEnemies){
                setWidth(0);
            }
        // }

    }, 1000);
    function setupTargetHighlighting(card){
        if(!card) {
            return;
        }
        //TODO uncomment this: 
        switch(card.card()){
        // switch(card){
            case "BEER":
            case "STAGECOACH":
            case "WELLSFARGO":
                updateTargetSelf(true);
                break;
            case "INDIANS":
            case "GATLING":
            case "BANG":
            case "DUEL":
            case "PANIC":
                updateTargetOnlyEnemies(true);
                break;
            case "CATBALOU":
                updateTargetOnlyEnemies(true);
                updateIgnoreRange(true);
                break;
            case "SALOON":
            case "GENERALSTORE":
                updateTargetEveryone(true);
                break;
            default:
                console.log("no valid card name playerdeck");
                break;
        }
    }
    async function selecttarget(){
        if (border=="solid" && width>0){
            updateCard_played(true);
            updateBorder("none");
            setWidth(5);
            //put mapping to add card to discard pile and remove it from hand of player
            //TODO: add targetlist depending on the backend implementation and depending on what card has been played
            /*const target_list = ?????;
            const requestBody = JSON.stringify({
                target_list: target_list
            });
            api().post(´/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}´, requestBody};*/
            updateHideCancel_PlayCard(true);
            updateTargetSelf(false);
            updateIgnoreRange(false);
            updateTargetOnlyEnemies(false);
            updateTargetEveryone(false);
            updateCurr_card(null);
            updateFill_array(true);
        }
        else{
            alert("this ain't clickable. try a highlighted one...");
        }

    }

    const [hidedeadmessage, setHideDeadmessage] = useState(true);
    const [opacity, setOpacity] = useState(1);
    const [backgroundColor, setBackgroundColor] = useState("none");
    const [highlightImage, setHighlightImage] = useState("none");
    const [width, setWidth] = useState(5);

    return (
        <div>
            <p id="player-deck_div_p1" hidden={hidedeadmessage}><b>You Dead</b></p>
            <div style={{backgroundColor: backgroundColor,  opacity: opacity}}>
        <Container onClick={selecttarget} className="opponent-player-deck_container-card" style={{borderWidth: width, borderColor: "yellow", borderStyle: border}}>
        
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
                    <Figure > 
                        {/*<Figure.Image id="character-image_FigureImage" style={{borderStyle: highlightImage}}
                            width={80}
                            height={80}
                            alt="80x80"
                            src={`/images/character_cards/${player.profilePicture.id()}.jpeg`}/>*/}
                        <Figure.Image id="character-image_FigureImage" style={{borderStyle: highlightImage}}
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
                            src={`/images/weapons/${player.weapon.id()}.jpeg`}/>*/}
                        <Figure.Image
                            width={80}
                            height={100}
                            alt="80x100"
                            src="/images/back.png"/>
                        <Figure.Caption>weapon</Figure.Caption>
                    </Figure>
                </Col>
                <Col>
                    <Figure>
                        {/*<Figure.Image
                            width={150}
                            height={100}
                            alt="150x100"
                            src={`/images/horses/${player.horse.id()}.jpeg`}/>*/}
                        <Figure.Image
                            width={80}
                            height={100}
                            alt="80x100"
                            src="/images/back.png"/>
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
                            src="/images/back.png"/>
                        <Figure.Caption>barrel</Figure.Caption>
                    </Figure>
                </Col>
            </Row>
        </Container>
        </div>
        </div>
    )
}