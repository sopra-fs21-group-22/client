import useInterval from "../../components/game/useInterval.js";
import React, { useState, useEffect } from 'react';
import {Col, Row, Container, Card, Figure, Image, Button, Modal} from 'react-bootstrap';
import "./styling/playing_field_styling.css";
import Life from "./Life";
import { api, authApi } from '../../helpers/api';

export default function OpponentDeck({ opponent, player, playeronturn, border, updateBorder, playertable, updateCard_played, updateHideCancel_PlayCard,
    ignoreRange, updateIgnoreRange, targetSelf, updateTargetSelf, targetEveryone, updateTargetEveryone, targetOnlyEnemies, updateTargetOnlyEnemies, updateCurr_card, curr_card, fill_array, updateFill_array}) {
    const interval = useInterval(async () => {    
        //repeating requests to keep stuff up-to-date
        if (curr_card!=null){
            setupTargetHighlighting(curr_card);
        }
        if(curr_card==null){
            updateIgnoreRange(false);
            updateTargetEveryone(false);
            updateTargetOnlyEnemies(false);
            updateTargetSelf(false);
        }
        let response = await authApi().get(`/games/${playertable.id}/players/${player.id}/targets`);
        setPlayersInReach(response.data);
        if (opponent.bullets < 1){
            setOpacity(0.8);
            setHideDeadmessage(false);
            setBackgroundColor("#808080");
            setWidth(0);
        }
        if (playeronturn != null && opponent.id === playeronturn.id){
            setHighlightImage("solid");
        }
        if(playeronturn != null && opponent.id !== playeronturn.id){
            setHighlightImage("none");
        }
        if (opponent.bullets>0){
            if (!ignoreRange){
                isinreach();
                if (!isInReach){
                    setWidth(0);
                }
                if (isInReach){
                    setWidth(5);
                }
            }
            if (targetEveryone && ignoreRange){
                setWidth(5);
            }
            if (targetSelf){
                setWidth(0);
            }
            if (targetOnlyEnemies && ignoreRange){
                setWidth(5);
            }
        }
    }, 1000);

    function setupTargetHighlighting(card){
        if(!card) {
            return;
        }
        //TODO uncomment this:
        switch(card.card){
        //switch("STAGECOACH"){
            case "BEER":
            case "STAGECOACH":
            case "WELLSFARGO":
                updateTargetSelf(true);
                break;
            case "INDIANS":
            case "GATLING":
            case "PANIC":
            case "CATBALOU":
            case "DUEL":
                updateIgnoreRange(true);
                updateTargetOnlyEnemies(true);
                break;
            case "BANG":
                updateTargetOnlyEnemies(true);
                break;
            case "SALOON":
            case "GENERALSTORE":
                updateTargetEveryone(true);
                updateIgnoreRange(true);
                break;
            default:
                console.log("no valid card name opponentdeck");
                break;
        }
    }



    function isinreach(){
        if (!ignoreRange){
            for (let x of playersInReach){
                if (x.id == opponent.id){
                    setIsInReach(true);
                }
            }
        }
        else{
            setIsInReach(false);
        }
    }
    function selecttarget(){
        if (border=="solid" && width>0){
            updateBorder("none");
            setWidth(5);
            updateCard_played(true);
            //put mapping to add card to discard pile and remove it from hand of player
            const target_id=null;
            const requestBody=null;
            if (curr_card.card=="CATBALOU" || curr_card.card=="PANIC"){
                /*target_id = ?????;
                requestBody = JSON.stringify({
                target_CardId: target_id
                )};*/
            }
            
            if (requestBody!=null){
                //authApi().post(´/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}/target/${player.id}´, requestBody};
            }
            if (requestBody==null){
                //authApi().post(´/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}/target/${player.id}´}; //requestbody eventuell noch nötig
            }
            

            if (targetOnlyEnemies || targetEveryone || targetSelf) {
                setShow_action_card(true);
            }
            updateHideCancel_PlayCard(true);
            updateTargetSelf(false);
            updateIgnoreRange(false);
            updateTargetOnlyEnemies(false);
            updateTargetEveryone(false);
            updateCurr_card(null);
            updateFill_array(true);
            //TODO: enable other player cards again
        }
        else{
            alert("this ain't clickable. try a highlighted one...");
        }
    }
    function closeActionCard(){
        setShow_action_card(false);
    }

    const [hidedeadmessage, setHideDeadmessage] = useState(true);
    const [opacity, setOpacity] = useState(1);
    const [backgroundColor, setBackgroundColor] = useState("none");
    const [highlightImage, setHighlightImage] = useState("none");
    const [playersInReach, setPlayersInReach] = useState([]);
    const [isInReach, setIsInReach] = useState(false);
    const [width, setWidth] = useState(5);
    const [show_action_card, setShow_action_card] = useState(false);
    const [curr_card_image_source, setCurr_card_image_source] = useState();

    return (
        <div>
            <p id="opponent-deck_div_p1" hidden={hidedeadmessage}><b>He Dead</b></p>
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
                    <Figure hidden={!(opponent.gameRole == "SHERIFF")}>
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
                            src={`/images/character_cards/${opponent.profilePicture.id()}.jpeg`}/>*/}
                        <Figure.Image id="character-image_FigureImage" style={{borderStyle: highlightImage}}
                            width={80}
                            height={80}
                            alt="80x80"
                            src="/images/character_cards/black_jack_p.jpeg"
                        />
                        {/*<Figure.Caption>{opponent.username}</Figure.Caption>*/}
                        <Figure.Caption id="opponent-player-deck_figure-profile-picture">{opponent.user}</Figure.Caption>
                    </Figure>
                </Col>
                <Col>
                    <Row hidden={opponent.bullets < 5}>
                        <Life/>
                    </Row>
                    <Row hidden={opponent.bullets < 4}>
                        <Life/>
                    </Row>
                    <Row hidden={opponent.bullets < 3}>
                        <Life/>
                    </Row>
                    <Row hidden={opponent.bullets < 2}>
                        <Life/>
                    </Row>
                    <Row hidden={opponent.bullets < 1}>
                        <Life/>
                    </Row>
                </Col>
                <Col>
                    <Figure>
                    {/*<Figure hidden={opponent.hand.playCards.length === 0}>*/}
                        <Figure.Image
                            width={80}
                            height={100}
                            alt="80x100"
                            src="/images/back.png"/>
                        <Figure.Caption>{opponent.hand.cardsInHand} card(s) left</Figure.Caption>
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
                            src={`/images/weapons/${opponent.weapon.id()}.jpeg`}/>*/}
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
                            src={`/images/horses/${opponent.horse.id()}.jpeg`}/>*/}
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

            {<Modal show={show_action_card} centered animation size="sm" rootClose animation>
                <Modal.Header id="chosen-role_modal_header">
                    <Modal.Title id="chosen-role_modal_header_title" centered><b>Your Turn</b></Modal.Title>
                </Modal.Header>
                <Modal.Body id="chosen-role_modal_body" centered>
                    <Image src="/images/back.png" id="chosen-role_modal_body_image"/>
                    {/*<Image src={curr_card_image_source} id="chosen-role_modal_body_image"/>*/}
                </Modal.Body>
                <Modal.Footer id="chosen-role_modal_footer">
                    <Button id="custombutton" onClick={closeActionCard}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>}
        </Container>
        </div>
        </div>
    )
}