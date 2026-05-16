import { motion } from 'framer-motion'
import { AnimatedCounter } from '../components/ui/AnimatedCounter'
import { CCTVFeed } from '../components/effects/CCTVFeed'
import { RadarSweep } from '../components/effects/RadarSweep'
import { BureauButton } from '../components/ui/BureauButton'
import { DASHBOARD_STATS } from '../lib/data'
import { useApp } from '../context/AppContext'

export function Dashboard() {
  const { reports, patriotismTier, patriotismScore, reportCount } = useApp()

  const heatmapCells = Array.from({ length: 64 }, (_, i) => {
    const heat = Math.random()
    return { id: i, heat }
  })

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-4xl text-bureau-red md:text-5xl">THREAT DASHBOARD</h1>
        <p className="mt-1 font-mono text-sm text-white/50">REAL-TIME SURVEILLANCE OVERVIEW — CLASSIFIED</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Citizens Monitored" value={DASHBOARD_STATS.citizensMonitored} />
          <StatCard label="Harmony Level" value={DASHBOARD_STATS.harmonyLevel} suffix="%" decimals />
          <StatCard label="Illegal Fun Today" value={DASHBOARD_STATS.illegalFunToday} />
          <StatCard label="Active Investigations" value={DASHBOARD_STATS.activeInvestigations} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-3 font-mono text-xs text-bureau-gold">CITY HEATMAP — HARMONY VIOLATIONS</h2>
            <div className="grid grid-cols-8 gap-1 border border-bureau-red/40 bg-black/60 p-4">
              {heatmapCells.map((cell) => (
                <motion.div
                  key={cell.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: cell.id * 0.02 }}
                  className="aspect-square"
                  style={{
                    backgroundColor:
                      cell.heat > 0.7
                        ? 'rgba(196,30,30,0.9)'
                        : cell.heat > 0.4
                          ? 'rgba(255,107,0,0.6)'
                          : 'rgba(212,175,55,0.2)',
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 font-mono text-xs text-bureau-gold">THREAT SCANNER</h2>
            <RadarSweep className="mx-auto h-48 w-48" />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <CCTVFeed />
          <CCTVFeed />
          <CCTVFeed compact />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="border border-bureau-gold/30 bg-bureau-panel/60 p-6">
            <h2 className="font-mono text-xs text-bureau-gold">YOUR PATRIOTISM</h2>
            <p className="font-display text-3xl text-bureau-neon">{patriotismTier}</p>
            <div className="mt-4 h-4 overflow-hidden border border-white/20 bg-black">
              <motion.div
                className="h-full bg-gradient-to-r from-bureau-red to-bureau-gold"
                initial={{ width: 0 }}
                animate={{ width: `${patriotismScore}%` }}
              />
            </div>
            <p className="mt-2 font-mono text-sm text-white/50">{patriotismScore}% loyalty index</p>
            <p className="mt-1 font-mono text-xs text-white/30">{reportCount} citizens reported by you</p>
          </div>

          <div className="border border-bureau-red/30 bg-bureau-panel/60 p-6">
            <h2 className="mb-4 font-mono text-xs text-bureau-gold">RECENT INVESTIGATIONS</h2>
            {reports.length === 0 ? (
              <p className="font-mono text-sm text-white/40">No reports filed. Patriotism questionable.</p>
            ) : (
              <ul className="max-h-48 space-y-2 overflow-y-auto">
                {reports.slice(0, 8).map((r) => (
                  <li
                    key={r.id}
                    className="flex justify-between border-b border-white/10 pb-2 font-mono text-xs"
                  >
                    <span className="text-white/70">{r.citizenName}</span>
                    <span className="text-bureau-red">{r.deduction}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <BureauButton to="/report" variant="primary">
            File New Report
          </BureauButton>
        </div>
      </div>
    </section>
  )
}

function StatCard({
  label,
  value,
  suffix = '',
  decimals = false,
}: {
  label: string
  value: number
  suffix?: string
  decimals?: boolean
}) {
  return (
    <div className="border border-bureau-red/50 bg-bureau-panel/80 p-4 text-center">
      <p className="font-mono text-[10px] text-bureau-gold">{label.toUpperCase()}</p>
      <p className="font-display text-3xl text-white md:text-4xl">
        {decimals ? (
          <span>{value}{suffix}</span>
        ) : (
          <AnimatedCounter value={value} suffix={suffix} />
        )}
      </p>
    </div>
  )
}
