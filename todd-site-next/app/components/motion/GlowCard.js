'use client'

import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function GlowCard({
  children,
  className = '',
  as = 'div',
  ...props
}) {
  const ref = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--glow-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--glow-y', `${e.clientY - rect.top}px`)
  }, [])

  const Component = as === 'a' ? motion.a : motion.div

  return (
    <Component
      ref={ref}
      className={`glow-card ${className}`}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </Component>
  )
}
