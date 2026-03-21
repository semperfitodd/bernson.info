import Link from 'next/link'

export const metadata = {
  title: '404 — Page Not Found | Todd Bernson',
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
      background: '#09090b',
      color: '#fafafa',
      fontFamily: 'var(--font-inter, system-ui, sans-serif)',
    }}>
      <p style={{
        fontSize: '0.875rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: '#a1a1aa',
        marginBottom: '1.5rem',
      }}>
        404 — Not Found
      </p>
      <h1 style={{
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 700,
        marginBottom: '1rem',
        fontFamily: 'var(--font-space-grotesk, sans-serif)',
        letterSpacing: '-0.02em',
      }}>
        Page not found.
      </h1>
      <p style={{
        fontSize: '1.1rem',
        color: '#a1a1aa',
        maxWidth: '420px',
        marginBottom: '2.5rem',
        lineHeight: 1.6,
      }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" style={{
          padding: '0.75rem 1.5rem',
          background: '#2563eb',
          color: '#fff',
          borderRadius: '6px',
          fontWeight: 500,
          fontSize: '0.95rem',
          textDecoration: 'none',
        }}>
          Back to Home
        </Link>
        <a href="/#contact" style={{
          padding: '0.75rem 1.5rem',
          border: '1px solid #3f3f46',
          color: '#fafafa',
          borderRadius: '6px',
          fontWeight: 500,
          fontSize: '0.95rem',
          textDecoration: 'none',
        }}>
          Get in Touch
        </a>
      </div>
      <nav style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { href: '/#about', label: 'About' },
          { href: '/#expertise', label: 'Expertise' },
          { href: '/#speaking', label: 'Speaking' },
          { href: '/#articles', label: 'Articles' },
        ].map(({ href, label }) => (
          <a key={href} href={href} style={{
            fontSize: '0.9rem',
            color: '#71717a',
            textDecoration: 'none',
          }}>
            {label}
          </a>
        ))}
      </nav>
    </div>
  )
}
