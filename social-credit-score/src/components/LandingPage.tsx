import { motion } from 'framer-motion';
import { FiShield, FiCpu, FiCrosshair } from 'react-icons/fi';
import { Radar } from './Radar';

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex min-h-screen flex-col items-center justify-center px-4 py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(196,30,58,0.15)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(10,10,10,0.9)_100%)]" />

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 mb-6 flex items-center gap-3 border border-gold/40 bg-black/60 px-4 py-2 font-mono text-xs uppercase tracking-[0.3em] text-gold"
      >
        <FiShield />
        AI Citizen Evaluation Platform™
      </motion.div>

      <motion.h1
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-display relative z-10 text-center text-6xl leading-none tracking-wide text-white md:text-8xl"
      >
        <span className="text-scarlet">DISCOVER</span>
        <br />
        YOUR CITIZEN VALUE
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 mt-6 max-w-xl text-center text-lg uppercase tracking-wider text-gray-400"
      >
        Our advanced AI evaluates your contribution to societal harmony.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 mt-2 font-mono text-sm text-neon"
      >
        &ldquo;Your future, quantified.&rdquo;
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative z-10 my-10"
      >
        <Radar size={140} />
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
          className="group flex items-center justify-center gap-2 border-2 border-scarlet bg-scarlet px-8 py-4 font-display text-xl uppercase tracking-widest text-white transition hover:bg-scarlet-dark hover:shadow-[0_0_30px_rgba(196,30,58,0.5)]"
        >
          <FiCpu className="transition group-hover:rotate-12" />
          Begin Evaluation
        </button>
        <button
          type="button"
          onClick={onStart}
          className="flex items-center justify-center gap-2 border-2 border-neon/60 bg-transparent px-8 py-4 font-display text-xl uppercase tracking-widest text-neon transition hover:bg-neon/10"
        >
          <FiCrosshair />
          Scan My Behaviour
        </button>
        <button
          type="button"
          onClick={onStart}
          className="flex items-center justify-center gap-2 border-2 border-gold/60 bg-gold/10 px-8 py-4 font-display text-xl uppercase tracking-widest text-gold transition hover:bg-gold/20"
        >
          Check Compliance Status
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 mt-16 grid grid-cols-3 gap-8 font-mono text-[10px] uppercase text-gray-600"
      >
        <div className="text-center">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl font-display text-neon"
          >
            2.4B
          </motion.div>
          Citizens Monitored
        </div>
        <motion.div
          className="text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        >
          <motion.div className="text-2xl font-display text-scarlet">99.7%</motion.div>
          AI Accuracy*
        </motion.div>
        <motion.div
          className="text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
        >
          <div className="text-2xl font-display text-gold">24/7</div>
          Surveillance Active
        </motion.div>
      </motion.div>
      <p className="relative z-10 mt-4 font-mono text-[9px] text-gray-700">*Accuracy not verified by any known science</p>
    </motion.div>
  );
}
