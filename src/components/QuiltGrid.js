import React, { useState, useEffect } from 'react';
import ColorSwatches from './ColorSwatches';
import './QuiltGrid.css'; // Import the CSS file
import QuiltBlock from './QuiltBlock';

function QuiltGrid() {
    const [gridSize, setGridSize] = useState(8);
    const [availableColors, setAvailableColors] = useState(['black', 'white']);
    const [currentColor, setCurrentColor] = useState(availableColors[0]);
    const [mouseDown, setMouseDown] = useState(false);
    const [colorInput, setColorInput] = useState(availableColors.join(' | '));
    const [quiltName, setFilename] = useState('quilt');
    const [quilt, setQuilt] = useState(null);

    const [grid, setGrid] = useState([]);

    useEffect(() => {
        loadDefaultQuilt();
    }, []);

    const handleBlockChange = (row, col, newBlock) => {
        const newGrid = [...grid];
        newGrid[row][col] = newBlock;
        setGrid(newGrid);
    };

    const updateColors = () => {
        const newColors = colorInput.split(' |').map(color => color.trim());
        setAvailableColors(newColors);
        setColorInput(newColors.join(' | '));
    };

    const saveQuilt = () => {
        const quilt = {
            id: Date.now(),
            gridSize,
            colors: availableColors,
            quiltBlocks: grid,
        };
        const json = JSON.stringify(quilt);
        const blob = new Blob([json], { type: "application/json" });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        const newFilename = prompt("Enter filename", quiltName);
        if (newFilename !== null) {
            link.download = newFilename;
            setFilename(newFilename);
        } else {
            link.download = quiltName;
        } document.body.appendChild(link);
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
            setQuilt(quilt);
            setColorInput(quilt.colors.join(' | '));
        };
        reader.readAsText(file);
    };


    async function loadDefaultQuilt() {
        try {
            const response = await fetch('/default_quilt.json');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const quilt = await response.json();
            setGridSize(quilt.gridSize);
            setAvailableColors(quilt.colors);
            setGrid(quilt.quiltBlocks);
            setQuilt(quilt);
            setColorInput(quilt.colors.join(' | '));
        } catch (error) {
            console.error('Error loading default quilt:', error);
        }
    }


    // log all the state variables when click this button
    const logState = () => {
        console.log(`gridSize: ${gridSize}`);
        console.log(`availableColors: ${availableColors}`);
        console.log(`currentColor: ${currentColor}`);
        console.log(`mouseDown: ${mouseDown}`);
        console.log(`colorInput: ${colorInput}`);
        console.log(`quiltName: ${quiltName}`);
        console.log(`quilt: ${quilt}`);
        // print all the blocks and their properties
        console.log(`grid: ${grid}`);
        grid.forEach((row, rowIndex) => {
            row.forEach((block, colIndex) => {
                console.log(`block[${rowIndex}][${colIndex}]: ${block}`);
                console.log(`block[${rowIndex}][${colIndex}].type: ${block.type}`);
                console.log(`block[${rowIndex}][${colIndex}].color: ${block.color}`);
                console.log(`block[${rowIndex}][${colIndex}].topColor: ${block.topColor}`);
                console.log(`block[${rowIndex}][${colIndex}].bottomColor: ${block.bottomColor}`);
                console.log(`block[${rowIndex}][${colIndex}].direction: ${block.direction}`);
            });
        });

    };


    return (
        <div className="quilt-grid-container"
            onMouseDown={() => setMouseDown(true)}
            onMouseUp={() => setMouseDown(false)}
            onMouseLeave={() => setMouseDown(false)}>
            <ColorSwatches colors={availableColors} onColorSelect={setCurrentColor} />

            <input className='colors-input' value={colorInput} onChange={e => setColorInput(e.target.value)} placeholder="Enter colors, separated by commas" />
            <br></br>
            <button onClick={updateColors}>Update Colors</button>
            <button onClick={saveQuilt}>Save Quilt</button>
            <input type="file" onChange={loadQuilt} />

            <div className="quilt-grid">
                {(quilt ? quilt.quiltBlocks : grid).map((row, rowIndex) => (
                    <div key={rowIndex} className="quilt-row">
                        {row.map((block, colIndex) => (
                            <QuiltBlock
                                key={colIndex}
                                block={block}
                                onChange={(newBlock) => handleBlockChange(rowIndex, colIndex, newBlock)}
                                mouseDown={mouseDown}
                                currentColor={currentColor}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <button onClick={logState}>Log State</button>
        </div>
    );
}

export default QuiltGrid;