import React, { useState } from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="hamburger-icon" onClick={toggleMenu}>
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </div>
            {isOpen && (
                <nav className="mobile-nav">
                    <ul className="mobile-nav-links">
                        <li><a href="#about" onClick={toggleMenu}>About</a></li>
                        <li><a href="#articles" onClick={toggleMenu}>Articles</a></li>
                        <li><a href="#achievements" onClick={toggleMenu}>Achievements</a></li>
                    </ul>
                </nav>
            )}
        </>
    );
};

export default MobileMenu;
