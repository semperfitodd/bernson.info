import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Articles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const accessToken = localStorage.getItem('linkedin_access_token');

            if (!accessToken) return;

            try {
                const response = await axios.get('https://api.linkedin.com/v2/shares', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        q: 'owners',
                        owners: 'urn:li:person:YOUR_LINKEDIN_ID',
                    },
                });

                setArticles(response.data.elements);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []);

    return (
        <div>
            <h1>Recent Articles</h1>
            <ul>
                {articles.map((article) => (
                    <li key={article.id}>{article.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default Articles;
