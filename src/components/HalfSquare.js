import React, { useState } from 'react';
import './QuiltBlock.css';

function HalfSquare({ currentColor, currentDirection }) {
    const [topColor, setTopColor] = useState('white');
    const [bottomColor, setBottomColor] = useState('white');
    const [direction, setDirection] = useState({currentDirection});
    

    function handleTopClick(e) {
        if (e.shiftKey) {
            setDirection(direction === 'top-left' ? 'top-right' : 'top-left')
        } else {
            setTopColor(topColor === currentColor ? 'white' : currentColor);
        }
    }

    function handleBottomClick(e) {
        if (e.shiftKey) {
            setDirection(direction === 'top-left' ? 'top-right' : 'top-left')
        } else {
            setBottomColor(bottomColor === currentColor ? 'white' : currentColor);
        }
    }
    return (
        <div className={`half-square-triangle ${direction}`}>
            <div
                className="quilt-block-top"
                style={{ backgroundColor: topColor }}
                onClick={handleTopClick}
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
                onClick={handleBottomClick}
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