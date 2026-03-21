'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'

export default function Articles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchArticles = useCallback(async () => {
    try {
      const response = await fetch('/articles.json')
      if (!response.ok) throw new Error()
      setArticles(await response.json())
    } catch {
      setArticles([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchArticles() }, [fetchArticles])

  return (
    <section id="articles" className="section articles" aria-labelledby="articles-heading">
      <p className="section-label">Writing</p>
      <h2 className="section-title" id="articles-heading">Latest Articles</h2>
      <p className="section-body">
        Published on the BSC Analytics Insights blog and across the developer community.
      </p>
      {loading && (
        <p className="articles-empty" style={{ marginTop: '48px' }}>Loading articles…</p>
      )}
      {!loading && articles.length === 0 && (
        <p className="articles-empty" style={{ marginTop: '48px' }}>Articles coming soon.</p>
      )}
      {!loading && articles.length > 0 && (
        <div className="articles-grid">
          {articles.map((article, i) => (
            <a
              key={article.url || i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="article-card"
              aria-label={`Read: ${article.title}`}
            >
              <Image
                src={article.thumbnail}
                alt={article.title}
                className="article-thumbnail"
                loading="lazy"
                width={360}
                height={180}
                unoptimized
              />
              <div className="article-info">
                <h3 className="article-title">{article.title}</h3>
                {article.read_time && (
                  <span className="article-meta">{article.read_time}</span>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  )
}
