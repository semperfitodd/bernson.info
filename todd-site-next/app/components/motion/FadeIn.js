'use client'

import { motion } from 'framer-motion'

const directionOffset = {
  up:    { y: 40 },
  down:  { y: -40 },
  left:  { x: 40 },
  right: { x: -40 },
}

export default function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className,
  ...props
}) {
  const offset = directionOffset[direction] || directionOffset.up

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
