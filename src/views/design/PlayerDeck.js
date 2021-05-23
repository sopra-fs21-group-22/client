import useInterval from "../../components/game/useInterval.js";
import {Col, Row, Container, Card, Figure, Image, Button, Modal} from 'react-bootstrap';
import "./styling/playing_field_styling.css";
import Life from "./Life";
import React, {useState, useEffect, useRef} from 'react';
import {authApi} from "../../helpers/api";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

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
                                       updateFill_array,
                                       changingOnFieldCards,
                                       updateChangingOnFieldCards
                                   }) {
    const interval = useInterval(async () => {
        /* console.log(`${player.user} other: ${player.bullets}`);
        console.log(`${opponent.user} other: ${opponent.bullets}`); */

        //repeating requests to keep stuff up-to-date
        if (playertable.gameStatus != "ENDED") {
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
            updateTargetEveryone(false);
            updateTargetOnlyEnemies(false);
            updateTargetSelf(false);
        }
        if (player.bullets < 1) {
            setBackgroundColor("#808080");
            setOpacity(0.8);
            if (playertable.gameStatus !== "ENDED") {
                setHideEndRole(false);
            }
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
        if (!changingOnFieldCards) {
            setOnFieldCards(player.onFieldCards.onFieldCards);
            if (searchForOn_FieldCards("BARREL") != -1) {
                setBarrelIndex(searchForOn_FieldCards("BARREL"));
                setBarrel(`/images/play_cards/blue_${onFieldCards[barrelIndex].card}_${onFieldCards[barrelIndex].suit}_${onFieldCards[barrelIndex].rank}.png`);
            } else {
                setBarrelIndex(-1);
            }
            if (searchForOn_FieldCards("MUSTANG") != -1) {
                setHorseIndex(searchForOn_FieldCards("MUSTANG"));
                setHorse(`/images/play_cards/blue_${onFieldCards[horseIndex].card}_${onFieldCards[horseIndex].suit}_${onFieldCards[horseIndex].rank}.png`);
            } else if (searchForOn_FieldCards("APPALOOSA") != -1) {
                setHorseIndex(searchForOn_FieldCards("APPALOOSA"));
                setHorse(`/images/play_cards/blue_${onFieldCards[horseIndex].card}_${onFieldCards[horseIndex].suit}_${onFieldCards[horseIndex].rank}.png`);
            } else {
                setHorseIndex(-1);
            }
            if (searchForOn_FieldCards("CARABINE") != -1) {
                setWeaponIndex(searchForOn_FieldCards("CARABINE"));
                setWeapon(`/images/play_cards/blue_${onFieldCards[weaponIndex].card}_${onFieldCards[weaponIndex].suit}_${onFieldCards[weaponIndex].rank}.png`);
            } else if (searchForOn_FieldCards("REMINGTON") != -1) {
                setWeaponIndex(searchForOn_FieldCards("REMINGTON"));
                setWeapon(`/images/play_cards/blue_${onFieldCards[weaponIndex].card}_${onFieldCards[weaponIndex].suit}_${onFieldCards[weaponIndex].rank}.png`);
            } else if (searchForOn_FieldCards("SCHOFIELD") != -1) {
                setWeaponIndex(searchForOn_FieldCards("SCHOFIELD"));
                setWeapon(`/images/play_cards/blue_${onFieldCards[weaponIndex].card}_${onFieldCards[weaponIndex].suit}_${onFieldCards[weaponIndex].rank}.png`);
            } else if (searchForOn_FieldCards("WINCHESTER") != -1) {
                setWeaponIndex(searchForOn_FieldCards("WINCHESTER"));
                setWeapon(`/images/play_cards/blue_${onFieldCards[weaponIndex].card}_${onFieldCards[weaponIndex].suit}_${onFieldCards[weaponIndex].rank}.png`);
            } else if (searchForOn_FieldCards("VOLCANIC") != -1) {
                setWeaponIndex(searchForOn_FieldCards("VOLCANIC"));
                setWeapon(`/images/play_cards/blue_${onFieldCards[weaponIndex].card}_${onFieldCards[weaponIndex].suit}_${onFieldCards[weaponIndex].rank}.png`);
            } else {
                setWeaponIndex(-1);
            }
            if (searchForOn_FieldCards("JAIL") != -1) {
                setInJail(true);
            }
            if (searchForOn_FieldCards("DYNAMITE") != -1) {
                setDynamite(true);
            } else {
                setDynamite(false);
            }
        }
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

    async function selecttarget() {
        if (border == "solid" && width > 0) {
            updateCard_played(true);
            updateBorder("none");
            setWidth(5);

            const target_CardId = null;
            const requestBody = JSON.stringify({
                target_CardId: target_CardId
            });
            await authApi().post(`/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}/target/${player.id}`);

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
        if (onFieldCards.length == 0) {
            return -1;
        }
        for (let x = 0; x < onFieldCards.length; x++) {
            if (onFieldCards[x].card == cardtobefound) {
                return x;
            }
        }
        return -1;
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

    const [hideEndRole, setHideEndRole] = useState(true);
    const [opacity, setOpacity] = useState(1);
    const [backgroundColor, setBackgroundColor] = useState("none");
    const [highlightImage, setHighlightImage] = useState("none");
    const [width, setWidth] = useState(5);
    const [inJail, setInJail] = useState(false);
    const [barrelIndex, setBarrelIndex] = useState(-1);
    const [weaponIndex, setWeaponIndex] = useState(-1);
    const [horseIndex, setHorseIndex] = useState(-1);
    const [barrel, setBarrel] = useState();
    const [weapon, setWeapon] = useState();
    const [horse, setHorse] = useState();
    const [dynamite, setDynamite] = useState(false);
    const [onFieldCards, setOnFieldCards] = useState([]);

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
        <div style={{marginBottom: 5}}>
            <>
                {player.bullets === 0 ? (
                    <p id="opponent-deck_div_gameEnd" hidden={hideEndRole}>
                        <Image className="gameEnd" src={`/images/role_cards/${player.gameRole}_icon.png`}/>
                        <br/>
                        <p className="death-message">
                            You are dead. Your role is {player.gameRole}
                        </p>
                    </p>
                ) : (
                    <p id="opponent-deck_div_gameEnd" hidden={hideEndRole}>
                        <Image className="gameEnd" src={`/images/role_cards/${player.gameRole}_icon.png`}/>
                        <br/>
                        <p className="death-message">
                            Your role is {player.gameRole}
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
                                        hidden={!(player.gameRole === "SHERIFF")}>
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
                            <Col>
                                <Figure>
                                    <Figure.Image
                                        onClick={showWeapon}
                                        width={150}
                                        height={100}
                                        alt="150x100"
                                        src={(weaponIndex == -1) ? "/images/back.png" : weapon}/>
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
                                        src={(horseIndex == -1) ? "/images/back.png" : horse}/>
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
                                        src={(barrelIndex == -1) ? "/images/back.png" : barrel}/>
                                    <Figure.Caption id="opponent-player-deck_caption">barrel</Figure.Caption>
                                </Figure>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        </div>
    )
}