import React, { useEffect, useState, useCallback } from 'react';
import classNames from 'classnames';
import ProfilePic from '../profile_pic.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NAV_ITEMS, SOCIAL_LINKS } from '../constants';
import './styles.css';

const Home = () => {
    const [activeSection, setActiveSection] = useState('about');

    const handleIntersection = useCallback((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
            }
        });
    }, []);

    useEffect(() => {
        const sections = document.querySelectorAll('main section');
        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: '0px',
            threshold: 0.6
        });

        sections.forEach((section) => observer.observe(section));
        return () => sections.forEach((section) => observer.unobserve(section));
    }, [handleIntersection]);

    return (
        <div className="home">
            <div className="sidebar-header">
                <h1 className="name">
                    <a href="/" aria-label="Todd Bernson - Home">Todd Bernson</a>
                </h1>
                <div className="profile-pic-container">
                    <img 
                        src={ProfilePic} 
                        alt="Todd Bernson - Chief AI & Technical Officer" 
                        className="profile-pic"
                        loading="eager"
                    />
                </div>
                <div className="title-section">
                    <p className="job-title">Chief AI & Technical Officer</p>
                    <p className="subtitle">AWS Ambassador</p>
                </div>
            </div>
            
            <nav className="side-nav" aria-label="Main navigation">
                <ul className="nav-links">
                    {NAV_ITEMS.map(({ id, label }) => (
                        <li key={id}>
                            <a 
                                href={`#${id}`} 
                                className={classNames({ active: activeSection === id })}
                                aria-label={`Navigate to ${label} section`}
                                aria-current={activeSection === id ? 'page' : undefined}
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            
            <div className="sidebar-footer">
                <div className="social-icons" role="navigation" aria-label="Social media links">
                    {SOCIAL_LINKS.map(({ href, icon, label }) => (
                        <a 
                            key={href}
                            href={href} 
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            aria-label={label}
                        >
                            <FontAwesomeIcon icon={icon} aria-hidden="true" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
