'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, useTransform, animate } from 'framer-motion'

export default function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  className,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [displayValue, setDisplayValue] = useState(prefix + '0' + suffix)

  useEffect(() => {
    if (!inView) return

    const numericMatch = value.match(/(\d+)/)
    if (!numericMatch) {
      setDisplayValue(prefix + value + suffix)
      return
    }

    const target = parseInt(numericMatch[1], 10)
    const motionVal = { v: 0 }

    const controls = animate(motionVal, { v: target }, {
      duration: 1.8,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: () => {
        const current = Math.round(motionVal.v)
        const replaced = value.replace(/\d+/, String(current))
        setDisplayValue(prefix + replaced + suffix)
      },
      onComplete: () => {
        setDisplayValue(prefix + value + suffix)
      },
    })

    return () => controls.stop()
  }, [inView, value, prefix, suffix])

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  )
}
