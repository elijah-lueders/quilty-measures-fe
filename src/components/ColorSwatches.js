import React, { useState } from 'react';
import './ColorSwatches.css';

function ColorSwatches({ colors, onColorSelect }) {
    const [selectedColor, setSelectedColor] = useState(colors[0]);

    const handleColorClick = (color) => {
        setSelectedColor(color);
        onColorSelect(color);
    }

    return (
        <div className="color-swatches">
            {colors.map((color, index) => (
                <div
                    key={index}
                    className="color-swatch"
                    style={{ background: color, border: color === selectedColor ? '2px solid black' : 'none' }}
                    onClick={() => handleColorClick(color)}
                />
            ))}
        </div>
    );
}

export default ColorSwatches;
