'use client'

import { CONTACT_LINKS } from '../constants'
import FadeIn from './motion/FadeIn'
import { StaggerContainer, StaggerItem } from './motion/StaggerContainer'

export default function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="section-divider" style={{ marginBottom: 100 }} />
      <div className="contact-grid">
        <FadeIn direction="left">
          <div>
            <p className="section-label">Contact</p>
            <h2 className="section-title" id="contact-heading">
              Let&apos;s connect.
            </h2>
            <p className="section-body">
              If you want to talk AI, cloud, open source, speaking, or just swap ideas, I&apos;d love to hear from you.
            </p>
          </div>
        </FadeIn>
        <StaggerContainer stagger={0.08}>
          <nav className="contact-links" aria-label="Contact options">
            {CONTACT_LINKS.map(({ label, href, external }) => (
              <StaggerItem key={href} direction="right">
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="contact-link-item"
                >
                  <span>{label}</span>
                  <span className="contact-link-arrow" aria-hidden="true">↗</span>
                </a>
              </StaggerItem>
            ))}
          </nav>
        </StaggerContainer>
      </div>
    </section>
  )
}
