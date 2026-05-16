import { motion } from 'framer-motion';

export function Radar({ size = 120 }: { size?: number }) {
  return (
    <motion.div
      className="relative rounded-full border-2 border-neon/50"
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-2 rounded-full border border-neon/20" />
      <motion.div
        className="absolute inset-0 origin-center"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0deg, rgba(57,255,20,0.4) 30deg, transparent 60deg)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon shadow-[0_0_10px_#39ff14]"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </motion.div>
  );
}
