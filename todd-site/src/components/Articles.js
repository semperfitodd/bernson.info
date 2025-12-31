import React, { useEffect, useState, useCallback } from 'react';
import './styles.css';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchArticles = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('/articles.json');
            
            if (!response.ok) {
                throw new Error('Failed to fetch articles');
            }
            
            const data = await response.json();
            setArticles(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching articles:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    if (loading) {
        return (
            <section id="articles" className="section articles">
                <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    Loading articles...
                </p>
            </section>
        );
    }

    if (error) {
        return (
            <section id="articles" className="section articles">
                <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    Articles will be available soon.
                </p>
            </section>
        );
    }

    if (articles.length === 0) {
        return (
            <section id="articles" className="section articles">
                <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    No articles available at the moment.
                </p>
            </section>
        );
    }

    return (
        <section id="articles" className="section articles" aria-labelledby="articles-heading">
            <div className="articles-grid">
                {articles.map((article, index) => (
                    <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        key={article.url || index}
                        className="article-card"
                        aria-label={`Read article: ${article.title}`}
                    >
                        <img 
                            src={article.thumbnail} 
                            alt="" 
                            className="article-thumbnail"
                            loading="lazy"
                        />
                        <div className="article-info">
                            <h3>{article.title}</h3>
                            {article.read_time && <p>{article.read_time}</p>}
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default Articles;
