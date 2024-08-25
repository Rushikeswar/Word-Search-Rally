import React from "react";
export default function GenerateButton({ onGeneratePuzzle,method,first}) {
    if(method!=1)
    {const check=localStorage.getItem('localmai')>5||localStorage.getItem('locallevel')>5;
    return (
        <div id="generate-button">
            <button id="generate" type="button" onClick={onGeneratePuzzle}>{first?(check?`continue Rally`:`Enter a Rally`):'Generate'}</button>
        </div>
    );
    }
}


