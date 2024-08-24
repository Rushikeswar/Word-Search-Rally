import React from "react";
export default function GenerateButton({ onGeneratePuzzle,method,first}) {
    if(method!=1)
    {
    return (
        <div id="generate-button">
            <button id="generate" type="button" onClick={onGeneratePuzzle}>{first?`Start Rally`:'Generate'}</button>
        </div>
    );
    }
}


