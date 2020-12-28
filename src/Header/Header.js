import React, { useContext } from "react";
import './Header.css';
import { UserContext } from '../providers/UserProvider'

import { Link } from "react-router-dom"


function Header() {

    const user = useContext(UserContext)

    console.log(user)

    return(
        <div className="Header">
            <ul >
                <li style = {{float: "left"}}className="home"><a href="#home">Home</a></li>
                { user ? 
                (
                    <Link to="/profile" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        <li className="signup">{ user.displayName }</li>    
                    </Link>
                ) : (
                        <Link to="/signup" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        <li className="signup">Sign up</li>    
                        </Link>
                    )
                }
                <li className="apartaments"><a href="#apartaments">Apartaments</a></li>
                <li className="photos"><a href="#photos">Photos</a></li>
                <li className="about"><a href="#about">About</a></li>
                <li className="contact"><a href="#contact">Contact</a></li>
            </ul>

        </div>
    );

}

export default Header

