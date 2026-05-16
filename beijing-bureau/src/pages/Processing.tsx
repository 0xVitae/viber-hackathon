import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PROCESSING_STEPS } from '../lib/data'
import { CCTVFeed } from '../components/effects/CCTVFeed'
import { playAlert } from '../lib/sounds'
import { useApp } from '../context/AppContext'

export function Processing() {
  const location = useLocation()
  const navigate = useNavigate()
  const { soundEnabled } = useApp()
  const state = location.state as Record<string, unknown> | null

  const [stepIndex, setStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    if (!state) {
      navigate('/report')
      return
    }

    const stepDuration = 900
    const steps = PROCESSING_STEPS.length

    const stepInterval = setInterval(() => {
      setStepIndex((i) => {
        const next = i + 1
        if (next >= steps) {
          clearInterval(stepInterval)
          setTimeout(() => navigate('/results', { state }), 400)
        }
        return Math.min(next, steps - 1)
      })
      setFlash(true)
      setTimeout(() => setFlash(false), 150)
      playAlert(soundEnabled)
    }, stepDuration)

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 2, 100))
    }, stepDuration / 5)

    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
    }
  }, [state, navigate, soundEnabled])

  if (!state) return null

  return (
    <section className="relative min-h-[70vh] px-4 py-12">
      {flash && (
        <div className="pointer-events-none fixed inset-0 z-50 bg-bureau-red/20" aria-hidden />
      )}

      <div className="mx-auto max-w-2xl text-center">
        <motion.h1
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="font-display text-4xl text-bureau-red md:text-5xl"
        >
          AI SURVEILLANCE PROCESSING
        </motion.h1>
        <p className="mt-2 font-mono text-sm text-bureau-neon animate-blink">
          DO NOT CLOSE — CITIZEN DATA BEING ANALYSED
        </p>

        <div className="mt-8 border-2 border-bureau-red bg-black/60 p-6">
          <div className="mb-2 flex justify-between font-mono text-xs">
            <span>ANALYSIS PROGRESS</span>
            <span className="text-bureau-gold">{progress}%</span>
          </div>
          <div className="h-4 overflow-hidden border border-bureau-gold/30 bg-bureau-dark">
            <motion.div
              className="h-full bg-gradient-to-r from-bureau-red to-bureau-orange"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </div>

        <div className="mt-8 space-y-3 text-left">
          {PROCESSING_STEPS.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: i <= stepIndex ? 1 : 0.2,
                x: 0,
                color: i === stepIndex ? '#f5e642' : '#888',
              }}
              className="flex items-center gap-3 font-mono text-sm"
            >
              <span className={i <= stepIndex ? 'text-bureau-red' : 'text-white/20'}>
                {i <= stepIndex ? '■' : '□'}
              </span>
              {step}
              {i === stepIndex && (
                <span className="ml-auto animate-blink text-bureau-red text-xs">RUNNING</span>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <CCTVFeed />
          <div className="flex items-center justify-center border border-bureau-red/40 bg-black p-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="font-display text-6xl text-bureau-red/30"
            >
              扫描
            </motion.div>
          </div>
        </div>

        <p className="mt-6 font-mono text-xs text-white/30">
          Target: {(state.citizenName as string) || 'UNKNOWN CITIZEN'}
        </p>
      </div>
    </section>
  )
}
