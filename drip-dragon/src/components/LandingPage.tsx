import { motion } from 'framer-motion';
import { FiCamera, FiCrosshair, FiShield } from 'react-icons/fi';
import { Radar } from './effects/Radar';

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex min-h-screen flex-col items-center justify-center px-4 py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(196,30,30,0.2)_0%,_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(0,212,255,0.08)_0%,_transparent_50%)]" />

      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 mb-4 flex items-center gap-2 border border-dragon-gold/50 bg-black/70 px-4 py-2 font-mono text-[10px] tracking-[0.35em] text-dragon-gold uppercase"
      >
        <FiShield />
        Fashion Harmony Bureau — Sector 龙
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="relative z-10 font-display text-8xl text-dragon-red md:text-9xl"
      >
        🐉
      </motion.div>

      <motion.h1
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="relative z-10 mt-2 text-center font-display text-5xl leading-none tracking-wide text-white md:text-7xl"
      >
        <span className="text-dragon-red">DRIP</span> DRAGON™
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="relative z-10 mt-6 max-w-2xl text-center font-display text-2xl tracking-wide text-white uppercase md:text-4xl"
      >
        Upload Fit For Government Inspection
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="relative z-10 mt-4 max-w-lg text-center text-sm tracking-wider text-gray-400 uppercase md:text-base"
      >
        Advanced AI-powered citizen drip analysis
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 mt-2 font-mono text-sm text-dragon-neon italic"
      >
        &ldquo;Your fit has been reviewed by the state.&rdquo;
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative z-10 my-10"
      >
        <Radar size={150} />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="relative z-10 flex flex-col gap-3 sm:flex-row"
      >
        <button
          type="button"
          onClick={onStart}
          className="group flex items-center justify-center gap-2 border-2 border-dragon-red bg-dragon-red px-8 py-4 font-display text-xl tracking-widest text-white uppercase transition hover:bg-dragon-red-dark hover:shadow-[0_0_40px_rgba(196,30,30,0.45)]"
        >
          <FiCamera className="transition group-hover:scale-110" />
          Analyse My Fit
        </button>
        <button
          type="button"
          onClick={onStart}
          className="flex items-center justify-center gap-2 border-2 border-dragon-neon/60 bg-transparent px-8 py-4 font-display text-xl tracking-widest text-dragon-neon uppercase transition hover:bg-dragon-neon/10"
        >
          <FiCrosshair />
          Scan Aura
        </button>
        <button
          type="button"
          onClick={onStart}
          className="flex items-center justify-center gap-2 border-2 border-dragon-gold/60 bg-dragon-gold/10 px-8 py-4 font-display text-xl tracking-widest text-dragon-gold uppercase transition hover:bg-dragon-gold/20"
        >
          Begin Inspection
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 mt-16 grid grid-cols-3 gap-6 font-mono text-[10px] text-gray-600 uppercase md:gap-12"
      >
        {[
          { val: '1.8B', label: 'Fits Archived' },
          { val: '99.2%', label: 'Drip Accuracy*' },
          { val: '24/7', label: 'Aura Surveillance' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="text-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.25 }}
          >
            <motion.div className="font-display text-2xl text-dragon-neon md:text-3xl">
              {stat.val}
            </motion.div>
            {stat.label}
          </motion.div>
        ))}
      </motion.div>
      <p className="relative z-10 mt-3 font-mono text-[9px] text-gray-700">
        *Accuracy certified by absolutely nobody
      </p>
    </motion.div>
  );
}
