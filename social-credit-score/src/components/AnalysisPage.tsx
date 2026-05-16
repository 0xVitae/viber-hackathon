import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Radar } from './Radar';

const STAGES = [
  'Facial Recognition Scan',
  'Behavioural Pattern Analysis',
  'Meme Consumption Tracking',
  'Emotional Stability Detection',
  'Citizen Harmony Calculation',
];

interface AnalysisPageProps {
  onComplete: () => void;
}

export function AnalysisPage({ onComplete }: AnalysisPageProps) {
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const stageTimer = setInterval(() => {
      setStageIndex((i) => {
        if (i >= STAGES.length - 1) {
          clearInterval(stageTimer);
          setTimeout(onComplete, 800);
          return i;
        }
        return i + 1;
      });
    }, 1200);

    const progressTimer = setInterval(() => {
      setProgress((p) => Math.min(100, p + 2));
    }, 80);

    const glitchTimer = setInterval(() => setGlitch((g) => !g), 200);

    return () => {
      clearInterval(stageTimer);
      clearInterval(progressTimer);
      clearInterval(glitchTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen flex-col items-center justify-center px-4 py-24"
    >
      <motion.div
        animate={glitch ? { x: [0, -3, 3, 0] } : {}}
        className="relative w-full max-w-lg border-2 border-neon/50 bg-black/90 p-8"
      >
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-full bg-neon"
              style={{ top: `${i * 12}%` }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>

        <div className="relative z-10 flex flex-col items-center">
          <Radar size={100} />
          <h2 className={`mt-6 font-display text-3xl uppercase text-white ${glitch ? 'glitch-text' : ''}`}>
            AI Analysis In Progress
          </h2>
          <p className="mt-2 font-mono text-xs text-warning animate-pulse">
            ⚠ DO NOT CLOSE — CITIZEN DATA UPLOADING
          </p>

          <motion.p
            key={stageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 font-mono text-sm uppercase text-neon"
          >
            › {STAGES[stageIndex]}
          </motion.p>

          <motion.div className="mt-6 h-3 w-full overflow-hidden border border-scarlet">
            <motion.div
              className="h-full bg-gradient-to-r from-scarlet via-gold to-neon"
              style={{ width: `${progress}%` }}
            />
          </motion.div>
          <span className="mt-2 font-mono text-xs text-gray-500">{progress}% COMPLETE</span>

          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="mt-6 font-mono text-[10px] text-scarlet"
          >
            {progress > 30 && 'Detected suspicious eye movement.'}
            {progress > 60 && ' Entrepreneurial behaviour detected.'}
            {progress > 85 && ' Individuality levels exceed acceptable thresholds.'}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

