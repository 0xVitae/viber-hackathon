import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FEEDS = [
  'SECTOR 7 — PLAZA',
  'HARMONY ST — INTERSECTION',
  'MEME DISTRICT — BLOCK 4',
  'PATRIOT PARK — ENTRANCE',
  'VPN ALLEY — CAMERA 12',
]

export function CCTVFeed({ compact = false }: { compact?: boolean }) {
  const [feed, setFeed] = useState(0)
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setFeed((f) => (f + 1) % FEEDS.length)
      setGlitch(true)
      setTimeout(() => setGlitch(false), 200)
    }, 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      className={`relative overflow-hidden border border-bureau-red/60 bg-black ${compact ? 'h-24' : 'h-40'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-bureau-red/10 to-transparent" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(196,30,30,0.4) 0%, transparent 50%),
            linear-gradient(135deg, #1a1a1a 25%, #0d0d0d 25%, #0d0d0d 50%, #1a1a1a 50%, #1a1a1a 75%, #0d0d0d 75%)`,
          backgroundSize: compact ? '8px 8px' : '12px 12px',
        }}
      />
      <AnimatePresence mode="wait">
        <motion.p
          key={feed}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-1 left-2 font-mono text-[10px] text-bureau-neon"
        >
          ● REC {FEEDS[feed]}
        </motion.p>
      </AnimatePresence>
      <p className="absolute right-2 top-1 font-mono text-[10px] text-bureau-red animate-blink">LIVE</p>
      {glitch && <div className="absolute inset-0 animate-glitch bg-bureau-neon/10" />}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-4xl text-white/5">
        监控
      </div>
    </div>
  )
}
