import { Link, useLocation } from 'react-router-dom'
import { FiVolume2, FiVolumeX } from 'react-icons/fi'
import { ScanLines } from '../effects/ScanLines'
import { CityGrid } from '../effects/CityGrid'
import { PropagandaToast } from '../ui/PropagandaToast'
import { useApp } from '../../context/AppContext'

const NAV = [
  { to: '/', label: 'HQ' },
  { to: '/report', label: 'Report' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/scanner', label: 'Scanner' },
  { to: '/leaderboard', label: 'Leaders' },
]

export function Layout({ children }: { children: React.ReactNode }) {
  const { shakeScreen, patriotismTier, patriotismScore, soundEnabled, toggleSound } = useApp()
  const location = useLocation()

  return (
    <div className={`relative min-h-screen ${shakeScreen ? 'animate-shake' : ''}`}>
      <CityGrid />
      <ScanLines />

      <header className="relative z-40 border-b-2 border-bureau-red bg-bureau-panel/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="group flex items-center gap-2">
            <span className="font-display text-2xl text-bureau-red transition group-hover:text-bureau-gold md:text-3xl">
              北京 BEIJING BUREAU™
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-1 font-mono text-xs uppercase tracking-widest transition ${
                  location.pathname === to
                    ? 'bg-bureau-red text-white'
                    : 'text-white/60 hover:bg-bureau-red/30 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="font-mono text-[10px] text-bureau-gold">PATRIOTISM</p>
              <p className="font-display text-sm text-bureau-neon">{patriotismTier}</p>
              <p className="font-mono text-[10px] text-white/50">{patriotismScore}%</p>
            </div>
            <button
              type="button"
              onClick={toggleSound}
              className="border border-white/20 p-2 text-white/70 hover:border-bureau-gold hover:text-bureau-gold"
              aria-label="Toggle sound"
            >
              {soundEnabled ? <FiVolume2 /> : <FiVolumeX />}
            </button>
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto border-t border-white/10 px-2 py-1 md:hidden">
          {NAV.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`shrink-0 px-2 py-1 font-mono text-[10px] uppercase ${
                location.pathname === to ? 'bg-bureau-red text-white' : 'text-white/50'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="relative z-10">{children}</main>

      <footer className="relative z-10 border-t border-bureau-red/30 py-4 text-center">
        <p className="font-mono text-[10px] text-white/30">
          BEIJING BUREAU™ — SATIRICAL FICTION — NOT A REAL GOVERNMENT SYSTEM
        </p>
        <p className="font-mono text-[10px] text-white/20">See something. Report everything.</p>
      </footer>

      <PropagandaToast />
    </div>
  )
}
