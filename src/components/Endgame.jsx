import React from "react";
import { clearGridHighlights, clearWordListHighlights } from '../utils';
import { turnOffMouseEvents } from "./Playgame";
export default function Endgame({ method, setMethod, setNotification}) {
  const endGame = (e) => {
    e.preventDefault();
    if (method === 1) {
      setNotification("Game Ended!");
      setMethod(-1);
      const cells = document.querySelectorAll('.grid-cell');
      cells.forEach(cell => { cell.style.cursor = ''; });
      clearWordListHighlights();
      clearGridHighlights();
      if(turnOffMouseEvents)
      {
      turnOffMouseEvents();
      }
    }
  };

  return (
    <div id="game-options">
      <form onSubmit={endGame}>
        <button id="endgame" type="submit">Endgame</button>
      </form>
    </div>
  );
}