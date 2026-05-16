import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface BureauButtonProps {
  to?: string
  onClick?: () => void
  children: React.ReactNode
  variant?: 'primary' | 'danger' | 'gold'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

const variants = {
  primary: 'bg-bureau-red border-bureau-red hover:bg-red-700 text-white',
  danger: 'bg-red-900 border-red-500 hover:bg-red-800 text-white animate-pulse-red',
  gold: 'bg-bureau-gold/20 border-bureau-gold text-bureau-gold hover:bg-bureau-gold/40',
}

export function BureauButton({
  to,
  onClick,
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled,
}: BureauButtonProps) {
  const base = `inline-block border-2 px-6 py-3 font-display text-lg uppercase tracking-[0.2em] transition ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`

  const inner = (
    <motion.span whileHover={{ scale: disabled ? 1 : 1.02 }} whileTap={{ scale: disabled ? 1 : 0.98 }}>
      {children}
    </motion.span>
  )

  if (to) {
    return (
      <Link to={to} className={base}>
        {inner}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {inner}
    </button>
  )
}
