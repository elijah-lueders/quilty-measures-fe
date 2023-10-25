import React, { useState } from 'react';
import ColorSwatches from './ColorSwatches';
import QuiltBlock from './QuiltBlock'; // Assuming you have this component from earlier instructions
import './QuiltGrid.css'; // Import the CSS file

function QuiltGrid() {
    const gridSize = 5;
    const availableColors = ['red', 'orange', 'yellow',];
    const [currentColor, setCurrentColor] = useState(availableColors[0]);

    // Initialize the grid with default color
    const defaultGrid = Array(gridSize).fill().map(() => Array(gridSize).fill({ left: 'white', right: 'white' }));
    const [grid, setGrid] = useState(defaultGrid);

    const handleBlockChange = (row, col, position) => {
        // Clone the grid to ensure immutability
        const newGrid = [...grid];
        newGrid[row][col][position] = currentColor;

        setGrid(newGrid);
    };

    return (
        <div className="quilt-grid-container">
            <ColorSwatches colors={availableColors} onColorSelect={setCurrentColor} />

            <div className="quilt-grid">
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="quilt-row">
                        {row.map((block, colIndex) => (
                            <QuiltBlock
                                key={colIndex}
                                row={rowIndex}
                                col={colIndex}
                                onChange={handleBlockChange}
                                colors={block}
                                currentColor={currentColor}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuiltGrid;
