"use client";

import React, { useState, useEffect } from 'react';
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

    // Collapse menu when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            const dropdownMenu = document.querySelector(".dropdown-menu");
            const menuIcon = document.querySelector(".menu-icon");

            if (
                dropdownMenu &&
                !dropdownMenu.contains(event.target) &&
                !menuIcon.contains(event.target)
            ) {
                closeDropdown();
            }
        };

        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    // Automatically close the dropdown when navigating
    useEffect(() => {
        const navLinks = document.querySelectorAll(".dropdown-menu a");

        const handleLinkClick = () => {
            closeDropdown();
        };

        navLinks.forEach((link) =>
            link.addEventListener("click", handleLinkClick)
        );

        return () => {
            navLinks.forEach((link) =>
                link.removeEventListener("click", handleLinkClick)
            );
        };
    }, []);


    return (
        <nav className="navbar">

            <div className="navbar-content">
                <Link href="/" className="navbar-logo">The Name</Link>
                <button className={`menu-icon ${isDropdownVisible ? "hidden" : ""}`} onClick={toggleDropdown}><FiMenu /></button>
                <button className={`menu-icon close-menu ${isDropdownVisible ? "" : "hidden"}`} onClick={closeDropdown} ><FiX /></button>
            </div>
            <ul className={`dropdown-menu ${isDropdownVisible ? "visible" : ""}`}>
                <li><Link href="/barbell-calculator">Barbell Calculator</Link></li>
                {/* <li><Link href="/rm-calculator">1 RM Calculator</Link></li>
                <li><Link href="/rm-calculator">Weight for Reps Calculator</Link></li> */}
                <li><Link href="/rm-calculator?calculator=1RM">1 RM Calculator</Link></li>
                <li><Link href="/rm-calculator?calculator=Weight-for-Reps">Weight for Reps Calculator</Link></li>
                <li><Link href="https://progressai.vercel.app/" target='_blank'>Fitness App</Link></li>
            </ul>

            <ul className="nav-links">
                <li><Link href="/barbell-calculator">Barbell Calculator</Link></li>
                <li><Link href="/rm-calculator">RM Calculators</Link></li>
                <li className='fitness-app'><Link href="https://progressai.vercel.app/" target='_blank'>Fitness App</Link></li>
            </ul>

        </nav>
    );
};

export default NavBar;
