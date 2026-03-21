'use client'

import { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { NAV_ITEMS, CALENDLY_URL } from '../constants'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = useCallback(() => setMenuOpen(false), [])

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`} role="banner">
      <div className="nav-inner">
        <a href="/" className="nav-logo" aria-label="Todd Bernson — home">TB</a>
        <nav className="nav-links" aria-label="Primary navigation">
          {NAV_ITEMS.map(({ id, label }) => (
            <a key={id} href={`#${id}`}>{label}</a>
          ))}
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="nav-cta">
            Schedule a Call
          </a>
        </nav>
        <button
          className="hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          type="button"
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} aria-hidden="true" />
        </button>
      </div>
      <nav
        className={`mobile-nav${menuOpen ? ' open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {NAV_ITEMS.map(({ id, label }) => (
          <a key={id} href={`#${id}`} onClick={close}>{label}</a>
        ))}
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          style={{ color: 'var(--accent)', borderBottom: 'none' }}
        >
          Schedule a Call →
        </a>
      </nav>
    </header>
  )
}
