import React, {useState} from 'react';
import './styles.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faCalendarAlt, faEnvelope, faTimes} from '@fortawesome/free-solid-svg-icons';
import {faLinkedin} from '@fortawesome/free-brands-svg-icons';

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="hamburger-icon" onClick={toggleMenu}>
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars}/>
            </div>
            {isOpen && (
                <nav className="mobile-nav">
                    <ul className="mobile-nav-links">
                        <li><a href="#about" onClick={toggleMenu}>About</a></li>
                        <li><a href="#articles" onClick={toggleMenu}>Articles</a></li>
                        <li><a href="#achievements" onClick={toggleMenu}>Achievements</a></li>
                    </ul>
                    <div className="social-icons">
                        <a href="https://www.linkedin.com/in/todd-bernson/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin}/>
                        </a>
                        <a href="mailto:todd@bernsonfamily.com">
                            <FontAwesomeIcon icon={faEnvelope}/>
                        </a>
                        <a href="https://calendly.com/todd-bernson" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faCalendarAlt}/>
                        </a>
                    </div>
                </nav>
            )}
        </>
    );
};

export default MobileMenu;
