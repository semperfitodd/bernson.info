import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <h1>Josephine Bernson</h1>
            <h3>Revenue Leadership. Market Influence. Trusted Voice.</h3>
            <p className="subheadline">
                Recognized for building, scaling, and leading high-performing revenue organizations across complex, competitive markets.
            </p>
            <div className="cta-buttons">
                <a 
                    href="https://www.linkedin.com/in/josephine-bernson/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="button button-primary"
                    aria-label="Connect with Josephine on LinkedIn"
                >
                    LinkedIn
                </a>
                <a 
                    href="#speaking" 
                    className="button"
                    aria-label="Speaking and Advisory information"
                >
                    Speaking & Advisory
                </a>
                <a 
                    href="#contact" 
                    className="button"
                    aria-label="Contact Josephine"
                >
                    Contact
                </a>
            </div>
        </section>
    );
};

export default Hero;


