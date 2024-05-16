import React, {useEffect, useState} from 'react';
import './styles.css';

const Articles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch('/articles.json')
            .then(response => response.json())
            .then(data => setArticles(data))
            .catch(error => console.error('Error fetching articles:', error));
    }, []);

    return (
        <section id="articles" className="section articles">
            <div className="articles-grid">
                {articles.map((article, index) => (
                    <a href={article.url} target="_blank" rel="noopener noreferrer" key={index}
                       className="article-card">
                        <img src={article.thumbnail} alt={article.title} className="article-thumbnail"/>
                        <div className="article-info">
                            <h3>{article.title}</h3>
                            <p>{article.read_time}</p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default Articles;
