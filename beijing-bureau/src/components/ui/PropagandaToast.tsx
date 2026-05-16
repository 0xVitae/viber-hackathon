import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { useApp } from '../../context/AppContext'

export function PropagandaToast() {
  const { activeToast, dismissToast } = useApp()

  return (
    <AnimatePresence>
      {activeToast && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          className="fixed bottom-6 right-6 z-[100] max-w-sm border-2 border-bureau-gold bg-bureau-panel p-4 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
        >
          <div className="mb-1 flex items-start justify-between gap-2">
            <span className="font-mono text-[10px] text-bureau-gold">▲ BUREAU ALERT</span>
            <button
              type="button"
              onClick={dismissToast}
              className="text-white/50 hover:text-white"
              aria-label="Dismiss"
            >
              <FiX />
            </button>
          </div>
          <p className="font-display text-lg uppercase tracking-wider text-bureau-neon">{activeToast}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
