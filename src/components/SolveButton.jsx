import React from "react";
import { solveGrid } from '../solver.js';

export default function Solve({ grid, words, method, setMethod, setNotification }) {
    return (
        <div id="game-options">
            <button 
                type="button" 
                onClick={() => {
                    if (method === 0) {
                        setNotification("Already solved!");
                    } else {
                        solveGrid(grid, words);
                        setMethod(0);
                        setNotification("Solved!");
                    }
                }}
            >
                Solve
            </button>
        </div>
    );
}



