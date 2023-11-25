import React, { useState, useEffect } from 'react';
import './ColorSwatches.css';

function ColorSwatches({ colors, onColorSelect }) {
    const [selectedColor, setSelectedColor] = useState(colors[0]);

    const handleColorClick = (color) => {
        setSelectedColor(color);
        onColorSelect(color);
    };
    const handleKeyDown = (e) => {
        const number = parseInt(e.key);
        // get the character code of the key pressed
        const code = e.keyCode || e.which;
        if (number >= 1 && number <= colors.length) {
            setSelectedColor(colors[number - 1]);
            onColorSelect(colors[number - 1]);
        }
        // else if the code is for '-'
        else if (code === 189) {
            const index = colors.indexOf(selectedColor);
            setSelectedColor(colors[(index + colors.length - 1) % colors.length]);
            onColorSelect(colors[(index + colors.length - 1) % colors.length]);
        }
        // else if the code is for '='
        else if (code === 187) {
            const index = colors.indexOf(selectedColor);
            setSelectedColor(colors[(index + 1) % colors.length]);
            onColorSelect(colors[(index + 1) % colors.length]);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    return (
        <div className="color-swatches" role="listbox" tabIndex="0">
            {colors.map((color) => (
                <div
                    key={color}
                    className="color-swatch"
                    role="option"
                    aria-selected={color === selectedColor}
                    style={{
                        background: color,
                        borderRadius: color === selectedColor ? '50%' : '1%',
                    }}
                    onClick={() => handleColorClick(color)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            handleColorClick(color);
                        }
                    }}
                    tabIndex="0"
                />
            ))}
        </div>
    );
}

export default ColorSwatches;