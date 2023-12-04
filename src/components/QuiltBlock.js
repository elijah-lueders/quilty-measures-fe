import React, { useState } from "react";
import "./QuiltBlock.css";
// import FullSquare from './FullSquare';
// import HalfSquare from './HalfSquare';
// import QuarterSquare from './QuarterSquare';

function FullSquare({ block = {}, currentColor, mouseDown }) {
    const [color, setColor] = useState(block.color || 'pink');
    const [type, setType] = useState(block.type || 'full-square');

    function handleClick(e) {
        setColor(currentColor);
        block.color = color;
    }

    function handleMouseOver(e) {
        if (mouseDown) {
            handleClick(e);
        }
    }

    function handleDoubleClick(e) {
        if (type === 'full-square') {
            console.log('before full square double click event');
            console.log('type', type);
            console.log('block.type', block.type);

            setType('half-square-triangle');
            block.type = 'half-square-triangle';
            block.topColor = color;
            block.bottomColor = 'white';

            console.log('after full square double click event');
            console.log('type', type);
            console.log('block.type', block.type);
        } else if (type === 'half-square-triangle') {
            setType('quarter-square-triangle');
            block.type = 'quarter-square-triangle';
        } else if (type === 'quarter-square-triangle') {
            setType('full-square');
            block.type = 'full-square';
        }
    }

    return (
        <div
            className="full-square"
            onMouseDown={handleClick}
            onMouseOver={handleMouseOver}
            onDoubleClick={handleDoubleClick}
            tabIndex={0}
            style={{ backgroundColor: block.color }}
        ></div>
    )
}
function HalfSquare({ block, currentColor, mouseDown }) {
    const [topColor, setTopColor] = useState(block.topColor);
    const [bottomColor, setBottomColor] = useState(block.bottomColor);
    const [direction, setDirection] = useState(block.direction);
    const [lastClicked, setLastClicked] = useState(null);

    function updateBlock() {
        block.topColor = topColor;
        block.bottomColor = bottomColor;
        block.direction = direction;
    }

    function handleTopClick(e) {
        setTopColor(currentColor);

        updateBlock();
    }

    function handleBottomClick(e) {
        setBottomColor(currentColor);
        updateBlock();
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
        if (e.key === "r") {
            if (direction === 'top-left') {
                setDirection('top-right');
            } else if (direction === 'top-right') {
                const tempColor = topColor;
                setTopColor(bottomColor);
                setBottomColor(tempColor);
                setDirection('top-left');
            }

            updateBlock()
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
        if (e.key === "r") {
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
                onDoubleClick={handleKeyDown}
            ></div>
            <div
                className="qst-right"
                style={{ backgroundColor: rightColor }}
                onMouseDown={handleRightClick}
                onMouseOver={handleRightMouseOver}
                onDoubleClick={handleKeyDown}
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

const QuiltBlock = ({ block, mouseDown, currentColor, onChange }) => {
    switch (block.type) {
        case "full-square":
            return <FullSquare
                block={block}
                mouseDown={mouseDown}
                currentColor={currentColor}
                onChange={onChange}
            />;
        case "half-square-triangle":
            return <HalfSquare
                block={block}
                mouseDown={mouseDown}
                currentColor={currentColor}
                onChange={onChange}
            />;
        case "quarter-square-triangle":
            return <QuarterSquare
                block={block}
                mouseDown={mouseDown}
                currentColor={currentColor}
                onChange={onChange}
            />;
        default:
            return <FullSquare color='lightgrey' />;
    }
}

export default QuiltBlock;