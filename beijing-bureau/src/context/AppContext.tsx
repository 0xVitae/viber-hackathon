import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Report, PatriotismTier } from '../types/report'
import { getPatriotismTier } from '../lib/socialCredit'
import { PROPAGANDA_MESSAGES } from '../lib/data'

interface AppContextValue {
  reports: Report[]
  reportCount: number
  patriotismTier: PatriotismTier
  patriotismScore: number
  addReport: (report: Report) => void
  activeToast: string | null
  dismissToast: () => void
  shakeScreen: boolean
  triggerShake: () => void
  soundEnabled: boolean
  toggleSound: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<Report[]>(() => {
    try {
      const saved = localStorage.getItem('bureau-reports')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [activeToast, setActiveToast] = useState<string | null>(null)
  const [shakeScreen, setShakeScreen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const reportCount = reports.length
  const patriotismTier = getPatriotismTier(reportCount)
  const patriotismScore = Math.min(100, 20 + reportCount * 6)

  useEffect(() => {
    localStorage.setItem('bureau-reports', JSON.stringify(reports))
  }, [reports])

  useEffect(() => {
    const interval = setInterval(() => {
      const msg = PROPAGANDA_MESSAGES[Math.floor(Math.random() * PROPAGANDA_MESSAGES.length)]
      setActiveToast(msg)
      setTimeout(() => setActiveToast(null), 4000)
    }, 12000)
    return () => clearInterval(interval)
  }, [])

  const addReport = useCallback((report: Report) => {
    setReports((prev) => [report, ...prev].slice(0, 50))
  }, [])

  const dismissToast = useCallback(() => setActiveToast(null), [])

  const triggerShake = useCallback(() => {
    setShakeScreen(true)
    setTimeout(() => setShakeScreen(false), 500)
  }, [])

  const toggleSound = useCallback(() => setSoundEnabled((s) => !s), [])

  const value = useMemo(
    () => ({
      reports,
      reportCount,
      patriotismTier,
      patriotismScore,
      addReport,
      activeToast,
      dismissToast,
      shakeScreen,
      triggerShake,
      soundEnabled,
      toggleSound,
    }),
    [
      reports,
      reportCount,
      patriotismTier,
      patriotismScore,
      addReport,
      activeToast,
      dismissToast,
      shakeScreen,
      triggerShake,
      soundEnabled,
      toggleSound,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
