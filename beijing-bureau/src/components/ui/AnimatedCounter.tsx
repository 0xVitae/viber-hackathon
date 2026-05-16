import { useEffect, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  prefix?: string
  className?: string
  duration?: number
}

export function AnimatedCounter({
  value,
  prefix = '',
  className = '',
  duration = 1.5,
}: AnimatedCounterProps) {
  const spring = useSpring(0, { duration: duration * 1000 })
  const display = useTransform(spring, (v) => `${prefix}${Math.round(v).toLocaleString()}`)
  const [text, setText] = useState(`${prefix}0`)

  useEffect(() => {
    spring.set(value)
    const unsub = display.on('change', (v) => setText(v))
    return unsub
  }, [value, spring, display, prefix])

  return (
    <motion.span className={`font-display tabular-nums ${className}`}>{text}</motion.span>
  )
}
