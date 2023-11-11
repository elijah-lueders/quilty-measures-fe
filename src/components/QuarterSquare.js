import React from 'react';
import './QuiltBlock.css';

function QuarterSquare({ color1, color2, color3, color4 }) {
    return (
        <div className="quilt-block-qst">
            <div style={{ background: color1 }}></div>
            <div style={{ background: color2 }}></div>
            <div style={{ background: color3 }}></div>
            <div style={{ background: color4 }}></div>
        </div>
    );
}

export default QuarterSquare;