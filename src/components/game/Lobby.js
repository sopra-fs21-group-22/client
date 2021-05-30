import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../helpers/layout';
import {api, authApi, handleError} from '../../helpers/api';
import Player from '../../views/Player';
import {Spinner} from '../../views/design/Spinner';
import {withRouter, useHistory, Link, useRouteMatch,} from 'react-router-dom';
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
    ModalBody,
    ProgressBar
} from 'react-bootstrap';
import UserStatus from '../../views/design/UserStatus';
import "../../views/design/styling/lobby_styling.css";
import "../../views/design/styling/playing_field_styling.css";
import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import PlayerModel from '../shared/models/PlayerModel';
import User from '../shared/models/User';
import PlayerTable from '../shared/models/PlayerTable';
import ReactDOM from 'react-dom';
import App from '../../App';
import useInterval from "../game/useInterval.js";
import LayoutSwitcher from '../game/LayoutSwitcher';
import {forEach} from "react-bootstrap/ElementChildren";
import "../../views/design/styling/custom_button_styling.css";
import QuickGuide from "../../views/design/QuickGuide";

function Lobby({
                   currUser,
                   currPlayer_table,
                   updatePlayer_table,
                   orderArray,
                   updateOrderArray,
                   currPlayer,
                   updateCurrPlayer,
                   updatePlayerId,
                   updateTableId
               }) {
    const history = useHistory();
    /* const [count, setCount] = useState(0); */
    const [firstTurn, setFirstTurn] = useState(true);
    const [playeramount, setPlayeramount] = useState();
    const [toomanycards, setToomanycards] = useState("loading");
    const [timer, setTimer] = useState(100);
    const [reversedGameMoves, setReversedGameMoves] = useState();
    const interval = useInterval(async () => {
        //repeating requests to keep player_table and player up to date

        const response = await authApi().get(`/games/${JSON.parse(localStorage.getItem("playertableid"))}/players/${JSON.parse(localStorage.getItem("playerid"))}`);
        let currp = new PlayerModel(response.data);
        updateCurrPlayer(currp);


        //get information about the other players
        const playertable_response = await authApi().get(`/games/${JSON.parse(localStorage.getItem("playertableid"))}/players`);
        let currPt = new PlayerTable(playertable_response.data);
        updatePlayer_table(currPt);
        setToomanycards(currp.hand.playCards.length - currp.bullets);
        setReversedGameMoves(currPt.gameMoves.slice().reverse());

        if (currPlayer_table != null && currPlayer != null) {
            correctOrder();
            setPlayeramount(currPlayer_table.players.length);
            setupRole();
        }


        let currentlength = currPt.gameMoves.length;
        let pastlength = gameMoves.length;
        if (currPt.gameMoves.length != 0) {
            if (gameMoves.length != currPt.gameMoves.length) {
                let gamemovelist = []
                for (let i = 0; i < currPt.gameMoves.length - gameMoves.length; i++) {
                    gamemovelist.push(currPt.gameMoves[i]);
                }
                setNewGameMoves(gamemovelist);
            } else {
                setNewGameMoves([]);
            }
        }
        setGameMoves(currPt.gameMoves);
        if (endOfGame) {
            for (let i = 0; i < currPt.gameMoves.length; i++) {
                if (currPt.gameMoves[i].action == "WIN") {
                    setWinnerMessage(currPt.gameMoves[i].message);
                    setEndOfGame(false);
                }
                ;

            }
        }


        if (currPt.gameStatus != "ENDED") {
            //this stops once the game starts
            if (firstTurn) {
                if (currPt.gameStatus === "ONGOING") {
                    localStorage.setItem("cards", JSON.stringify(currp.hand.playCards));
                    setFirstTurn(false);
                }
            }

            //start of user turn
            if (startofturn) {
                if (currPt.playerOnTurn.id === currp.id) {
                    const beforeDrawingCards = JSON.parse(localStorage.getItem("cards"));
                    const afterDrawingCards = currp.hand.playCards;
                    const newCards = getNewCards(beforeDrawingCards, afterDrawingCards);
                    if (newCards.length > 0) {
                        setCards(newCards);
                    }
                    setStartofturn(false);
                }
            }
            //time limit
            if (timer != 0 && currPt.playerOnTurn.id == currp.id) {
                setTimer(timer - 1);
            }

            if (timer == 0) {
                setTimer(100);
            }

        }


        /* setCount(count + 1); */


    }, 3000);

    const [newGameMoves, setNewGameMoves] = useState([]);
    const [gameMoves, setGameMoves] = useState([]);

    const [endOfGame, setEndOfGame] = useState(true);
    const [winnerMessage, setWinnerMessage] = useState();

    const [muteChat, setMuteChat] = useState(false);

    useEffect(async () => {
        try {
            /*const userData = JSON.parse(localStorage.getItem('player_table'));
            if (userData == null) {
                return
            }*/
            /*const currentPlayer_table = new PlayerTable(userData);
            updatePlayer_table(currentPlayer_table);*/

            /*const response = await authApi().get(`/games/${currPlayer_table.id}/players/${currUser.id}`);
            let currpl = new PlayerModel(response.data);
            updateCurrPlayer(currpl);*/
            //localStorage.setItem('player', JSON.stringify(currPlayer));
            //correctOrder();
        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }, []);

    function correctOrder() {
        let current_array = [];
        for (let i = 0; i < currPlayer_table.players.length; i++) {
            if (currPlayer.id === currPlayer_table.players[i].id) {
                current_array[0] = searchbyid(currPlayer.id);
            }
        }
        for (let i = 0; i < currPlayer_table.players.length - 1; i++) {
            current_array[i + 1] = searchbyid(current_array[i].rightNeighbor);
        }
        updateOrderArray(current_array);
    }

    function searchbyid(id) {
        for (let x = 0; x < currPlayer_table.players.length; x++) {
            if (currPlayer_table.players[x].id == id) {
                let a = new PlayerModel(currPlayer_table.players[x]);
                return a;
            }
        }
    }

//Buttons
    function resign() {
        authApi().delete(`/games/${currPlayer_table.id}/players/${currPlayer.id}`);
        localStorage.removeItem("cards");
        localStorage.removeItem("playertable");
        localStorage.removeItem("playerid");
        localStorage.removeItem("playertableid");
        localStorage.removeItem("showrolechoose");
        updateTableId(null);
        updatePlayerId(null);
        updateCurrPlayer(null);
        updateOrderArray(null);
        updatePlayer_table(null);
        history.push("/game/dashboard");
    }

    const chooseRole = () => {
        setShow_rolechoose(false);
        setShow_roledisplay(true);
        let showrolechoose=false;
        localStorage.setItem("showrolechoose", JSON.stringify(showrolechoose));
    }

    function roledisplayokay() {
        setShow_roledisplay(false);
        setHidden_gamefield(false);
        setShow_characterDisplay(true);
    }

    function openRules() {
        setShow_rules(true);
    }

    function closeRules() {
        setShow_rules(false);
    }

    function openGuide() {
        setShow_rules(false);
        setShow_Guide(true);
    }

    function closeGuide() {
        setShow_Guide(false);
    }

    async function endTurn() {
        if (currPlayer.hand.playCards.length > currPlayer.bullets) {
            // if (true){
            setShow_too_many_cards(true);
        } else if (currPlayer.id != currPlayer_table.playerOnTurn.id) {
            alert("can't end your turn if it isn't your turn.")
            return;
        } else {
            localStorage.setItem("cards", JSON.stringify(currPlayer.hand.playCards));
            await authApi().put(`games/${currPlayer_table.id}/players/${currPlayer.id}/turn`);
            setStartofturn(true);
        }
    }

    function too_many_cards_okay() {
        setShow_too_many_cards(false);
    }


//cardrole shinanigans
    function setupRole() {
        let role = currPlayer.gameRole; //TODO: uncomment this once authApi().get('/games/{game_id}/players/{player_id}') is implemented in the backend
        // const role="SHERIFF";
        switch (role) {
            case "SHERIFF":
                setRole_picture_source("/images/role_cards/sheriff.png");
                setRole_icon_source("/images/role_cards/SHERIFF_icon.png");
                setPlayer_role("SHERIFF");
                setRole_information_text("Kill all OUTLAWs and the RENEGADE to win!");
                break;
            case "DEPUTY":
                setRole_picture_source("/images/role_cards/deputy.png");
                setRole_icon_source("/images/role_cards/DEPUTY_icon.png");
                setPlayer_role("DEPUTY");
                setRole_information_text("Kill all OUTLAWs and the RENEGADE to win!");
                break;
            case "OUTLAW":
                setRole_picture_source("/images/role_cards/outlaw.png");
                setRole_icon_source("/images/role_cards/OUTLAW_icon.png");
                setPlayer_role("OUTLAW");
                setRole_information_text("Kill the SHERIFF to win!");
                break;
            case "RENEGADE":
                setRole_picture_source("/images/role_cards/renegade.png");
                setRole_icon_source("/images/role_cards/RENEGADE_icon.png");
                setPlayer_role("RENEGADE");
                setRole_information_text("First kill all OUTLAWs then any DEPUTYs and lastly the SHERIFF to win!");
                break;
            default:
                setRole_picture_source("/images/back.png");
                break;
        }
    }

//highlight role cards
    function addBordertoImage1() {
        setRolecard_border1(5);
        setRolecard_border2(0);
        setRolecard_border3(0);
        setRolecard_border4(0);
        setChoose_rolecard_disabled(false);
    }

    function addBordertoImage2() {
        setRolecard_border1(0);
        setRolecard_border2(5);
        setRolecard_border3(0);
        setRolecard_border4(0);
        setChoose_rolecard_disabled(false);
    }

    function addBordertoImage3() {
        setRolecard_border1(0);
        setRolecard_border2(0);
        setRolecard_border3(5);
        setRolecard_border4(0);
        setChoose_rolecard_disabled(false);
    }

    function addBordertoImage4() {
        setRolecard_border1(0);
        setRolecard_border2(0);
        setRolecard_border3(0);
        setRolecard_border4(5);
        setChoose_rolecard_disabled(false);
    }

//turn starts
    const [startofturn, setStartofturn] = useState(true);
    const [show_drawnCards, setShow_drawnCards] = useState(false);
    const [drawnCards, setDrawnCards] = useState([]);

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
    }

    function setCards(newCards) {
        setDrawnCards(newCards);
        setShow_drawnCards(true);
    }

    function mute() {
        setMuteChat(!muteChat);
    }

/////////////////////////////////////////////////

    const [show_rolechoose, setShow_rolechoose] = useState(true);
    const [show_roledisplay, setShow_roledisplay] = useState(false);
    const [hidden_gamefield, setHidden_gamefield] = useState(true);
    const [show_rules, setShow_rules] = useState(false);
    const [show_Guide, setShow_Guide] = useState(false);

    const [rolecard_border1, setRolecard_border1] = useState(0);
    const [rolecard_border2, setRolecard_border2] = useState(0);
    const [rolecard_border3, setRolecard_border3] = useState(0);
    const [rolecard_border4, setRolecard_border4] = useState(0);
    const [choose_rolecard_disabled, setChoose_rolecard_disabled] = useState(true);
    const [player_role, setPlayer_role] = useState("defaultrole");
    const [role_information_text, setRole_information_text] = useState("default text");
    const [role_picture_source, setRole_picture_source] = useState();
    const [role_icon_source, setRole_icon_source] = useState();
    const [show_too_many_cards, setShow_too_many_cards] = useState(false);

    const role_information = (
        <Popover id="role-info_popover">
            <Popover.Title id="role-info_popover_title"><b>{player_role}</b></Popover.Title>
            <Popover.Content id="role-info_popover_content">
                <Card id="role-info_popover_content_card">
                    <Card.Img id="role-info_popover_content_card_cardimg" variant="top" centered
                              src={role_icon_source}/>
                </Card>
                <br/>
                {role_information_text}
            </Popover.Content>
        </Popover>
    )

    const [show_characterDisplay, setShow_characterDisplay] = useState(false);

    const updateShow_characterDisplay = (value) => {
        setShow_characterDisplay(value);
    }

//use this button to walk through the different layouts
//     async function changelayout() {
//         if (playeramount == 7) {
//             setPlayeramount(4);
//         } else {
//             setPlayeramount(playeramount + 1);
//         }
//     }


    return (
        <>
            <Container fluid className="background_container">
                {!orderArray || !currPlayer || !currPlayer_table ? (
                    <p style={{textAlign: "center"}}><Spinner/><br></br><b>Loading...</b></p>
                    /* ) : ( currPlayer_table.gameStatus == "ENDED" ? (
                        <>
                        <h1>Game Over</h1>
                        <p>{currPlayer.gameRole}</p>
                        <p>{orderArray[0].gameRole}</p>
                        <p>{orderArray[1].gameRole}</p>
                        <p>{orderArray[2].gameRole}</p>
                        <p>{orderArray[3].gameRole}</p>
                        </> */
                ) : (
                    <Container fluid className="background_container">
                        {/* <p>constant updates counter. updates every 5 seconds: {count}</p> */}
                        {/*<Button id="custombutton" onClick={changelayout}>change layout</Button>*/}

                        {<Modal show={show_too_many_cards} centered animation size="sm" backdrop="static"
                                keyboard={false}
                                animation>
                            <Modal.Body id="chosen-role_modal_body" centered>
                                <p>You have {toomanycards} too many card(s).<br></br><br></br> Discard or play some
                                    cards.
                                </p>
                            </Modal.Body>
                            <Modal.Footer id="chosen-role_modal_footer">
                                <Button id="custombutton" onClick={too_many_cards_okay}>
                                    Okay
                                </Button>
                            </Modal.Footer>
                        </Modal>}

                        {<Modal show={show_roledisplay} centered animation size="m" backdrop="static" keyboard={false}
                                animation>
                            <Modal.Header id="chosen-role_modal_header">
                                <Modal.Title id="chosen-role_modal_header_title" centered>
                                    {role_picture_source ? (
                                        <b>Your role is {player_role}</b>
                                    ):null}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body  id="chosen-role_modal_body" centered>
                                {!role_picture_source ? (
                                    <p style={{textAlign:"center"}}><Spinner/><br/><b>Please wait...</b></p>
                                ):(
                                    <>
                                        <Image src={role_picture_source} id="chosen-role_modal_body_image"/>
                                        <br/>
                                        <p style={{textAlign: "center", fontSize: "20px"}}><b>{role_information_text}</b></p>
                                    </>
                                )}
                            </Modal.Body>
                            <Modal.Footer id="chosen-role_modal_footer">
                                <Button hidden={!role_picture_source} id="custombutton" onClick={roledisplayokay}>
                                    Okay
                                </Button>
                            </Modal.Footer>
                        </Modal>}

                        {<Modal show={show_rules} centered size="lg" backdrop="static" keyboard={false} animation>
                            <Modal.Header id="chosen-role_modal_header">
                                <Modal.Title id="chosen-role_modal_header_title" centered><b>Rules</b></Modal.Title>
                            </Modal.Header>
                            <Modal.Body id="chosen-role_modal_body" centered>
                                <Image src="/images/rule_card.png" width={750}/>
                            </Modal.Body>
                            <Modal.Footer id="chosen-role_modal_footer">
                                <a href="http://www.dvgiochi.net/bang/bang_rules.pdf" target="_blank"><Image
                                    src="/images/rules_book.png" width={57}
                                    height={63}
                                    alt="80x100"/>
                                    <figcaption>Learn More</figcaption>
                                </a>
                                <Button variant="dark" onClick={openGuide}>Quick Guide</Button>
                                <Button id="custombutton" onClick={closeRules}>
                                    Okay
                                </Button>
                            </Modal.Footer>
                        </Modal>}

                        {<Modal show={show_Guide} centered animation size="lg" backdrop="static" keyboard={false}
                                animation>
                            <Modal.Header id="chosen-role_modal_header">
                                <Modal.Title id="carousel-header" centered>
                                    Quick Guide
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body  id="chosen-role_modal_body" centered>
                                <QuickGuide/>
                            </Modal.Body>
                            <Modal.Footer id="chosen-role_modal_footer">
                                <Button id="custombutton" onClick={closeGuide}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>}


                        {<Modal id="choose-role_modal" size="lg"
                                show={show_rolechoose && JSON.parse(localStorage.getItem("showrolechoose"))} centered
                                backdrop="static"
                                keyboard={false}
                                animation>
                            <Modal.Header id="choose-role_modal_header">
                                <Modal.Title><b>Choose a role card</b></Modal.Title>
                            </Modal.Header>
                            <Modal.Body id="choose-role_modal_body">
                                <Image id="choose-role_modal_body_row_col_image"
                                       src="/images/role_cards/back_role.png"
                                       onClick={() => addBordertoImage1()}
                                       style={{borderWidth: rolecard_border1}}/>
                                <Image id="choose-role_modal_body_row_col_image"
                                       src="/images/role_cards/back_role.png"
                                       onClick={() => addBordertoImage2()}
                                       style={{borderWidth: rolecard_border2}}/>
                                <Image id="choose-role_modal_body_row_col_image"
                                       src="/images/role_cards/back_role.png"
                                       onClick={() => addBordertoImage3()}
                                       style={{borderWidth: rolecard_border3}}/>
                                <Image id="choose-role_modal_body_row_col_image"
                                       src="/images/role_cards/back_role.png"
                                       onClick={() => addBordertoImage4()}
                                       style={{borderWidth: rolecard_border4}}/>
                            </Modal.Body>
                            <Modal.Footer id="choose-role_modal_footer">
                                <Button id="custombutton" onClick={chooseRole} disabled={choose_rolecard_disabled}>
                                    Choose
                                </Button>
                            </Modal.Footer>
                        </Modal>}

                        {<Modal show={show_drawnCards} centered animation size={drawnCards.length > 1 ? "m" : "sm"} rootClose animation>
                            <Modal.Header id="global_modal_header">
                                <Modal.Title id="global_modal_header_title" centered><b>Drawn
                                    Cards</b></Modal.Title>
                            </Modal.Header>
                            <Modal.Body id="global_modal_body" centered>
                                {drawnCards.length > 1 ? (drawnCards.map((curr) => (
                                    <Image
                                        src={`/images/play_cards/${curr.color}_${curr.card}_${curr.suit}_${curr.rank}.png`}
                                        id="global_modal_body_image"/>
                                ))):(
                                    <p>You drew the <b>DYNAMITE</b> card! It was added to your Player Box automatically.
                                        <br/><br/>
                                        {drawnCards.map((curr) => (
                                            <Image
                                                src={`/images/play_cards/${curr.color}_${curr.card}_${curr.suit}_${curr.rank}.png`}
                                                id="global_modal_body_image"/>
                                        ))}
                                    </p>
                                )}
                            </Modal.Body>
                            <Modal.Footer id="global_modal_footer">
                                <Button id="custombutton" onClick={closeDrawnCards}>
                                    Okay
                                </Button>
                            </Modal.Footer>
                        </Modal>}

                        <LayoutSwitcher playeramount={!playeramount ? -1 : playeramount}
                                        playertable={!currPlayer_table ? 0 : currPlayer_table}
                                        orderarray={!orderArray ? 0 : orderArray}
                                        visibility={hidden_gamefield && JSON.parse(localStorage.getItem("showrolechoose"))}
                                        player={!currPlayer ? 0 : currPlayer}
                                        roleinformation={role_information} newGameMoves={newGameMoves}
                                        muteChat={muteChat} endOfGame={endOfGame} winnerMessage={winnerMessage}
                                        show_characterDisplay={show_characterDisplay} updateShow_characterDisplay={updateShow_characterDisplay}
                                        reversedGameMoves={reversedGameMoves}/>

                        {/*<OverlayTrigger trigger="click" overlay={role_information} rootClose>*/}
                        {/*    <Button id="custombutton">Show role information</Button>*/}
                        {/*</OverlayTrigger>*/}

                        {hidden_gamefield && JSON.parse(localStorage.getItem("showrolechoose")) ? (
                            <p style={{textAlign:"center"}}><Spinner/><br/><b>Waiting for player to pick role...</b></p>
                        ):(
                            <>
                                <Button disabled={currPlayer_table ? currPlayer_table.playerOnTurn.id != currPlayer.id : true}
                                        hidden={currPlayer_table ? currPlayer_table.gameStatus == "ENDED" : true}
                                        onClick={endTurn} id="custombutton">End
                                    Turn</Button>
                                <div className="lobby-divider"/>
                                <Button onClick={openRules} id="custombutton">Rules</Button>
                                <div className="lobby-divider"/>
                                <Button /* style={{height: 50, marginTop: 50}} */ id="custombutton"
                                      onClick={mute}>{muteChat ? "Unmute" : "Mute"}</Button>
                                <div className="lobby-divider"/>
                                {!currPlayer ? (
                                    <p hidden={true}></p>) : (currPlayer.bullets == 0 || currPlayer_table.gameStatus == "ENDED" ? (
                                    <Button onClick={resign} variant="danger">Leave</Button>
                                ) : (
                                    <Button onClick={resign} variant="danger">Resign</Button>
                                ))}
                                <br/><br/>
                                <ProgressBar
                                    hidden={!currPlayer_table || !currPlayer ? true : currPlayer_table.playerOnTurn.id != currPlayer.id || currPlayer_table.gameStatus == "ENDED"}
                                    max={120} now={!currPlayer_table ? 0 : currPlayer_table.timeRemaining / 1000}
                                    variant={"info"}/>
                                <p hidden={!currPlayer_table ? true : currPlayer_table.gameStatus == "ENDED"}>
                                    <b>strikes: {!currPlayer ? 0 : currPlayer.strikes}/3</b></p>
                                <br/>
                            </>
                        )}
                    </Container>


                )}
            </Container>
        </>
    );
}

export default withRouter(Lobby);