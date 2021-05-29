import React, {useState} from "react";
import {Container, Row, Col, Image, Modal, Button} from "react-bootstrap";
import "./styling/playing_field_styling.css";

export default function DeckDiscardPiles({playertable, playeronturn, hideCancel_PlayCard}){

    const [show_discardPile, setShow_discardPile] = useState(false);

    function getTopDiscardCard() {
        if (playertable.discardPile.topCard) {
            const curr = playertable.discardPile.topCard;
            return `/images/play_cards/${curr.color}_${curr.card}_${curr.suit}_${curr.rank}.png`
        }
    }
    function lookAtPile() {
        if (hideCancel_PlayCard) {
            setShow_discardPile(true);
        }
    }
    function closeDiscardPile() {
        setShow_discardPile(false);
    }

    return (
        <Container className="deck-discard-pile">
            <Row>
                <Col>
                    {/*always remains the back, so no changes TODO: change if shuffle is implemented*/}
                    <Image className="deck-discard-pile_image-card" src="/images/back.png"/>
                </Col>
                <Col>
                    {playertable.discardPile.amountCards > 0 ? (
                        <Image
                            onClick={lookAtPile}
                            className="deck-discard-pile_image-card"
                            src={getTopDiscardCard()}/>
                    ):null}
                    {/*<Image className="deck-discard-pile_image-card" src="/images/back.png"/>*/}
                </Col>
            </Row>
            {<Modal show={show_discardPile} centered animation size="m" rootClose animation>
                <Modal.Header id="chosen-role_modal_header">
                    <Modal.Title id="chosen-role_modal_header_title" centered><b>Discard Pile</b></Modal.Title>
                </Modal.Header>
                <Modal.Body id="chosen-role_modal_body" centered>
                    <Image
                        src={getTopDiscardCard()}
                        id="chosen-role_modal_body_image"/>
                </Modal.Body>
                <Modal.Footer id="chosen-role_modal_footer">
                    <Button id="custombutton" onClick={closeDiscardPile}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>}
        </Container>
    )
}