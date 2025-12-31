import React, { useState, useCallback } from 'react';
import './styles.css';

const About = () => {
    const [showDetails, setShowDetails] = useState(false);

    const handleToggle = useCallback(() => {
        setShowDetails((prev) => !prev);
    }, []);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
        }
    }, [handleToggle]);

    return (
        <section 
            id="about" 
            className={`section about ${showDetails ? 'expanded' : ''}`} 
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-expanded={showDetails}
            aria-label={showDetails ? 'Click to collapse about section' : 'Click to expand about section'}
        >
            {showDetails ? (
                <div className="content-block">
                    <p>
                        <span>Hi, I'm </span>
                        <span id="name">Todd.</span>
                    </p>
                    <p>
                        I've spent my career at the intersection of people, technology, and transformation. As Chief 
                        AI and Technical Officer at BSC Analytics, I focus on turning ambitious ideas into scalable, 
                        secure, and responsible AI and cloud solutions. My role is to ensure that innovation creates 
                        real business impact and empowers our engineers to deliver exceptional work.
                    </p>
                    <p>
                        I'm an AWS Ambassador and lifelong builder who believes technology only matters when it expands 
                        what people and organizations can achieve. With over 30 certifications across major cloud 
                        platforms (AWS, Azure, and Google Cloud), I bring both technical depth and strategic vision to 
                        every challenge.
                    </p>
                    <p>
                        I'm motivated by the teams I lead, the clients who trust us with their most challenging problems, 
                        and the next generation of leaders we're developing. My experiences as a US Marine and 
                        entrepreneur—starting, running, and selling my own business—taught me invaluable lessons about 
                        discipline, ownership, and continuous learning that shape my leadership today.
                    </p>
                    <p>
                        Outside of work, you'll usually find me in the gym, outdoors with my family, or cheering on my 
                        kids. Discipline, curiosity, and community drive everything I do.
                    </p>
                </div>
            ) : (
                <div className="intro-block">
                    <h1 className="handwritten">Welcome, I'm Todd</h1>
                </div>
            )}
        </section>
    );
};

export default About;