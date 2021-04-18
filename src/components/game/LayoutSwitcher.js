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
    

    switch(playeramount){
        case 4:
            // return <Layout4players playertable= {playertable} orderarray={orderarray} visibility={visibility} playersinreach={playersinreach}/>;
            return <Layout4players visibility={visibility}/>;
        case 5:
            return <Layout5players visibility={visibility}/>;
        case 6:
            return <Layout6players visibility={visibility}/>;
        case 7:
            return <Layout7players visibility={visibility}/>;
    }
}
export default LayoutSwitcher;