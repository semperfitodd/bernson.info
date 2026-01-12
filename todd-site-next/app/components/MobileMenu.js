'use client'

import { useState, useCallback, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { NAV_ITEMS, SOCIAL_LINKS } from '../constants'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeMenu])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <button 
        className="hamburger-icon" 
        onClick={toggleMenu}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        type="button"
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} aria-hidden="true" />
      </button>
      <nav 
        id="mobile-navigation"
        className={`mobile-nav ${isOpen ? 'open' : ''}`}
        role="navigation" 
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        <ul className="mobile-nav-links">
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} onClick={closeMenu}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="social-icons" role="navigation" aria-label="Social media links">
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
        </div>
      </nav>
    </>
  )
}
