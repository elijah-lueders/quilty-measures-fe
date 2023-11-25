import React, { useState } from 'react';
import ColorSwatches from './ColorSwatches';
import './QuiltGrid.css'; // Import the CSS file
import QuiltBlock from './QuiltBlock';

function QuiltGrid() {
    const [gridSize, setGridSize] = useState(2);
    const [availableColors, setAvailableColors] = useState(['black', 'white']);
    const [currentColor, setCurrentColor] = useState(availableColors[0]);
    const [mouseDown, setMouseDown] = useState(false);
    const [colorInput, setColorInput] = useState(availableColors.join(', '));
    const [quiltName, setFilename] = useState('quilt');

    const defaultGrid = Array(gridSize).fill().map(() => Array(gridSize).fill({ 'top': 'black', 'top-right': 'white', 'bottom-left': 'white', 'bottom-right': 'white' }));
    const [grid, setGrid] = useState(defaultGrid);

    const handleBlockChange = (row, col, position) => {
        const newGrid = [...grid];
        newGrid[row][col][position] = currentColor;
        setGrid(newGrid);
    };

    const updateColors = () => {
        console.log(grid)
        const newColors = colorInput.split(',').map(color => color.trim());
        setAvailableColors(newColors);
        setColorInput(newColors.join(', '));
        
    };

    const saveQuilt = () => {
        const quilt = {
            id: Date.now(),
            gridSize,
            colors: availableColors,
            quiltBlocks: grid
        };
        const json = JSON.stringify(quilt);
        const blob = new Blob([json], {type: "application/json"});
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        const newFilename = prompt("Enter filename", quiltName);
        if (newFilename !== null) {
            link.download = newFilename;
            setFilename(newFilename);
        } else {
            link.download = quiltName;
        }        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const loadQuilt = (event) => {
        const file = event.target.files[0];
        setFilename(file.name.split('.')[0]);
        const reader = new FileReader();
        reader.onload = (event) => {
            const quilt = JSON.parse(event.target.result);
            setGridSize(quilt.gridSize);
            setAvailableColors(quilt.colors);
            setGrid(quilt.quiltBlocks);
        };
        reader.readAsText(file);
    };


    return (
        <div className="quilt-grid-container"
            onMouseDown={() => setMouseDown(true)}
            onMouseUp={() => setMouseDown(false)}
            onMouseLeave={() => setMouseDown(false)}>
            <ColorSwatches colors={availableColors} onColorSelect={setCurrentColor} />

            <input value={colorInput} onChange={e => setColorInput(e.target.value)} placeholder="Enter colors, separated by commas" />
            <button onClick={updateColors}>Update Colors</button>
            <button onClick={saveQuilt}>Save Quilt</button>
            <input type="file" onChange={loadQuilt} />

            <div className="quilt-grid">
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="quilt-row">
                        {row.map((block, colIndex) => (
                            <QuiltBlock 
                                key={block.id} 
                                block={block} 
                                onChange={handleBlockChange}
                                mouseDown={mouseDown}
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