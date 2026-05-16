import { motion } from 'framer-motion'
import { FiAward } from 'react-icons/fi'
import { LEADERBOARD } from '../lib/data'
import { BureauButton } from '../components/ui/BureauButton'
import { useApp } from '../context/AppContext'

export function Leaderboard() {
  const { reportCount, patriotismScore } = useApp()

  const userRank = reportCount > 0 ? Math.max(1, 500 - reportCount * 12) : null

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-4xl text-bureau-gold md:text-5xl">GLOBAL INFORMANT LEADERBOARD</h1>
        <p className="mt-2 font-mono text-sm text-white/50">
          Top patriots ranked by reports filed and harmony protected.
        </p>

        {userRank && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 border-2 border-bureau-neon bg-bureau-neon/10 p-4"
          >
            <p className="font-mono text-xs text-bureau-neon">YOUR RANKING</p>
            <p className="font-display text-2xl text-white">
              #{userRank} — {reportCount} reports — {patriotismScore}% patriotism
            </p>
          </motion.div>
        )}

        <ul className="mt-8 space-y-2">
          {LEADERBOARD.map((entry, i) => (
            <motion.li
              key={entry.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4 border border-white/10 bg-bureau-panel/60 px-4 py-3"
            >
              <span className="flex h-8 w-8 items-center justify-center font-display text-xl text-bureau-gold">
                {i === 0 ? <FiAward className="text-bureau-neon" /> : i + 1}
              </span>
              <div className="flex-1">
                <p className="font-display text-lg text-white">{entry.name}</p>
                <p className="font-mono text-[10px] text-white/40">
                  {entry.reports.toLocaleString()} reports
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm text-bureau-neon">{entry.patriotism}%</p>
                <p className="font-mono text-[10px] text-bureau-gold">PATRIOTISM</p>
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="mt-8 text-center">
          <BureauButton to="/report" variant="primary">
            Climb the Rankings
          </BureauButton>
        </div>
      </div>
    </section>
  )
}
