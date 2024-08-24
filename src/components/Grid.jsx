import React from "react";
function Grid({ grid ,level}) {
    return (<>
        {<p style={{fontSize:20}}>Level-{level}</p>}
        <div id="grid-container" style={{ gridTemplateColumns: `repeat(${grid.length}, 1fr)` }}>
            {grid.map((row, rowIndex) =>
                row.map((cell, columnIndex) => (
                    <div key={`${rowIndex}-${columnIndex}`} className="grid-cell" data-row={rowIndex} data-col={columnIndex} >
                        {cell}
                    </div>
                ))
            )}
        </div>
        </>
    );
}

export default React.memo(Grid);
