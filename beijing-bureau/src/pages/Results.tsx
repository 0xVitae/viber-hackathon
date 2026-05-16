import { useEffect, useMemo, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BureauButton } from '../components/ui/BureauButton'
import { AnimatedCounter } from '../components/ui/AnimatedCounter'
import {
  AI_OUTPUTS,
  LEGAL_CONSEQUENCES,
  PROPAGANDA_VERDICTS,
  STATUSES,
} from '../lib/data'
import { calculateDeduction, pickRandom } from '../lib/socialCredit'
import { playDeduction } from '../lib/sounds'
import { useApp } from '../context/AppContext'
import type { Report } from '../types/report'

interface ReportState {
  citizenName: string
  offence: string
  threatLevel: number
  description: string
  patriotismRating: number
  evidenceFileName?: string
  imageAnalysis?: string | null
  emergency?: boolean
}

function buildReport(state: ReportState): Report {
  return {
    id: crypto.randomUUID(),
    citizenName: state.citizenName,
    offence: state.offence,
    threatLevel: state.threatLevel,
    description: state.description,
    patriotismRating: state.patriotismRating,
    deduction: calculateDeduction(
      state.offence,
      state.threatLevel,
      state.patriotismRating,
      state.emergency,
    ),
    status: pickRandom(STATUSES),
    propagandaMessage: pickRandom(PROPAGANDA_VERDICTS),
    legalConsequence: pickRandom(LEGAL_CONSEQUENCES),
    aiAnalysis: state.imageAnalysis ?? pickRandom(AI_OUTPUTS),
    timestamp: Date.now(),
    evidenceFileName: state.evidenceFileName,
  }
}

export function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const { addReport, triggerShake, soundEnabled } = useApp()
  const state = location.state as ReportState | null
  const saved = useRef(false)

  const report = useMemo(() => (state ? buildReport(state) : null), [state])

  useEffect(() => {
    if (!state) navigate('/report')
  }, [state, navigate])

  useEffect(() => {
    if (!report || saved.current) return
    saved.current = true
    addReport(report)
    triggerShake()
    playDeduction(soundEnabled)
  }, [report, addReport, triggerShake, soundEnabled])

  if (!state || !report) return null

  return (
    <section className="px-4 py-8">
      <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-2xl border-4 border-bureau-red bg-bureau-panel p-8"
        >
          <p className="font-mono text-xs text-bureau-gold">▲ OFFICIAL VERDICT ▲</p>
          <h1 className="mt-2 font-display text-3xl text-white md:text-4xl">CITIZEN JUDGMENT COMPLETE</h1>

          <motion.div className="my-8 border-y-2 border-bureau-red py-6 text-center">
            <p className="font-mono text-sm text-white/50">SOCIAL CREDIT DEDUCTION</p>
            <AnimatedCounter
              value={report.deduction}
              className="text-6xl text-bureau-red md:text-8xl animate-pulse-red"
            />
          </motion.div>

          <div className="space-y-4 font-mono text-sm">
            <Row label="CITIZEN" value={report.citizenName} />
            <Row label="OFFENCE" value={report.offence} highlight />
            <Row label="THREAT LEVEL" value={`${report.threatLevel} / 10`} />
            <Row label="STATUS" value={report.status} />
          </div>

          <blockquote className="mt-8 border-l-4 border-bureau-gold pl-4">
            <p className="font-display text-xl uppercase text-bureau-neon">
              &quot;{report.propagandaMessage}&quot;
            </p>
          </blockquote>

          <div className="mt-6 space-y-2 rounded border border-bureau-red/30 bg-black/40 p-4">
            <p className="font-mono text-[10px] text-bureau-gold">AI ANALYSIS</p>
            <p className="font-mono text-sm text-white/80">{report.aiAnalysis}</p>
            <p className="mt-4 font-mono text-[10px] text-bureau-orange">LEGAL CONSEQUENCE</p>
            <p className="font-mono text-sm text-bureau-orange">{report.legalConsequence}</p>
          </div>

          {state.emergency && (
            <motion.p
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="mt-4 text-center font-display text-2xl text-bureau-red"
            >
              ⚠ DISTRICT-WIDE EMERGENCY PROTOCOL ACTIVATED ⚠
            </motion.p>
          )}
      </motion.div>

      <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-4 sm:flex-row">
        <BureauButton to="/report" variant="primary" className="flex-1 text-center">
          Report Another Citizen
        </BureauButton>
        <BureauButton to="/dashboard" variant="gold" className="flex-1 text-center">
          View Dashboard
        </BureauButton>
      </div>
    </section>
  )
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
      <span className="text-white/40">{label}</span>
      <span className={highlight ? 'text-right text-bureau-red' : 'text-right'}>{value}</span>
    </div>
  )
}
