import { Col, Row, Container, Card, ListGroup, ListGroupItem, CardDeck, Button, Modal, Image, ModalBody } from 'react-bootstrap';
import OpponentDeckWide from "../OpponentDeckWide";
import PlayerDeck from "../PlayerDeck";
import PlayerCards from "../PlayerCards";
import DeckDiscardPiles from "../DeckDiscardPiles";
import React, { useState, useEffect } from 'react';
import "../styling/custom_button_styling.css";
import useInterval from "../../../components/game/useInterval";
import PlayerModel from "../../../components/shared/models/PlayerModel";


function Layout6players({
                            playertable,
                            orderarray,
                            visibility,
                            player,
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
                            updateCurr_card,
                            curr_card,
                            roleinformation,
                            changingOnFieldCards,
                            updateChangingOnFieldCards
                        }) {
    const interval = useInterval(async () => {
        /* console.log(`${playerList[0].user}layoutversion: ${playerList[0].bullets}`);
        console.log(`${playerList[1].user}layoutversion: ${playerList[1].bullets}`);
        console.log(`${playerList[2].user}layoutversion: ${playerList[2].bullets}`);
        console.log(`${playerList[3].user}layoutversion: ${playerList[3].bullets}`);
        console.log("sduifhsoduf"); */
        fillPlayerList();
    }, 1000);


    const [border, setBorder] = useState("none");
    const [card_played, setCard_played] = useState(false);
    const [fill_array, setFill_array] = useState(true);
    const [playerList, setPlayerList] = useState(orderarray);

    const updateBorder = (value) => {
        setBorder(value);
    }
    const updateCard_played = (value) => {
        setCard_played(value);
    }

    const updateFill_array = (value) => {
        setFill_array(value);
    }


    function back() {
        updateHideCancel_PlayCard(true);
        updateBorder("none");
        updateTargetSelf(false);
        updateIgnoreRange(false);
        updateTargetOnlyEnemies(false);
        updateTargetEveryone(false);
        updateCurr_card(null);
    }

    function fillPlayerList() {
        let array = [];
        for (let x = 0; x < orderarray.length; x++) {
            array[x] = searchbyid(orderarray[x].id);
        }
        setPlayerList(array);
    }

    function searchbyid(id) {
        for (let x = 0; x < playertable.players.length; x++) {
            if (playertable.players[x].id == id) {
                let a = new PlayerModel(playertable.players[x]);
                return a;
            }
        }
    }

    return (<Container hidden={visibility} fluid className="h-100">
        <Row>
            <Col>
                <OpponentDeckWide opponent={playerList[4]} player={playerList[0]} playeronturn={playertable.playerOnTurn}
                              playertable={playertable} border={border} updateBorder={updateBorder}
                              updateCard_played={updateCard_played}
                              updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                              ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf}
                              updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone}
                              updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies}
                              updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                              updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array}
                              updateFill_array={updateFill_array} changingOnFieldCards={changingOnFieldCards}
                              updateChangingOnFieldCards={updateChangingOnFieldCards}/>
            </Col>
            <Col>
                <OpponentDeckWide opponent={playerList[3]} player={playerList[0]} playeronturn={playertable.playerOnTurn}
                              playertable={playertable} border={border} updateBorder={updateBorder}
                              updateCard_played={updateCard_played}
                              updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                              ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf}
                              updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone}
                              updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies}
                              updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                              updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array}
                              updateFill_array={updateFill_array} changingOnFieldCards={changingOnFieldCards}
                              updateChangingOnFieldCards={updateChangingOnFieldCards}/>
            </Col>
            <Col>
                <OpponentDeckWide opponent={playerList[2]} player={playerList[0]} playeronturn={playertable.playerOnTurn}
                              playertable={playertable} border={border} updateBorder={updateBorder}
                              updateCard_played={updateCard_played}
                              updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                              ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf}
                              updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone}
                              updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies}
                              updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                              updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array}
                              updateFill_array={updateFill_array} changingOnFieldCards={changingOnFieldCards}
                              updateChangingOnFieldCards={updateChangingOnFieldCards}/>
            </Col>
        </Row>
        <br/>
        <Row className="align-items-center">
            <Col xs={5}>
                <OpponentDeckWide opponent={playerList[5]} player={playerList[0]} playeronturn={playertable.playerOnTurn}
                              playertable={playertable} border={border} updateBorder={updateBorder}
                              updateCard_played={updateCard_played}
                              updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                              ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf}
                              updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone}
                              updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies}
                              updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                              updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array}
                              updateFill_array={updateFill_array} changingOnFieldCards={changingOnFieldCards}
                              updateChangingOnFieldCards={updateChangingOnFieldCards}/>
            </Col>
            <Col>{playertable.gameStatus=="ENDED" ? (
                <>
                <p hidden={true}>nothing to see here</p>
                </>
                ):(
                <DeckDiscardPiles playertable={playertable} playeronturn={playertable.playerOnTurn}/>
                )}
            </Col>
            <Col xs={5}>
                <OpponentDeckWide opponent={playerList[1]} player={playerList[0]} playeronturn={playertable.playerOnTurn}
                              playertable={playertable} border={border} updateBorder={updateBorder}
                              updateCard_played={updateCard_played}
                              updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                              ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf}
                              updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone}
                              updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies}
                              updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                              updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array}
                              updateFill_array={updateFill_array} changingOnFieldCards={changingOnFieldCards}
                              updateChangingOnFieldCards={updateChangingOnFieldCards}/>
            </Col>
        </Row>
        <br/>
        <Row>
            <Col/>
            <Col xs={5}>
                <PlayerDeck player={player} playeronturn={playertable.playerOnTurn} playertable={playertable}
                            border={border} updateBorder={updateBorder} updateCard_played={updateCard_played}
                            updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                            ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf}
                            updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone}
                            updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies}
                            updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                            updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array}
                            updateFill_array={updateFill_array} changingOnFieldCards={changingOnFieldCards}
                            updateChangingOnFieldCards={updateChangingOnFieldCards}/>
            </Col>
            <Col/>
        </Row>
        <Row>
            <Col/>
            <Col xs={7}>{playertable.gameStatus=="ENDED" ? (
                <>
                <p hidden={true}>nothing to see here</p>
                </>
                ):(
                    <PlayerCards playeronturn={playertable.playerOnTurn} playertable={playertable} player={player}
                    updateBorder={updateBorder} card_played={card_played} updateCard_played={updateCard_played}
                    updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                    updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array}
                    updateFill_array={updateFill_array} roleinformation={roleinformation}/>
                )}
                
            </Col>
            <Col/>
        </Row>
        <Button id="custombutton" hidden={hideCancel_PlayCard} block onClick={back}>Cancel</Button>
    </Container>);
}
export default Layout6players;