import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiEye, FiAlertTriangle } from 'react-icons/fi';
import { PROPAGANDA_MESSAGES } from '../../data/pools';

export function SurveillanceOverlay() {
  const [feedIndex, setFeedIndex] = useState(0);
  const [propIndex, setPropIndex] = useState(0);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setFeedIndex((i) => (i + 1) % 6), 3500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setPropIndex((i) => (i + 1) % PROPAGANDA_MESSAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const feedItems = [
    'Citizen #8842 drip score updated',
    'Western sneaker influence — Sector 12',
    'NPC cluster detected at mall food court',
    'Illegal quiet luxury in Zone 3',
    'TikTok fit check under review',
    'Aura instability — downtown district',
  ];

  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 z-50 border-4 border-dragon-red/25"
        animate={{
          boxShadow: [
            'inset 0 0 0 0 rgba(196,30,30,0)',
            'inset 0 0 100px rgba(196,30,30,0.12)',
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse' }}
      />
      <motion.div className="camera-flash pointer-events-none fixed inset-0 z-30 bg-white" />

      <div className="pointer-events-none fixed top-0 right-0 left-0 z-40 flex items-center justify-between bg-black/85 px-4 py-1.5 font-mono text-[10px] tracking-widest uppercase">
        <span className="flex items-center gap-2 text-dragon-neon">
          <FiEye className="animate-pulse text-dragon-red" />
          DRIP DRAGON™ — LIVE SURVEILLANCE
        </span>
        <span className="hidden text-dragon-gold sm:inline">
          {time.toISOString().replace('T', ' ').slice(0, 19)} UTC
        </span>
        <span className="flex items-center gap-1 text-dragon-warning">
          <span className="h-2 w-2 animate-pulse rounded-full bg-dragon-red" />
          REC
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={feedIndex}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed bottom-4 left-4 z-40 max-w-xs border border-dragon-neon/40 bg-black/90 px-3 py-2 font-mono text-xs text-dragon-neon"
        >
          <span className="text-dragon-warning">FEED › </span>
          {feedItems[feedIndex]}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={propIndex}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed top-20 right-4 z-40 max-w-[200px] border border-dragon-gold/50 bg-dragon-red/20 px-3 py-2 text-center font-mono text-[10px] tracking-wider text-dragon-gold uppercase"
        >
          {PROPAGANDA_MESSAGES[propIndex]}
        </motion.div>
      </AnimatePresence>

      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="pointer-events-none fixed top-16 left-4 z-40 flex items-center gap-2 border border-dragon-warning/50 bg-dragon-warning/10 px-2 py-1 font-mono text-[10px] text-dragon-warning"
      >
        <FiAlertTriangle />
        FASHION MONITORING ACTIVE
      </motion.div>

      <motion.div
        className="pointer-events-none fixed top-1/3 right-8 z-20 font-mono text-[9px] text-dragon-red/40"
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        CAM_07
        <br />
        CAM_12
        <br />
        CAM_19
      </motion.div>
    </>
  );
}
