import { Col, Row, Container, Card, ListGroup, ListGroupItem, CardDeck, Button, Modal, Image, ModalBody } from 'react-bootstrap';
import OpponentDeck from "../OpponentDeck";
import PlayerDeck from "../PlayerDeck";
import PlayerCards from "../PlayerCards";
import DeckDiscardPiles from "../DeckDiscardPiles";

function Layout4players({hidden_gamefield}){
    return (<Container hidden={hidden_gamefield}>
        <Row>
            <Col/>
            <Col>
                <OpponentDeck opponent={null}/>
            </Col>
            <Col/>
        </Row>
        <Row>
            <Col>
                <OpponentDeck opponent={null}/>
            </Col>
            <Col>
                <DeckDiscardPiles/>
            </Col>
            <Col>
                <OpponentDeck opponent={null}/>
            </Col>
        </Row>
        <Row>
            <Col/>
            <Col>
                <PlayerDeck player={null}/>
            </Col>
            <Col/>
        </Row>
        <Row>
            <Col/>
            <Col xs={8}>
                <PlayerCards player={null}/>
            </Col>
            <Col/>
        </Row>
    </Container>);
}
export default Layout4players;