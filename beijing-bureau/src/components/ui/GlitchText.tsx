import { motion } from 'framer-motion'

interface GlitchTextProps {
  children: string
  className?: string
  as?: 'h1' | 'h2' | 'p' | 'span'
}

export function GlitchText({ children, className = '', as: Tag = 'span' }: GlitchTextProps) {
  return (
    <motion.div className="relative inline-block">
      <Tag className={className}>{children}</Tag>
      <Tag
        className={`${className} pointer-events-none absolute inset-0 text-bureau-red/50`}
        aria-hidden
        style={{ clipPath: 'inset(40% 0 30% 0)', transform: 'translateX(2px)' }}
      >
        {children}
      </Tag>
    </motion.div>
  )
}
