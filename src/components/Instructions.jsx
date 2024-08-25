import React from 'react'

export default function Instructions({}){
  return (
    <>
    <div>
    <h3 style={{color:'#007bff'}}>Instructions</h3>

      <ul id='instructions'>
        <li>Start Word Search Rally by hitting the Start Rally button.</li>
        <li>There are 10 levels . And a Final level.</li>
        <li>Each Level will be unlocked after completing the previous level.</li>
        <li>You can select a previously solved levels  and generate the puzzle</li>
        <li>You can also solve previous levels automatically by hitting Solve button.</li>
        <li>You can hit New Rally button to start a new rally.</li>
      </ul>
      {/* <h4 style={{color:'red',fontSize:'13px'}}>Note :Website  is still in development phase.</h4> */}

    </div>
    </>
  )
}

