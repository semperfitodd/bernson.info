'use client'

import { IMPACT_STATS } from '../constants'
import FadeIn from './motion/FadeIn'
import { StaggerContainer, StaggerItem } from './motion/StaggerContainer'
import AnimatedCounter from './motion/AnimatedCounter'

export default function Impact() {
  return (
    <div className="impact" role="region" aria-label="Career highlights">
      <div className="section-divider" />
      <div className="impact-inner">
        <FadeIn>
          <p className="section-label">By the Numbers</p>
        </FadeIn>
        <StaggerContainer stagger={0.1} className="impact-grid">
          {IMPACT_STATS.map(({ value, label }) => (
            <StaggerItem key={label}>
              <div className="impact-stat">
                <AnimatedCounter value={value} className="impact-value" />
                <div className="impact-label">{label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
      <div className="section-divider" />
    </div>
  )
}
