import React from 'react';
import './styles.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="footer" role="contentinfo">
            <p>&copy; {currentYear} Todd Bernson. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
