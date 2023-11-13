import React, { useState } from 'react';
import './QuiltBlock.css';

function HalfSquare({ currentColor, currentDirection, mouseDown }) { // Add mouseDown as a prop
    const [topColor, setTopColor] = useState('white');
    const [bottomColor, setBottomColor] = useState('white');
    const [direction, setDirection] = useState(currentDirection);
    // Remove the local mouseDown state

    function handleTopClick(e) {
        if (e.shiftKey) {
            setDirection(direction === 'top-left' ? 'top-right' : 'top-left')
        } else {
            setTopColor( currentColor);
        }
    }

    function handleBottomClick(e) {
        if (e.shiftKey) {
            setDirection(direction === 'top-left' ? 'top-right' : 'top-left')
        } else {
            setBottomColor( currentColor);
        }
    }

    function handleTopMouseOver(e) {
        if (mouseDown) { // Use the mouseDown prop
            handleTopClick(e);
        }
    }

    function handleBottomMouseOver(e) {
        if (mouseDown) { // Use the mouseDown prop
            handleBottomClick(e);
        }
    }

    return (
        <div className={`half-square-triangle ${direction}`}>
            <div
                className="quilt-block-top"
                style={{ backgroundColor: topColor }}
                onMouseDown={handleTopClick}
                onMouseOver={handleTopMouseOver}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        handleTopClick(e);
                    }
                }}
                tabIndex={0}
            ></div>
            <div
                className="quilt-block-bottom"
                style={{ backgroundColor: bottomColor }}
                onMouseDown={handleBottomClick}
                onMouseOver={handleBottomMouseOver}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        handleBottomClick(e);
                    }
                }}
                tabIndex={0}
            ></div>
        </div>
    );
}

export default HalfSquare;