// import useInterval from "../../components/game/useInterval.js";
// import React, {useState, useEffect, useRef} from 'react';
// import {Col, Row, Container, Card, Figure, Image, Button, Modal} from 'react-bootstrap';
// import "./styling/playing_field_styling.css";
// import Life from "./Life";
// import {api, authApi} from '../../helpers/api';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Popover from 'react-bootstrap/Popover';
//
// export default function OpponentDeck({
//                                          opponent,
//                                          player,
//                                          playeronturn,
//                                          border,
//                                          updateBorder,
//                                          playertable,
//                                          updateCard_played,
//                                          updateHideCancel_PlayCard,
//                                          ignoreRange,
//                                          updateIgnoreRange,
//                                          targetSelf,
//                                          updateTargetSelf,
//                                          targetEveryone,
//                                          updateTargetEveryone,
//                                          targetOnlyEnemies,
//                                          updateTargetOnlyEnemies,
//                                          updateCurr_card,
//                                          curr_card,
//                                          fill_array,
//                                          updateFill_array
//                                      }) {
//     const interval = useInterval(async () => {
//         //console.log(`${player.user}: ${player.bullets}`);
//         //repeating requests to keep stuff up-to-date
//         if (playertable.gameStatus!="ENDED"){
//             if (setupCharacter){
//                 let character_response = await authApi().get(`/games/${playertable.id}/players/${opponent.id}/characters`);
//                 setCharacterName(character_response.data.name);
//                 setCharacterDescription(character_response.data.description);
//                 setDisplayName(character_response.data.display);
//                 setSetupCharacter(false);
//             }
//         }
//
//         if (curr_card != null) {
//             setupTargetHighlighting(curr_card);
//         }
//         if (curr_card == null) {
//             updateIgnoreRange(false);
//             updateTargetEveryone(false);
//             updateTargetOnlyEnemies(false);
//             updateTargetSelf(false);
//         }
//
//         if (opponent.bullets>0){
//             let response = await authApi().get(`/games/${playertable.id}/players/${player.id}/targets`);
//             setPlayersInReach(response.data);
//         }
//
//         if (opponent.bullets < 1){
//
//             setOpacity(0.8);
//             setHideDeadmessage(false);
//             setBackgroundColor("#808080");
//             setWidth(0);
//         }
//         if (playeronturn != null && opponent.id === playeronturn.id) {
//             setHighlightImage("solid");
//         }
//         if (playeronturn != null && opponent.id !== playeronturn.id) {
//             setHighlightImage("none");
//         }
//         if (opponent.bullets > 0) {
//             if (!ignoreRange) {
//                 isinreach();
//                 if (!isInReach) {
//                     setWidth(0);
//                 }
//                 if (isInReach) {
//                     setWidth(5);
//                 }
//             }
//             if (targetEveryone && ignoreRange) {
//                 setWidth(5);
//             }
//             if (targetSelf) {
//                 setWidth(0);
//             }
//             if (targetOnlyEnemies && ignoreRange) {
//                 setWidth(5);
//             }
//         }
//         if (searchForOn_FieldCards("BARREL")!=-1){
//             setBarrel(searchForOn_FieldCards("BARREL"));
//         }
//         if (searchForOn_FieldCards("MUSTANG")!=-1){
//             setHorse(searchForOn_FieldCards("MUSTANG"));
//         }
//         if (searchForOn_FieldCards("APPALOOSA")!=-1){
//             setHorse(searchForOn_FieldCards("APPALOOSA"));
//         }
//         if (searchForOn_FieldCards("CARABINE")!=-1){
//             setWeapon(searchForOn_FieldCards("CARABINE"));
//         }
//         if (searchForOn_FieldCards("REMINGTON")!=-1){
//             setWeapon(searchForOn_FieldCards("REMINGTON"));
//         }
//         if (searchForOn_FieldCards("SCHOFIELD")!=-1){
//             setWeapon(searchForOn_FieldCards("SCHOFIELD"));
//         }
//         if (searchForOn_FieldCards("WINCHESTER")!=-1){
//             setWeapon(searchForOn_FieldCards("WINCHESTER"));
//         }
//         if (searchForOn_FieldCards("VOLCANIC")!=-1){
//             setWeapon(searchForOn_FieldCards("VOLCANIC"));
//         }
//         if (searchForOn_FieldCards("JAIL")!=-1){
//             setInJail(true);
//         }
//         //console.log(characterRef.current);
//     }, 3000);
//
//     function setupTargetHighlighting(card) {
//         if (!card) {
//             return;
//         }
//         switch (card.card) {
//             case "BEER":
//             case "STAGECOACH":
//             case "WELLSFARGO":
//                 updateTargetSelf(true);
//                 break;
//             case "INDIANS":
//             case "GATLING":
//             case "PANIC":
//             case "CATBALOU":
//             case "DUEL":
//                 updateIgnoreRange(true);
//                 updateTargetOnlyEnemies(true);
//                 break;
//             case "BANG":
//                 updateTargetOnlyEnemies(true);
//                 break;
//             case "SALOON":
//             case "JAIL":
//             case "GENERALSTORE":
//                 updateTargetEveryone(true);
//                 updateIgnoreRange(true);
//                 break;
//             default:
//                 console.log("no valid card name opponentdeck");
//                 break;
//         }
//     }
//
//
//     function isinreach() {
//         if (!ignoreRange) {
//             for (let x of playersInReach) {
//                 if (x.id == opponent.id) {
//                     setIsInReach(true);
//                 }
//             }
//         } else {
//             setIsInReach(false);
//         }
//     }
//
//     function selecttarget() {
//         if (border == "solid" && width > 0) {
//             updateBorder("none");
//             setWidth(5);
//             updateCard_played(true);
//             const target_id = null;
//             const requestBody = null;
//             //TODO: add targetlist depending on the backend implementation and depending on what card has been played
//             if(curr_card.card=="PANIC" || curr_card.card=="CATBALOU"){
//                 /*popup whether you want fieldcard or handcard. put api.post inside that popup or a following one.
//                 also add {updateHideCancel_PlayCard(true);
//                 updateTargetSelf(false);
//                 updateIgnoreRange(false);
//                 updateTargetOnlyEnemies(false);
//                 updateTargetEveryone(false);
//                 updateCurr_card(null);
//                 updateFill_array(true);}*/
//                     return;
//             }
//             console.log(`selecttarget: opponent: ${curr_card}`);
//             authApi().post(`/games/${playertable.id}/players/${player.id}/hand/${curr_card.id}/target/${opponent.id}`);
//
//             updateHideCancel_PlayCard(true);
//             updateTargetSelf(false);
//             updateIgnoreRange(false);
//             updateTargetOnlyEnemies(false);
//             updateTargetEveryone(false);
//             updateCurr_card(null);
//             updateFill_array(true);
//             //TODO: enable other player cards again
//         }
//     }
//
//     function searchForOn_FieldCards(cardtobefound){
//         if (opponent.onFieldCards.onFieldCards.length==0){
//             return -1;
//         }
//         for (let x=0; x < opponent.onFieldCards.onFieldCards.length; x++){
//             if (opponent.onFieldCards.onFieldCards[x].card==cardtobefound){
//                 return x;
//             }
//         }
//         return -1;
//     }
//
//     function showBarrel(){
//         alert("you clicked on a barrel. Congrats.");
//     }
//     function showHorse(){
//         alert("you clicked on a horse. Congrats.");
//     }
//     function showWeapon(){
//         alert("you clicked on a weapon. Congrats.");
//     }
//
//     const [hidedeadmessage, setHideDeadmessage] = useState(true);
//     const [opacity, setOpacity] = useState(1);
//     const [backgroundColor, setBackgroundColor] = useState("none");
//     const [highlightImage, setHighlightImage] = useState("none");
//     const [playersInReach, setPlayersInReach] = useState([]);
//     const [isInReach, setIsInReach] = useState(false);
//     const [width, setWidth] = useState(5);
//
//     const [inJail, setInJail] = useState(false);
//     const [barrel, setBarrel] = useState(-1);
//     const [weapon, setWeapon] = useState(-1);
//     const [horse, setHorse] = useState(-1);
//     const [characterName, setCharacterName] = useState("loading character name...");
//     const [characterDescription, setCharacterDescription] = useState("loading character description...");
//     const [displayName, setDisplayName] = useState("loading character name...");
//     const [setupCharacter, setSetupCharacter] = useState(true);
//     const characterRef = useRef();
//
//     const character_information = (
//         <Popover placement="bottom" id="role-info_popover">
//             <Popover.Title id="role-info_popover_title"><b>{displayName}</b></Popover.Title>
//             <Popover.Content id="role-info_popover_content">
//                 <Card id="role-info_popover_content_card">
//                     <Card.Img id="role-info_popover_content_card_cardimg" variant="top" centered
//                               src={!characterRef.current ? "/images/back.png": (inJail ? `/images/character_cards/${characterName}_p_jail.png` : `/images/character_cards/${characterName}_p.jpeg`)}/>
//                 </Card>
//                 {characterDescription}
//             </Popover.Content>
//         </Popover>
//     )
//
//
//     return (
//         <div>
//             {playertable.gameStatus=="ENDED" ? (
//             <>
//                 <Card id="endofgame_card">
//                     <Card.Header><b>{opponent.user} the {opponent.gameRole}</b></Card.Header>
//                     <Card.Img src={`/images/role_cards/${opponent.gameRole}_icon.png`}/>
//                 </Card>
//             </>
//             ) : (
//                  <>
//             <p id="opponent-deck_div_p1" hidden={hidedeadmessage}><b>He Dead</b></p>
//             <div style={{backgroundColor: backgroundColor, opacity: opacity}}>
//                 <Container onClick={selecttarget} className="opponent-player-deck_container-card"
//                            style={{borderWidth: width, borderColor: "yellow", borderStyle: border}}>
//                     {/*first row for dynamite and sheriff star*/}
//                     <Row className="justify-content-md-center align-items-center">
//                         <Col>
//                             <Figure>
//                                 {/*<Figure hidden={!opponent.dynamite}>*/}
//                                 <Figure.Image
//                                     width={60}
//                                     height={30}
//                                     alt="60x30"
//                                     src="/images/icons/dynamite.png"/>
//                             </Figure>
//                         </Col>
//                         <Col>
//                             <Figure hidden={!(opponent.gameRole == "SHERIFF" || playertable.gameStatus == "ENDED")}>
//                                 <Figure.Image
//                                     width={80}
//                                     height={80}
//                                     alt="80x80"
//                                     src="/images/icons/sheriff.png"/>
//                             </Figure>
//                         </Col>
//                         <Col/>
//                     </Row>
//                     {/*second row for profile, lives and amount of playable cards*/}
//                     <Row className="justify-content-md-center align-items-center">
//                         <Col>
//                             <Figure>
//                                 <OverlayTrigger trigger="click" overlay={character_information} rootClose>
//                                     <Figure.Image id="character-image_FigureImage" style={{borderStyle: highlightImage}}
//                                                 ref={characterRef}
//                                                 width={80}
//                                                 height={80}
//                                                 alt="80x80"
//                                                 src={inJail && playertable.gameStatus!="ENDED" ? `/images/character_cards/${characterName}_p_jail.png` : `/images/character_cards/${characterName}_p.jpeg`}
//                                     />
//                                 </OverlayTrigger>
//                                 <Figure.Caption
//                                     id="opponent-player-deck_figure-profile-picture">{opponent.user}</Figure.Caption>
//                             </Figure>
//                         </Col>
//                         <Col>
//                             <Row hidden={opponent.bullets < 5}>
//                                 <Life/>
//                             </Row>
//                             <Row hidden={opponent.bullets < 4}>
//                                 <Life/>
//                             </Row>
//                             <Row hidden={opponent.bullets < 3}>
//                                 <Life/>
//                             </Row>
//                             <Row hidden={opponent.bullets < 2}>
//                                 <Life/>
//                             </Row>
//                             <Row hidden={opponent.bullets < 1}>
//                                 <Life/>
//                             </Row>
//                         </Col>
//                         <Col>
//                             <Figure>
//                                 {/*<Figure hidden={opponent.hand.playCards.length === 0}>*/}
//                                 <Figure.Image
//                                     width={80}
//                                     height={100}
//                                     alt="80x100"
//                                     src="/images/back.png"/>
//                                 <Figure.Caption>{opponent.hand.cardsInHand} card(s) left</Figure.Caption>
//                             </Figure>
//                         </Col>
//                     </Row>
//                     {/*third row for blue cards*/}
//                     <Row className="justify-content-md-center align-items-center">
//                         <Col>
//                             <Figure>
//                                 <Figure.Image
//                                     onClick={showWeapon}
//                                     width={150}
//                                     height={100}
//                                     alt="150x100"
//                                     src={(weapon==-1) ? "/images/back.png" : `/images/play_cards/blue_${opponent.onFieldCards.onFieldCards[weapon].card}_${opponent.onFieldCards.onFieldCards[weapon].suit}_${opponent.onFieldCards.onFieldCards[weapon].rank}.png`}/>
//                                 <Figure.Caption>weapon</Figure.Caption>
//                             </Figure>
//                         </Col>
//                         <Col>
//                             <Figure>
//                         <Figure.Image
//                             onClick={showHorse}
//                             width={150}
//                             height={100}
//                             alt="150x100"
//                             src={(horse==-1) ? "/images/back.png" : `/images/play_cards/blue_${opponent.onFieldCards.onFieldCards[horse].card}_${opponent.onFieldCards.onFieldCards[horse].suit}_${opponent.onFieldCards.onFieldCards[horse].rank}.png`}/>
//                         <Figure.Caption>horse</Figure.Caption>
//                     </Figure>
//                 </Col>
//                 <Col>
//                     <Figure>
//                         <Figure.Image
//                             onClick={showBarrel}
//                             width={150}
//                             height={100}
//                             alt="150x100"
//                             src={(barrel==-1) ? "/images/back.png" : `/images/play_cards/blue_BARREL_${opponent.onFieldCards.onFieldCards[barrel].suit}_${opponent.onFieldCards.onFieldCards[barrel].rank}.png`}/>
//                         <Figure.Caption>barrel</Figure.Caption>
//                     </Figure>
//                 </Col>
//             </Row>
//
//
//                 </Container>
//             </div>
//             </>
//              )}
//
//         </div>
//     )
// }