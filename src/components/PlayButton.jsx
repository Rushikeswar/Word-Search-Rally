import React from "react";
import playgame from './Playgame.jsx';
import {clearGridHighlights,clearWordListHighlights} from '../utils.js';
export default function Play({grid,words,setMethod,setNotification,setNext,level}){
    return(<>
        <div id="game-options">
            <button type="button"
            onClick={()=>{
                setMethod(1);
                const cells=document.querySelectorAll('.grid-cell');
                cells.forEach((x) => { x.style.cursor = 'pointer';});
                setNotification("Game going on... !")
                clearWordListHighlights();
                clearGridHighlights();
                playgame(grid,words,setNotification,setNext,level)
            }}>Start Game</button>
        </div>
    </>)
}