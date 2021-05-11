import useInterval from "../../components/game/useInterval.js";
import {Col, Row, Container, Card, Figure, Image, Button, Modal} from 'react-bootstrap';
import "./styling/playing_field_styling.css";
import Life from "./Life";
import React, {useState, useEffect} from 'react';

export default function PlayerDeck({
                                       player, opponent,
                                       playeronturn,
                                       border,
                                       updateBorder,
                                       playertable,
                                       updateCard_played,
                                       updateHideCancel_PlayCard,
                                       ignoreRange,
                                       updateIgnoreRange,
                                       targetSelf,
                                       updateTargetSelf,
                                       targetEveryone,
                                       updateTargetEveryone,
                                       targetOnlyEnemies,
                                       updateTargetOnlyEnemies,
                                       updateCurr_card,
                                       curr_card,
                                       fill_array,
                                       updateFill_array
                                   }) {
    const interval = useInterval(async () => {
        /* console.log(`${player.user} other: ${player.bullets}`);
        console.log(`${opponent.user} other: ${opponent.bullets}`); */

        //repeating requests to keep stuff up-to-date
        if (curr_card != null) {
            setupTargetHighlighting(curr_card);
        }
        if (curr_card == null) {
            updateIgnoreRange(false);
            updateTargetEveryone(false);
            updateTargetOnlyEnemies(false);
            updateTargetSelf(false);
        }
        if (player.bullets < 1) {
            setOpacity(0.8);
            setHideDeadmessage(false);
            setBackgroundColor("#808080");
        }
        if (playeronturn != null && player.id === playeronturn.id) {
            setHighlightImage("solid");
        }
        if (playeronturn != null && player.id !== playeronturn.id) {
            setHighlightImage("none");
        }
        if (player.bullets > 0) {
            if (targetSelf) {
                setWidth(5);
            }
            if (targetEveryone) {
                setWidth(5);
            }
            if (targetOnlyEnemies) {
                setWidth(0);
            }
        }
        if (searchForOn_FieldCards("BARREL")!=-1){
            setBarrel(searchForOn_FieldCards("BARREL"));
        }
        if (searchForOn_FieldCards("MUSTANG")!=-1){
            setHorse("MUSTANG");
        }
        if (searchForOn_FieldCards("APPALOOSA")!=-1){
            setHorse("APPALOOSA");
        }
        if (searchForOn_FieldCards("CARABINE")!=-1){
            setWeapon("CARABINE");
        }
        if (searchForOn_FieldCards("REMINGTON")!=-1){
            setWeapon("REMINGTON");
        }
        if (searchForOn_FieldCards("SCHOFIELD")!=-1){
            setWeapon("SCHOFIELD");
        }
        if (searchForOn_FieldCards("WINCHESTER")!=-1){
            setWeapon("WINCHESTER");
        }
        if (searchForOn_FieldCards("VOLCANIC")!=-1){
            setWeapon("VOLCANIC");
        }

    }, 1000);

    function setupTargetHighlighting(card) {
        if (!card) {
            return;
        }
        //TODO uncomment this:
        switch (card.card) {
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
            case "GENERALSTORE":
                updateTargetEveryone(true);
                updateIgnoreRange(true);
                break;
            default:
                console.log("no valid card name playerdeck");
                break;
        }
    }

    async function selecttarget() {
        if (border == "solid" && width > 0) {
            updateCard_played(true);
            updateBorder("none");
            setWidth(5);
            const beforeDrawing = player.hand.playCards;
            //TODO: add targetlist depending on the backend implementation and depending on what card has been played
            /*const target_list = ?????;
            const requestBody = JSON.stringify({
                target_list: target_list
            });
            authApi().post(´/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}/target/${player.id}´, requestBody};*/ //TODO: backend ain't ready yet


            switch (curr_card.card) {
                case "WELLSFARGO":
                case "STAGECOACH":
                    const afterDrawing = player.hand.playCards;
                    const newCards = afterDrawing.filter((card) => !beforeDrawing.contains(card));
                    setCards(newCards);
                    setShow_drawnCards(true);
                    break;
                case "INDIANS":
                case "BEER":
                case "GATLING":
                case "DUEL":
                case "PANIC":
                case "CATBALOU":
                case "BANG":
                case "SALOON":
                case "GENERALSTORE":
                    break;
                default:
                    console.log("no valid card name playerdeck");
                    break;
            }

            updateHideCancel_PlayCard(true);
            updateTargetSelf(false);
            updateIgnoreRange(false);
            updateTargetOnlyEnemies(false);
            updateTargetEveryone(false);
            updateCurr_card(null);
            updateFill_array(true);
            //TODO: enable other player cards again
        } else {
            alert("this ain't clickable. try a highlighted one...");
        }
    }

    function closeDrawnCards() {
        setShow_drawnCards(false);
    }

    function setCards(newCards) {
        let curr = [];
        for (let card of newCards) {
            curr.push(card);
        }
        setDrawnCards(curr);
        setShow_drawnCards(true);
    }

    function searchForOn_FieldCards(cardtobefound){
        if (player.onFieldCards.onFieldCards.length==0){
            return -1;
        }
        for (let x=0; x < player.onFieldCards.onFieldCards.length; x++){
            if (player.onFieldCards.onFieldCards[x].card==cardtobefound){
                return x;
            }
        }
        return -1;
    }

    function showBarrel(){
        alert("you clicked on a barrel. Congrats.");
    }
    function showHorse(){
        alert("you clicked on a horse. Congrats.");
    }
    function showWeapon(){
        alert("you clicked on a weapon. Congrats.");
    }

    const [hidedeadmessage, setHideDeadmessage] = useState(true);
    const [opacity, setOpacity] = useState(1);
    const [backgroundColor, setBackgroundColor] = useState("none");
    const [highlightImage, setHighlightImage] = useState("none");
    const [width, setWidth] = useState(5);

    const [show_action_card, setShow_action_card] = useState(false);
    const [curr_card_image_source, setCurr_card_image_source] = useState();
    const [show_wellsfargo, setShow_wellsfargo] = useState(false);
    const [wellsfargo1of3, setWellsfargo1of3] = useState();
    const [wellsfargo2of3, setWellsfargo2of3] = useState();
    const [wellsfargo3of3, setWellsfargo3of3] = useState(); //TODO: probably not best solution
    const [barrel, setBarrel] = useState(-1);
    const [weapon, setWeapon] = useState(-1);
    const [horse, setHorse] = useState(-1);

    const [show_drawnCards, setShow_drawnCards] = useState(false);
    const [drawnCards, setDrawnCards] = useState([]);


    return (
        <div>
            <p id="player-deck_div_p1" hidden={hidedeadmessage}><b>You Dead</b></p>
            <div style={{backgroundColor: backgroundColor, opacity: opacity}}>
                <Container onClick={selecttarget} className="opponent-player-deck_container-card"
                           style={{borderWidth: width, borderColor: "yellow", borderStyle: border}}>

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
                            <Figure hidden={!(player.gameRole === "SHERIFF")}>
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
                            src={`/images/character_cards/${player.profilePicture.id()}.jpeg`}/>*/}
                                <Figure.Image id="character-image_FigureImage" style={{borderStyle: highlightImage}}
                                              width={80}
                                              height={80}
                                              alt="80x80"
                                              src="/images/character_cards/black_jack_p.jpeg"
                                />
                                <Figure.Caption
                                    id="opponent-player-deck_figure-profile-picture">{player.user}</Figure.Caption>
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
                                <Figure.Image
                                    onClick={showWeapon}
                                    width={150}
                                    height={100}
                                    alt="150x100"
                                    src={(weapon==-1) ? "/images/back.png" : `/images/play_cards/blue_${player.onFieldCards.onFieldCards[weapon].card}_${player.onFieldCards.onFieldCards[weapon].suit}_${player.onFieldCards.onFieldCards[weapon].suit}.png`}/>
                                <Figure.Caption>weapon</Figure.Caption>
                            </Figure>
                        </Col>
                        <Col>
                            <Figure>
                        <Figure.Image
                            onClick={showHorse}
                            width={150}
                            height={100}
                            alt="150x100"
                            src={(horse==-1) ? "/images/back.png" : `/images/play_cards/blue_${player.onFieldCards.onFieldCards[horse].card}_${player.onFieldCards.onFieldCards[horse].suit}_${player.onFieldCards.onFieldCards[horse].suit}.png`}/>
                        <Figure.Caption>horse</Figure.Caption>
                    </Figure>
                </Col>
                <Col>
                    <Figure>
                        <Figure.Image
                            onClick={showBarrel}
                            width={150}
                            height={100}
                            alt="150x100"
                            src={(barrel==-1) ? "/images/back.png" : `/images/play_cards/blue_BARREL_${player.onFieldCards.onFieldCards[barrel].suit}_${player.onFieldCards.onFieldCards[barrel].suit}.png`}/>
                        <Figure.Caption>barrel</Figure.Caption>
                    </Figure>
                </Col>
            </Row>


                    {<Modal show={show_drawnCards} centered animation size="sm" rootClose animation>
                        <Modal.Header id="chosen-role_modal_header">
                            <Modal.Title id="chosen-role_modal_header_title" centered><b>Drawn Cards</b></Modal.Title>
                        </Modal.Header>
                        <Modal.Body id="chosen-role_modal_body" centered>
                            {drawnCards.map((curr) => (
                                <Image src={`/images/play_cards/${curr.color}_${curr.card}_${curr.suit}_${curr.rank}.png`} id="chosen-role_modal_body_image"/>
                                ))}
                        </Modal.Body>
                        <Modal.Footer id="chosen-role_modal_footer">
                            <Button id="custombutton" onClick={closeDrawnCards}>
                                Okay
                            </Button>
                        </Modal.Footer>
                    </Modal>}
                </Container>
            </div>
        </div>
    )
}