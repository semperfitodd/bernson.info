import React from 'react';
import './Expertise.css';

const EXPERTISE_AREAS = [
    'Revenue growth & go-to-market strategy',
    'Enterprise sales leadership',
    'Market expansion & scaling',
    'Executive operating models',
    'Customer-centric growth strategy',
    'Organizational transformation',
    'Leadership development'
];

const Expertise = () => {
    return (
        <section id="expertise">
            <h2>Areas of Expertise</h2>
            <div className="content-container">
                <ul className="expertise-list">
                    {EXPERTISE_AREAS.map((area, index) => (
                        <li key={index}>{area}</li>
                    ))}
                </ul>
                <p className="expertise-note">Built through years of real-world execution at scale.</p>
            </div>
        </section>
    );
};

export default Expertise;