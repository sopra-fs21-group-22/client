import useInterval from "../../components/game/useInterval.js";
import {Col, Row, Container, Card, Figure, Image, Button, Modal} from 'react-bootstrap';
import "./styling/playing_field_styling.css";
import Life from "./Life";
import React, { useState, useEffect } from 'react';

export default function PlayerDeck({ player, playeronturn, border, updateBorder, playertable, updateCard_played, updateHideCancel_PlayCard,
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
        if (player.bullets>0){
            if (targetSelf){
                setWidth(5);
            }
            if (targetEveryone){
                setWidth(5);
            }
            if (targetOnlyEnemies){
                setWidth(0);
            }
        }
        //isInJail();
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
            case "DUEL":
            case "PANIC":
            case "CATBALOU":
                updateTargetOnlyEnemies(true);
                updateIgnoreRange(true);
                break;
            case "BANG":
                updateTargetOnlyEnemies(true);
                break;
            case "SALOON":
            case "JAIL":
            case "GENERALSTORE":
                updateTargetEveryone(true);
                updateIgnoreRange(true);
                break;
            default:
                console.log("no valid card name opponentdeck");
                break;
        }
    }
    async function selecttarget(){
        if (border=="solid" && width>0){
            updateCard_played(true);
            updateBorder("none");
            setWidth(5);
            // const beforeDrawing = player.hand.playCards;
            //put mapping to add card to discard pile and remove it from hand of player
            //TODO: add targetlist depending on the backend implementation and depending on what card has been played
            /*const target_list = ?????;
            const requestBody = JSON.stringify({
                target_list: target_list
            });
            authApi().post(´/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}/target/${player.id}´, requestBody};*/ //TODO: backend ain't ready yet
            // const afterDrawing = player.hand.playCards;
            // const newCards = afterDrawing.filter((card) => !beforeDrawing.contains(card));
            // setWellsfargo1of3(newCards[0])
            // setWellsfargo2of3(newCards[1])
            // setWellsfargo3of3(newCards[2]) //TODO: probably not best solution




            if (targetOnlyEnemies || targetEveryone) {
                setShow_action_card(true);
            }
            // if (targetSelf) {
            //     setShow_wellsfargo(true);//TODO: change this for beer card
            // }
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
    function closeWellsfargo(){
        setShow_action_card(false);
    }

    function isInJail(){
        if(player.onFieldCards.cards.some(curr_card => curr_card.card === "JAIL")) {
            setInJail(true);
        } else {
            setInJail(false);
        }
    }

    const [hidedeadmessage, setHideDeadmessage] = useState(true);
    const [opacity, setOpacity] = useState(1);
    const [backgroundColor, setBackgroundColor] = useState("none");
    const [highlightImage, setHighlightImage] = useState("none");
    const [width, setWidth] = useState(5);
    const [show_action_card, setShow_action_card] = useState(false);
    const [inJail, setInJail] = useState(false);
    const [curr_card_image_source, setCurr_card_image_source] = useState();
    const [show_wellsfargo, setShow_wellsfargo] = useState(false);
    const [wellsfargo1of3, setWellsfargo1of3] = useState();
    const [wellsfargo2of3, setWellsfargo2of3] = useState();
    const [wellsfargo3of3, setWellsfargo3of3] = useState(); //TODO: probably not best solution

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
                    <Figure hidden={!(player.gameRole == "SHERIFF")}>
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
     1                       alt="80x80"
                            src={`/images/character_cards/${player.profilePicture.id()}.jpeg`}/>*/}
                        <Figure.Image id="character-image_FigureImage" style={{borderStyle: highlightImage}}
                            width={80}
                            height={80}
                            alt="80x80"
                            src={inJail ? "/images/character_cards/black_jack_p_jail.png" : "/images/character_cards/black_jack_p.jpeg"}
                        />
                        {/*<Figure.Caption>{player.username}</Figure.Caption>*/}
                        <Figure.Caption id="opponent-player-deck_figure-profile-picture">{player.user}</Figure.Caption>
                    </Figure>
                </Col>
                <Col>
                    <Row hidden={player.bullets < 5}>
                        <Life/>
                    </Row>
                    <Row hidden={player.bullets < 4}>
                        <Life/>
                    </Row>
                    <Row hidden={player.bullets < 3}>
                        <Life/>
                    </Row>
                    <Row hidden={player.bullets < 2}>
                        <Life/>
                    </Row>
                    <Row hidden={player.bullets < 1}>
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

            {<Modal show={show_action_card} centered animation size="sm" backdrop="static" keyboard={false}>
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

            {/*{<Modal show={show_wellsfargo} centered animation size="sm" rootClose animation>*/}
            {/*    <Modal.Header id="chosen-role_modal_header">*/}
            {/*        <Modal.Title id="chosen-role_modal_header_title" centered><b>Your Turn</b></Modal.Title>*/}
            {/*    </Modal.Header>*/}
            {/*    <Modal.Body id="chosen-role_modal_body" centered>*/}
            {/*        <Image src={wellsfargo1of3} id="chosen-role_modal_body_image"/>*/}
            {/*        <Image src={wellsfargo2of3} id="chosen-role_modal_body_image"/>*/}
            {/*        <Image src={wellsfargo3of3} id="chosen-role_modal_body_image"/>*/}
            {/*    </Modal.Body>*/}
            {/*    <Modal.Footer id="chosen-role_modal_footer">*/}
            {/*        <Button id="custombutton" onClick={closeWellsfargo}>*/}
            {/*            Okay*/}
            {/*        </Button>*/}
            {/*    </Modal.Footer>*/}
            {/*</Modal>}*/}
        </Container>
        </div>
        </div>
    )
}