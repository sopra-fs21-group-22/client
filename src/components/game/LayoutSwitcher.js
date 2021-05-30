import Layout4players from '../../views/design/Layouts/Layout4players';
import Layout5players from '../../views/design/Layouts/Layout5players';
import Layout6players from '../../views/design/Layouts/Layout6players';
import Layout7players from '../../views/design/Layouts/Layout7players';
import useInterval from "../game/useInterval.js";
import React, {useState, useEffect} from 'react';
import {Row} from "react-bootstrap";
import { authApi } from '../../helpers/api';


function LayoutSwitcher({
                            playeramount,
                            playertable,
                            orderarray,
                            visibility,
                            player,
                            roleinformation,
                            newGameMoves,
                            muteChat,
                            endOfGame,
                            winnerMessage,
                            show_characterDisplay,
                            updateShow_characterDisplay,
                            reversedGameMoves
                        }) {
// function LayoutSwitcher({playeramount, visibility}){

    /* const interval = useInterval(async () => {    

        //repeating requests to keep stuff up-to-date

        


        
    }, 1000); */

    //to hide or show the cancel button when choosing a target
    const [hideCancel_PlayCard, setHideCancel_PlayCard] = useState(true);
    //to determine whether opponent decks or/and player deck should be lit up when choosing a target
    const [ignoreRange, setIgnoreRange] = useState(false);
    const [targetSelf, setTargetSelf] = useState(false);
    const [targetEveryone, setTargetEveryone] = useState(false);
    const [targetOnlyEnemies, setTargetOnlyEnemies] = useState(false);
    const [targetNotSheriff, setTargetNotSheriff] = useState(false);
    const [chat, setChat] = useState([]);

    const updateIgnoreRange = (value) => {
        setIgnoreRange(value);
    }
    const updateTargetSelf = (value) => {
        setTargetSelf(value);
    }
    const updateTargetEveryone = (value) => {
        setTargetEveryone(value);
    }
    const updateTargetOnlyEnemies = (value) => {
        setTargetOnlyEnemies(value);
    }
    const updateTargetNotSheriff = (value) => {
        setTargetNotSheriff(value);
    }
    const updateHideCancel_PlayCard = (value) => {
        setHideCancel_PlayCard(value);
    }
    const updateChat = (newChatArray) => {
        setChat(newChatArray);
    }


    const [curr_card, setCurr_card] = useState();
    const updateCurr_card = (value) => {
        setCurr_card(value);
    }

    switch (playeramount) {
        case -1:
            return (null);
        case 4:
            return <Layout4players playertable={playertable} orderarray={orderarray} visibility={visibility}
                                   player={player} hideCancel_PlayCard={hideCancel_PlayCard}
                                   updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                                   ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange}
                                   targetSelf={targetSelf} updateTargetSelf={updateTargetSelf}
                                   targetEveryone={targetEveryone} updateTargetEveryone={updateTargetEveryone}
                                   targetOnlyEnemies={targetOnlyEnemies}
                                   updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                                   targetNotSheriff={targetNotSheriff} updateTargetNotSheriff={updateTargetNotSheriff}
                                   updateCurr_card={updateCurr_card} curr_card={curr_card}
                                   updateChat={updateChat} chat={chat} roleinformation={roleinformation}
                                   newGameMoves={newGameMoves}
                                   muteChat={muteChat} endOfGame={endOfGame} winnerMessage={winnerMessage}
                                   show_characterDisplay={show_characterDisplay} updateShow_characterDisplay={updateShow_characterDisplay}
                                   reversedGameMoves={reversedGameMoves}
                                   />;

        case 5:
            return <Layout5players playertable={playertable} orderarray={orderarray} visibility={visibility}
                                   player={player} hideCancel_PlayCard={hideCancel_PlayCard}
                                   updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                                   ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange}
                                   targetSelf={targetSelf} updateTargetSelf={updateTargetSelf}
                                   targetEveryone={targetEveryone} updateTargetEveryone={updateTargetEveryone}
                                   targetOnlyEnemies={targetOnlyEnemies}
                                   updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                                   targetNotSheriff={targetNotSheriff} updateTargetNotSheriff={updateTargetNotSheriff}
                                   updateCurr_card={updateCurr_card} curr_card={curr_card} updateChat={updateChat} chat={chat}
                                   roleinformation={roleinformation}
                                   newGameMoves={newGameMoves}
                                   muteChat={muteChat} endOfGame={endOfGame} winnerMessage={winnerMessage}
                                   show_characterDisplay={show_characterDisplay} updateShow_characterDisplay={updateShow_characterDisplay}
                                   reversedGameMoves={reversedGameMoves}
                                   />;
        case 6:
            return <Layout6players playertable={playertable} orderarray={orderarray} visibility={visibility}
                                   player={player} hideCancel_PlayCard={hideCancel_PlayCard}
                                   updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                                   ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange}
                                   targetSelf={targetSelf} updateTargetSelf={updateTargetSelf}
                                   targetEveryone={targetEveryone} updateTargetEveryone={updateTargetEveryone}
                                   targetOnlyEnemies={targetOnlyEnemies}
                                   updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                                   targetNotSheriff={targetNotSheriff} updateTargetNotSheriff={updateTargetNotSheriff}
                                   updateCurr_card={updateCurr_card} curr_card={curr_card} updateChat={updateChat} chat={chat}
                                   roleinformation={roleinformation}
                                   newGameMoves={newGameMoves}
                                   muteChat={muteChat} endOfGame={endOfGame} winnerMessage={winnerMessage}
                                   show_characterDisplay={show_characterDisplay} updateShow_characterDisplay={updateShow_characterDisplay}
                                   reversedGameMoves={reversedGameMoves}
                                   />;
        case 7:
            return <Layout7players playertable={playertable} orderarray={orderarray} visibility={visibility}
                                   player={player} hideCancel_PlayCard={hideCancel_PlayCard}
                                   updateHideCancel_PlayCard={updateHideCancel_PlayCard}
                                   ignoreRange={ignoreRange} updateIgnoreRange={updateIgnoreRange}
                                   targetSelf={targetSelf} updateTargetSelf={updateTargetSelf}
                                   targetEveryone={targetEveryone} updateTargetEveryone={updateTargetEveryone}
                                   targetOnlyEnemies={targetOnlyEnemies}
                                   updateTargetOnlyEnemies={updateTargetOnlyEnemies}
                                   targetNotSheriff={targetNotSheriff} updateTargetNotSheriff={updateTargetNotSheriff}
                                   updateCurr_card={updateCurr_card} curr_card={curr_card} updateChat={updateChat} chat={chat}
                                   roleinformation={roleinformation}
                                   newGameMoves={newGameMoves}
                                   muteChat={muteChat} endOfGame={endOfGame} winnerMessage={winnerMessage}
                                   show_characterDisplay={show_characterDisplay} updateShow_characterDisplay={updateShow_characterDisplay}
                                   reversedGameMoves={reversedGameMoves}
                                   />;
    }
}

export default LayoutSwitcher;