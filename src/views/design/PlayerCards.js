import React, {useState} from "react";
import {Container, Row, Col, Image, Modal, Button, Card} from "react-bootstrap";
import "./styling/playing_field_styling.css";
import "./styling/lobby_styling.css";
import "../../views/design/styling/custom_button_styling.css";
import useInterval from "../../components/game/useInterval.js";
import {authApi} from "../../helpers/api";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {Spinner} from './Spinner';


export default function PlayerCards({
                                        playeronturn,
                                        playertable,
                                        player,
                                        updateBorder,
                                        card_played,
                                        updateCard_played,
                                        hideCancel_PlayCard,
                                        updateHideCancel_PlayCard,
                                        updateCurr_card,
                                        curr_card,
                                        fill_array,
                                        updateFill_array,
                                        roleinformation
                                    }) {

    const interval = useInterval(async () => {
        if (fill_array) {
            let curr = [];
            for (let i of player.hand.playCards) {
                curr.push(false);
            }
            setShow_card(curr);
            updateFill_array(false);
        }

    }, 1000);

    const [show_card, setShow_card] = useState([]);
    const [curr_card_image_source, setCurr_card_image_source] = useState();
    const [show_duplicateBlueCard, setShow_duplicateBlueCard] = useState(false);

    const [show_drawnCards, setShow_drawnCards] = useState(false);
    const [drawnCards, setDrawnCards] = useState([]);

    function lookAtCard(index) {
        if (playeronturn.id !== player.id) {
            alert("it ain't your turn buddy");
            return;
        }
        if (hideCancel_PlayCard) {
            if (curr_card != null) {
                alert("You just tried to play the same card twice - slow down ;) Press cancel and choose a different one.");
                updateHideCancel_PlayCard(false);
                return;
            }
            let curr = show_card;
            curr[index] = true;
            setShow_card(curr);
            getImageSource();
        }
        if (curr_card != null) {
            alert("You already chose a card to play. Press cancel to play another card.");
            updateHideCancel_PlayCard(false);
        }
    }

    function closeCard() {
        //TODO set all entries to false once card has been closed
        updateCurr_card(null);
        updateFill_array(true);
        updateBorder("none");
    }

    //maybe useful somewhere else...
    {/*function waitsometime() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('resolved');
          }, 5000);
        });
    }
    function something(){
        setSelectedCard((state) => {
            console.log(state); // "React is awesome!"
            
            return state;
          });
    }*/
    }

    function getImageSource() {
        for (let i = 0; i < show_card.length; i++) {
            if (show_card[i]) {
                let curr = player.hand.playCards[i];
                setCurr_card_image_source(`/images/play_cards/${curr.color}_${curr.card}_${curr.suit}_${curr.rank}.png`);
                updateCurr_card(player.hand.playCards[i]);
            }
        }
    }


    function searchForOn_FieldCards(cardtobefound) {
        if (player.onFieldCards.onFieldCards.length == 0) {
            return false;
        }
        let x;
        for (x of player.onFieldCards.onFieldCards) {
            if (x.card == cardtobefound) {
                return true;
            }
        }
        return false;
    }

    async function playCard() {
        updateFill_array(true);
        //TODO: disable other player cards while choosing a target
        switch (curr_card.card) {
            case "BARREL":
                let barrel = searchForOn_FieldCards("BARREL");
                if (barrel) {
                    return;
                }
                authApi().post(`/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}/target/${player.id}`);
                updateCurr_card(null);
                updateBorder("none");
                return;
            case "APPALOOSA":
            case "MUSTANG":
                let appaloosa = searchForOn_FieldCards("APPALOOSA");
                let mustang = searchForOn_FieldCards("MUSTANG");
                if (appaloosa || mustang) {
                    setShow_duplicateBlueCard(true);
                    return;
                }
                authApi().post(`/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}/target/${player.id}`);
                updateCurr_card(null);
                updateBorder("none");
                return;
            case "CARABINE":
            case "REMINGTON":
            case "SCHOFIELD":
            case "VOLCANIC":
            case "WINCHESTER":
                let carabine = searchForOn_FieldCards("CARABINE");
                let remington = searchForOn_FieldCards("REMINGTON");
                let schofield = searchForOn_FieldCards("SCHOFIELD");
                let volcanic = searchForOn_FieldCards("VOLCANIC");
                let winchester = searchForOn_FieldCards("WINCHESTER");
                if (carabine || remington || schofield || volcanic || winchester) {
                    setShow_duplicateBlueCard(true);
                    return;
                }
                authApi().post(`/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}/target/${player.id}`);
                updateBorder("none");
                updateCurr_card(null);
                return;
            case "SALOON":
            case "BEER":
            case "DYNAMITE":
                authApi().post(`/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}`);
                updateBorder("none");
                updateCurr_card(null);
                return;
            case "STAGECOACH":
            case "WELLSFARGO":
            case "GATLING":
            case "INDIANS":
                const beforeDrawingCards = player.hand.playCards;
                await authApi().post(`/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}`);
                let playerAfterRequest = await authApi().get(`/games/${playertable.id}/players/${player.id}`);
                const afterDrawingCards = playerAfterRequest.data.hand.playCards;
                const newCards = getNewCards(beforeDrawingCards, afterDrawingCards);
                setCards(newCards);
                updateBorder("none");
                // updateCurr_card(null); this happens once modal is closed
                return;
            case "BANG":
                localStorage.setItem("cards", JSON.stringify(player.hand.playCards));
                updateBorder("solid");
                updateHideCancel_PlayCard(false);
                return;
            case "PANIC":
            case "CATBALOU":
            case "JAIL":
                updateBorder("solid");
                updateHideCancel_PlayCard(false);
                return;
            default:
                console.log("no valid card name playercards");
                break;
        }
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

    function closeDrawnCards() {
        setShow_drawnCards(false);
        updateCurr_card(null);
    }


    function setCards(newCards) {
        if (newCards.length > 0) {
            setDrawnCards(newCards);
            setShow_drawnCards(true);
        } else {
            updateCurr_card(null);
        }
    }

    function discardCard() {
        authApi().delete(`/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}`);
        updateCurr_card(null);
        updateFill_array(true);
    }

    function dontReplaceCard() {
        setShow_duplicateBlueCard(false);
        updateCurr_card(null);
        updateBorder("none");
    }

    function doReplaceCard() {
        setShow_duplicateBlueCard(false);
        authApi().post(`/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}/target/${player.id}`);
        updateCurr_card(null);
        updateBorder("none");
    }

    function duplicatesCheck(duplicate) {
        return (searchForOn_FieldCards(duplicate) && curr_card.card === duplicate);
    }

    function disabledPlayButton() {
        return (((player.stillPlayableBangsThisRound === 0 && curr_card.card === "BANG") ||
            curr_card.card === "MISSED" ||
            (curr_card.card === "BEER" && player.maxBullets < player.bullets + 1)) ||
            duplicatesCheck("BARREL") || duplicatesCheck("CARABINE") ||
            duplicatesCheck("REMINGTON") || duplicatesCheck("SCHOFIELD") ||
            duplicatesCheck("VOLCANIC") || duplicatesCheck("WINCHESTER") ||
            duplicatesCheck("MUSTANG") || duplicatesCheck("APPALOOSA"));
    }

    return (
        <>
            <Container className="shelf">
                {!curr_card ? (
                    <Modal hidden={show_duplicateBlueCard}>loading</Modal>
                ) : (<>
                    {<Modal show={show_duplicateBlueCard} animation size="sm" backdrop="static" keyboard={false}>
                        <Modal.Header id="chosen-role_modal_header">
                            <Modal.Title id="chosen-role_modal_header_title" centered>
                                <b>You already have a {(curr_card.card === "CARABINE" ||
                                    curr_card.card === "REMINGTON" ||
                                    curr_card.card === "SCHOFIELD" ||
                                    curr_card.card === "VOLCANIC" ||
                                    curr_card.card === "WINCHESTER") ? "weapon" : "horse"}</b></Modal.Title>
                        </Modal.Header>
                        <Modal.Body id="chosen-role_modal_body" centered>
                            <p>Do you want to replace it?</p>
                        </Modal.Body>
                        <Modal.Footer id="chosen-role_modal_footer">
                            <Button id="custombutton" onClick={dontReplaceCard}>
                                No
                            </Button>
                            <Button id="custombutton" onClick={doReplaceCard}>
                                Yes
                            </Button>
                        </Modal.Footer>
                    </Modal>}
                </>)}


                <Row>
                    <Col>
                        <OverlayTrigger trigger="hover" overlay={roleinformation} rootClose>
                            <Image className="deck-discard-pile_image-card"
                                   src={`/images/role_cards/${player.gameRole.toLowerCase()}.png`}/>
                        </OverlayTrigger>
                    </Col>
                    {player.hand.playCards.map((currCard, index) => (
                        <Col>
                            <Image className="deck-discard-pile_image-card"
                                   src={`/images/play_cards/${currCard.color}_${currCard.card}_${currCard.suit}_${currCard.rank}.png`}
                                   onClick={() => lookAtCard(index)}/>
                            {<Modal show={show_card[index]} centered animation size="m" backdrop="static"
                                    keyboard={false}>
                                <Modal.Header id="chosen-role_modal_header">
                                    <Modal.Title id="chosen-role_modal_header_title" centered><b>Discard, Return or Play</b></Modal.Title>
                                </Modal.Header>
                                <Modal.Body id="chosen-role_modal_body" centered>
                                    <Image src={curr_card_image_source} id="chosen-role_modal_body_image"/>
                                </Modal.Body>
                                <Modal.Footer id="player_cards_footer">
                                    {!curr_card ? (
                                        <Spinner/>
                                    ) : (<>
                                            <Button variant="danger" onClick={discardCard}>Discard</Button>
                                            <Button id="custombutton" onClick={closeCard}>
                                                Return
                                            </Button>
                                            <Button id="custombutton"
                                                    disabled={disabledPlayButton()}
                                                    onClick={playCard}>
                                                Play
                                            </Button>
                                        </>
                                    )}
                                </Modal.Footer>
                            </Modal>}
                        </Col>
                    ))}
                </Row>
            </Container>
            {<Modal show={show_drawnCards} centered animation size={drawnCards.length > 2 ? "lg" : "m"} rootClose
                    animation>
                {curr_card ? (
                    (curr_card.card === "WELLSFARGO" || curr_card.card === "STAGECOACH") ? (
                        <>
                            <Modal.Header id="global_modal_header">
                                <Modal.Title id="global_modal_header_title" centered><b>Drawn
                                    Cards</b></Modal.Title>
                            </Modal.Header>
                            <Modal.Body id="global_modal_body" centered>
                                {drawnCards.map((curr) => (
                                    <Image
                                        src={`/images/play_cards/${curr.color}_${curr.card}_${curr.suit}_${curr.rank}.png`}
                                        id="global_modal_body_image"/>
                                ))}
                            </Modal.Body>
                        </>
                    ) : (
                        <>
                            <Modal.Header id="global_modal_header">
                                <Modal.Title id="global_modal_header_title" centered><b>Reward
                                    Cards</b></Modal.Title>
                            </Modal.Header>
                            <Modal.Body id="global_modal_body" centered>
                                <p>You killed an Outlaw and therefore are rewarded with 3 cards!
                                    <br/><br/>
                                    {drawnCards.map((curr) => (
                                        <Image
                                            src={`/images/play_cards/${curr.color}_${curr.card}_${curr.suit}_${curr.rank}.png`}
                                            id="global_modal_body_image"/>
                                    ))}
                                </p>
                            </Modal.Body>
                        </>
                    )):null}
                <Modal.Footer id="global_modal_footer">
                    <Button id="custombutton" onClick={closeDrawnCards}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>}
        </>
    )
}