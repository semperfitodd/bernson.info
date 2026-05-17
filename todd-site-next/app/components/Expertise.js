'use client'

import { EXPERTISE_AREAS } from '../constants'
import FadeIn from './motion/FadeIn'
import { StaggerContainer, StaggerItem } from './motion/StaggerContainer'
import GlowCard from './motion/GlowCard'

export default function Expertise() {
  return (
    <section id="expertise" className="section" aria-labelledby="expertise-heading">
      <div className="section-divider" style={{ marginBottom: 100 }} />
      <FadeIn>
        <p className="section-label">Expertise</p>
        <h2 className="section-title" id="expertise-heading">
          Technology leadership grounded in<br />AI, cloud, and execution.
        </h2>
      </FadeIn>
      <StaggerContainer stagger={0.12} className="expertise-grid">
        {EXPERTISE_AREAS.map(({ category, items }) => (
          <StaggerItem key={category}>
            <GlowCard className="expertise-card">
              <h3 className="expertise-category">{category}</h3>
              <ul className="expertise-items">
                {items.map((item) => (
                  <li key={item} className="expertise-item">{item}</li>
                ))}
              </ul>
            </GlowCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  )
}
