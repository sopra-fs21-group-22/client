import useInterval from "../../components/game/useInterval.js";
import React, {useState, useEffect, useRef} from 'react';
import {Col, Row, Container, Card, Figure, Image, Button, Modal, ModalFooter, Tooltip} from 'react-bootstrap';
import "./styling/playing_field_styling.css";
import Life from "./Life";
import {api, authApi} from '../../helpers/api';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { TranscriberRecognizer } from "microsoft-cognitiveservices-speech-sdk/distrib/lib/src/common.speech/Exports";
import {Spinner} from "./Spinner";

export default function OpponentDeckWide({
                                             opponent,
                                             player,
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
                                             newGameMoves
                                         }) {
    const interval = useInterval(async () => {
        //console.log(`${player.user}: ${player.bullets}`);
        //repeating requests to keep stuff up-to-date
        //console.log(`${opponent.id}: ${newGameMoves}`);
        if (playertable.gameStatus !== "ENDED") {
            if (setupCharacter) {
                let character_response = await authApi().get(`/games/${playertable.id}/players/${opponent.id}/characters`);
                setCharacterName(character_response.data.name);
                setCharacterDescription(character_response.data.description);
                setDisplayName(character_response.data.display);
                setSetupCharacter(false);
            }
        } else {
            setBackgroundColor("#808080");
            setWidth(0);
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

        if (opponent.bullets < 1) {
            setBackgroundColor("#808080");
            setWidth(0);
            setOpacity(0.8);
            setHideEndRole(false);
            if (deputyKillCheck) {
                sheriffKilledDeputy();
            }
        }

        if (playeronturn != null && opponent.id === playeronturn.id && playertable.gameStatus !== "ENDED") {
            setHighlightImage("solid");
        }
        if (playeronturn != null && opponent.id !== playeronturn.id) {
            setHighlightImage("none");
        }
        if (opponent.bullets > 0) {
            let response = await authApi().get(`/games/${playertable.id}/players/${player.id}/targets`);
            if (!isinreach(response.data)) {
                setWidth(0);
            }
            if (isinreach(response.data)) {
                setWidth(5);
            }
            if (targetSelf) {
                setWidth(0);
            }
            if (targetOnlyEnemies && ignoreRange) {
                setWidth(5);
            }
            if (targetNotSheriff && opponent.gameRole !== "SHERIFF" && !inJail) {
                setWidth(5);
            } else if (targetNotSheriff && opponent.gameRole !== "SHERIFF" && inJail) {
                setWidth(0);
            }else if (targetNotSheriff && opponent.gameRole === "SHERIFF") {
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
        detectImages();
        detectMessages();
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


    function isinreach(targets) {
        if (!ignoreRange) {
            for (let x of targets) {
                if (x.id == opponent.id) {
                    return true;
                }
            }
        } else {
            return false;
        }
    }

    async function selecttarget() {
        if (border == "solid" && width > 0) {
            updateBorder("none");
            setWidth(5);
            updateCard_played(true);
            if (curr_card.card === "PANIC" || curr_card.card === "CATBALOU") {
                if (opponent.hand.cardsInHand === 0 && availableOnFieldCards()) {
                    setShow_noCardsToGet(true);
                } else {
                    setShow_destroyOrSteal(true);
                }
                updateHideCancel_PlayCard(true);
                updateTargetSelf(false);
                updateIgnoreRange(false);
                updateTargetOnlyEnemies(false);
                updateTargetNotSheriff(false);
                updateFill_array(true);
                return;
            }
            console.log(`selecttarget: opponent: ${curr_card}`);
            if (curr_card.card === "BANG") {
                const beforeDrawingCards = JSON.parse(localStorage.getItem("cards"));
                await authApi().post(`/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}/target/${opponent.id}`);
                let playerAfterRequest = await authApi().get(`/games/${playertable.id}/players/${player.id}`);
                const afterDrawingCards = playerAfterRequest.data.hand.playCards;
                const newCards = getNewCards(beforeDrawingCards, afterDrawingCards);
                setCards(newCards);
                // updateCurr_card(null); gets set in setCards method or once modal closes
            } else {
                authApi().post(`/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}/target/${opponent.id}`);
                updateCurr_card(null);
            }

            updateHideCancel_PlayCard(true);
            updateTargetSelf(false);
            updateIgnoreRange(false);
            updateTargetOnlyEnemies(false);
            updateTargetNotSheriff(false);
            updateFill_array(true);
            //TODO: enable other player cards again
        }
    }

    function sheriffKilledDeputy() {
        if (playeronturn != null && player.id === playeronturn.id && player.gameRole === "SHERIFF") {
            if (opponent.gameRole === "DEPUTY") {
                setShow_sheriffKilledDeputy(true);
            }
        }
        setDeputyKillCheck(false);
    }

    function closeSheriffKilledDeputy() {
        setShow_sheriffKilledDeputy(false);
        updateCurr_card(null);
    }

    function getNewCards(before, after) {
        const beforeIds = getCardIds(before);
        const afterIds = getCardIds(after);
        let curr = [];
        for (let id of afterIds) {
            if (beforeIds.indexOf(id) === -1) {
                curr.push(after[afterIds.indexOf(id)]);
            }
        }
        return curr;
    }

    function getCardIds(cards) {
        let curr = [];
        for (let card of cards) {
            curr.push(card.id);
        }
        return curr;
    }

    function closeRewardCards() {
        setShow_rewardCards(false);
        updateCurr_card(null);
    }

    function setCards(newCards) {
        if (newCards.length > 0) {
            setRewardCards(newCards);
            setShow_rewardCards(true);
        } else {
            updateCurr_card(null);
        }
    }

    function searchForOn_FieldCards(cardtobefound) {
        if (opponent.onFieldCards.onFieldCards.length == 0) {
            return -1;
        }
        for (let x = 0; x < opponent.onFieldCards.onFieldCards.length; x++) {
            if (opponent.onFieldCards.onFieldCards[x].card == cardtobefound) {
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

            if (carabine !== -1) {
                currCard = opponent.onFieldCards.onFieldCards[carabine];
                path = `/images/play_cards/blue_${currCard.card}_${currCard.suit}_${currCard.rank}.png`
                return path;
            } else if (remington !== -1) {
                currCard = opponent.onFieldCards.onFieldCards[remington];
                path = `/images/play_cards/blue_${currCard.card}_${currCard.suit}_${currCard.rank}.png`
                return path;
            } else if (schofield !== -1) {
                currCard = opponent.onFieldCards.onFieldCards[schofield];
                path = `/images/play_cards/blue_${currCard.card}_${currCard.suit}_${currCard.rank}.png`
                return path;
            } else if (volcanic !== -1) {
                currCard = opponent.onFieldCards.onFieldCards[volcanic];
                path = `/images/play_cards/blue_${currCard.card}_${currCard.suit}_${currCard.rank}.png`
                return path;
            } else if (winchester !== -1) {
                currCard = opponent.onFieldCards.onFieldCards[winchester];
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
                currCard = opponent.onFieldCards.onFieldCards[appaloosa];
                path = `/images/play_cards/blue_${currCard.card}_${currCard.suit}_${currCard.rank}.png`
                return path;
            } else if (mustang !== -1) {
                currCard = opponent.onFieldCards.onFieldCards[mustang];
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
                currCard = opponent.onFieldCards.onFieldCards[barrel];
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
                currCard = opponent.onFieldCards.onFieldCards[jail];
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
                alert("This player has no barrel.");
            } else {
                setClickOnFieldType("Opponent's Barrel");
                setClickedOnFieldCard(getBarrel());
                setShow_clickedOnField(true);
            }
        }
    }

    function showHorse() {
        if (hideCancel_PlayCard) {
            if (getHorse() === "/images/back.png") {
                alert("This player has no horse.");
            } else {
                setClickOnFieldType("Opponent's Horse");
                setClickedOnFieldCard(getHorse());
                setShow_clickedOnField(true);
            }
        }
    }

    function showWeapon() {
        if (hideCancel_PlayCard) {
            if (getWeapon() === "/images/back.png") {
                alert("This player has no weapon.");
            } else {
                setClickOnFieldType("Opponent's Weapon");
                setClickedOnFieldCard(getWeapon());
                setShow_clickedOnField(true);
            }
        }
    }

    function showAmountHandCards() {
        if (hideCancel_PlayCard) {
            alert(`${opponent.user} has ${opponent.hand.cardsInHand} ${opponent.hand.cardsInHand === 1 ? ("card"):("cards")} left`);
        }
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

    function closeClickedOnFieldCard() {
        setShow_clickedOnField(false);
    }

    async function handCard() {
        setShow_destroyOrSteal(false);
        let playerBeforeRequest = await authApi().get(`/games/${playertable.id}/players/${player.id}`);
        const beforeDrawingCards = playerBeforeRequest.data.hand.playCards;
        await authApi().post(`/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}/target/${opponent.id}`);
        if (curr_card.card === "PANIC") {
            let playerAfterRequest = await authApi().get(`/games/${playertable.id}/players/${player.id}`);
            const afterDrawingCards = playerAfterRequest.data.hand.playCards;
            const newCard = getNewCard(beforeDrawingCards, afterDrawingCards);
            setCard(newCard);
        }
        updateCurr_card(null);
    }

    function onFieldCard() {
        setShow_destroyOrSteal(false);
        setShow_onFieldCards(true);
    }

    function selectOnFieldCard(card) {
        setShow_onFieldCards(false);
        const targetCardId = card.id;
        const requestBody = JSON.stringify({
            targetCardId: targetCardId
        });
        authApi().post(`/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}/target/${opponent.id}`, requestBody);
        updateCurr_card(null);
    }

    function getNewCard(before, after) {
        const beforeIds = getCardIds(before);
        const afterIds = getCardIds(after);
        let curr;
        for (let id of afterIds) {
            if (beforeIds.indexOf(id) === -1 && id !== curr_card.id) {
                curr = after[afterIds.indexOf(id)];
            }
        }
        return curr;
    }

    function getCardIds(cards) {
        let curr = [];
        for (let card of cards) {
            curr.push(card.id);
        }

        return curr;
    }

    function closeStolenCard() {
        setShow_stolenCard(false);
    }

    function setCard(newCard) {
        setStolenCard(newCard);
        setShow_stolenCard(true);
    }

    function closeOnFieldCards() {
        setShow_onFieldCards(false);
        updateCurr_card(null);
    }

    function closeDestroyOrSteal() {
        setShow_destroyOrSteal(false);
        updateCurr_card(null);
    }

    function closeNoCardsToGet() {
        setShow_noCardsToGet(false);
        updateCurr_card(null);
    }

    function availableOnFieldCards() {
        if (curr_card != null) {
            if (curr_card.card === "CATBALOU") {
                return opponent.onFieldCards.onFieldCards.length === 0;
            }
            if (curr_card.card === "PANIC") {
                let numberCards = opponent.onFieldCards.onFieldCards.length;
                for (let card of opponent.onFieldCards.onFieldCards) {
                    if (card.card === "JAIL" || card.card === "DYNAMITE") {
                        numberCards--;
                    }
                }
                return numberCards === 0;
            }
        } else {
            return true;
        }
    }

    function modalSize() {
        if (curr_card != null) {
            if (curr_card.card === "CATBALOU") {
                let numberCards = opponent.onFieldCards.onFieldCards.length;
                return numberCards > 4 ? "xl":(numberCards > 2 ? "lg":(numberCards > 1 ? "m":"sm"))
            }
            if (curr_card.card === "PANIC") {
                let numberCards = opponent.onFieldCards.onFieldCards.length;
                for (let card of opponent.onFieldCards.onFieldCards) {
                    if (card.card === "JAIL" || card.card === "DYNAMITE") {
                        numberCards--;
                    }
                }
                return numberCards > 4 ? "xl":(numberCards > 2 ? "lg":(numberCards > 1 ? "m":"sm"))
            }
        } else {
            return "sm";
        }
    }

    const [hideEndRole, setHideEndRole] = useState(true);
    const [opacity, setOpacity] = useState(1);
    const [backgroundColor, setBackgroundColor] = useState("none");
    const [highlightImage, setHighlightImage] = useState("none");
    const [width, setWidth] = useState(5);
    const [show_destroyOrSteal, setShow_destroyOrSteal] = useState(false);
    const [show_stolenCard, setShow_stolenCard] = useState(false);
    const [stolenCard, setStolenCard] = useState();
    const [show_onFieldCards, setShow_onFieldCards] = useState(false);
    const [show_clickedOnField, setShow_clickedOnField] = useState(false);
    const [clickOnFieldType, setClickOnFieldType] = useState("default");
    const [clickedOnFieldCard, setClickedOnFieldCard] = useState();
    const [show_noCardsToGet, setShow_noCardsToGet] = useState(false);
    const [show_rewardCards, setShow_rewardCards] = useState(false);
    const [rewardCards, setRewardCards] = useState([]);
    const [show_sheriffKilledDeputy, setShow_sheriffKilledDeputy] = useState(false);
    const [deputyKillCheck, setDeputyKillCheck] = useState(true);

    const [inJail, setInJail] = useState(false);
    const [dynamite, setDynamite] = useState(false);
    const [barrel, setBarrel] = useState("/images/back.png");
    const [weapon, setWeapon] = useState("/images/back.png");
    const [horse, setHorse] = useState("/images/back.png");
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
                            {opponent.user} is in jail.<br/><br/>
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
            {opponent.bullets} {opponent.bullets === 1 ? ("life"):("lives")}
        </Tooltip>
    )

    const sheriff_information = (
        <Popover placement="bottom" id="role-info_popover">
            <Popover.Title id="role-info_popover_title"><b>SHERIFF</b></Popover.Title>
            <Popover.Content id="role-info_popover_content">
                <p>This player's role is SHERIFF. The SHERIFF has to kill all OUTLAWs and the RENEGADE.</p>
            </Popover.Content>
        </Popover>
    )

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
            if (newGameMoves[i].targetPlayer == opponent.id && newGameMoves[i].action=="HOLED"){
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
            if (newGameMoves[i].card == "MISSED" && newGameMoves[i].usingPlayer == opponent.id && newGameMoves[i].action=="SUCCESS"){
                setHitOrMissedMessage("MISSED");
                setHitOrMissedNoteHidden(false);
                return true;
            }
        }
        return false;
    }

    function detectMessages(){
        if(detectIndiansShotBack() || detectSavedByBeer()){
            setMessageHidden(false);
            return;
        }
        setMessageHidden(true);
    }

    function detectIndiansShotBack(){
        if (newGameMoves.length == 0){
            setMessageHidden(true);
            return false;
        }
        for (let i=0; i<newGameMoves.length; i++){
            if (newGameMoves[i].card == "INDIANS" && newGameMoves[i].targetPlayer == opponent.id && newGameMoves[i].action=="FAIL"){
                setMessageHidden(false);
                setNotificationMessage(`${opponent.user.toUpperCase()} SHOT BACK`);
                return true;
            }
        }
    }

    function detectSavedByBeer(){
        if (newGameMoves.length == 0){
            setMessageHidden(true);
            return false;
        }
        for (let i=0; i<newGameMoves.length; i++){
            if (newGameMoves[i].card == "BEER" && newGameMoves[i].usingPlayer == opponent.id && newGameMoves[i].action=="SUCCESS"){
                setMessageHidden(false);
                setNotificationMessage(`SAVED BY BEER, CHEERS!`);
                return true;
            }
        }
    }

    function detectImages(){
        if (detectGatling() || detectIndians() || detectSaloon() || detectBarrel() ||detectBeer() || detectExplodingDynamite()/*  || detectIndiansGotHit() */){
            setNotificationImageHidden(false);
            return;
        }
        setNotificationImageHidden(true);
    }

    function detectIndians(){
        if (newGameMoves.length == 0){
            setNotificationImageHidden(true);
            return false;
        }
        for (let i=0; i<newGameMoves.length; i++){
            if (newGameMoves[i].card == "INDIANS" && newGameMoves[i].usingPlayer == opponent.id && newGameMoves[i].action=="USE"){
                setNotificationImage("/images/indianer.png");
                setNotificationImageHidden(false);
                return true;
            }
        }
    }

    /* function detectIndiansGotHit(){
        if (newGameMoves.length == 0){
            setNotificationImageHidden(true);
            return false;
        }
        for (let i=0; i<newGameMoves.length; i++){
            if (newGameMoves[i].card == "INDIANS" && newGameMoves[i].targetPlayer == opponent.id && newGameMoves[i].action=="SUCCESS"){
                setNotificationImage("/images/hitmarker.png");
                setNotificationImageHidden(false);
                return true;
            }
        }
    } */

    function detectGatling(){
        if (newGameMoves.length == 0){
            setNotificationImageHidden(true);
            return false;
        }
        for (let i=0; i<newGameMoves.length; i++){
            if (newGameMoves[i].card == "GATLING" && newGameMoves[i].usingPlayer == opponent.id && newGameMoves[i].action=="USE"){
                setNotificationImage("/images/gatling.png");
                setNotificationImageHidden(false);
                return true;
            }
        }
    }

    function detectSaloon(){
        if (newGameMoves.length == 0){
            setNotificationImageHidden(true);
            return false;
        }
        for (let i=0; i<newGameMoves.length; i++){
            if (newGameMoves[i].card == "SALOON" && newGameMoves[i].usingPlayer == opponent.id && newGameMoves[i].action=="USE"){
                setNotificationImage("/images/saloon.png");
                setNotificationImageHidden(false);
                return true;
            }
        }
    }

    function detectBarrel(){
        if (newGameMoves.length == 0){
            setNotificationImageHidden(true);
            return false;
        }
        for (let i=0; i<newGameMoves.length; i++){
            if (newGameMoves[i].card == "BARREL" && newGameMoves[i].usingPlayer == opponent.id && newGameMoves[i].action=="SUCCESS"){
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
            if (newGameMoves[i].card == "BEER" && newGameMoves[i].usingPlayer == opponent.id && newGameMoves[i].action=="USE"){
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
            if (newGameMoves[i].card == "DYNAMITE" && newGameMoves[i].usingPlayer == opponent.id && newGameMoves[i].action=="SUCCESS"){
                setNotificationImage("/images/dynamite.png");
                setNotificationImageHidden(false);
                return true;
            }
        }
    }


    return (
        
        <div>
            <>
                <h hidden={hitOrMissedNoteHidden} id="notification">
                <b>{hitOrMissedMessage}</b></h>
            </>
            <>
                <p hidden={notificationImageHidden} id="notification-for-image"><Image className="notification-image" src={notificationImage}/></p>
            </>
            <>
                <p hidden={messageHidden} id="notification2"><b>{notificationmessage}</b></p>
            </>
            {opponent.bullets === 0 ? (
                <p id="opponent-deck_div_gameEnd" hidden={hideEndRole}>
                    <Image className="gameEnd" src={`/images/role_cards/${opponent.gameRole}_icon.png`}/>
                    <br/>
                    {opponent.user !== "\<\User left Game\>" ? (
                        <p className="death-message">
                            {opponent.user} is dead. The player's role was {opponent.gameRole}
                        </p>
                    ):(
                        <p className="death-message">
                            This player left the game. The player's role was {opponent.gameRole}
                        </p>
                    )}

                </p>
            ) : (
                <p id="opponent-deck_div_gameEnd" hidden={hideEndRole}>
                    <Image className="gameEnd" src={`/images/role_cards/${opponent.gameRole}_icon.png`}/>
                    <br/>
                    <p className="death-message">
                        This player's role was {opponent.gameRole}
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
                                    hidden={!(opponent.gameRole === "SHERIFF")}>
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
                                <OverlayTrigger trigger={hideCancel_PlayCard ? "hover":"none"} placement="right" overlay={character_information}  delay={{hide: 300}}>
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
                                    id="opponent-player-deck_figure-profile-picture">{opponent.user}</Figure.Caption>
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
                            <OverlayTrigger trigger={hideCancel_PlayCard ? "hover":"none"} placement="left" overlay={life_information}>
                                <Row hidden={opponent.bullets < 1}>
                                    <Life/>
                                </Row>
                            </OverlayTrigger>
                        </Col>
                        <Col>
                            <Figure>
                                {/*<Figure hidden={opponent.hand.playCards.length === 0}>*/}
                                <Figure.Image
                                    onClick={showAmountHandCards}
                                    width={80}
                                    height={100}
                                    alt="80x100"
                                    src="/images/back.png"/>
                                <Figure.Caption
                                    id="opponent-player-deck_caption">{opponent.hand.cardsInHand} {opponent.hand.cardsInHand === 1 ? ("card"):("cards")}</Figure.Caption>
                            </Figure>
                        </Col>
                        <Col>
                            <Figure>
                                <Figure.Image
                                    onClick={showWeapon}
                                    width={80}
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
                                    width={80}
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
                                    width={80}
                                    height={100}
                                    alt="150x100"
                                    src={barrel}/>
                                <Figure.Caption id="opponent-player-deck_caption">barrel</Figure.Caption>
                            </Figure>
                        </Col>
                    </Row>
                </Container>
            </div>
            {<Modal show={show_noCardsToGet} animation size="sm" backdrop="static" keyboard={false}>
                <Modal.Header id="chosen-role_modal_header">
                    <Modal.Title id="chosen-role_modal_header_title" centered>
                        <b>No Cards Left</b></Modal.Title>
                </Modal.Header>
                <Modal.Body id="chosen-role_modal_body" centered>
                    <p>This player has no cards left!</p>
                </Modal.Body>
                <Modal.Footer id="chosen-role_modal_footer">
                    <Button id="custombutton" onClick={closeNoCardsToGet}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>}
            {<Modal show={show_destroyOrSteal} animation size="sm" backdrop="static" keyboard={false}>
                <Modal.Header id="chosen-role_modal_header">
                    <Modal.Title id="chosen-role_modal_header_title" centered>
                        <b>Hand card or on field card</b></Modal.Title>
                </Modal.Header>
                <Modal.Body id="chosen-role_modal_body" centered>
                    {curr_card ? (
                        <p>Do you want to {curr_card.card === "PANIC" ? "steal" : "throw away"} one of the opponent's
                            hand or on field cards?</p>
                    ) : <Spinner/>}
                </Modal.Body>
                <Modal.Footer id="chosen-role_modal_footer">
                    <Button id="custombutton" onClick={handCard} disabled={opponent.hand.cardsInHand === 0}>
                        Hand card
                    </Button>
                    <Button id="custombutton" onClick={onFieldCard} disabled={availableOnFieldCards()}>
                        On-field card
                    </Button>
                    <Button variant="danger" onClick={closeDestroyOrSteal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>}
            {<Modal show={show_stolenCard} centered animation size="m" rootClose animation>
                <Modal.Header id="chosen-role_modal_header">
                    <Modal.Title id="chosen-role_modal_header_title" centered><b>Stolen Card</b></Modal.Title>
                </Modal.Header>
                <Modal.Body id="chosen-role_modal_body" centered>
                    {stolenCard ? (
                        <Image
                            src={`/images/play_cards/${stolenCard.color}_${stolenCard.card}_${stolenCard.suit}_${stolenCard.rank}.png`}
                            id="chosen-role_modal_body_image"/>
                    ) : <Spinner/>}
                </Modal.Body>
                <Modal.Footer id="chosen-role_modal_footer">
                    <Button id="custombutton" onClick={closeStolenCard}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>}
            {<Modal show={show_onFieldCards} centered animation size={modalSize()} rootClose animation>
                <Modal.Header id="global_modal_header">
                    <Modal.Title id="global_modal_header_title" centered><b>Opponent's on-field
                        cards</b></Modal.Title>
                </Modal.Header>
                <Modal.Body id="global_modal_body" centered>
                    {curr_card ? (
                        curr_card.card === "PANIC" ? (
                            <p>Click the one you want to steal:
                                <br/><br/>
                                {opponent.onFieldCards.onFieldCards.map((curr) => (
                                    curr.card !== "DYNAMITE" && curr.card !== "JAIL" ? (
                                        <Image
                                            src={`/images/play_cards/${curr.color}_${curr.card}_${curr.suit}_${curr.rank}.png`}
                                            onClick={() => selectOnFieldCard(curr)}
                                            id="global_modal_body_image"/>
                                    ) : null
                                ))}
                            </p>
                        ) : (
                            <p>Click the one you want to throw away:
                                <br/><br/>
                                {opponent.onFieldCards.onFieldCards.map((curr) => (
                                    <Image
                                        src={`/images/play_cards/${curr.color}_${curr.card}_${curr.suit}_${curr.rank}.png`}
                                        onClick={() => selectOnFieldCard(curr)}
                                        id="global_modal_body_image"/>
                                ))}
                            </p>
                        )) : <Spinner/>}
                </Modal.Body>
                <ModalFooter id="global_modal_footer">
                    <Button variant="danger" onClick={closeOnFieldCards}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>}
            {<Modal show={show_rewardCards} centered animation size="lg" rootClose animation>
                <Modal.Header id="global_modal_header">
                    <Modal.Title id="global_modal_header_title" centered><b>Reward
                        Cards</b></Modal.Title>
                </Modal.Header>
                <Modal.Body id="global_modal_body" centered>
                    <p>You killed an Outlaw and therefore are rewarded with 3 cards!
                        <br/><br/>
                        {rewardCards.map((curr) => (
                            <Image
                                src={`/images/play_cards/${curr.color}_${curr.card}_${curr.suit}_${curr.rank}.png`}
                                id="global_modal_body_image"/>
                        ))}
                    </p>
                </Modal.Body>
                <Modal.Footer id="global_modal_footer">
                    <Button id="custombutton" onClick={closeRewardCards}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>}
            {<Modal show={show_sheriffKilledDeputy} animation size="sm" backdrop="static" keyboard={false}>
                <Modal.Header id="chosen-role_modal_header">
                    <Modal.Title id="chosen-role_modal_header_title" centered>
                        <b>You killed one of your own!</b></Modal.Title>
                </Modal.Header>
                <Modal.Body id="chosen-role_modal_body" centered>
                    <p>You killed a deputy! As punishment you lose all your hand as well as on-field cards!</p>
                </Modal.Body>
                <Modal.Footer id="chosen-role_modal_footer">
                    <Button id="custombutton" onClick={closeSheriffKilledDeputy}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>}
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
        </div>
    )
}