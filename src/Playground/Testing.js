import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Redirect, withRouter, useHistory } from 'react-router-dom';
import { Button, Container, Form, Image } from 'react-bootstrap';
import "../views/design/styling/custom_button_styling.css";
import "../views/design/styling/playing_field_styling.css";


export default function Testing() {
    const [status, setStatus] = useState(false);

    const someelement = useRef();

    function toggleanimation(){
        if(status){
            someelement.current.id="wiggle";
            setStatus(false);
        }
        else{
            //eifach irgend e id festlege, völlig wurscht wie sie heisst, solangs kei css dezue git
            someelement.current.id="nonwiggle";
            setStatus(true);
        }
        
    }
    function print(){
        console.log(someelement.current.height);
    }

    return (
        <>
        {/* <div id="spin" display={"flex"} align={"center"} justifyContent={"center"}  position={"absolute"} margin={0}>
        <Image id="grow" src="images/play_cards/blue_APPALOOSA_SPADES_ACE.png" height={100} width={80}></Image>
        </div> */}
        {/* <Button onClick={print}>klik me</Button>
        <Image id="nonwiggle" src="images/play_cards/blue_APPALOOSA_SPADES_ACE.png" height={100} width={80} ref={someelement}></Image>
        <Button onClick={toggleanimation}>toggleanimation</Button> */}
        <Image id="fade" src="images/indianer.png"></Image>
        </>
    )
}