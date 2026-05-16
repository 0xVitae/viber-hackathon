import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiRefreshCw, FiShare2 } from 'react-icons/fi';
import type { DripReport } from '../types';
import { AnimatedScore } from './ui/AnimatedScore';
import { CitizenCertificate } from './CitizenCertificate';

interface ResultsPageProps {
  report: DripReport;
  imageUrl: string;
  roastMode: boolean;
  onRetry: () => void;
}

export function ResultsPage({ report, imageUrl, roastMode, onRetry }: ResultsPageProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `My Drip Dragon™ Score: ${report.score}/1000 — ${report.citizenStatus}. Aura: ${report.auraLevel}. Threat: ${report.threatLevel}. Upload your fit:`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Drip Dragon™ Citizen Report',
          text: shareText,
        });
        return;
      } catch {
        /* clipboard fallback */
      }
    }
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen flex-col items-center px-4 py-28"
    >
      <div className="w-full max-w-3xl">
        <p className="text-center font-mono text-xs tracking-[0.4em] text-dragon-neon uppercase">
          Government inspection complete
        </p>
        <h1 className="mt-2 text-center font-display text-4xl text-white uppercase md:text-5xl">
          Citizen Drip Report
        </h1>
        {roastMode && (
          <p className="mt-2 text-center font-mono text-xs text-dragon-red uppercase">
            🔥 Roast Mode Active — Judgement escalated
          </p>
        )}

        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 overflow-hidden border-2 border-dragon-gold/50"
        >
          <div className="grid md:grid-cols-2">
            <img src={imageUrl} alt="Inspected fit" className="h-48 w-full object-cover md:h-full" />
            <div className="bg-gradient-to-br from-dragon-red/25 to-black p-6 text-center md:p-8">
              <p className="font-mono text-xs text-gray-400 uppercase">Social Drip Score</p>
              <AnimatedScore score={report.score} />
              <p className="mt-2 font-mono text-lg text-dragon-gold uppercase">{report.tier}</p>
              <p className="mt-1 text-sm text-gray-500">{report.tierDescription}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div className="border border-dragon-red/50 bg-black/80 p-4">
            <p className="font-mono text-[10px] text-gray-500 uppercase">Citizen Status</p>
            <p className="mt-1 font-display text-lg text-dragon-red uppercase">{report.citizenStatus}</p>
          </div>
          <div className="border border-dragon-neon/50 bg-black/80 p-4">
            <p className="font-mono text-[10px] text-gray-500 uppercase">Aura Level</p>
            <p className="mt-1 font-display text-lg text-dragon-neon">{report.auraLevel}</p>
            <p className="mt-1 text-[10px] text-gray-500">{report.auraDescription}</p>
          </div>
          <div className="border border-dragon-warning/50 bg-black/80 p-4">
            <p className="font-mono text-[10px] text-gray-500 uppercase">Threat Level</p>
            <p className="mt-1 font-display text-lg uppercase" style={{ color: report.threatColor }}>
              {report.threatLevel}
            </p>
          </div>
          <motion.div className="border border-dragon-blue/50 bg-black/80 p-4">
            <p className="font-mono text-[10px] text-gray-500 uppercase">Social Credit</p>
            <p
              className={`mt-1 font-display text-lg ${report.socialCreditAdjustment >= 0 ? 'text-dragon-neon' : 'text-dragon-red'}`}
            >
              {report.socialCreditAdjustment >= 0 ? '+' : ''}
              {report.socialCreditAdjustment}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-6 grid gap-3 sm:grid-cols-3 font-mono text-[10px]"
        >
          {[
            { label: 'Drip Stability', val: `${report.dripStability}%` },
            { label: 'Western Influence', val: `${report.westernInfluence}%` },
            { label: 'NPC Probability', val: `${report.npcProbability}%` },
          ].map((stat) => (
            <div key={stat.label} className="border border-white/10 bg-white/5 p-3 text-center">
              <p className="text-gray-500 uppercase">{stat.label}</p>
              <p className="mt-1 text-lg text-dragon-gold">{stat.val}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="mt-6 border border-dragon-red/30 bg-dragon-red/5 p-4"
        >
          <p className="font-mono text-xs text-dragon-red uppercase">Patriotic Fashion Analysis</p>
          <p className="mt-2 text-sm text-gray-300">{report.patrioticAnalysis}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4 border border-dragon-neon/30 bg-black/80 p-4"
        >
          <p className="font-mono text-xs text-dragon-neon uppercase">AI Observations</p>
          <ul className="mt-3 space-y-2">
            {report.observations.map((obs) => (
              <li key={obs} className="border-l-2 border-dragon-neon/50 pl-3 text-sm text-gray-300 capitalize">
                {obs}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="mt-4 border border-dragon-warning/30 bg-dragon-warning/5 p-4"
        >
          <p className="font-mono text-xs text-dragon-warning uppercase">Fashion Violations</p>
          <ul className="mt-2 list-inside list-disc text-sm text-gray-300">
            {report.violations.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 border border-dragon-gold/30 bg-dragon-gold/5 p-4"
        >
          <p className="font-mono text-xs text-dragon-gold uppercase">Government Recommendations</p>
          <ul className="mt-2 space-y-1 text-sm">
            {report.recommendations.map((r) => (
              <li key={r} className="flex items-center gap-2">
                <span className="text-dragon-red">▸</span> {r}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="mt-4 border border-dragon-blue/30 bg-dragon-blue/5 p-4"
        >
          <p className="font-mono text-xs text-dragon-blue uppercase">Luxury Brand Detector™</p>
          <p className="mt-2 text-sm text-gray-300">{report.luxuryVerdict}</p>
          <p className="mt-1 font-mono text-[10px] text-gray-500">
            DHGate probability: {report.dhGateConfidence}%
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95 }}
          className="mt-8"
        >
          <p className="mb-3 text-center font-mono text-xs text-gray-500 uppercase">
            Shareable Citizen Certificate
          </p>
          <CitizenCertificate report={report} imageUrl={imageUrl} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-2 border-2 border-dragon-neon bg-dragon-neon/10 px-6 py-3 font-display tracking-widest text-dragon-neon uppercase hover:bg-dragon-neon/20"
          >
            <FiShare2 />
            {copied ? 'Copied!' : 'Share Report'}
          </button>
          <button
            type="button"
            onClick={onRetry}
            className="flex items-center gap-2 border-2 border-dragon-gold px-6 py-3 font-display tracking-widest text-dragon-gold uppercase hover:bg-dragon-gold/10"
          >
            <FiRefreshCw />
            New Inspection
          </button>
        </motion.div>

        <p className="mt-8 text-center font-mono text-[10px] text-gray-600">
          Your fit has been archived. Fashion harmony {report.score >= 500 ? 'maintained' : 'compromised'}.
        </p>
      </div>
    </motion.div>
  );
}
