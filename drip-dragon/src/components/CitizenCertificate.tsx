import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import type { DripReport } from '../types';

interface CitizenCertificateProps {
  report: DripReport;
  imageUrl: string;
}

export function CitizenCertificate({ report, imageUrl }: CitizenCertificateProps) {
  const adjustmentLabel =
    report.socialCreditAdjustment >= 0
      ? `+${report.socialCreditAdjustment}`
      : `${report.socialCreditAdjustment}`;

  return (
    <motion.div
      className="relative mx-auto max-w-md overflow-hidden border-4 border-dragon-gold bg-[#08080c] p-6"
      whileHover={{ scale: 1.01 }}
    >
      <motion.div
        animate={{ rotate: [10, 14, 10] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute -top-2 -right-2 border-4 border-dragon-red bg-dragon-red px-3 py-5 font-display text-[10px] text-white uppercase opacity-95"
        style={{ transform: 'rotate(12deg)' }}
      >
        {report.score >= 700 ? 'DRIP APPROVED' : 'UNDER REVIEW'}
      </motion.div>

      <motion.div className="border-b border-dragon-gold/30 pb-3">
        <p className="font-mono text-[10px] tracking-widest text-dragon-neon uppercase">
          中华人民共和国 · Fashion Harmony Bureau
        </p>
        <h3 className="font-display text-2xl text-white uppercase">Citizen Drip Certificate</h3>
        <p className="font-mono text-[9px] text-gray-600">Drip Dragon™ Official Document</p>
      </motion.div>

      <div className="mt-4 flex gap-4">
        <div className="h-24 w-20 shrink-0 overflow-hidden border border-dragon-red/50">
          <img src={imageUrl} alt="Citizen fit" className="h-full w-full object-cover" />
        </div>
        <div className="flex-1 text-center">
          <p className="font-mono text-[9px] text-gray-500 uppercase">Social Drip Score</p>
          <p className="font-display text-5xl text-dragon-gold">{report.score}</p>
          <p className="text-xs text-gray-500">/ 1000</p>
        </div>
      </div>

      <div className="mt-4 space-y-2 border-t border-white/10 pt-3 text-sm">
        <div>
          <p className="font-mono text-[9px] text-gray-600 uppercase">Status</p>
          <p className="text-dragon-red uppercase">{report.citizenStatus}</p>
        </div>
        <motion.div>
          <p className="font-mono text-[9px] text-gray-600 uppercase">Aura Rank</p>
          <p className="text-dragon-neon">{report.auraLevel}</p>
        </motion.div>
        <div>
          <p className="font-mono text-[9px] text-gray-600 uppercase">Social Credit Adjustment</p>
          <p className={report.socialCreditAdjustment >= 0 ? 'text-dragon-neon' : 'text-dragon-red'}>
            {adjustmentLabel} points
          </p>
        </div>
        <div>
          <p className="font-mono text-[9px] text-gray-600 uppercase">Primary Violation</p>
          <p className="text-xs text-gray-400">{report.violations[0]}</p>
        </div>
      </div>

      <motion.div className="mt-4 flex items-end justify-between border-t border-white/5 pt-3">
        <div className="flex h-14 w-14 items-center justify-center border-2 border-dashed border-gray-700 font-mono text-[7px] text-gray-600">
          QR
          <br />
          FAKE
        </div>
        <div className="flex items-center gap-1 font-mono text-[10px] text-dragon-neon">
          <FiCheck />
          VERIFIED BY DRIP DRAGON™
        </div>
      </motion.div>

      <p className="mt-3 text-center font-mono text-[8px] text-gray-700">
        Harmony begins with proper drip. — Your fit has been archived.
      </p>
    </motion.div>
  );
}
