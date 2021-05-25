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
    const [playeramount, setPlayeramount] = useState(currPlayer_table.players.length);
    const [toomanycards, setToomanycards] = useState("loading");//TODO uncomment this
    const [timer, setTimer] = useState(100);
    const interval = useInterval(async () => {
        //repeating requests to keep player_table and player up to date

        const response = await authApi().get(`/games/${currPlayer_table.id}/players/${currPlayer.id}`);
        let currp = new PlayerModel(response.data);
        updateCurrPlayer(currp);
        setupRole();

        //get information about the other players
        const playertable_response = await authApi().get(`/games/${currPlayer_table.id}/players`);
        let currPt = new PlayerTable(playertable_response.data);
        updatePlayer_table(currPt);
        setToomanycards(currp.hand.playCards.length - currp.bullets);

        let currentlength = currPt.gameMoves.length;
        let pastlength = gameMoves.length;
        if (currPt.gameMoves.length!=0){
            if(gameMoves.length!=currPt.gameMoves.length){
                let gamemovelist=[]
                for (let i=0; i<currPt.gameMoves.length-gameMoves.length; i++){
                    gamemovelist.push(currPt.gameMoves[i]);
                }
                setNewGameMoves(gamemovelist);
            }
            else{
                setNewGameMoves([]);
            }
        }
        setGameMoves(currPt.gameMoves);



        if(currPt.gameStatus!="ENDED"){
            //this stops once the game starts
            if (firstTurn) {
                if (currPt.gameStatus === "ONGOING") {
                    localStorage.setItem("cards", JSON.stringify(currPlayer.hand.playCards));
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

//Buttons
    function resign() {
        authApi().delete(`/games/${currPlayer_table.id}/players/${currPlayer.id}`);
        localStorage.removeItem("cards");
        updateTableId(null);
        updatePlayerId(null);
        history.push("/game/dashboard");
    }

    const chooseRole = () => {
        setShow_rolechoose(false);
        setShow_roledisplay(true);
    }

    function roledisplayokay() {
        setShow_roledisplay(false);
        setHidden_gamefield(false);
    }

    function openRules() {
        setShow_rules(true);
    }

    function closeRules() {
        setShow_rules(false);
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
                setPlayer_role("Sheriff");
                setRole_information_text("Kill all outlaws and the renegade to win!");
                break;
            case "DEPUTY":
                setRole_picture_source("/images/role_cards/deputy.png");
                setPlayer_role("Deputy");
                setRole_information_text("Kill all outlaws and the renegade to win!");
                break;
            case "OUTLAW":
                setRole_picture_source("/images/role_cards/outlaw.png");
                setPlayer_role("Outlaw");
                setRole_information_text("Kill the sheriff to win!");
                break;
            case "RENEGADE":
                setRole_picture_source("/images/role_cards/renegade.png");
                setPlayer_role("Renegade");
                setRole_information_text("First kill all outlaws then the sheriff to win!");
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

/////////////////////////////////////////////////

    const [show_rolechoose, setShow_rolechoose] = useState(true);
    const [show_roledisplay, setShow_roledisplay] = useState(false);
    const [hidden_gamefield, setHidden_gamefield] = useState(false);
    const [show_rules, setShow_rules] = useState(false);

    const [rolecard_border1, setRolecard_border1] = useState(0);
    const [rolecard_border2, setRolecard_border2] = useState(0);
    const [rolecard_border3, setRolecard_border3] = useState(0);
    const [rolecard_border4, setRolecard_border4] = useState(0);
    const [choose_rolecard_disabled, setChoose_rolecard_disabled] = useState(true);
    const [player_role, setPlayer_role] = useState("defaultrole");
    const [role_information_text, setRole_information_text] = useState("default text");
    const [role_picture_source, setRole_picture_source] = useState();
    const [show_too_many_cards, setShow_too_many_cards] = useState(false);

    const role_information = (
        <Popover id="role-info_popover">
            <Popover.Title id="role-info_popover_title"><b>{player_role}</b></Popover.Title>
            <Popover.Content id="role-info_popover_content">
                <Card id="role-info_popover_content_card">
                    <Card.Img id="role-info_popover_content_card_cardimg" variant="top" centered
                              src={role_picture_source}/>
                </Card>
                {role_information_text}
            </Popover.Content>
        </Popover>
    )

//use this button to walk through the different layouts
//     async function changelayout() {
//         if (playeramount == 7) {
//             setPlayeramount(4);
//         } else {
//             setPlayeramount(playeramount + 1);
//         }
//     }


    return (
        <Container fluid className="background_container">
            {!currPlayer_table || !currPlayer ? (
                <>
                    <Spinner></Spinner>
                    <p>we be loading them data</p>
                </>
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
                <Container fluid className="h-100">
                    {/* <p>constant updates counter. updates every 5 seconds: {count}</p> */}
                    {/*<Button id="custombutton" onClick={changelayout}>change layout</Button>*/}

                    {<Modal show={show_too_many_cards} centered animation size="sm" backdrop="static"
                            keyboard={false}
                            animation>
                        <Modal.Body id="chosen-role_modal_body" centered>
                            <p>You have {toomanycards} too many card(s).<br></br><br></br> Discard some or play some
                                cards.
                            </p>
                        </Modal.Body>
                        <Modal.Footer id="chosen-role_modal_footer">
                            <Button id="custombutton" onClick={too_many_cards_okay}>
                                Okay
                            </Button>
                        </Modal.Footer>
                    </Modal>}

                    {<Modal show={show_roledisplay} centered animation size="sm" backdrop="static" keyboard={false}
                            animation>
                        <Modal.Header id="chosen-role_modal_header">
                            <Modal.Title id="chosen-role_modal_header_title" centered><b>Your
                                role:</b></Modal.Title>
                        </Modal.Header>
                        <Modal.Body id="chosen-role_modal_body" centered>
                            <Image src={role_picture_source} id="chosen-role_modal_body_image"/>
                        </Modal.Body>
                        <Modal.Footer id="chosen-role_modal_footer">
                            <Button id="custombutton" onClick={roledisplayokay}>
                                Okay
                            </Button>
                        </Modal.Footer>
                    </Modal>}

                    {<Modal show={show_rules} centered size="m" backdrop="static" keyboard={false} animation>
                        <Modal.Header id="chosen-role_modal_header">
                            <Modal.Title id="chosen-role_modal_header_title" centered><b>Rules</b></Modal.Title>
                        </Modal.Header>
                        <Modal.Body id="chosen-role_modal_body" centered>
                            <Image src="/images/rule_card.png" width={400} height={258}/>
                        </Modal.Body>
                        <Modal.Footer id="chosen-role_modal_footer">
                            <a href="http://www.dvgiochi.net/bang/bang_rules.pdf" target="_blank"><Image
                                src="/images/rules_book.png" width={57}
                                height={63}
                                alt="80x100"/>
                                <figcaption>Learn More</figcaption>
                            </a>
                            <Button id="custombutton" onClick={closeRules}>
                                Okay
                            </Button>
                        </Modal.Footer>
                    </Modal>}


                    {<Modal id="choose-role_modal" show={show_rolechoose} centered backdrop="static"
                            keyboard={false}
                            animation>
                        <Modal.Header id="choose-role_modal_header">
                            <Modal.Title><b>Choose a role card</b></Modal.Title>
                        </Modal.Header>
                        <Modal.Body id="choose-role_modal_body">
                            <Row>
                                <Col id="choose-role_modal_body_row_col">
                                    <Image id="choose-role_modal_body_row_col_image"
                                           src="/images/role_cards/back_role.png"
                                           onClick={() => addBordertoImage1()}
                                           style={{borderWidth: rolecard_border1}}/>
                                </Col>
                                <Col id="choose-role_modal_body_row_col">
                                    <Image id="choose-role_modal_body_row_col_image"
                                           src="/images/role_cards/back_role.png"
                                           onClick={() => addBordertoImage2()}
                                           style={{borderWidth: rolecard_border2}}/>
                                </Col>
                                <Col id="choose-role_modal_body_row_col">
                                    <Image id="choose-role_modal_body_row_col_image"
                                           src="/images/role_cards/back_role.png"
                                           onClick={() => addBordertoImage3()}
                                           style={{borderWidth: rolecard_border3}}/>
                                </Col>
                                <Col id="choose-role_modal_body_row_col">
                                    <Image id="choose-role_modal_body_row_col_image"
                                           src="/images/role_cards/back_role.png"
                                           onClick={() => addBordertoImage4()}
                                           style={{borderWidth: rolecard_border4}}/>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer id="choose-role_modal_footer">
                            <Button id="custombutton" onClick={chooseRole} disabled={choose_rolecard_disabled}>
                                Choose
                            </Button>
                        </Modal.Footer>
                    </Modal>}

                    {<Modal show={show_drawnCards} centered animation size="sm" rootClose animation>
                        <Modal.Header id="chosen-role_modal_header">
                            <Modal.Title id="chosen-role_modal_header_title" centered><b>Drawn
                                Cards</b></Modal.Title>
                        </Modal.Header>
                        <Modal.Body id="chosen-role_modal_body" centered>
                            {drawnCards.map((curr) => (
                                <Image
                                    src={`/images/play_cards/${curr.color}_${curr.card}_${curr.suit}_${curr.rank}.png`}
                                    id="chosen-role_modal_body_image"/>
                            ))}
                        </Modal.Body>
                        <Modal.Footer id="chosen-role_modal_footer">
                            <Button id="custombutton" onClick={closeDrawnCards}>
                                Okay
                            </Button>
                        </Modal.Footer>
                    </Modal>}

                    <LayoutSwitcher playeramount={playeramount} playertable={currPlayer_table}
                                    orderarray={orderArray}
                                    visibility={hidden_gamefield} player={currPlayer} roleinformation={role_information} newGameMoves={newGameMoves}/>

                    {/*<OverlayTrigger trigger="click" overlay={role_information} rootClose>*/}
                    {/*    <Button id="custombutton">Show role information</Button>*/}
                    {/*</OverlayTrigger>*/}

                    <Button disabled={currPlayer_table.playerOnTurn.id != currPlayer.id}
                            hidden={currPlayer_table.gameStatus == "ENDED"} onClick={endTurn} id="custombutton">End
                        Turn</Button>
                    <Button onClick={openRules} id="custombutton">Rules</Button>
                    {currPlayer_table.gameStatus == "ENDED" ? (
                        <Button onClick={resign} id="custombutton">Leave</Button>
                    ) : (
                        <Button onClick={resign} id="custombutton">Resign</Button>
                    )}
                    <br/>
                    <ProgressBar
                        hidden={currPlayer_table.playerOnTurn.id != currPlayer.id || currPlayer_table.gameStatus == "ENDED"}
                        max={120} now={currPlayer_table.timeRemaining / 1000} variant={"info"}/>
                    <p hidden={currPlayer_table.gameStatus == "ENDED"}><b>strikes: {currPlayer.strikes}/3</b></p>
                    <br/>
                </Container>


            )}
        </Container>
    );
}

export default withRouter(Lobby);