'use client'

import { SPEAKING_TALKS } from '../constants'
import FadeIn from './motion/FadeIn'
import { StaggerContainer, StaggerItem } from './motion/StaggerContainer'

export default function Speaking() {
  return (
    <section id="speaking" className="section" aria-labelledby="speaking-heading">
      <div className="section-divider" style={{ marginBottom: 100 }} />
      <FadeIn>
        <p className="section-label">Speaking</p>
        <h2 className="section-title" id="speaking-heading">AWS Summits</h2>
        <p className="section-body">
          I speak at AWS Summits about AI, infrastructure modernization, and MLOps, usually through the lens of lessons learned building real systems.
        </p>
      </FadeIn>
      <StaggerContainer stagger={0.08}>
        <ol className="speaking-list" aria-label="Conference talks">
          {SPEAKING_TALKS.map(({ event, title }) => (
            <StaggerItem key={title} direction="left">
              <li className="speaking-item">
                <span className="speaking-event">{event}</span>
                <span className="speaking-title">{title}</span>
              </li>
            </StaggerItem>
          ))}
        </ol>
      </StaggerContainer>
    </section>
  )
}
