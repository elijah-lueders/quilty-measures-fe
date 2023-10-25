import React, { useState } from 'react';
import './QuiltBlock.css';

function QuiltBlock() {
    const [topColor, setTopColor] = useState('white');
    const [bottomColor, setBottomColor] = useState('blue');

    function handleTopClick(e) {
        if (e.shiftKey) {
            setTopColor('red');
        } else {
            setTopColor(topColor === 'white' ? 'blue' : 'white');
        }
    }

    function handleBottomClick(e) {
        if (e.shiftKey) {
            setBottomColor('red');
        } else {
            setBottomColor(bottomColor === 'white' ? 'blue' : 'white');
        }
    }

    return (
        <div className="quilt-block">
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

export default QuiltBlock;