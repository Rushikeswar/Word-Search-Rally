import React from "react";

export default function LevelSelection({ level, onLevelChange, method, maxi }) {
    if (method !== 1) {
        return (
            <div id="level-selection">
                <label htmlFor="grid-size">Choose Grid Size:</label>
                <select 
                    id="grid-size" 
                    value={level || 0}
                    onChange={(e) => onLevelChange(Number(e.target.value))}
                >
                    <option value={0} disabled>
                        Select Size
                    </option>
                    {[...Array(maxi-5+1)].map((_, i) => {
                        const size = i + 5;
                        return (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        );
                    })}
                </select>
            </div>
        );
    }
    return null;
}

