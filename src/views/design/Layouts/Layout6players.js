import {
    Col,
    Row,
    Container,
    Card,
    ListGroup,
    ListGroupItem,
    CardDeck,
    Button,
    Modal,
    Image,
    ModalBody, Toast
} from 'react-bootstrap';
import OpponentDeckWide from "../OpponentDeckWide";
import PlayerDeck from "../PlayerDeck";
import PlayerCards from "../PlayerCards";
import DeckDiscardPiles from "../DeckDiscardPiles";
import React, {useState, useEffect} from 'react';
import "../styling/custom_button_styling.css";
import useInterval from "../../../components/game/useInterval";
import PlayerModel from "../../../components/shared/models/PlayerModel";
import ChatPopUp from "../../../components/externalAPI/ChatPopUp";
import "../styling/lobby_styling.css";
import {authApi} from "../../../helpers/api";
import {synthesizeSpeech} from "../../../components/externalAPI/synthesizeSpeech";
import LayoutSwitcher from "../../../components/game/LayoutSwitcher";
import GameMovesPopUp from "../../../components/game/GameMovesPopUp";


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
                            targetNotSheriff,
                            updateTargetNotSheriff,
                            updateCurr_card,
                            curr_card,
                            updateChat,
                            chat,
                            roleinformation,
                            newGameMoves,
                            muteChat,
                            endOfGame,
                            winnerMessage,
                            show_characterDisplay,
                            updateShow_characterDisplay,
                            reversedGameMoves
                        }) {
    const interval = useInterval(async () => {
        /* console.log(`${playerList[0].user}layoutversion: ${playerList[0].bullets}`);
        console.log(`${playerList[1].user}layoutversion: ${playerList[1].bullets}`);
        console.log(`${playerList[2].user}layoutversion: ${playerList[2].bullets}`);
        console.log(`${playerList[3].user}layoutversion: ${playerList[3].bullets}`);
        console.log("sduifhsoduf"); */
        fillPlayerList();
        updateChatLog();
    }, 1000);


    const [border, setBorder] = useState("none");
    const [card_played, setCard_played] = useState(false);
    const [fill_array, setFill_array] = useState(true);
    const [playerList, setPlayerList] = useState(orderarray);
    const [displayChat, setDisplayChat] = useState(false); // boolean whether the Chat Popup should be displayed or not
    const [displayGameLog, setDisplayGameLog] = useState(true); // boolean whether the Game Log Popup should be displayed or not
    const [newMessage, setNewMessage] = useState(true); // boolean whether there is a new message
    const [newMessageData, setNewMessageData] = useState({name: "BANG!", content: "Welcome to the Game!"}); // new message as an object
    const [show, setShow] = useState(true); // boolean whether a toast is shown or not
    const [showChatToast, setShowChatToast] = useState(true); // boolean whether a toast is shown or not
    const [showGameLogToast, setShowGameLogToast] = useState(true); // boolean whether a toast is shown or not


    const updateBorder = (value) => {
        setBorder(value);
    }
    const updateCard_played = (value) => {
        setCard_played(value);
    }

    const updateFill_array = (value) => {
        setFill_array(value);
    }

    function updateChatLog() { // fetches all chat messages from the backend
        if (playertable.chat.messages.length > chat.length) {
            setNewMessage(true);
            setShow(true);
            if(chat.length>0){
                const m = playertable.chat.messages[playertable.chat.messages.length - 1];
                setNewMessageData(m);
                characterToSpeech(m);
            }
        }
        updateChat(playertable.chat.messages);
    }

    function getIdByUsername(user){
        return playertable.players.filter(player => player.user === user);
    }


    async function characterToSpeech(message){
        const playerID = getIdByUsername(message.name);

        let character_response = await authApi().get(`/games/${playertable.id}/players/${playerID[0].id}/characters`);
        const characterName = character_response.data.name;

        /*  const voices=["en-PH-JamesNeural", "en-US-GuyNeural", "en-GB-LibbyNeural", "en-IE-ConnorNeural", "en-CA-LiamNeural", "en-IN-PrabhatNeural", "en-AU-NatashaNeural"];
            const characters=["elgringo", "willythekid", "rosedoolan", "paulregret", "jourdonnais", "bartcassidy", "suzylafayette"]; */
        let voice = "";
        switch(characterName){
            case "elgringo":
                voice = "en-PH-JamesNeural";
                break;
            case "willythekid":
                voice = "en-US-GuyNeural";
                break;
            case "rosedoolan":
                voice = "en-GB-LibbyNeural";
                break;
            case "paulregret":
                voice = "en-IE-ConnorNeural";
                break;
            case "jourdonnais":
                voice = "en-CA-LiamNeural";
                break;
            case "bartcassidy":
                voice = "en-IN-PrabhatNeural";
                break;
            case "suzylafayette":
                voice = "en-AU-NatashaNeural";
                break;
        }
        if (!muteChat){
            synthesizeSpeech(voice, message.content);
        }
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

    return (<Container hidden={visibility} fluid className="background_container">
        <Row>
            <Col>
                <OpponentDeckWide opponent={playerList[4]} player={playerList[0]}
                                  playeronturn={playertable.playerOnTurn}
                                  playertable={playertable} border={border} updateBorder={updateBorder}
                                  updateCard_played={updateCard_played}
                                  hideCancel_PlayCard={hideCancel_PlayCard}
                                  updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                                  ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange}
                                  targetSelf={targetSelf}
                                  updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone}
                                  updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies}
                                  updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                                  targetNotSheriff={targetNotSheriff} updateTargetNotSheriff={updateTargetNotSheriff}
                                  updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array}
                                  updateFill_array={updateFill_array}
                                  newGameMoves={newGameMoves}/>
            </Col>
            <Col>
                <OpponentDeckWide opponent={playerList[3]} player={playerList[0]}
                                  playeronturn={playertable.playerOnTurn}
                                  playertable={playertable} border={border} updateBorder={updateBorder}
                                  updateCard_played={updateCard_played}
                                  hideCancel_PlayCard={hideCancel_PlayCard}
                                  updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                                  ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange}
                                  targetSelf={targetSelf}
                                  updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone}
                                  updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies}
                                  updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                                  targetNotSheriff={targetNotSheriff} updateTargetNotSheriff={updateTargetNotSheriff}
                                  updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array}
                                  updateFill_array={updateFill_array}
                                  newGameMoves={newGameMoves}/>
            </Col>
            <Col>
                <OpponentDeckWide opponent={playerList[2]} player={playerList[0]}
                                  playeronturn={playertable.playerOnTurn}
                                  playertable={playertable} border={border} updateBorder={updateBorder}
                                  updateCard_played={updateCard_played}
                                  hideCancel_PlayCard={hideCancel_PlayCard}
                                  updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                                  ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange}
                                  targetSelf={targetSelf}
                                  updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone}
                                  updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies}
                                  updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                                  targetNotSheriff={targetNotSheriff} updateTargetNotSheriff={updateTargetNotSheriff}
                                  updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array}
                                  updateFill_array={updateFill_array}
                                  newGameMoves={newGameMoves}/>
            </Col>
        </Row>
        <br/>
        <Row className="align-items-center">
            <Col xs={5}>
                <OpponentDeckWide opponent={playerList[5]} player={playerList[0]}
                                  playeronturn={playertable.playerOnTurn}
                                  playertable={playertable} border={border} updateBorder={updateBorder}
                                  updateCard_played={updateCard_played}
                                  hideCancel_PlayCard={hideCancel_PlayCard}
                                  updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                                  ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange}
                                  targetSelf={targetSelf}
                                  updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone}
                                  updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies}
                                  updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                                  targetNotSheriff={targetNotSheriff} updateTargetNotSheriff={updateTargetNotSheriff}
                                  updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array}
                                  updateFill_array={updateFill_array}
                                  newGameMoves={newGameMoves}/>
            </Col>
            <Col>{playertable.gameStatus == "ENDED" ? (
                <>
                    <p hidden={true}>nothing to see here</p>
                </>
            ) : (
                <DeckDiscardPiles playertable={playertable} playeronturn={playertable.playerOnTurn}
                                  hideCancel_PlayCard={hideCancel_PlayCard}/>
            )}
            </Col>
            <Col xs={5}>
                <OpponentDeckWide opponent={playerList[1]} player={playerList[0]}
                                  playeronturn={playertable.playerOnTurn}
                                  playertable={playertable} border={border} updateBorder={updateBorder}
                                  updateCard_played={updateCard_played}
                                  hideCancel_PlayCard={hideCancel_PlayCard}
                                  updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                                  ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange}
                                  targetSelf={targetSelf}
                                  updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone}
                                  updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies}
                                  updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                                  targetNotSheriff={targetNotSheriff} updateTargetNotSheriff={updateTargetNotSheriff}
                                  updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array}
                                  updateFill_array={updateFill_array}
                                  newGameMoves={newGameMoves}/>
            </Col>
        </Row>
        <br/>
        <Row className="h-25">
            <Col hidden={displayChat}>
                <ChatPopUp chatMessages={chat} player={player} playertable={playertable} height={300} width={300}/>
            </Col>
            <Col style={{backgroundColor: "none", opacity: 0.8, marginBottom: 10, marginTop: 10}}
                 hidden={!displayChat}>

                <Toast show={newMessage && show} onClose={() => setShow(false)} delay={2000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">{newMessageData.name}</strong>
                    </Toast.Header>
                    <Toast.Body>{newMessageData.content}</Toast.Body>
                </Toast>
            </Col>
            <Button variant="outline-dark" size="lg" style={{height: 50, marginTop: 50}} onClick={() => {
                setDisplayChat(!displayChat)
            }}>
                Chat
            </Button>
            <Col xs={5}>
                <PlayerDeck player={player} playeronturn={playertable.playerOnTurn} playertable={playertable}
                            border={border} updateBorder={updateBorder} updateCard_played={updateCard_played}
                            hideCancel_PlayCard={hideCancel_PlayCard}
                            updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                            ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange} targetSelf={targetSelf}
                            updateTargetSelf={updateTargetSelf} targetEveryone={targetEveryone}
                            updateTargetEveryone={updateTargetEveryone} targetOnlyEnemies={targetOnlyEnemies}
                            updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                            targetNotSheriff={targetNotSheriff} updateTargetNotSheriff={updateTargetNotSheriff}
                            updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array}
                            updateFill_array={updateFill_array}
                            newGameMoves={newGameMoves}
                            orderarray={orderarray} show_characterDisplay={show_characterDisplay}
                            updateShow_characterDisplay={updateShow_characterDisplay}/>
            </Col>
            <Row className="h-25">
                <Button variant="outline-dark" size="lg" style={{height: 50, marginTop: 50, marginLeft: 10}} onClick={() => {
                    setDisplayGameLog(!displayGameLog)
                }}>
                    History
                </Button>
                <Col hidden={displayGameLog} style={{width: 300}}>
                    <GameMovesPopUp gamemoves={reversedGameMoves} height={200} width={300}/>
                </Col>
                <Col style={{backgroundColor: "none", opacity: 0.8, minWidth: 300, marginTop: 10}}
                     hidden={!displayGameLog}>
                </Col>
            </Row>        </Row>
        <Row className="align-items-center">
            <Col/>
            <Col xs={7}>{playertable.gameStatus == "ENDED" ? (
                <>
                    <p hidden={endOfGame || visibility} className="winner-message"><b>{winnerMessage}</b></p>
                </>
            ) : (
                <PlayerCards playeronturn={playertable.playerOnTurn} playertable={playertable} player={player}
                             updateBorder={updateBorder} card_played={card_played} updateCard_played={updateCard_played}
                             hideCancel_PlayCard={hideCancel_PlayCard}
                             updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                             updateCurr_card={updateCurr_card} curr_card={curr_card} fill_array={fill_array}
                             updateFill_array={updateFill_array} roleinformation={roleinformation}/>
            )}

            </Col>
            <Col>
                <Button id="biggerbutton" size="lg" variant="dark" hidden={hideCancel_PlayCard} onClick={back}>Cancel</Button>
            </Col>
        </Row>
    </Container>);
}

export default Layout6players;