import React, { useState } from "react";
import "./QuiltBlock.css";

function FullSquare({ block = {}, currentColor, mouseDown }) {
    const [color, setColor] = useState(block.color || 'pink');
    const [lastClicked, setLastClicked] = useState(null);

    function handleClick(e) {
        setColor(currentColor);
        setLastClicked('full');
    }

    function handleMouseOver(e) {
        if (mouseDown) {
            handleClick(e);
        }
    }

    return (
        <div
            className="full-square"
            onMouseDown={handleClick}
            onMouseOver={handleMouseOver}
            tabIndex={0}
            style={{ backgroundColor: color }}
        ></div>
    )
}

export default FullSquare;