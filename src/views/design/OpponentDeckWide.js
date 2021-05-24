import useInterval from "../../components/game/useInterval.js";
import React, {useState, useEffect, useRef} from 'react';
import {Col, Row, Container, Card, Figure, Image, Button, Modal, ModalFooter} from 'react-bootstrap';
import "./styling/playing_field_styling.css";
import Life from "./Life";
import {api, authApi} from '../../helpers/api';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export default function OpponentDeckWide({
                                             opponent,
                                             player,
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
                                             updateFill_array,
                                         }) {
    const interval = useInterval(async () => {
        //console.log(`${player.user}: ${player.bullets}`);
        //repeating requests to keep stuff up-to-date
        if (playertable.gameStatus != "ENDED") {
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
            updateTargetEveryone(false);
            updateTargetOnlyEnemies(false);
            updateTargetSelf(false);
        }

        if (opponent.bullets > 0) {
            let response = await authApi().get(`/games/${playertable.id}/players/${player.id}/targets`);
            setPlayersInReach(response.data);
        }

        if (opponent.bullets < 1) {
            setBackgroundColor("#808080");
            setWidth(0);
            setOpacity(0.8);
            if (playertable.gameStatus !== "ENDED") {
                setHideEndRole(false);
            }
        }

        if (playeronturn != null && opponent.id === playeronturn.id) {
            setHighlightImage("solid");
        }
        if (playeronturn != null && opponent.id !== playeronturn.id) {
            setHighlightImage("none");
        }
        if (opponent.bullets > 0) {
            if (!ignoreRange) {
                isinreach();
                if (!isInReach) {
                    setWidth(0);
                }
                if (isInReach) {
                    setWidth(5);
                }
            }
            if (targetEveryone && ignoreRange) {
                setWidth(5);
            }
            if (targetSelf) {
                setWidth(0);
            }
            if (targetOnlyEnemies && ignoreRange) {
                setWidth(5);
            }
        }

        setWeapon(getWeapon);
        setHorse(getHorse);
        setBarrel(getBarrel);
        if (searchForOn_FieldCards("JAIL") != -1) {
            setInJail(true);
        }
        if (searchForOn_FieldCards("DYNAMITE") != -1) {
            setDynamite(true);
        } else {
            setDynamite(false);
        }
        //console.log(characterRef.current);
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
                updateTargetEveryone(true);
                updateIgnoreRange(true);
                break;
            default:
                console.log("no valid card name opponentdeck");
                break;
        }
    }


    function isinreach() {
        if (!ignoreRange) {
            for (let x of playersInReach) {
                if (x.id == opponent.id) {
                    setIsInReach(true);
                }
            }
        } else {
            setIsInReach(false);
        }
    }

    function selecttarget() {
        if (border == "solid" && width > 0) {
            updateBorder("none");
            setWidth(5);
            updateCard_played(true);
            if (curr_card.card === "PANIC" || curr_card.card === "CATBALOU") {
                setShow_destroyOrSteal(true);
                updateHideCancel_PlayCard(true);
                updateTargetSelf(false);
                updateIgnoreRange(false);
                updateTargetOnlyEnemies(false);
                updateTargetEveryone(false);
                updateFill_array(true);
                return;
            }
            console.log(`selecttarget: opponent: ${curr_card}`);
            authApi().post(`/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}/target/${opponent.id}`);

            updateHideCancel_PlayCard(true);
            updateTargetSelf(false);
            updateIgnoreRange(false);
            updateTargetOnlyEnemies(false);
            updateTargetEveryone(false);
            updateCurr_card(null);
            updateFill_array(true);
            //TODO: enable other player cards again
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

    function showBarrel() {
        alert("you clicked on a barrel. Congrats.");
    }

    function showHorse() {
        alert("you clicked on a horse. Congrats.");
    }

    function showWeapon() {
        alert("you clicked on a weapon. Congrats.");
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

    async function selectOnFieldCard(card) {
        setShow_onFieldCards(false);
        const targetCardId = card.id;
        const requestBody = JSON.stringify({
            targetCardId: targetCardId
        });
        await authApi().post(`/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}/target/${opponent.id}`, requestBody);
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

    const [hideEndRole, setHideEndRole] = useState(true);
    const [opacity, setOpacity] = useState(1);
    const [backgroundColor, setBackgroundColor] = useState("none");
    const [highlightImage, setHighlightImage] = useState("none");
    const [playersInReach, setPlayersInReach] = useState([]);
    const [isInReach, setIsInReach] = useState(false);
    const [width, setWidth] = useState(5);
    const [show_destroyOrSteal, setShow_destroyOrSteal] = useState(false);
    const [show_stolenCard, setShow_stolenCard] = useState(false);
    const [stolenCard, setStolenCard] = useState();
    const [show_onFieldCards, setShow_onFieldCards] = useState(false);
    // const [onFieldCards, setOnFieldCards] = useState([]);

    const [inJail, setInJail] = useState(false);
    const [dynamite, setDynamite] = useState(false);
    // const [barrelIndex, setBarrelIndex] = useState(-1);
    // const [weaponIndex, setWeaponIndex] = useState(-1);
    // const [horseIndex, setHorseIndex] = useState(-1);
    const [barrel, setBarrel] = useState("/images/back.png");
    const [weapon, setWeapon] = useState("/images/back.png");
    const [horse, setHorse] = useState("/images/back.png");
    const [characterName, setCharacterName] = useState("loading character name...");
    const [characterDescription, setCharacterDescription] = useState("loading character description...");
    const [displayName, setDisplayName] = useState("loading character name...");
    const [setupCharacter, setSetupCharacter] = useState(true);
    const characterRef = useRef();

    const character_information = (
        <Popover placement="bottom" id="role-info_popover">
            <Popover.Title id="role-info_popover_title"><b>{displayName}</b></Popover.Title>
            <Popover.Content id="role-info_popover_content">
                <Card id="role-info_popover_content_card">
                    <Card.Img id="role-info_popover_content_card_cardimg" variant="top" centered
                              src={!characterRef.current ? "/images/back.png" : (inJail ? `/images/character_cards/${characterName}_p_jail.png` : `/images/character_cards/${characterName}_p.jpeg`)}/>
                </Card>
                {characterDescription}
            </Popover.Content>
        </Popover>
    )


    return (
        <div>
            {opponent.bullets === 0 ? (
                <p id="opponent-deck_div_gameEnd" hidden={hideEndRole}>
                    <Image className="gameEnd" src={`/images/role_cards/${opponent.gameRole}_icon.png`}/>
                    <br/>
                    <p className="death-message">
                        This player is dead or left the game. The player's role is {opponent.gameRole}
                    </p>
                </p>
            ) : (
                <p id="opponent-deck_div_gameEnd" hidden={hideEndRole}>
                    <Image className="gameEnd" src={`/images/role_cards/${opponent.gameRole}_icon.png`}/>
                    <br/>
                    <p className="death-message">
                        This player's role is {opponent.gameRole}
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
                                        width={60}
                                        height={30}
                                        alt="60x30"
                                        src="/images/icons/dynamite.png"/>
                                </Figure>
                            </Row>
                            <Row className="justify-content-center">
                                <Figure
                                    hidden={!(opponent.gameRole === "SHERIFF")}>
                                    <Figure.Image
                                        width={80}
                                        height={80}
                                        alt="80x80"
                                        src="/images/icons/sheriff.png"/>
                                </Figure>
                            </Row>
                        </Col>
                        <Col>
                            <Figure>
                                <OverlayTrigger trigger="click" overlay={character_information} rootClose>
                                    <Figure.Image id="character-image_FigureImage"
                                                  style={{borderStyle: highlightImage}}
                                                  ref={characterRef}
                                                  width={80}
                                                  height={80}
                                                  alt="80x80"
                                                  src={inJail && playertable.gameStatus != "ENDED" ? `/images/character_cards/${characterName}_p_jail.png` : `/images/character_cards/${characterName}_p.jpeg`}
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
                                <Figure.Caption
                                    id="opponent-player-deck_caption">{opponent.hand.cardsInHand} card(s)</Figure.Caption>
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
            {<Modal show={show_destroyOrSteal} animation size="sm" backdrop="static" keyboard={false}>
                <Modal.Header id="chosen-role_modal_header">
                    <Modal.Title id="chosen-role_modal_header_title" centered>
                        <b>Hand card or on field card</b></Modal.Title>
                </Modal.Header>
                <Modal.Body id="chosen-role_modal_body" centered>
                    {curr_card ? (
                        <p>Do you want to {curr_card.card === "PANIC" ? "steal" : "throw away"} one of the opponent's
                            hand or on field cards?</p>
                    ) : null}
                </Modal.Body>
                <Modal.Footer id="chosen-role_modal_footer">
                    <Button id="custombutton" onClick={handCard} disabled={opponent.hand.cardsInHand === 0}>
                        Hand card
                    </Button>
                    <Button id="custombutton" onClick={onFieldCard}>
                        On field card
                    </Button>
                    <Button id="custombutton" onClick={closeDestroyOrSteal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>}
            {<Modal show={show_stolenCard} centered animation size="sm" rootClose animation>
                <Modal.Header id="chosen-role_modal_header">
                    <Modal.Title id="chosen-role_modal_header_title" centered><b>Stolen Card</b></Modal.Title>
                </Modal.Header>
                <Modal.Body id="chosen-role_modal_body" centered>
                    {stolenCard ? (
                        <Image
                            src={`/images/play_cards/${stolenCard.color}_${stolenCard.card}_${stolenCard.suit}_${stolenCard.rank}.png`}
                            id="chosen-role_modal_body_image"/>
                    ) : null}
                </Modal.Body>
                <Modal.Footer id="chosen-role_modal_footer">
                    <Button id="custombutton" onClick={closeStolenCard}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>}
            {<Modal show={show_onFieldCards} centered animation size="sm" rootClose animation>
                <Modal.Header id="chosen-role_modal_header">
                    <Modal.Title id="chosen-role_modal_header_title" centered><b>Opponent's on field
                        cards</b></Modal.Title>
                </Modal.Header>
                <Modal.Body id="chosen-role_modal_body" centered>
                    {curr_card ? (
                        curr_card.card === "PANIC" ? (
                            <p>Click the one you want to steal:
                                <br/>
                                {opponent.onFieldCards.onFieldCards.map((curr) => (
                                    curr.card !== "DYNAMITE" && curr.card !== "JAIL" ? (
                                        <Col>
                                            <Image
                                                src={`/images/play_cards/${curr.color}_${curr.card}_${curr.suit}_${curr.rank}.png`}
                                                onClick={() => selectOnFieldCard(curr)}
                                                id="chosen-role_modal_body_image"/>
                                        </Col>
                                    ) : null
                                ))}
                            </p>
                        ) : (
                            <p>Click the one you want to throw away:
                                <br/>
                                {opponent.onFieldCards.onFieldCards.map((curr) => (
                                    <Col>
                                        <Image
                                            src={`/images/play_cards/${curr.color}_${curr.card}_${curr.suit}_${curr.rank}.png`}
                                            onClick={() => selectOnFieldCard(curr)}
                                            id="chosen-role_modal_body_image"/>
                                    </Col>
                                ))}
                            </p>
                        )) : null}
                </Modal.Body>
                <ModalFooter id="chosen-role_modal_footer">
                    <Button id="custombutton" onClick={closeOnFieldCards}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>}
        </div>
    )
}