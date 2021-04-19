import Layout4players from '../../views/design/Layouts/Layout4players';
import Layout5players from '../../views/design/Layouts/Layout5players';
import Layout6players from '../../views/design/Layouts/Layout6players';
import Layout7players from '../../views/design/Layouts/Layout7players';
import useInterval from "../game/useInterval.js";
import React, { useState, useEffect } from 'react';



// function LayoutSwitcher({playeramount, playertable, orderarray, visibility, player_id}){
function LayoutSwitcher({playeramount, visibility}){
    const interval = useInterval(async () => {    
        //repeating requests to keep stuff up-to-date
        
    }, 5000);
    const [hideCancel_PlayCard, setHideCancel_PlayCard] = useState(true);

    switch(playeramount){
        case 4:
            // return <Layout4players playertable= {playertable} orderarray={orderarray} visibility={visibility} playersinreach={playersinreach} hideCancel_PlayCard={hideCancel_PlayCard} setHideCancel_PlayCard={setHideCancel_PlayCard}/>;
            return <Layout4players visibility={visibility} hideCancel_PlayCard={hideCancel_PlayCard} setHideCancel_PlayCard={setHideCancel_PlayCard}/>;
        case 5:
            return <Layout5players visibility={visibility} hideCancel_PlayCard={hideCancel_PlayCard} setHideCancel_PlayCard={setHideCancel_PlayCard}/>;
        case 6:
            return <Layout6players visibility={visibility} hideCancel_PlayCard={hideCancel_PlayCard} setHideCancel_PlayCard={setHideCancel_PlayCard}/>;
        case 7:
            return <Layout7players visibility={visibility} hideCancel_PlayCard={hideCancel_PlayCard} setHideCancel_PlayCard={setHideCancel_PlayCard}/>;
    }
}
export default LayoutSwitcher;