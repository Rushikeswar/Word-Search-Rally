import React from "react";
export default function NewRallyButton({handlenewrally,method,setNotification}) {
    if(method!=1)
    {
    return (
        <div id="generate-button">
            {<button id="newrally" type="button"  onClick={handlenewrally}>{`Enter a New Rally`}</button>}
        </div>
    );
    }
}


