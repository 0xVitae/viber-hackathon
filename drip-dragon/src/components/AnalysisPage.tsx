import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ANALYSIS_STAGES, SCAN_ALERTS } from '../data/pools';
import { Radar } from './effects/Radar';

interface AnalysisPageProps {
  imageUrl: string;
  onComplete: () => void;
}

export function AnalysisPage({ imageUrl, onComplete }: AnalysisPageProps) {
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [alertIndex, setAlertIndex] = useState(0);

  useEffect(() => {
    const stageTimer = setInterval(() => {
      setStageIndex((i) => {
        if (i >= ANALYSIS_STAGES.length - 1) {
          clearInterval(stageTimer);
          setTimeout(onComplete, 900);
          return i;
        }
        return i + 1;
      });
    }, 1100);

    const progressTimer = setInterval(() => {
      setProgress((p) => Math.min(100, p + 1.8));
    }, 70);

    const glitchTimer = setInterval(() => setGlitch((g) => !g), 180);
    const alertTimer = setInterval(() => setAlertIndex((i) => (i + 1) % SCAN_ALERTS.length), 900);

    return () => {
      clearInterval(stageTimer);
      clearInterval(progressTimer);
      clearInterval(glitchTimer);
      clearInterval(alertTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen flex-col items-center justify-center px-4 py-28"
    >
      <motion.div
        animate={glitch ? { x: [0, -4, 4, 0] } : {}}
        className="relative w-full max-w-2xl border-2 border-dragon-neon/40 bg-black/95 p-6 md:p-8"
      >
        <div className="absolute inset-0 overflow-hidden opacity-25">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-full bg-dragon-neon"
              style={{ top: `${i * 10}%` }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>

        <motion.div className="relative z-10 grid gap-6 md:grid-cols-2">
          <motion.div className="relative overflow-hidden border border-dragon-red/40">
            <img src={imageUrl} alt="Scanning" className="h-56 w-full object-cover opacity-80 md:h-64" />
            <motion.div className="scan-beam absolute right-0 left-0 z-10 h-0.5 bg-dragon-neon shadow-[0_0_16px_#39ff14]" />
            <div className="absolute inset-0 bg-dragon-red/10 mix-blend-overlay" />
            <motion.p
              className="absolute bottom-2 left-2 font-mono text-[10px] text-dragon-neon"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              TARGET LOCKED
            </motion.p>
          </motion.div>

          <div className="flex flex-col items-center">
            <Radar size={90} />
            <h2
              className={`mt-4 font-display text-2xl text-white uppercase md:text-3xl ${glitch ? 'glitch-text' : ''}`}
            >
              AI Surveillance Active
            </h2>
            <p className="mt-1 font-mono text-[10px] text-dragon-warning animate-pulse uppercase">
              ⚠ Do not move — drip extraction in progress
            </p>

            <motion.p
              key={stageIndex}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="mt-4 font-mono text-sm text-dragon-neon uppercase"
            >
              › {ANALYSIS_STAGES[stageIndex]}
            </motion.p>

            <div className="mt-4 h-2 w-full overflow-hidden border border-dragon-red">
              <motion.div
                className="h-full bg-gradient-to-r from-dragon-red via-dragon-gold to-dragon-neon"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="mt-1 font-mono text-[10px] text-gray-500">{Math.round(progress)}% COMPLETE</span>

            <motion.p
              key={alertIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 font-mono text-[10px] text-dragon-red"
            >
              {SCAN_ALERTS[alertIndex]}
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          className="relative z-10 mt-6 grid grid-cols-3 gap-2 font-mono text-[9px] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[
            { label: 'Patriotism', val: Math.min(100, progress + 12) },
            { label: 'Drip Stability', val: Math.min(100, progress * 0.9) },
            { label: 'NPC Risk', val: Math.min(99, progress * 0.7) },
          ].map((m) => (
            <div key={m.label} className="border border-white/10 bg-white/5 p-2 text-center">
              <p className="text-gray-500">{m.label}</p>
              <p className="text-dragon-gold">{Math.round(m.val)}%</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
