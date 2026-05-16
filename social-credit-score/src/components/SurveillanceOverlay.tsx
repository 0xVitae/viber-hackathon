import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiEye, FiAlertTriangle } from 'react-icons/fi';

const FEED_ITEMS = [
  'Citizen #483 lost 15 points',
  'Western meme consumption detected',
  'Illegal fun identified in Sector 8',
  'Podcast intent flagged in Zone 12',
  'Mechanical keyboard click detected',
  'Compliance spike in District 4',
  'Unauthorized pineapple activity',
  'Sigma grindset outbreak contained',
  'Doomscroll levels critical — Sector 9',
  'Citizen reclassified: Gym Bro Tier 2',
];

export function SurveillanceOverlay() {
  const [feedIndex, setFeedIndex] = useState(0);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setFeedIndex((i) => (i + 1) % FEED_ITEMS.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 z-50 border-4 border-scarlet/30"
        animate={{ boxShadow: ['inset 0 0 0 0 rgba(196,30,58,0)', 'inset 0 0 80px rgba(196,30,58,0.15)'] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
      />
      <div className="pointer-events-none fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-black/80 px-4 py-1 font-mono text-[10px] uppercase tracking-widest text-neon">
        <span className="flex items-center gap-2">
          <FiEye className="animate-pulse text-scarlet" />
          LIVE SURVEILLANCE — REC
        </span>
        <span className="text-gold">{time.toISOString().replace('T', ' ').slice(0, 19)} UTC</span>
        <span className="flex items-center gap-1 text-warning">
          <span className="h-2 w-2 animate-pulse rounded-full bg-scarlet" />
          TRACKING ACTIVE
        </span>
      </motion.div>
      <motion.div
        key={feedIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        className="pointer-events-none fixed bottom-4 left-4 z-40 max-w-xs border border-neon/40 bg-black/90 px-3 py-2 font-mono text-xs text-neon"
      >
        <span className="text-warning">FEED › </span>
        {FEED_ITEMS[feedIndex]}
      </motion.div>
      <motion.div
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="pointer-events-none fixed top-16 right-4 z-40 flex items-center gap-2 border border-warning/60 bg-warning/10 px-2 py-1 font-mono text-[10px] text-warning"
      >
        <FiAlertTriangle />
        MONITORING ENABLED
      </motion.div>
    </>
  );
}
