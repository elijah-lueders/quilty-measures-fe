import React, { useState } from 'react';
import './QuiltBlock.css';

function HalfSquare({block, currentColor, mouseDown }) {
    const [topColor, setTopColor] = useState(block.topColor);
    const [bottomColor, setBottomColor] = useState(block.bottomColor);
    const [direction, setDirection] = useState(block.direction);
    const [lastClicked, setLastClicked] = useState(null);

    function handleTopClick(e) {
        setTopColor(currentColor);
        setLastClicked('top');
    }

    function handleBottomClick(e) {
        setBottomColor(currentColor);
        setLastClicked('bottom');
    }

    function handleTopMouseOver(e) {
        if (mouseDown) { 
            handleTopClick(e);
        }
    }

    function handleBottomMouseOver(e) {
        if (mouseDown) { 
            handleBottomClick(e);
        }
    }

    function handleKeyDown(e) {
        if (e.key === "r" && lastClicked) {
            if (direction === 'top-left') {
                setDirection('top-right');
            } else if (direction === 'top-right') {
                const tempColor = topColor;
                setTopColor(bottomColor);
                setBottomColor(tempColor);
                setDirection('top-left');
            }
        }
    }
    return (
        <div className={`half-square-triangle ${direction}`} onKeyDown={handleKeyDown} tabIndex={0}>
            <div
                className="hst-top"
                style={{ backgroundColor: topColor }}
                onMouseDown={handleTopClick}
                onMouseOver={handleTopMouseOver}
                tabIndex={0}
            ></div>
            <div
                className="hst-bottom"
                style={{ backgroundColor: bottomColor }}
                onMouseDown={handleBottomClick}
                onMouseOver={handleBottomMouseOver}
                tabIndex={0}
            ></div>
        </div>
    );
}

export default HalfSquare;