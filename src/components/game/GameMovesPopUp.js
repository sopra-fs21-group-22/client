import {Card} from "react-bootstrap";
import React from "react";


function GameMovesPopUp({gamemoves, height, width}) {

    const moves = gamemoves.map((m) =>
        <p>{m.message + "\n"}</p>
    );


    return (
        <Card className="overflow-auto" style={{backgroundColor: "none", opacity: 0.8, maxHeight: height, maxWidth: width}}>

            <Card.Body>
                <div className="overflow-auto p-2 mb-1 mb-md-1 mr-md-1 bg-light"
                     style={{maxHeight: height-100}}>
                         <b>Gamemoves</b>
                    {moves}
                </div>
            </Card.Body>
        </Card>
    );
}


export default GameMovesPopUp;