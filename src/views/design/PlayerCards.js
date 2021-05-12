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

    }, 2000);
    
    // const [show_card, setShow_card] = useState(false);

    const [show_card, setShow_card] = useState([]);
    const [curr_card_image_source, setCurr_card_image_source] = useState();
    const [show_duplicateBlueCard, setShow_duplicateBlueCard] = useState(false);

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


    function searchForOn_FieldCards(cardtobefound){
        if (player.onFieldCards.onFieldCards.length==0){
            return false;
        }
        let x;
        for (x of player.onFieldCards.onFieldCards){
            if (x.card==cardtobefound){
                return true;
            }
        }
        return false;
    }

    function playCard(){

        //TODO: disable other player cards while choosing a target
        
        if (curr_card.card=="BARREL"){
            let inthere = searchForOn_FieldCards("BARREL");
            if (inthere){
                setShow_duplicateBlueCard(true);
                return;
            }
            /*const target_list = ?????;
            const requestBody = JSON.stringify({
                target_list: target_list
            });
            authApi().post(´/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}/target/${player.id}´, requestBody};*/ //TODO: backend ain't ready yet
            updateCurr_card(null);
            updateFill_array(true);
            updateBorder("none");
            return;
        }
        if (curr_card.card=="APPALOOSA" || curr_card.card=="MUSTANG"){
            let inthere = searchForOn_FieldCards("APPALOOSA");
            let inthere2 = searchForOn_FieldCards("MUSTANG");
            if (inthere || inthere2){
                setShow_duplicateBlueCard(true);
                return;
            }
            /*const target_list = ?????;
            const requestBody = JSON.stringify({
                target_list: target_list
            });
            authApi().post(´/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}/target/${player.id}´, requestBody};*/ //TODO: backend ain't ready yet
            updateCurr_card(null);
            updateFill_array(true);
            updateBorder("none");
            return;
        }
        if (curr_card.card=="CARABINE" || curr_card.card=="REMINGTON" || curr_card.card=="SCHOFIELD" || curr_card.card=="VOLCANIC" || curr_card.card=="WINCHESTER"){
            let inthere = searchForOn_FieldCards("CARABINE");
            let inthere2 = searchForOn_FieldCards("REMINGTON");
            let inthere3 = searchForOn_FieldCards("SCHOFIELD");
            let inthere4 = searchForOn_FieldCards("VOLCANIC");
            let inthere5 = searchForOn_FieldCards("WINCHESTER");
            if (inthere || inthere2 || inthere3 || inthere4 || inthere5){
                setShow_duplicateBlueCard(true);
                return;
            }
            /*const target_list = ?????;
            const requestBody = JSON.stringify({
                target_list: target_list
            });
            authApi().post(´/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}/target/${player.id}´, requestBody};*/ //TODO: backend ain't ready yet
            updateCurr_card(null);
            updateFill_array(true);
            updateBorder("none");
            return;
        }
        updateBorder("solid");
        updateHideCancel_PlayCard(false);
        updateFill_array(true);
    }

    function discardCard() {
        authApi().delete(`/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}`);
        updateCurr_card(null);
        updateFill_array(true);
    }

    function dontReplaceCard(){
        setShow_duplicateBlueCard(false);
        updateCurr_card(null);
        updateFill_array(true);
        updateBorder("none");
    }

    function doReplaceCard(){
        /*const target_list = ?????;
        const requestBody = JSON.stringify({
            target_list: target_list
        });
        authApi().post(´/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}/target/${player.id}´, requestBody};*/ //TODO: backend ain't ready yet
        updateCurr_card(null);
        updateFill_array(true);
        updateBorder("none");
        setShow_duplicateBlueCard(false);
    }


    return (
        <>
            <Container className="shelf">
            {!curr_card ? (
                <Modal hidden={show_duplicateBlueCard}>loading</Modal>
            ) : (<>
                {<Modal show={true} centered animation size="sm" backdrop="static" keyboard={false}>
                    <Modal.Header id="chosen-role_modal_header">
                        <Modal.Title id="chosen-role_modal_header_title" centered>
                            <b>you already have a {curr_card.card}</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body id="chosen-role_modal_body" centered>
                        <p>Do you want to replace your {curr_card.card}?</p>
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