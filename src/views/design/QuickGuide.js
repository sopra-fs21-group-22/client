import "./styling/lobby_styling.css";
import React from "react";
import {Carousel, Container, Image} from "react-bootstrap";

export default function QuickGuide(){
    return (
        <>
            <Carousel interval={null} wrap={false}>
                <Carousel.Item>
                    <Container style={{height: "200px"}}/>
                    <Carousel.Caption>
                        <p className="carousel-title">Introduction</p>
                        <p className="carousel-text">Welcome to BANG! This is a quick guide to help you easily
                            understand the basic concepts of the game.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Container style={{height: "200px"}}/>
                    <Carousel.Caption>
                        <p className="carousel-single-title">Basic Concepts</p>
                        <br/>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <p style={{textAlign: "center"}}>
                        <Image src="/images/fullscreen.JPG" height={200}/>
                    </p>
                    <Container style={{height: "425px"}}/>
                    <Carousel.Caption>
                        <p className="carousel-title">Layout</p>
                        <p className="carousel-text">At the bottom of your screen are your own <b>Role Card</b> (far-left)
                            and <b>Hand Cards</b>. Above that in your <b>Player Box</b> your <b>Character Icon</b> is
                            displayed over your <b>Username</b>. To the right is a number of <b>Bullets</b> equal
                            to your life points. Next to that are your active <b>On-field Cards</b>, namely weapon,
                            horse and barrel. Around the center you can see your fellow players’ <b>Player Boxes</b>.
                            In the center is a pile of face-down cards: the <b>Deck</b>. As soon as the first card is
                            discarded you will see a second face-up pile appear: the <b>Discard Pile</b>. At the
                            bottom left you can see the <b>Chat Window</b>. At the bottom right all game moves are
                            displayed so you can read what’s going on at any point. When it's your turn, pay attention
                            to the <b>progress bar</b> at the bottom of the screen. It indicates how much time you have left
                            to finish your turn. If the bar runs out you will get a <b>strike</b>. If you have three strikes you are
                            kicked from the game!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <p style={{textAlign: "center"}}>
                        <Image src="/images/role_cards/SHERIFF_icon.png" height={100}/>
                        <div className="lobby-divider"/>
                        <Image src="/images/role_cards/DEPUTY_icon.png" height={100}/>
                        <div className="lobby-divider"/>
                        <Image src="/images/role_cards/OUTLAW_icon.png" height={100}/>
                        <div className="lobby-divider"/>
                        <Image src="/images/role_cards/RENEGADE_icon.png" height={100}/>
                    </p>
                    <Container style={{height: "450px"}}/>
                    <Carousel.Caption>
                        <p className="carousel-title">Aim of the Game</p>
                        <p className="carousel-text">The aim of “BANG!” is to eliminate certain players. Each Player
                            has a <b>Role Card</b> that determines their <b>Role</b>. If your <b>Role</b> is <b>OUTLAW</b> then
                            your goal is to kill the <b>SHERIFF</b> by attacking him*her until no <b>Bullets</b> are left.
                            If your <b>Role</b> is <b>SHERIFF</b> or <b>DEPUTY</b> then your goal is to kill all <b>OUTLAWs</b>.
                            If you are the <b>RENEGADE</b> your goal is to be the last one standing. All <b>Role Cards</b> except
                            for the <b>SHERIFF</b> (player with a sheriff’s star in their <b>Player Box</b>) are hidden until
                            that player dies. Be sure to think about who might have which role before you could end up blasting
                            at one of your own! The distribution of <b>Roles</b> depends on the number of players as follows: <br/><br/>
                            <b>4 Players: 1 SHERIFF, 1 RENEGADE, 2 OUTLAWs</b> <br/>
                            <b>5 Players: 1 SHERIFF, 1 RENEGADE, 2 OUTLAWs, 1 DEPUTY</b><br/>
                            <b>6 Players: 1 SHERIFF, 1 RENEGADE, 3 OUTLAWs, 1 DEPUTY</b><br/>
                            <b>7 Players: 1 SHERIFF, 1 RENEGADE, 3 OUTLAWs, 2 DEPUTYs</b></p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <p style={{textAlign: "center"}}>
                        <Image src="/images/playerOnTurn.JPG" height={100}/>
                        <div className="lobby-divider"/>
                        <Image src="/images/playCard.JPG" height={300}/>
                        <div className="lobby-divider"/>
                        <Image src="/images/endTurn.JPG" height={50}/>
                    </p>
                    <Container style={{height: "275px"}}/>
                    <Carousel.Caption>
                        <p className="carousel-title">How To Play</p>
                        <p className="carousel-text">The <b>SHERIFF</b> always starts. The player-on-turn’s <b>Character Icon</b> is
                            highlighted in yellow color. At the beginning of a turn a player receives two <b>Cards</b> (except
                            in the case of drawing the dynamite card). Then the player can play <b>Cards</b> until it’s no
                            longer wished to. To end a turn you must make sure that you don’t have
                            more <b>Hand Cards</b> than <b>Bullets</b>. Discard any extra <b>Cards</b>. Then click
                            the <b>End Turn</b> button. </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <p style={{textAlign: "center"}}>
                        <Image src="/images/characterDisplay.JPG" height={200}/>
                    </p>
                    <Container style={{height: "275px"}}/>
                    <Carousel.Caption>
                        <p className="carousel-title">Good To Know</p>
                        <p className="carousel-text">Pretty much anything you see is clickable. So take your time when it’s not
                            your turn and hover or click your way through the layout. Hovering on any
                            player’s <b>Character Icon</b> shows you their <b>Skill</b> and their starting <b>Bullets</b>.
                            The <b>SHERIFF</b> always starts with one extra <b>Bullet</b>. Every player can play any number
                            of <b>Cards</b> per turn but may only play one <b>Bang</b> (unless they have a <b>VOLCANIC</b> weapon
                            or the required <b>Skill</b>).</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Container style={{height: "200px"}}/>
                    <Carousel.Caption>
                        <p className="carousel-single-title">Important Cards</p>
                        <br/>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <p style={{textAlign: "center"}}>
                        <Image src="/images/play_cards/brown_BANG_CLUBS_EIGHT.png" height={300}/>
                    </p>
                    <Container style={{height: "200px"}}/>
                    <Carousel.Caption>
                        <p className="carousel-title">BANG <span style={{fontSize: "20px"}}>(25x)</span></p>
                        <p className="carousel-text">This <b>Card</b> may be played against any player in <b>Range</b> (marked
                            in yellow when trying to play the <b>Card</b>). This <b>Card</b> removes one <b>Bullet</b> from
                            the targeted player unless he can defend.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <p style={{textAlign: "center"}}>
                        <Image src="/images/play_cards/brown_MISSED_CLUBS_ACE.png" height={300}/>
                    </p>
                    <Container style={{height: "200px"}}/>
                    <Carousel.Caption>
                        <p className="carousel-title">MISSED <span style={{fontSize: "20px"}}>(12x)</span></p>
                        <p className="carousel-text">This <b>Card</b> cannot be played. It is automatically played if you
                            are the target of an enemy <b>Bang</b> or <b>Gatling</b>. It negates the <b>Bang’s</b> damage
                            and is discarded.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <p style={{textAlign: "center"}}>
                        <Image src="/images/play_cards/brown_BEER_HEARTS_EIGHT.png" height={300}/>
                    </p>
                    <Container style={{height: "200px"}}/>
                    <Carousel.Caption>
                        <p className="carousel-title">BEER <span style={{fontSize: "20px"}}>(6x)</span></p>
                        <p className="carousel-text">This <b>Card</b> can heal one <b>Bullet</b>. If you are on
                            one <b>Bullet</b> and the target of a <b>Bang</b> it may also act as a <b>Missed</b>.
                            You can never have more <b>Bullets</b> than at the beginning of the game.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <p style={{textAlign: "center"}}>
                        <Image src="/images/play_cards/brown_PANIC_DIAMONDS_EIGHT.png" height={300}/>
                        <div className="lobby-divider"/>
                        <Image src="/images/play_cards/brown_CATBALOU_DIAMONDS_JACK.png" height={300}/>
                    </p>
                    <Container style={{height: "200px"}}/>
                    <Carousel.Caption>
                        <p className="carousel-title">PANIC and CAT BALOU <span style={{fontSize: "20px"}}>(4x each)</span></p>
                        <p className="carousel-text">These <b>Cards</b> allow the stealing of another
                            player’s <b>Cards</b>. <b>Cat Balou</b> discards it and can be played on anybody, <b>Panic</b> puts
                            it into your <b>Hand Cards</b> but only works in your <b>Range</b>.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <p style={{textAlign: "center"}}>
                        <Image src="/images/play_cards/brown_WELLSFARGO_HEARTS_THREE.png" height={300}/>
                        <div className="lobby-divider"/>
                        <Image src="/images/play_cards/brown_STAGECOACH_SPADES_NINE.png" height={300}/>
                    </p>
                    <Container style={{height: "175px"}}/>
                    <Carousel.Caption>
                        <p className="carousel-title">WELLSFARGO and STAGECOACH <span style={{fontSize: "20px"}}>(1x, 2x)</span></p>
                        <p className="carousel-text">These <b>Cards</b> allow you to draw the indicated amount of <b>Cards</b> from
                            the <b>Deck</b>.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <p style={{textAlign: "center"}}>
                        <Image src="/images/play_cards/brown_SALOON_HEARTS_FIVE.png" height={300}/>
                    </p>
                    <Container style={{height: "175px"}}/>
                    <Carousel.Caption>
                        <p className="carousel-title">SALOON <span style={{fontSize: "20px"}}>(1x)</span></p>
                        <p className="carousel-text">This <b>Card</b> gives every player one <b>Bullet</b>.
                            You can never have more <b>Bullets</b> than at the beginning of the game.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <p style={{textAlign: "center"}}>
                        <Image src="/images/play_cards/brown_GATLING_HEARTS_TEN.png" height={300}/>
                    </p>
                    <Container style={{height: "150px"}}/>
                    <Carousel.Caption>
                        <p className="carousel-title">GATLING <span style={{fontSize: "20px"}}>(1x)</span></p>
                        <p className="carousel-text">This <b>Card</b> plays a <b>Bang</b> against every player other than yourself.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <p style={{textAlign: "center"}}>
                        <Image src="/images/play_cards/brown_INDIANS_DIAMONDS_ACE.png" height={300}/>
                    </p>
                    <Container style={{height: "175px"}}/>
                    <Carousel.Caption>
                        <p className="carousel-title">INDIANS <span style={{fontSize: "20px"}}>(2x)</span></p>
                        <p className="carousel-text">This <b>Card</b> plays a <b>Bang</b> against every player other than yourself.
                            It can not be defended against by <b>Missed</b>. It can be defended against by <b>Bang</b>.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <p style={{textAlign: "center"}}>
                        <Image src="/images/play_cards/blue_SCHOFIELD_CLUBS_JACK.png" height={175}/>
                        <div className="lobby-divider"/>
                        <Image src="/images/play_cards/blue_REMINGTON_CLUBS_KING.png" height={175}/>
                        <div className="lobby-divider"/>
                        <Image src="/images/play_cards/blue_CARABINE_CLUBS_ACE.png" height={175}/>
                        <div className="lobby-divider"/>
                        <Image src="/images/play_cards/blue_WINCHESTER_SPADES_EIGHT.png" height={175}/>
                        <div className="lobby-divider"/>
                        <Image src="/images/play_cards/blue_VOLCANIC_CLUBS_TEN.png" height={175}/>
                    </p>
                    <Container style={{height: "200px"}}/>
                    <Carousel.Caption>
                        <p className="carousel-title">WEAPONS <span style={{fontSize: "20px"}}>(3x, 1x, 1x, 1x, 2x)</span></p>
                        <p className="carousel-text">These <b>Blue Cards</b> increase your <b>Range</b> by the
                            number indicated. <b>Volcanic</b> is an exception. It allows for multiple <b>Bangs</b> to be played every
                            turn. You can only have one weapon at a time.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <p style={{textAlign: "center"}}>
                        <Image src="/images/play_cards/blue_APPALOOSA_SPADES_ACE.png" height={300}/>
                        <div className="lobby-divider"/>
                        <Image src="/images/play_cards/blue_MUSTANG_HEARTS_EIGHT.png" height={300}/>
                    </p>
                    <Container style={{height: "200px"}}/>
                    <Carousel.Caption>
                        <p className="carousel-title">HORSES <span style={{fontSize: "20px"}}>(1x, 2x)</span></p>
                        <p className="carousel-text">These <b>Blue Cards</b> increase your <b>Range</b> from others
                            or decrease your <b>Range</b> to others. See the number on the <b>Card</b> to determine
                            which does what. You can only have one horse at a time.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <p style={{textAlign: "center"}}>
                        <Image src="/images/play_cards/blue_BARREL_SPADES_KING.png" height={300}/>
                    </p>
                    <Container style={{height: "175px"}}/>
                    <Carousel.Caption>
                        <p className="carousel-title">BARREL <span style={{fontSize: "20px"}}>(2x)</span></p>
                        <p className="carousel-text">This <b>Card</b> gives you a certain chance to avoid any
                            incoming <b>Bang</b> without wasting a <b>Missed</b>.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <p style={{textAlign: "center"}}>
                        <Image src="/images/play_cards/blue_JAIL_HEARTS_FOUR.png" height={300}/>
                    </p>
                    <Container style={{height: "175px"}}/>
                    <Carousel.Caption>
                        <p className="carousel-title">JAIL <span style={{fontSize: "20px"}}>(3x)</span></p>
                        <p className="carousel-text">This <b>Card</b>, if played against you, has a certain
                            chance to prohibit you from all play for one turn. Everybody except the <b>SHERIFF</b> can
                            be put in <b>Jail</b>.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <p style={{textAlign: "center"}}>
                        <Image src="/images/play_cards/blue_DYNAMITE_HEARTS_TWO.png" height={300}/>
                    </p>
                    <Container style={{height: "250px"}}/>
                    <Carousel.Caption>
                        <p className="carousel-title">DYNAMITE <span style={{fontSize: "20px"}}>(1x)</span></p>
                        <p className="carousel-text">This <b>Card</b>, if placed, shows up on your <b>Player Box</b> as
                            a bundle of dynamite. If you draw it, it gets played on yourself immediately. Every time
                            the player currently holding the <b>Dynamite</b> starts their turn, a certain chance
                            exists it will explode and cost them three <b>Bullets</b>. If it doesn’t explode it
                            is passed to the player left of you. The <b>Dynamite’s</b> damage is unavoidable.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Container style={{height: "200px"}}/>
                    <Carousel.Caption>
                        <p className="carousel-single-title">That's it! Now go play.</p>
                        <p className="carousel-text">It's all learning by doing! Have fun :)<br/>Click on
                            the <b>Rules</b> button during the game to reopen this guide.</p>
                        <br/>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    )
}