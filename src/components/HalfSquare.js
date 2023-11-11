import React, { useState } from 'react';
import './QuiltBlock.css';

function HalfSquare({ currentColor }) {
    const [topColor, setTopColor] = useState('white');
    const [bottomColor, setBottomColor] = useState('white');


    function handleTopClick(e) {
        if (e.shiftKey) {
            setTopColor('white');
        } else {
            setTopColor(topColor === currentColor ? 'white' : currentColor);
        }
    }

    function handleBottomClick(e) {
        if (e.shiftKey) {
            setBottomColor('white');
        } else {
            setBottomColor(bottomColor === currentColor ? 'white' : currentColor);
        }
    }

    return (
        <div className="half-square-block">
            <div
                className="quilt-block-before"
                style={{ backgroundColor: topColor }}
                onClick={handleTopClick}
            ></div>
            <div
                className="quilt-block-after"
                style={{ backgroundColor: bottomColor }}
                onClick={handleBottomClick}
            ></div>
        </div>
    );
}

export default HalfSquare;