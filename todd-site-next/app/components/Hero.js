'use client'

import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SOCIAL_LINKS } from '../constants'

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export default function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <motion.div
        className="hero-content"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-badge" variants={fadeDown}>
          <span className="hero-badge-dot" aria-hidden="true" />
          AWS Ambassador · 3× Award Winner
        </motion.div>

        <motion.h1 className="hero-name" variants={fadeUp}>
          Todd<br />Bernson
        </motion.h1>

        <motion.p className="hero-title" variants={fadeUp}>
          Technical depth with executive presence
        </motion.p>

        <motion.p className="hero-description" variants={fadeUp}>
          I build <strong>practical AI and cloud systems</strong> that create real business impact, and I love building strong teams around the work.
          AWS Ambassador with 30+ certifications. AWS Summit speaker. US Marine veteran.
        </motion.p>

        <motion.div className="hero-actions" variants={fadeUp}>
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
        </motion.div>

        <motion.nav
          className="hero-social"
          aria-label="Social links"
          variants={stagger}
        >
          {SOCIAL_LINKS.map(({ href, icon, label }) => (
            <motion.a
              key={href}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              variants={scaleIn}
            >
              <FontAwesomeIcon icon={icon} aria-hidden="true" />
            </motion.a>
          ))}
        </motion.nav>
      </motion.div>
    </section>
  )
}
