import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import ProfilePic from '../profile_pic.png';
import './styles.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAward, faCalendarAlt, faEnvelope, faNewspaper, faUser} from '@fortawesome/free-solid-svg-icons';
import {faLinkedin} from '@fortawesome/free-brands-svg-icons';

const Home = () => {
    const [activeSection, setActiveSection] = useState('about');

    useEffect(() => {
        const sections = document.querySelectorAll('main section');
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.6
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, options);

        sections.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            sections.forEach((section) => {
                observer.unobserve(section);
            });
        };
    }, []);

    return (
        <div className="home">
            <h1 className="name">
                <a href="/" style={{textDecoration: 'none', color: 'inherit'}}>Todd Bernson</a>
            </h1>
            <div className="profile-pic-container">
                <img src={ProfilePic} alt="Todd Bernson" className="profile-pic"/>
                <h2 className="name-h2">Lifelong Learner <br/> Innovator <br/> Tech Leader</h2>
            </div>
            <nav className="side-nav">
                <ul className="nav-links">
                    <li>
                        <FontAwesomeIcon icon={faUser}/>
                        <a href="#about" className={classNames({active: activeSection === 'about'})}>About</a>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faNewspaper}/>
                        <a href="#articles" className={classNames({active: activeSection === 'articles'})}>Articles</a>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faAward}/>
                        <a href="#achievements"
                           className={classNames({active: activeSection === 'achievements'})}>Achievements</a>
                    </li>
                </ul>
            </nav>
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
        </div>
    );
};

export default Home;
