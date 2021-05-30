import useInterval from "../../components/game/useInterval.js";
import {Col, Row, Container, Card, Figure, Image, Button, Modal, Tooltip} from 'react-bootstrap';
import "./styling/playing_field_styling.css";
import Life from "./Life";
import React, {useState, useEffect, useRef} from 'react';
import {authApi} from "../../helpers/api";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import {Spinner} from "./Spinner";

export default function PlayerDeck({
                                       player, opponent,
                                       playeronturn,
                                       border,
                                       updateBorder,
                                       playertable,
                                       updateCard_played,
                                       hideCancel_PlayCard,
                                       updateHideCancel_PlayCard,
                                       ignoreRange,
                                       updateIgnoreRange,
                                       targetSelf,
                                       updateTargetSelf,
                                       targetEveryone,
                                       updateTargetEveryone,
                                       targetOnlyEnemies,
                                       updateTargetOnlyEnemies,
                                       targetNotSheriff,
                                       updateTargetNotSheriff,
                                       updateCurr_card,
                                       curr_card,
                                       fill_array,
                                       updateFill_array,
                                       newGameMoves,
                                       orderarray,
                                       show_characterDisplay,
                                       updateShow_characterDisplay
                                   }) {
    const interval = useInterval(async () => {
        /* console.log(`${player.user} other: ${player.bullets}`);
        console.log(`${opponent.user} other: ${opponent.bullets}`); */

        //repeating requests to keep stuff up-to-date
        if (playertable.gameStatus !== "ENDED") {
            if (setupCharacter) {
                let character_response = await authApi().get(`/games/${playertable.id}/players/${player.id}/characters`);
                setCharacterName(character_response.data.name);
                setCharacterDescription(character_response.data.description);
                setDisplayName(character_response.data.display);
                setSetupCharacter(false);
            }
        } else {
            setBackgroundColor("#808080");
            setOpacity(0.8);
            setHideEndRole(false);
        }

        if (curr_card != null) {
            setupTargetHighlighting(curr_card);
        }
        if (curr_card == null) {
            updateIgnoreRange(false);
            updateTargetOnlyEnemies(false);
            updateTargetSelf(false);
            updateTargetNotSheriff(false);
        }
        if (player.bullets < 1) {
            setBackgroundColor("#808080");
            setOpacity(0.8);
            if (playertable.gameStatus !== "ENDED") {
                setHideEndRole(false);
            }
        }
        if (playeronturn != null && player.id === playeronturn.id && playertable.gameStatus !== "ENDED") {
            setHighlightImage("solid");
        }
        if (playeronturn != null && player.id !== playeronturn.id) {
            setHighlightImage("none");
        }
        if (player.bullets > 0) {
            if (targetSelf) {
                setWidth(5);
            }
            if (targetOnlyEnemies || targetNotSheriff) {
                setWidth(0);
            }
        }

        setWeapon(getWeapon);
        setHorse(getHorse);
        setBarrel(getBarrel);
        if (searchForOn_FieldCards("JAIL") != -1) {
            setInJail(true);
        } else {
            setInJail(false);
        }
        if (searchForOn_FieldCards("DYNAMITE") != -1) {
            setDynamite(true);
        } else {
            setDynamite(false);
        }
        detectHitOrMissed();
        detectMessages(detectMissed(), detectImages());
        detectImages();
        detectSavedByBeer();
    }, 1000);

    function setupTargetHighlighting(card) {
        if (!card) {
            return;
        }
        switch (card.card) {
            case "BEER":
            case "STAGECOACH":
            case "WELLSFARGO":
            case "DYNAMITE":
            case "INDIANS":
            case "GATLING":
            case "SALOON":
                break;
            case "CATBALOU":
                updateIgnoreRange(true);
                updateTargetOnlyEnemies(true);
                break;
            case "PANIC":
            case "BANG":
                updateTargetOnlyEnemies(true);
                break;
            case "JAIL":
                updateTargetNotSheriff(true);
                updateIgnoreRange(true);
                break;
            default:
                console.log("no valid card name opponentdeck");
                break;
        }
    }

    async function selecttarget() {
        if (border == "solid" && width > 0) {
            updateCard_played(true);
            updateBorder("none");
            setWidth(5);

            await authApi().post(`/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}/target/${player.id}`);

            updateHideCancel_PlayCard(true);
            updateTargetSelf(false);
            updateIgnoreRange(false);
            updateTargetOnlyEnemies(false);
            updateTargetNotSheriff(false);
            updateCurr_card(null);
            updateFill_array(true);
            //TODO: enable other player cards again
        }
    }

    function searchForOn_FieldCards(cardtobefound) {
        if (player.onFieldCards.onFieldCards.length == 0) {
            return -1;
        }
        for (let x = 0; x < player.onFieldCards.onFieldCards.length; x++) {
            if (player.onFieldCards.onFieldCards[x].card == cardtobefound) {
                return x;
            }
        }
        return -1;
    }

    function getWeapon() {
        try {
            let carabine = searchForOn_FieldCards("CARABINE");
            let remington = searchForOn_FieldCards("REMINGTON");
            let schofield = searchForOn_FieldCards("SCHOFIELD");
            let volcanic = searchForOn_FieldCards("VOLCANIC");
            let winchester = searchForOn_FieldCards("WINCHESTER");
            let path = "";
            let currCard;
            //console.log(`schofield: ${schofield}`);

            if (carabine !== -1) {
                currCard = player.onFieldCards.onFieldCards[carabine];
                path = `/images/play_cards/blue_${currCard.card}_${currCard.suit}_${currCard.rank}.png`
                return path;
            } else if (remington !== -1) {
                currCard = player.onFieldCards.onFieldCards[remington];
                path = `/images/play_cards/blue_${currCard.card}_${currCard.suit}_${currCard.rank}.png`
                return path;
            } else if (schofield !== -1) {
                currCard = player.onFieldCards.onFieldCards[schofield];
                path = `/images/play_cards/blue_${currCard.card}_${currCard.suit}_${currCard.rank}.png`
                return path;
            } else if (volcanic !== -1) {
                currCard = player.onFieldCards.onFieldCards[volcanic];
                path = `/images/play_cards/blue_${currCard.card}_${currCard.suit}_${currCard.rank}.png`
                return path;
            } else if (winchester !== -1) {
                currCard = player.onFieldCards.onFieldCards[winchester];
                path = `/images/play_cards/blue_${currCard.card}_${currCard.suit}_${currCard.rank}.png`
                return path;
            } else {
                return "/images/back.png";
            }
        } catch (e) {
            return "/images/back.png";
        }
    }

    function getHorse() {
        try {
            let appaloosa = searchForOn_FieldCards("APPALOOSA");
            let mustang = searchForOn_FieldCards("MUSTANG");
            let path = "";
            let currCard;

            if (appaloosa !== -1) {
                currCard = player.onFieldCards.onFieldCards[appaloosa];
                path = `/images/play_cards/blue_${currCard.card}_${currCard.suit}_${currCard.rank}.png`
                return path;
            } else if (mustang !== -1) {
                currCard = player.onFieldCards.onFieldCards[mustang];
                path = `/images/play_cards/blue_${currCard.card}_${currCard.suit}_${currCard.rank}.png`
                return path;
            } else {
                return "/images/back.png";
            }
        } catch (e) {
            return "/images/back.png";
        }
    }

    function getBarrel() {
        try {
            let barrel = searchForOn_FieldCards("BARREL");
            let path = "";
            let currCard;

            if (barrel !== -1) {
                currCard = player.onFieldCards.onFieldCards[barrel];
                path = `/images/play_cards/blue_${currCard.card}_${currCard.suit}_${currCard.rank}.png`
                return path;
            } else {
                return "/images/back.png";
            }
        } catch (e) {
            return "/images/back.png";
        }
    }

    function getJail() {
        try {
            let jail = searchForOn_FieldCards("JAIL");
            let path = "";
            let currCard;

            if (jail !== -1) {
                currCard = player.onFieldCards.onFieldCards[jail];
                path = `/images/play_cards/blue_${currCard.card}_${currCard.suit}_${currCard.rank}.png`
                return path;
            } else {
                return "/images/back.png";
            }
        } catch (e) {
            return "/images/back.png";
        }
    }

    function showBarrel() {
        if (hideCancel_PlayCard) {
            if (getBarrel() === "/images/back.png") {
                alert("You don't have a barrel.");
            } else {
                setClickOnFieldType("Your Barrel");
                setClickedOnFieldCard(getBarrel());
                setShow_clickedOnField(true);
            }
        }
    }

    function showHorse() {
        if (hideCancel_PlayCard) {
            if (getHorse() === "/images/back.png") {
                alert("You don't have a horse.");
            } else {
                setClickOnFieldType("Your Horse");
                setClickedOnFieldCard(getHorse());
                setShow_clickedOnField(true);
            }
        }
    }

    function showWeapon() {
        if (hideCancel_PlayCard) {
            if (getWeapon() === "/images/back.png") {
                alert("You don't have a weapon.");
            } else {
                setClickOnFieldType("Your Weapon");
                setClickedOnFieldCard(getWeapon());
                setShow_clickedOnField(true);
            }
        }
    }

    function closeClickedOnFieldCard() {
        setShow_clickedOnField(false);
    }

    function showDynamite() {
        if (hideCancel_PlayCard) {
            setClickOnFieldType("Dynamite");
            setClickedOnFieldCard("/images/play_cards/blue_DYNAMITE_HEARTS_TWO.png");
            setShow_clickedOnField(true);
        }
    }

    function showJail() {
        if (hideCancel_PlayCard) {
            if (getJail() === "/images/back.png") {
                alert("You are not in jail.");
            } else {
                setClickOnFieldType("Jail");
                setClickedOnFieldCard(getJail());
                setShow_clickedOnField(true);
            }
        }
    }

    function detectHitOrMissed(){
        if(detectMissed() || detectHit()){
            setHitOrMissedNoteHidden(false);
            return;
        }
        setHitOrMissedNoteHidden(true);
    }

    function detectHit(){
        if (newGameMoves.length == 0){
            setHitOrMissedNoteHidden(true);
            return false;
        }
        for (let i=0; i<newGameMoves.length; i++){
            if (newGameMoves[i].targetPlayer == player.id && newGameMoves[i].action=="HOLED"){
                setHitOrMissedMessage("HIT");
                setHitOrMissedNoteHidden(false);
                return true;
            }
        }
        return false;
    }

    function detectMissed(){
        if (newGameMoves.length == 0){
            setHitOrMissedNoteHidden(true);
            return false;
        }
        for (let i=0; i<newGameMoves.length; i++){
            if (newGameMoves[i].card == "MISSED" && newGameMoves[i].usingPlayer == player.id && newGameMoves[i].action=="SUCCESS"){
                setHitOrMissedMessage("MISSED");
                setHitOrMissedNoteHidden(false);
                return true;
            }
        }
        return false;
    }

    function detectSavedByBeer(){
        if (newGameMoves.length == 0){
            setSavedByBeerMessageHidden(true);
            return;
        }
        for (let i=0; i<newGameMoves.length; i++){
            if (newGameMoves[i].card == "BEER" && newGameMoves[i].usingPlayer == player.id && newGameMoves[i].action=="SUCCESS"){
                setSavedByBeerMessageHidden(false);
                return;
            }
        }
        setSavedByBeerMessageHidden(true);
    }

    function detectImages(){
        let barrelcheck=false;
        if (detectBarrel()){
            barrelcheck=true;
        }
        if (detectBarrel() || detectBeer() || detectExplodingDynamite()/*  || detectIndiansGotHit() */){
            setNotificationImageHidden(false);
            return barrelcheck;
        }
        setNotificationImageHidden(true);
        return barrelcheck;
    }

    /* function detectIndiansGotHit(){
        if (newGameMoves.length == 0){
            setNotificationImageHidden(true);
            return false;
        }
        for (let i=0; i<newGameMoves.length; i++){
            if (newGameMoves[i].card == "INDIANS" && newGameMoves[i].targetPlayer == player.id && newGameMoves[i].action=="SUCCESS"){
                setNotificationImage("/images/hitmarker.png");
                setNotificationImageHidden(false);
                return true;
            }
        }
    } */

    function detectBarrel(){
        if (newGameMoves.length == 0){
            setNotificationImageHidden(true);
            return false;
        }
        for (let i=0; i<newGameMoves.length; i++){
            if (newGameMoves[i].card == "BARREL" && newGameMoves[i].usingPlayer == player.id && newGameMoves[i].action=="SUCCESS"){
                setNotificationImage("/images/barrel.png");
                setNotificationImageHidden(false);
                return true;
            }
        }
    }

    function detectBeer(){
        if (newGameMoves.length == 0){
            setNotificationImageHidden(true);
            return false;
        }
        for (let i=0; i<newGameMoves.length; i++){
            if (newGameMoves[i].card == "BEER" && newGameMoves[i].usingPlayer == player.id && newGameMoves[i].action=="SUCCESS"){
                setNotificationImage("/images/beer.png");
                setNotificationImageHidden(false);
                return true;
            }
        }
    }

    function detectExplodingDynamite(){
        if (newGameMoves.length == 0){
            setNotificationImageHidden(true);
            return false;
        }
        for (let i=0; i<newGameMoves.length; i++){
            if (newGameMoves[i].card == "DYNAMITE" && newGameMoves[i].usingPlayer == player.id && newGameMoves[i].action=="SUCCESS"){
                setNotificationImage("/images/dynamite.png");
                setNotificationImageHidden(false);
                return true;
            }
        }
    }

    function detectMessages(missed, barrel){
        if (missed || barrel){
            if(detectPanic() || detectCatBalou() || detectIndiansShotBack()){
                setMessageHidden(false);
                return;
            }
        }
        else{
            if(detectPanic() || detectCatBalou() || detectBang() || detectIndiansShotBack()){
                setMessageHidden(false);
                return;
            }
            return;
        }
        
        setMessageHidden(true);
    }

    function detectCatBalou(){
        if (newGameMoves.length == 0){
            setMessageHidden(true);
            return false;
        }
        for (let i=0; i<newGameMoves.length; i++){
            if (newGameMoves[i].card == "CATBALOU" && newGameMoves[i].targetPlayer == player.id && newGameMoves[i].action=="USE"){
                setMessageHidden(false);
                setNotificationMessage(`${(searchPlayerById(newGameMoves[i].usingPlayer).user).toUpperCase()} THREW AWAY ONE OF YOUR CARDS`);
                return true;
            }
        }
    }

    function detectPanic(){
        if (newGameMoves.length == 0){
            setMessageHidden(true);
            return false;
        }
        for (let i=0; i<newGameMoves.length; i++){
            if (newGameMoves[i].card == "PANIC" && newGameMoves[i].targetPlayer == player.id && newGameMoves[i].action!="DISCARD"){
                setMessageHidden(false);
                setNotificationMessage(`${(searchPlayerById(newGameMoves[i].usingPlayer).user).toUpperCase()} STOLE ONE OF YOUR CARDS`);
                return true;
            }
        }
    }

    function detectBang(){
        if (newGameMoves.length == 0){
            setMessageHidden(true);
            return false;
        }
        for (let i=0; i<newGameMoves.length; i++){
            if (newGameMoves[i].card == "BANG" && newGameMoves[i].targetPlayer == player.id && newGameMoves[i].action!="DISCARD"){
                setMessageHidden(false);
                setNotificationMessage(`${(searchPlayerById(newGameMoves[i].usingPlayer).user).toUpperCase()} SHOT YOU`);
                return true;
            }
        }
    }

    function detectIndiansShotBack(){
        if (newGameMoves.length == 0){
            setMessageHidden(true);
            return false;
        }
        for (let i=0; i<newGameMoves.length; i++){
            if (newGameMoves[i].card == "INDIANS" && newGameMoves[i].targetPlayer == player.id && newGameMoves[i].action=="FAIL"){
                setMessageHidden(false);
                setNotificationMessage(`YOU SHOT BACK`);
                return true;
            }
        }
    }

    function searchPlayerById(id){
        for (let i=0; i<orderarray.length; i++){
            if (orderarray[i].id==id){
                return orderarray[i];
            }
        }
    }

    function closeCharacterDisplay() {
        updateShow_characterDisplay(false);
    }

    const [hideEndRole, setHideEndRole] = useState(true);
    const [opacity, setOpacity] = useState(1);
    const [backgroundColor, setBackgroundColor] = useState("none");
    const [highlightImage, setHighlightImage] = useState("none");
    const [width, setWidth] = useState(5);
    const [inJail, setInJail] = useState(false);
    const [dynamite, setDynamite] = useState(false);
    const [barrel, setBarrel] = useState("/images/back.png");
    const [weapon, setWeapon] = useState("/images/back.png");
    const [horse, setHorse] = useState("/images/back.png");
    const [show_clickedOnField, setShow_clickedOnField] = useState(false);
    const [clickOnFieldType, setClickOnFieldType] = useState("default");
    const [clickedOnFieldCard, setClickedOnFieldCard] = useState();

    const [characterName, setCharacterName] = useState("loading character name...");
    const [characterDescription, setCharacterDescription] = useState("loading character description...");
    const [displayName, setDisplayName] = useState("loading character name...");
    const [setupCharacter, setSetupCharacter] = useState(true);
    const characterRef = useRef();
    const [hitOrMissedNoteHidden, setHitOrMissedNoteHidden] = useState(true);
    const [hitOrMissedMessage, setHitOrMissedMessage] = useState("default message");
    const [notificationImage, setNotificationImage] = useState("/images/back.png");
    const [notificationImageHidden, setNotificationImageHidden] = useState(true);
    const [notificationmessage, setNotificationMessage] = useState("default message");
    const [messageHidden, setMessageHidden] = useState(true);
    const [savedByBeerMessageHidden, setSavedByBeerMessageHidden] = useState(true);

    const character_information = (
        <Popover placement="bottom" id="role-info_popover">
            <Popover.Title id="role-info_popover_title"><b>{displayName}</b></Popover.Title>
            <Popover.Content id="role-info_popover_content">
                <Card id="role-info_popover_content_card">
                    <Card.Img id="role-info_popover_content_card_cardimg" variant="top" centered
                              src={!characterRef.current ? "/images/back.png" : (inJail ? `/images/character_cards/${characterName}_jail.png` : `/images/character_cards/${characterName}.png`)}/>
                </Card>
                <br/>
                {inJail ? (
                    <>
                        <p>
                            You are in jail.<br/><br/>
                            <Button onClick={showJail} id="custombutton">More Information</Button>
                        </p>
                        <br/>
                    </>
                ):null}
                {characterDescription}
            </Popover.Content>
        </Popover>
    )

    const life_information = (
        <Tooltip id="button-tooltip">
            {player.bullets} {player.bullets === 1 ? ("life"):("lives")}
        </Tooltip>
    )

    const sheriff_information = (
        <Popover placement="bottom" id="role-info_popover">
            <Popover.Title id="role-info_popover_title"><b>SHERIFF</b></Popover.Title>
            <Popover.Content id="role-info_popover_content">
                <p>Your role is SHERIFF and can be seen by everybody. Kill all OUTLAWs and the RENEGADE.</p>
            </Popover.Content>
        </Popover>
    )


    return (
        <div style={{marginBottom: 5}}>
            <>
                <h hidden={messageHidden ? hitOrMissedNoteHidden:true} id="notification">
                <b>{hitOrMissedMessage}</b></h>
            </>
            <>
                <p hidden={notificationImageHidden} id="notification-for-image"><Image className="notification-image" src={notificationImage}/></p>
            </>
            <>
                <p hidden={messageHidden} id="notification2"><b>{notificationmessage}</b></p>
            </>
            <>
                <p hidden={savedByBeerMessageHidden} id="notification2">
                <b>SAVED BY BEER, CHEERS!</b></p>
            </>
            <>
                {player.bullets === 0 ? (
                    <p id="opponent-deck_div_gameEnd" hidden={hideEndRole}>
                        <Image className="gameEnd" src={`/images/role_cards/${player.gameRole}_icon.png`}/>
                        <br/>
                        <p className="death-message">
                            You are dead. Your role was {player.gameRole}
                        </p>
                    </p>
                ) : (
                    <p id="opponent-deck_div_gameEnd" hidden={hideEndRole}>
                        <Image className="gameEnd" src={`/images/role_cards/${player.gameRole}_icon.png`}/>
                        <br/>
                        <p className="death-message">
                            Your role was {player.gameRole}
                        </p>
                    </p>
                )}
                <div style={{backgroundColor: backgroundColor, opacity: opacity}}>
                    <Container onClick={selecttarget} className="opponent-player-deck_container-card"
                               style={{borderWidth: width, borderColor: "yellow", borderStyle: border}}>
                        <Row className="align-items-center">
                            <Col>
                                <Row className="align-items-center justify-content-center">
                                    <Figure hidden={!dynamite}>
                                        <Figure.Image
                                            onClick={showDynamite}
                                            width={60}
                                            height={30}
                                            alt="60x30"
                                            src="/images/icons/dynamite.png"/>
                                    </Figure>
                                </Row>
                                <Row className="justify-content-center">
                                    <Figure
                                        hidden={!(player.gameRole === "SHERIFF")}>
                                        <OverlayTrigger trigger={hideCancel_PlayCard ? "hover":"none"} placement="right" overlay={sheriff_information}>
                                        <Figure.Image
                                            width={80}
                                            height={80}
                                            alt="80x80"
                                            src="/images/icons/sheriff.png"/>
                                        </OverlayTrigger>
                                    </Figure>
                                </Row>
                            </Col>
                            <Col>
                                <Figure>
                                    <OverlayTrigger trigger={hideCancel_PlayCard ? "hover":"none"} placement="right" overlay={character_information} delay={{hide: 300}}>
                                        <Figure.Image id="character-image_FigureImage"
                                                      style={{borderStyle: highlightImage}}
                                                      ref={characterRef}
                                                      width={80}
                                                      height={80}
                                                      alt="80x80"
                                                      src={inJail ? `/images/character_cards/${characterName}_jail.png` : `/images/character_cards/${characterName}.png`}
                                        />
                                    </OverlayTrigger>
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
                                <OverlayTrigger trigger={hideCancel_PlayCard ? "hover":"none"} placement="left" overlay={life_information}>
                                    <Row hidden={player.bullets < 1}>
                                        <Life/>
                                    </Row>
                                </OverlayTrigger>
                            </Col>
                            <Col>
                                <Figure>
                                    <Figure.Image
                                        onClick={showWeapon}
                                        width={150}
                                        height={100}
                                        alt="150x100"
                                        src={weapon}/>
                                    <Figure.Caption id="opponent-player-deck_caption">weapon</Figure.Caption>
                                </Figure>
                            </Col>
                            <Col>
                                <Figure>
                                    <Figure.Image
                                        onClick={showHorse}
                                        width={150}
                                        height={100}
                                        alt="150x100"
                                        src={horse}/>
                                    <Figure.Caption id="opponent-player-deck_caption">horse</Figure.Caption>
                                </Figure>
                            </Col>
                            <Col>
                                <Figure>
                                    <Figure.Image
                                        onClick={showBarrel}
                                        width={150}
                                        height={100}
                                        alt="150x100"
                                        src={barrel}/>
                                    <Figure.Caption id="opponent-player-deck_caption">barrel</Figure.Caption>
                                </Figure>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
            {<Modal show={show_clickedOnField} centered animation size="m" rootClose animation>
                <Modal.Header id="chosen-role_modal_header">
                    <Modal.Title id="chosen-role_modal_header_title" centered><b>{clickOnFieldType}</b></Modal.Title>
                </Modal.Header>
                <Modal.Body id="chosen-role_modal_body" centered>
                    {clickedOnFieldCard ? (
                        <Image
                            src={clickedOnFieldCard}
                            id="chosen-role_modal_body_image"/>
                    ) : <Spinner/>}
                </Modal.Body>
                <Modal.Footer id="chosen-role_modal_footer">
                    <Button id="custombutton" onClick={closeClickedOnFieldCard}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>}
            {<Modal show={show_characterDisplay} centered animation size="m" backdrop="static" keyboard={false}
                    animation>
                <Modal.Header id="chosen-role_modal_header">
                    <Modal.Title id="chosen-role_modal_header_title" centered>
                        {characterRef.current ? (
                            <b>Your game character is {displayName}</b>
                        ):null}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body  id="chosen-role_modal_body" centered>
                    {!characterRef.current ? (
                        <p style={{textAlign:"center"}}><Spinner/><br/><b>Please wait...</b></p>
                    ):(
                        <>
                            <Image src={`/images/character_cards/${characterName}.png`} id="chosen-role_modal_body_image"/>
                            <br/>
                            <p style={{textAlign: "center", fontSize: "20px"}}><b>{characterDescription}</b></p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer id="chosen-role_modal_footer">
                    <Button hidden={!characterRef.current} id="custombutton" onClick={closeCharacterDisplay}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>}
        </div>
    )
}