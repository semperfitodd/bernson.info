import Link from 'next/link'

export const metadata = {
  title: '404 — Page Not Found | Josephine Bernson',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      background: '#ffffff',
      color: '#000000',
      fontFamily: 'var(--font-inter, system-ui, sans-serif)',
    }}>
      <p style={{
        fontSize: '0.875rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: '#666666',
        marginBottom: '1.5rem',
      }}>
        404 — Not Found
      </p>
      <h1 style={{
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 700,
        marginBottom: '1rem',
        letterSpacing: '-0.02em',
      }}>
        Page not found.
      </h1>
      <p style={{
        fontSize: '1.1rem',
        color: '#666666',
        maxWidth: '420px',
        marginBottom: '2.5rem',
        lineHeight: 1.6,
      }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" style={{
          padding: '0.75rem 1.5rem',
          background: '#000000',
          color: '#ffffff',
          borderRadius: '2px',
          fontWeight: 500,
          fontSize: '0.95rem',
          textDecoration: 'none',
        }}>
          Back to Home
        </Link>
        <a href="/#contact" style={{
          padding: '0.75rem 1.5rem',
          border: '1px solid #e0e0e0',
          color: '#000000',
          borderRadius: '2px',
          fontWeight: 500,
          fontSize: '0.95rem',
          textDecoration: 'none',
        }}>
          Contact Josephine
        </a>
      </div>
      <nav style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { href: '/#about', label: 'About' },
          { href: '/#expertise', label: 'Expertise' },
          { href: '/#speaking', label: 'Speaking' },
          { href: '/#contact', label: 'Contact' },
        ].map(({ href, label }) => (
          <a key={href} href={href} style={{
            fontSize: '0.9rem',
            color: '#666666',
            textDecoration: 'none',
          }}>
            {label}
          </a>
        ))}
      </nav>
    </div>
  )
}
