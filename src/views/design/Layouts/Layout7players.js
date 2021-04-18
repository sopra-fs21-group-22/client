import { Col, Row, Container, Card, ListGroup, ListGroupItem, CardDeck, Button, Modal, Image, ModalBody } from 'react-bootstrap';
import OpponentDeck from "../OpponentDeck";
import PlayerDeck from "../PlayerDeck";
import PlayerCards from "../PlayerCards";
import DeckDiscardPiles from "../DeckDiscardPiles";

// function Layout4players({playertable, orderarray, visibility}){
function Layout7players({visibility}){
    return (<Container hidden={visibility}>
        <Row>
            <Col/>
            <Col>
                {/*<OpponentDeck opponent={orderarray[4]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateborder={setBorder} setCard_played={setCard_played}/>*/}
                <OpponentDeck opponent={null}/>
            </Col>
            <Col>
                {/*<OpponentDeck opponent={orderarray[3]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateborder={setBorder} setCard_played={setCard_played}/>*/}
                <OpponentDeck opponent={null}/>
            </Col>
            <Col/>
        </Row>
        <Row>
            <Col>
                {/*<OpponentDeck opponent={orderarray[5]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateborder={setBorder} setCard_played={setCard_played}/>*/}
                <OpponentDeck opponent={null}/>
            </Col>
            <Col>
                {/*<DeckDiscardPiles playertable={playertable}/>*/}
                <DeckDiscardPiles/>
            </Col>
            <Col>
                {/*<OpponentDeck opponent={orderarray[2]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateborder={setBorder} setCard_played={setCard_played}/>*/}
                <OpponentDeck opponent={null}/>
            </Col>
        </Row>
        <Row>
            <Col>
                {/*<OpponentDeck opponent={orderarray[6]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateborder={setBorder} setCard_played={setCard_played}/>*/}
                <OpponentDeck opponent={null}/>
            </Col>
            <Col/>
            <Col>
                {/*<OpponentDeck opponent={orderarray[1]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateborder={setBorder} setCard_played={setCard_played}/>*/}
                <OpponentDeck opponent={null}/>
            </Col>
        </Row>
        <Row>
            <Col/>
            <Col>
                {/*<PlayerDeck player={orderarray[0]} playeronturn={playertable.playerOnTurn} playertable={playertable} border={border} updateborder={setBorder} setCard_played={setCard_played}/>*/}
                <PlayerDeck player={null}/>
            </Col>
            <Col/>
        </Row>
        <Row>
            <Col/>
            <Col xs={8}>
                {/*<PlayerCards player={orderarray[0]} updateborder={setBorder} card_played={card_played} setCard_played={setCard_played}/>*/}
                <PlayerCards player={null}/>
            </Col>
            <Col/>
        </Row>
    </Container>);
}
export default Layout7players;