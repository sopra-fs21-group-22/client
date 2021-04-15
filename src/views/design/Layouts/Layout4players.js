import { Col, Row, Container, Card, ListGroup, ListGroupItem, CardDeck, Button, Modal, Image, ModalBody } from 'react-bootstrap';
import OpponentDeck from "../OpponentDeck";
import PlayerDeck from "../PlayerDeck";
import PlayerCards from "../PlayerCards";
import DeckDiscardPiles from "../DeckDiscardPiles";

// function Layout4players({playertable, orderarray, visibility}){
function Layout4players({visibility}){
    return (<Container hidden={visibility}>
        <Row>
            <Col/>
            <Col>
                {/*<OpponentDeck opponent={orderarray[2]}/>*/}
                <OpponentDeck opponent={null}/>
            </Col>
            <Col/>
        </Row>
        <Row>
            <Col>
                {/*<OpponentDeck opponent={orderarray[3]}/>*/}
                <OpponentDeck opponent={null}/>
            </Col>
            <Col>
                {/*<DeckDiscardPiles playertable={playertable}/>*/}
                <DeckDiscardPiles/>
            </Col>
            <Col>
                {/*<OpponentDeck opponent={orderarray[1]}/>*/}
                <OpponentDeck opponent={null}/>
            </Col>
        </Row>
        <Row>
            <Col/>
            <Col>
                {/*<PlayerDeck player={orderarray[0]}/>*/}
                <PlayerDeck player={null}/>
            </Col>
            <Col/>
        </Row>
        <Row>
            <Col/>
            <Col xs={8}>
                {/*<PlayerCards player={orderarray[0]}/>*/}
                <PlayerCards player={null}/>
            </Col>
            <Col/>
        </Row>
    </Container>);
}
export default Layout4players;