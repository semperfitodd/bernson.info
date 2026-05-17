'use client'

import { OPEN_SOURCE_PROJECTS } from '../constants'
import FadeIn from './motion/FadeIn'
import { StaggerContainer, StaggerItem } from './motion/StaggerContainer'
import GlowCard from './motion/GlowCard'

export default function OpenSource() {
  return (
    <section id="opensource" className="section" aria-labelledby="opensource-heading">
      <div className="section-divider" style={{ marginBottom: 100 }} />
      <FadeIn>
        <p className="section-label">Open Source</p>
        <h2 className="section-title" id="opensource-heading">Selected Projects</h2>
        <p className="section-body">
          GitHub is where I share experiments, working systems, and ideas in public across agentic AI, cloud infrastructure, MLOps, and full-stack applications.
        </p>
      </FadeIn>
      <StaggerContainer stagger={0.12} className="opensource-grid">
        {OPEN_SOURCE_PROJECTS.map(({ name, description, topics, url }) => (
          <StaggerItem key={name}>
            <GlowCard
              as="a"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-card"
              aria-label={`View ${name} on GitHub`}
            >
              <span className="repo-name">{name}</span>
              <p className="repo-description">{description}</p>
              <div className="repo-topics">
                {topics.map((t) => (
                  <span key={t} className="repo-topic">{t}</span>
                ))}
              </div>
            </GlowCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
      <FadeIn delay={0.3}>
        <div className="opensource-footer">
          <a
            href="https://github.com/semperfitodd"
            target="_blank"
            rel="noopener noreferrer"
          >
            View all repositories on GitHub →
          </a>
        </div>
      </FadeIn>
    </section>
  )
}
