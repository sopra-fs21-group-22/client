import React, {useState} from "react";
import {Container, Row, Col, Image, Modal, Button, Card} from "react-bootstrap";
import "./styling/playing_field_styling.css";
import "./styling/lobby_styling.css";
import "../../views/design/styling/custom_button_styling.css";
import useInterval from "../../components/game/useInterval.js";


export default function PlayerCards({ player_table, player, updateBorder, card_played, updateCard_played, updateHideCancel_PlayCard,
    updateM, m}){
    
    /*const interval = useInterval(async () => {
        
    }, 1000);*/
    
    const [show_card, setShow_card] = useState(false);
    
    const [playcard_disabled, setPlaycard_disabled] = useState(false);
    function lookAtCard(){
        //if (player_table.playerOnTurn === player){
            setShow_card(true);
        //}
    }
    
    function closeCard(){
        setShow_card(false);
    }

    //maybe useful somewhere else...
    /*function waitsometime() {
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

    async function playCard(){
        updateM("Beer");
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
                    <Image className="deck-discard-pile_image-card" src="/images/back.jpeg"/>
                </Col>
                {/*{player.hand.getPlayCards.map(currCard => (*/}
                {/*    <Col>*/}
                {/*        <Image className="deck-discard-pile_image-card" src={`/images/${currCard.getId()}.jpeg`}/>*/}
                {/*    </Col>*/}
                {/*))}*/}
                <Col>
                    <Image className="deck-discard-pile_image-card" src="/images/back.jpeg"/>
                </Col>
                <Col>
                    <Image className="deck-discard-pile_image-card" src="/images/back.jpeg"/>
                </Col>
                <Col>
                    <Image className="deck-discard-pile_image-card" src="/images/back.jpeg"/>
                </Col>
                <Col>
                    <Image className="deck-discard-pile_image-card" src="/images/back.jpeg"/>
                </Col>
                <Col>
                    <Image hidden={card_played} className="deck-discard-pile_image-card" src="/images/back.jpeg" onClick={lookAtCard}/>
                </Col>
            </Row>

            {<Modal show={show_card} centered animation size="sm" rootClose animation>
                <Modal.Header id="chosen-role_modal_header">
                    <Modal.Title id="chosen-role_modal_header_title" centered><b>Play or Return</b></Modal.Title>
                </Modal.Header>
                <Modal.Body id="chosen-role_modal_body" centered>
                    <Image src="/images/back.jpeg" id="chosen-role_modal_body_image"/>
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