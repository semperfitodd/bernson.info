'use client'

import { motion } from 'framer-motion'

const container = {
  hidden: {},
  visible: (stagger) => ({
    transition: { staggerChildren: stagger },
  }),
}

const item = (direction) => {
  const offset =
    direction === 'left'  ? { x: -30 } :
    direction === 'right' ? { x: 30 }  :
    direction === 'down'  ? { y: -30 } :
                            { y: 30 }
  return {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
  }
}

export function StaggerContainer({
  children,
  stagger = 0.1,
  className,
  ...props
}) {
  return (
    <motion.div
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  direction = 'up',
  className,
  ...props
}) {
  return (
    <motion.div
      variants={item(direction)}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
