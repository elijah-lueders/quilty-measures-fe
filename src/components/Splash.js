import React from 'react';
import logo from '../assets/logo.png';
import './Splash.css';

function Splash() {
    return (
        <div className="splash-container">
            <img src={logo} alt="Quilty Measures" />
            <br />
            <h1>Quilty Measures</h1>
        </div>
    );
}

export default Splash;
