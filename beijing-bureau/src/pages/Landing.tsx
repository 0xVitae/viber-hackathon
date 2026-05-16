import { motion } from 'framer-motion'
import { BureauButton } from '../components/ui/BureauButton'
import { GlitchText } from '../components/ui/GlitchText'
import { RadarSweep } from '../components/effects/RadarSweep'
import { CCTVFeed } from '../components/effects/CCTVFeed'
import { useApp } from '../context/AppContext'

export function Landing() {
  const { reportCount, patriotismTier } = useApp()

  return (
    <section className="relative overflow-hidden px-4 py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center"
        >
          <p className="mb-2 font-mono text-xs tracking-[0.5em] text-bureau-gold">
            ★ OFFICIAL HARMONY PORTAL ★
          </p>
          <GlitchText as="h1" className="font-display text-5xl text-bureau-red md:text-8xl">
            BEIJING BUREAU™
          </GlitchText>
          <p className="mt-2 font-mono text-sm text-bureau-neon md:text-base">
            &quot;See something. Report everything.&quot;
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12 border-4 border-bureau-red bg-bureau-panel/80 p-8 text-center backdrop-blur"
        >
          <h2 className="font-display text-3xl text-white md:text-5xl">
            CITIZEN HARMONY BEGINS WITH YOU.
          </h2>
          <p className="mt-4 font-mono text-sm text-white/60">
            Anonymous reporting protects society. Your vigilance strengthens the nation.
          </p>
        </motion.div>

        <div className="mb-12 grid gap-4 md:grid-cols-3">
          <BureauButton to="/report" variant="primary" className="w-full text-center">
            Submit Report
          </BureauButton>
          <BureauButton to="/dashboard" variant="gold" className="w-full text-center">
            View Threat Dashboard
          </BureauButton>
          <BureauButton to="/report" variant="gold" className="w-full text-center">
            Check Patriotism Score
          </BureauButton>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid gap-6 md:grid-cols-3"
        >
          <div className="flex flex-col items-center border border-bureau-red/40 bg-bureau-panel/60 p-6">
            <RadarSweep className="h-32 w-32" />
            <p className="mt-4 font-mono text-xs text-bureau-gold">THREAT SCANNER ACTIVE</p>
          </div>

          <div className="space-y-2">
            <CCTVFeed />
            <CCTVFeed compact />
          </div>

          <div className="border border-bureau-gold/40 bg-bureau-panel/60 p-6">
            <p className="font-mono text-[10px] text-bureau-gold">YOUR STATUS</p>
            <p className="font-display text-2xl text-bureau-neon">{patriotismTier}</p>
            <p className="mt-2 font-mono text-sm text-white/50">
              Reports filed: <span className="text-bureau-red">{reportCount}</span>
            </p>
            <p className="mt-4 font-mono text-[10px] text-white/30">
              Citizens monitored nationwide: 14,382,991
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 grid gap-2 font-mono text-xs text-white/40 md:grid-cols-4"
        >
          {['HARMONY LEVEL: 97.4%', 'ACTIVE CAMERAS: 8.2M', 'ILLEGAL FUN TODAY: 842', 'YOUR LOYALTY: NOTED'].map(
            (stat) => (
              <div key={stat} className="border border-white/10 bg-black/40 px-3 py-2 text-center">
                {stat}
              </div>
            ),
          )}
        </motion.div>
      </div>
    </section>
  )
}
