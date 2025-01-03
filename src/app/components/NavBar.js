"use client";

import React, { useState } from 'react';
import Link from "next/link";
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
                <Link href="/" className="navbar-logo">The Name</Link>
                <button className={`menu-icon ${isDropdownVisible ? "hidden" : ""}`} onClick={toggleDropdown}>
                    <FiMenu />
                </button>
                <button className={`menu-icon close-menu ${isDropdownVisible ? "" : "hidden"}`} onClick={closeDropdown} >
                    <FiX />
                </button>
            </div>
            <ul className={`dropdown-menu ${isDropdownVisible ? "visible" : ""}`}>
                <li><Link href="/barbell-calculator">Barbell Calculator</Link></li>
                <li><Link href="/rm-calculator">1 Rep Max Calculator</Link></li>
                <li><Link href="/rm-calculator">Reps by RM Calculator</Link></li>
                <li><Link href="https://progressai.vercel.app/" target='_blank'>Fitness App</Link></li>
            </ul>

            <ul className="nav-links">
                <li><Link href="/barbell-calculator">Barbell Calculator</Link></li>
                <li><Link href="/rm-calculator">1 Rep Max Calculator</Link></li>
                <li><Link href="/rm-calculator">Reps by RM Calculator</Link></li>
                <li><Link href="https://progressai.vercel.app/" target='_blank'>Fitness App</Link></li>
            </ul>

        </nav>
    );
};

export default NavBar;
