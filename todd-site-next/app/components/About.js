'use client'

import FadeIn from './motion/FadeIn'
import { StaggerContainer, StaggerItem } from './motion/StaggerContainer'

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="section-divider" style={{ marginBottom: 100 }} />
      <div className="about-grid">
        <FadeIn direction="left">
          <div className="about-text">
            <p className="section-label">About</p>
            <h2 className="section-title" id="about-heading">
              Chief AI Officer.<br />Vision-driven leadership.
            </h2>
            <p>
              I set the technology direction at the intersection of <strong>AI, cloud, and infrastructure</strong> — not just to push boundaries, but to create measurable business impact. I define the strategy, align the teams, and make sure we deliver.
            </p>
            <p>
              I&apos;m an <strong>AWS Ambassador</strong> and three-time award winner, including Top Global Ambassador in 2023 and #1 in North America in both 2022 and 2024. I hold all 12 AWS certifications alongside credentials across Azure, Kubernetes, and GCP, totaling 30+.
            </p>
            <p>
              I invest in growing teams and elevating the people around me. I&apos;ve spoken at <strong>AWS Summits</strong> on topics from mainframe modernization to real-time AI inference, and I publish thought leadership on agentic AI, MLOps, and cloud architecture to help others move faster.
            </p>
            <p>
              Before tech, I served in the <strong>United States Marine Corps</strong>, earning two meritorious promotions. That discipline, ownership mindset, and bias for action still shape how I lead, execute, and show up.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer stagger={0.08} className="about-sidebar">
          <StaggerItem direction="right">
            <div className="about-card highlight">
              <span className="about-card-label">Current Focus</span>
              <span className="about-card-value">Driving business outcomes through AI strategy</span>
              <span className="about-card-sub">Leading teams, setting direction · Charlotte, NC</span>
            </div>
          </StaggerItem>
          <StaggerItem direction="right">
            <div className="about-card highlight">
              <span className="about-card-label">AWS Ambassador Awards</span>
              <span className="about-card-value">#1 North America 2022 &amp; 2024</span>
              <span className="about-card-sub">Top Global Ambassador 2023</span>
            </div>
          </StaggerItem>
          <StaggerItem direction="right">
            <div className="about-card">
              <span className="about-card-label">Certifications</span>
              <span className="about-card-value">30+ Cloud Certifications</span>
              <span className="about-card-sub">AWS (all 12) · Azure · Kubernetes · GCP</span>
            </div>
          </StaggerItem>
          <StaggerItem direction="right">
            <div className="about-card">
              <span className="about-card-label">Education</span>
              <span className="about-card-value">MBA · Winthrop University</span>
              <span className="about-card-sub">Bachelor of Science</span>
            </div>
          </StaggerItem>
          <StaggerItem direction="right">
            <div className="about-card">
              <span className="about-card-label">Military Service</span>
              <span className="about-card-value">US Marine Corps</span>
              <span className="about-card-sub">Two meritorious promotions · Red Cross Hero Award</span>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  )
}
