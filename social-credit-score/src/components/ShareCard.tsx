import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import type { EvaluationResult } from '../types';

interface ShareCardProps {
  result: EvaluationResult;
}

export function ShareCard({ result }: ShareCardProps) {
  return (
    <motion.div
      className="relative mx-auto max-w-md overflow-hidden border-4 border-gold bg-[#0d0d0d] p-6"
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -right-4 -top-4 border-4 border-scarlet bg-scarlet px-4 py-6 font-display text-xs uppercase text-white opacity-90"
        style={{ transform: 'rotate(12deg)' }}
      >
        APPROVED
      </motion.div>

      <div className="border-b border-gold/30 pb-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-neon">
          Ministry of Citizen Harmony
        </p>
        <h3 className="font-display text-2xl uppercase text-white">Social Credit Certificate</h3>
      </div>

      <div className="mt-6 text-center">
        <p className="font-mono text-xs text-gray-500">OFFICIAL SCORE</p>
        <p className="font-display text-6xl text-gold">{result.score}</p>
        <p className="text-sm text-gray-400">/ 1000</p>
      </div>

      <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
        <div>
          <p className="font-mono text-[9px] uppercase text-gray-600">Classification</p>
          <p className="text-sm uppercase text-scarlet">{result.citizenStatus}</p>
        </div>
        <div>
          <p className="font-mono text-[9px] uppercase text-gray-600">Tier</p>
          <p className="text-sm text-gold">{result.tier}</p>
        </div>
        <motion.div>
          <p className="font-mono text-[9px] uppercase text-gray-600">Primary Concern</p>
          <p className="text-xs text-gray-400">{result.concerns[0]}</p>
        </motion.div>
      </div>

      <div className="mt-6 flex items-end justify-between">
        <div className="flex h-16 w-16 items-center justify-center border-2 border-dashed border-gray-600 font-mono text-[8px] text-gray-600">
          QR
          <br />
          FAKE
        </div>
        <div className="flex items-center gap-1 font-mono text-[10px] text-neon">
          <FiCheck />
          VERIFIED BY AI™
        </div>
      </div>

      <p className="mt-4 text-center font-mono text-[8px] text-gray-700">
        Compliance is confidence. — AI Citizen Evaluation Platform™
      </p>
    </motion.div>
  );
}
