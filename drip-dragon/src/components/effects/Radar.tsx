import { motion } from 'framer-motion';

export function Radar({ size = 120 }: { size?: number }) {
  return (
    <motion.div
      className="relative rounded-full border-2 border-dragon-neon/50"
      style={{ width: size, height: size }}
    >
      <motion.div className="absolute inset-2 rounded-full border border-dragon-neon/20" />
      <motion.div
        className="absolute inset-0 origin-center rounded-full"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, rgba(57,255,20,0.45) 35deg, transparent 70deg)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-dragon-neon shadow-[0_0_12px_#39ff14]"
        animate={{ scale: [1, 1.6, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      {[0, 45, 90, 135].map((deg) => (
        <motion.div
          key={deg}
          className="absolute left-1/2 top-1/2 h-px w-1/2 origin-left bg-dragon-neon/20"
          style={{ transform: `rotate(${deg}deg)` }}
        />
      ))}
    </motion.div>
  );
}
