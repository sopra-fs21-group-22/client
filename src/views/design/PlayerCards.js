import React, {useState} from "react";
import {Container, Row, Col, Image, Modal, Button, Card} from "react-bootstrap";
import "./styling/playing_field_styling.css";
import "./styling/lobby_styling.css";
import "../../views/design/styling/custom_button_styling.css";
import useInterval from "../../components/game/useInterval.js";
import {authApi} from "../../helpers/api";


export default function PlayerCards({
                                        playeronturn,
                                        playertable,
                                        player,
                                        updateBorder,
                                        card_played,
                                        updateCard_played,
                                        updateHideCancel_PlayCard,
                                        updateCurr_card,
                                        curr_card,
                                        fill_array,
                                        updateFill_array
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

    // const [show_card, setShow_card] = useState(false);

    const [show_card, setShow_card] = useState([]);
    const [curr_card_image_source, setCurr_card_image_source] = useState();

    const [playcard_disabled, setPlaycard_disabled] = useState(false);

    // function lookAtCard(){
    //     if (playertable.playerOnTurn === player){
    //         setShow_card(true);
    //     }
    // }

    function lookAtCard(index) {
        if (playeronturn.id != player.id) {
            alert("it ain't your turn buddy");
            return;
        }
        if (curr_card != null) {
            alert("you already chose a card to play. press cancel to play another card.");
            return;
        }
        let curr = show_card;
        curr[index] = true;
        setShow_card(curr);
        getImageSource();
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

    function playCard() {
        //TODO: disable other player cards while choosing a target
        updateBorder("solid");
        updateHideCancel_PlayCard(false);
        updateFill_array(true);
    }

    function discardCard() {
        authApi().delete(`/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}`);
        updateCurr_card(null);
        updateFill_array(true);
    }


    return (
        <>
            <Container className="shelf">
                <Row>
                    <Col className="single-shelf">
                        <Image className="deck-discard-pile_image-card"
                               src={`/images/role_cards/${player.gameRole}.png`}/>
                        {/*<Image className="deck-discard-pile_image-card" src="/images/back.png"/>*/}
                    </Col>
                    {player.hand.playCards.map((currCard, index) => (
                        <Col>
                            <Image className="deck-discard-pile_image-card"
                                   src={`/images/play_cards/${currCard.color}_${currCard.card}_${currCard.suit}_${currCard.rank}.png`}
                                   onClick={() => lookAtCard(index)}/>
                            {<Modal show={show_card[index]} centered animation size="sm" backdrop="static"
                                    keyboard={false}>
                                <Modal.Header id="chosen-role_modal_header">
                                    <Modal.Title id="chosen-role_modal_header_title" centered><b>Play or
                                        Return</b></Modal.Title>
                                </Modal.Header>
                                <Modal.Body id="chosen-role_modal_body" centered>
                                    <Image src={curr_card_image_source} id="chosen-role_modal_body_image"/>
                                </Modal.Body>
                                <Modal.Footer id="chosen-role_modal_footer">
                                    <Button variant="danger" onClick={discardCard}>Discard</Button>
                                    <Button id="custombutton" onClick={closeCard}>
                                        Return
                                    </Button>
                                    <Button id="custombutton" onClick={playCard} disabled={playcard_disabled}>
                                        Play
                                    </Button>
                                </Modal.Footer>
                            </Modal>}
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}