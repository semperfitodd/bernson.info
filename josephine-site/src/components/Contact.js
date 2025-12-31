import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="contact">
            <h2>Connect</h2>
            <div className="content-container">
                <div className="contact-options">
                    <a
                        href="mailto:josephine@bernson.info"
                        className="contact-link"
                        aria-label="Email Josephine Bernson"
                    >
                        josephine@bernson.info
                    </a>
                    <a
                        href="https://www.linkedin.com/in/josephine-bernson/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link"
                        aria-label="Connect with Josephine on LinkedIn"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;