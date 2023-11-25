import React, { useState } from 'react';
import './QuiltBlock.css';

function QuarterSquare({ block, currentColor, mouseDown }) {
    const [topColor, setTopColor] = useState(block.topColor);
    const [rightColor, setRightColor] = useState(block.rightColor);
    const [bottomColor, setBottomColor] = useState(block.bottomColor);
    const [leftColor, setLeftColor] = useState(block.leftColor);
    const [lastClicked, setLastClicked] = useState(null);

    function handleTopClick(e) {
        setTopColor(currentColor);
        setLastClicked('top');
    }

    function handleRightClick(e) {
        setRightColor(currentColor);
        setLastClicked('right');
    }

    function handleBottomClick(e) {
        setBottomColor(currentColor);
        setLastClicked('bottom');
    }

    function handleLeftClick(e) {
        setLeftColor(currentColor);
        setLastClicked('left');
    }

    function handleTopMouseOver(e) {
        if (mouseDown) {
            handleTopClick(e);
        }
    }

    function handleRightMouseOver(e) {
        if (mouseDown) {
            handleRightClick(e);
        }
    }

    function handleBottomMouseOver(e) {
        if (mouseDown) {
            handleBottomClick(e);
        }
    }

    function handleLeftMouseOver(e) {
        if (mouseDown) {
            handleLeftClick(e);
        }
    }
    function handleKeyDown(e) {
        if (e.key === "r" && lastClicked) {
            const tempColor = topColor;
                setTopColor(leftColor);
                setLeftColor(bottomColor);
                setBottomColor(rightColor);
                setRightColor(tempColor);
        }
    }


    return (
        <div className="quarter-square-triangle" onKeyDown={handleKeyDown}>
            <div
                className="qst-top"
                style={{ backgroundColor: topColor }}
                onMouseDown={handleTopClick}
                onMouseOver={handleTopMouseOver}
                tabIndex={0}
            ></div>
            <div
                className="qst-right"
                style={{ backgroundColor: rightColor }}
                onMouseDown={handleRightClick}
                onMouseOver={handleRightMouseOver}
                tabIndex={0}
            ></div>
            <div
                className="qst-bottom"
                style={{ backgroundColor: bottomColor }}
                onMouseDown={handleBottomClick}
                onMouseOver={handleBottomMouseOver}
                tabIndex={0}
                ></div>
            <div
                className="qst-left"
                style={{ backgroundColor: leftColor }}
                onMouseDown={handleLeftClick}
                onMouseOver={handleLeftMouseOver}
                tabIndex={0}
            ></div>
        </div>
    );
}

export default QuarterSquare;