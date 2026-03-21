import { CONTACT_LINKS } from '../constants'

export default function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-heading">
      <div className="contact-grid">
        <div>
          <p className="section-label">Contact</p>
          <h2 className="section-title" id="contact-heading">
            Let&apos;s connect.
          </h2>
          <p className="section-body">
            If you want to talk AI, cloud, open source, speaking, or just swap ideas, I&apos;d love to hear from you.
          </p>
        </div>
        <nav className="contact-links" aria-label="Contact options">
          {CONTACT_LINKS.map(({ label, href, external }) => (
            <a
              key={href}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="contact-link-item"
            >
              <span>{label}</span>
              <span className="contact-link-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  )
}
