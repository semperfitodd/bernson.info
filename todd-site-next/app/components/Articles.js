'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import FadeIn from './motion/FadeIn'
import { StaggerContainer, StaggerItem } from './motion/StaggerContainer'
import GlowCard from './motion/GlowCard'

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
    <section id="articles" className="section" aria-labelledby="articles-heading">
      <div className="section-divider" style={{ marginBottom: 100 }} />
      <FadeIn>
        <p className="section-label">Writing</p>
        <h2 className="section-title" id="articles-heading">Latest Articles</h2>
        <p className="section-body">
          Published on the BSC Analytics Insights blog and across the developer community.
        </p>
      </FadeIn>
      {loading && (
        <p className="articles-empty" style={{ marginTop: '48px' }}>Loading articles…</p>
      )}
      {!loading && articles.length === 0 && (
        <p className="articles-empty" style={{ marginTop: '48px' }}>Articles coming soon.</p>
      )}
      {!loading && articles.length > 0 && (
        <StaggerContainer stagger={0.1} className="articles-grid">
          {articles.map((article, i) => (
            <StaggerItem key={article.url || i}>
              <GlowCard
                as="a"
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
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </section>
  )
}
