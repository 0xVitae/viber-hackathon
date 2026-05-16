import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BureauButton } from '../components/ui/BureauButton'
import { SCANNER_OUTPUTS } from '../lib/data'
import { pickRandom } from '../lib/socialCredit'
import { playAlert } from '../lib/sounds'
import { useApp } from '../context/AppContext'

export function Scanner() {
  const { soundEnabled } = useApp()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [active, setActive] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [results, setResults] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const startCamera = async () => {
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setActive(true)
    } catch {
      setError('CAMERA ACCESS DENIED — CITIZEN HIDING SOMETHING')
    }
  }

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream | null
    stream?.getTracks().forEach((t) => t.stop())
    if (videoRef.current) videoRef.current.srcObject = null
    setActive(false)
    setScanning(false)
  }

  const runScan = () => {
    if (!active) return
    setScanning(true)
    setResults([])
    playAlert(soundEnabled)

    const outputs: string[] = []
    let i = 0
    const interval = setInterval(() => {
      outputs.push(pickRandom(SCANNER_OUTPUTS))
      setResults([...outputs])
      i++
      if (i >= 4) {
        clearInterval(interval)
        setScanning(false)
      }
    }, 800)
  }

  useEffect(() => () => stopCamera(), [])

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-4xl text-bureau-red">CITIZEN SCANNER</h1>
        <p className="mt-2 font-mono text-sm text-white/50">
          Fake biometric analysis. Webcam optional — denial is also suspicious.
        </p>

        {error && (
          <p className="mt-4 border border-bureau-orange p-3 font-mono text-sm text-bureau-orange">
            {error}
          </p>
        )}

        <div className="relative mt-8 aspect-video overflow-hidden border-4 border-bureau-red bg-black">
          {!active && (
            <div className="absolute inset-0 flex items-center justify-center bg-bureau-panel">
              <p className="font-display text-2xl text-white/20">NO SIGNAL</p>
            </div>
          )}
          <video ref={videoRef} className="h-full w-full object-cover" muted playsInline />
          {scanning && (
            <motion.div
              className="absolute inset-0 bg-bureau-neon/10"
              animate={{ y: ['0%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            >
              <div className="h-1 w-full bg-bureau-neon shadow-[0_0_20px_#f5e642]" />
            </motion.div>
          )}
          <div className="pointer-events-none absolute inset-0 border border-bureau-gold/30">
            <div className="absolute left-[20%] top-[20%] h-[60%] w-[60%] border border-bureau-red/50" />
          </div>
          <p className="absolute bottom-2 left-2 font-mono text-[10px] text-bureau-neon animate-blink">
            ● BIOMETRIC SCAN {scanning ? 'ACTIVE' : 'STANDBY'}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          {!active ? (
            <BureauButton onClick={startCamera} variant="primary">
              Activate Scanner
            </BureauButton>
          ) : (
            <>
              <BureauButton onClick={runScan} variant="primary" disabled={scanning}>
                {scanning ? 'Scanning...' : 'Run Analysis'}
              </BureauButton>
              <BureauButton onClick={stopCamera} variant="gold">
                Deactivate
              </BureauButton>
            </>
          )}
        </div>

        <AnimatePresence>
          {results.length > 0 && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 space-y-2 border border-bureau-red/40 bg-black/60 p-4"
            >
              {results.map((r, i) => (
                <motion.li
                  key={`${r}-${i}`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="font-mono text-sm text-bureau-neon"
                >
                  ▸ {r}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
