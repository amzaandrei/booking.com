import React from "react";
import './Header.css';

function Header() {
    return(
        <div className="Header">
            <ul >
                <li style = {{float: "left"}}className="home"><a href="#home">Home</a></li>
                <li className="apartaments"><a href="#apartaments">Apartaments</a></li>
                <li className="photos"><a href="#photos">Photos</a></li>
                <li className="about"><a href="#about">About</a></li>
                <li className="contact"><a href="#contact">Contact</a></li>
            </ul>

        </div>
    );

}

export default Header

