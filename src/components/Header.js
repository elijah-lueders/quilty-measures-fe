import React from "react";
import "./Header.css";
import logo from "../assets/logo320.png";

function Header() {
    return (
        <div className="header-container">
            <img src={logo} alt="Quilty Measures Logo" className="header-logo" />
            <h1>Quilty Measures</h1>
        </div>
    )
}

export default Header;