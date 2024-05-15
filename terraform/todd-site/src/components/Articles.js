import React from 'react';
import './styles.css';

const Articles = () => {
    return (
        <section id="articles" className="section articles">
            <div>
                <h2>Read My Latest Articles</h2>
                <p>Check out my latest thoughts on technology and leadership on LinkedIn:</p>
                <a href="https://www.linkedin.com/in/todd-bernson/recent-activity/articles/" target="_blank"
                   rel="noopener noreferrer">
                    Visit My LinkedIn Articles
                </a>
            </div>
        </section>
    );
};

export default Articles;
