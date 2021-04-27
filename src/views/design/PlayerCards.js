import React, {useState} from "react";
import {Container, Row, Col, Image, Modal, Button, Card} from "react-bootstrap";
import "./styling/playing_field_styling.css";
import "./styling/lobby_styling.css";
import "../../views/design/styling/custom_button_styling.css";
import useInterval from "../../components/game/useInterval.js";


export default function PlayerCards({ player_table, player, updateBorder, card_played, updateCard_played, updateHideCancel_PlayCard,
    updateCurr_card, curr_card}){
    
    /*const interval = useInterval(async () => {
        curr = [];
        for (let i of player.hand.playCards) {
            curr.push(false);
        }
        setShow_card(curr);
    }, 1000);*/
    
    const [show_card, setShow_card] = useState(false);

    //const [show_card, setShow_card] = useState([]);
    //const [curr_card_image_source, setCurr_card_image_source] = useState();
    
    const [playcard_disabled, setPlaycard_disabled] = useState(false);

    function lookAtCard(){
        //if (player_table.playerOnTurn === player){
            setShow_card(true);
        //}
    }

    /* function lookAtCard(index){
            curr = show_card;
            curr[index] = true;
            setShow_card(curr);
            getImageSource();
    }*/
    
    function closeCard(){
        //TODO set all entries to false once card has been closed
        updateCurr_card(null);
        setShow_card(false);
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
    }*/}

    // function getImageSource(){
    //     for (let i of show_card) {
    //         if (show_card[i]) {
    //             setCurr_card_image_source(player.hand.playCards[i].imageSource);
    //             updateCurr_card(player.hand.playCards[i]);
    //         }
    //     }
    // }

    async function playCard(){
        updateCurr_card("Beer");//TODO REMOVE THIS WHEN NOT TESTING
        setShow_card(false);
        updateBorder("solid");
        updateHideCancel_PlayCard(false);
    }


    return (
        <>
        <Container className="shelf">
            <Row>
                <Col className="single-shelf">
                    {/*<Image className="deck-discard-pile_image-card" src={`/images/role_cards/${player.gameRole}.jpeg`}/>*/}
                    <Image className="deck-discard-pile_image-card" src="/images/back.png"/>
                </Col>
                {/*{player.hand.playCards.map((currCard, index) => (*/}
                {/*    <Col>*/}
                {/*        <Image className="deck-discard-pile_image-card" src={`/images/play_cards/${currCard.color}
                            _${currCard.card}_${currCard.suit}_${currCard.rank}.png`} onClick={lookAtCard(index)}/>*/}
                            {/*{<Modal show={show_card[index]} centered animation size="sm" rootClose animation>*/}
                            {/*    <Modal.Header id="chosen-role_modal_header">*/}
                            {/*        <Modal.Title id="chosen-role_modal_header_title" centered><b>Play or Return</b></Modal.Title>*/}
                            {/*    </Modal.Header>*/}
                            {/*    <Modal.Body id="chosen-role_modal_body" centered>*/}
                            {/*        <Image src={curr_card_image_source} id="chosen-role_modal_body_image"/>*/}
                            {/*    </Modal.Body>*/}
                            {/*    <Modal.Footer id="chosen-role_modal_footer">*/}
                            {/*        <Button id="custombutton" onClick={closeCard}>*/}
                            {/*            Return*/}
                            {/*        </Button>*/}
                            {/*        <Button id="custombutton" onClick={playCard} disabled={playcard_disabled}>*/}
                            {/*            Play*/}
                            {/*        </Button>*/}
                            {/*    </Modal.Footer>*/}
                            {/*</Modal>}*/}
                {/*    </Col>*/}
                {/*))}*/}
                <Col>
                    <Image className="deck-discard-pile_image-card" src="/images/back.png"/>
                </Col>
                <Col>
                    <Image className="deck-discard-pile_image-card" src="/images/back.png"/>
                </Col>
                <Col>
                    <Image className="deck-discard-pile_image-card" src="/images/back.png"/>
                </Col>
                <Col>
                    <Image className="deck-discard-pile_image-card" src="/images/back.png"/>
                </Col>
                <Col>
                    <Image hidden={card_played} className="deck-discard-pile_image-card" src="/images/back.png" onClick={lookAtCard}/>
                </Col>
            </Row>

            {<Modal show={show_card} centered animation size="sm" rootClose animation>
                <Modal.Header id="chosen-role_modal_header">
                    <Modal.Title id="chosen-role_modal_header_title" centered><b>Play or Return</b></Modal.Title>
                </Modal.Header>
                <Modal.Body id="chosen-role_modal_body" centered>
                    <Image src="/images/back.png" id="chosen-role_modal_body_image"/>
                </Modal.Body>
                <Modal.Footer id="chosen-role_modal_footer">
                    <Button id="custombutton" onClick={closeCard}>
                        Return
                    </Button>
                    <Button id="custombutton" onClick={playCard} disabled={playcard_disabled}>
                        Play
                    </Button>
                </Modal.Footer>
            </Modal>}
        </Container>
        </>
    )
}