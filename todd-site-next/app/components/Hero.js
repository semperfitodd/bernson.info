import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SOCIAL_LINKS } from '../constants'

export default function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" aria-hidden="true" />
          AWS Ambassador · 3× Award Winner
        </div>
        <h1 className="hero-name">Todd<br />Bernson</h1>
        <p className="hero-title">
          Technical depth with executive presence
        </p>
        <p className="hero-description">
          I build <strong>practical AI and cloud systems</strong> that create real business impact, and I love building strong teams around the work.
          AWS Ambassador with 30+ certifications. AWS Summit speaker. US Marine veteran.
        </p>
        <div className="hero-actions">
          <a
            href="https://www.linkedin.com/in/todd-bernson/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            aria-label="Connect on LinkedIn"
          >
            Connect on LinkedIn
          </a>
          <a href="#about" className="btn-secondary">Learn More</a>
        </div>
        <nav className="hero-social" aria-label="Social links">
          {SOCIAL_LINKS.map(({ href, icon, label }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
            >
              <FontAwesomeIcon icon={icon} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
    </section>
  )
}
