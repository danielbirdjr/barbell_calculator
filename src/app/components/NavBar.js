"use client";

import React, { useState } from 'react';
import './NavBar.css'; 
import { FiMenu } from "react-icons/fi";
import { FiX } from "react-icons/fi";

const NavBar = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    
    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const closeDropdown = () => {
        setIsDropdownVisible(false);
    }

    return (
        <nav className="navbar">

            <div className="navbar-content">
                <a href="/" className="navbar-logo">The Name</a>
                <button className={`menu-icon ${isDropdownVisible ? "hidden" : ""}`} onClick={toggleDropdown}>
                    <FiMenu />
                </button>
                <button className={`menu-icon close-menu ${isDropdownVisible ? "" : "hidden"}`} onClick={closeDropdown} >
                    <FiX />
                </button>
            </div>
            <ul className={`dropdown-menu ${isDropdownVisible ? "visible" : ""}`}>
                <li><a href="/barbell-calculator">Barbell Calculator</a></li>
                <li><a href="/rm-calculator">1 Rep Max Calculator</a></li>
                <li><a href="/rm-calculator">Reps by RM Calculator</a></li>
                <li><a href="https://progressai.vercel.app/" target='_blank'>Fitness App</a></li>
            </ul>

            <ul className="nav-links">
                <li><a href="/barbell-calculator">Barbell Calculator</a></li>
                <li><a href="/rm-calculator">1 Rep Max Calculator</a></li>
                <li><a href="/rm-calculator">Reps by RM Calculator</a></li>
                <li><a href="/">Fitness App</a></li>
            </ul>

        </nav>
    );
};

export default NavBar;
