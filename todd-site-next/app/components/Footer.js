import { FOOTER_LINKS } from '../constants'

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <p className="footer-copy">
        © {new Date().getFullYear()} Todd Bernson
      </p>
      <nav className="footer-links" aria-label="Footer links">
        {FOOTER_LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
    </footer>
  )
}
