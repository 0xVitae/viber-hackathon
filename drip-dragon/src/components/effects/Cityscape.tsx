import { motion } from 'framer-motion';

export function Cityscape() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <motion.div className="city-grid absolute inset-0 opacity-60" />
      <motion.div className="absolute right-0 bottom-0 left-0 h-1/3 bg-gradient-to-t from-dragon-red/10 via-transparent to-transparent" />
      <div
        className="absolute right-0 bottom-0 left-0 h-48 opacity-30"
        style={{
          background:
            'linear-gradient(to top, #0a0a12 0%, transparent 100%), repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(196,30,30,0.15) 80px, rgba(196,30,30,0.15) 82px)',
        }}
      />
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute bottom-0 bg-gradient-to-t from-dragon-panel to-transparent opacity-40"
          style={{
            left: `${i * 8.5}%`,
            width: `${4 + (i % 3) * 2}%`,
            height: `${20 + (i % 5) * 12}%`,
            boxShadow: 'inset 0 0 40px rgba(0,212,255,0.05)',
          }}
        />
      ))}
    </div>
  );
}
