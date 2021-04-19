import React, {useState} from "react";
import {Container, Row, Col, Image, Modal, Button, Card} from "react-bootstrap";
import "./styling/playing_field_styling.css";
import "./styling/lobby_styling.css";
import "../../views/design/styling/custom_button_styling.css";
import useInterval from "../../components/game/useInterval.js";


export default function PlayerCards({ player_table, player, updateborder, card_played, setCard_played, setShowCancelPlayCard, hideCancel_PlayCard, setHideCancel_PlayCard,
     ignoreRange, setIgnoreRange, targetSelf, setTargetSelf, targetEveryone, setTargetEveryone, targetOnlyEnemies, setTargetOnlyEnemies}){
    
    const interval = useInterval(async () => {    
        console.log(selectedCard);
        
    }, 100);
    function lookAtCard(){
        //if (player_table.playerOnTurn === player){
            setShow_card(true);
        //}
    }
    
    function closeCard(){
        setShow_card(false);
    }

    async function setupTargetHighlighting(){
        switch(selectedCard){
            case "Beer":
            case "StageCoach":
            case "WellsFargo":
                setTargetSelf(true);
                break;
            case "Indians":
            case "Catling":
            case "Bang":
            case "Duel":
            case "Panic":
                setTargetOnlyEnemies(true);
                break;
            case "CatBalou":
                setTargetOnlyEnemies(true);
                setIgnoreRange(true);
                break;
            case "Saloon":
            case "GeneralStore":
                setTargetEveryone(true);
                break;
        }
    }

    async function playCard(){
        setSelectedCard("Beer"); 
        console.log(selectedCard);
        setupTargetHighlighting();
        /*
        if(selectedCard.class=="Beer" || selectedCard.class=="Beer") //TODO: need some sort of intelligent implementation to figure out what kind of card it is
        set
        */
        setShow_card(false);
        updateborder("solid");
        setHideCancel_PlayCard(false);
        console.log(selectedCard);
        console.log(targetSelf);

    }
    

    const [show_card, setShow_card] = useState(false);
    
    const [playcard_disabled, setPlaycard_disabled] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    return (
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
    )
}