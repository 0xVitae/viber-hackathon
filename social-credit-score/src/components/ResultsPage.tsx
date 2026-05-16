import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FiRefreshCw, FiShare2 } from 'react-icons/fi';
import type { EvaluationResult } from '../types';
import { ShareCard } from './ShareCard';

interface ResultsPageProps {
  result: EvaluationResult;
  onRetry: () => void;
}

function AnimatedScore({ score }: { score: number }) {
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v));
  const [shown, setShown] = useState(0);

  useEffect(() => {
    spring.set(score);
    const unsub = display.on('change', (v) => setShown(v));
    return unsub;
  }, [score, spring, display]);

  return (
    <span className="font-display text-8xl text-gold md:text-9xl">
      {shown}
      <span className="text-4xl text-gray-500">/1000</span>
    </span>
  );
}

export function ResultsPage({ result, onRetry }: ResultsPageProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const shareText = `My Social Credit Score: ${result.score}/1000 — ${result.citizenStatus}. Threat Level: ${result.threatLevel}. What's yours?`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Social Credit Score', text: shareText });
        return;
      } catch {
        /* fallback */
      }
    }
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const threatColor =
    result.threatLevel === 'CRITICAL'
      ? 'text-scarlet'
      : result.threatLevel === 'ELEVATED'
        ? 'text-orange-500'
        : result.threatLevel === 'MODERATE'
          ? 'text-warning'
          : 'text-neon';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen flex-col items-center px-4 py-24"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-3xl"
      >
        <p className="text-center font-mono text-xs uppercase tracking-[0.4em] text-neon">
          Citizen viability assessed
        </p>
        <h1 className="mt-2 text-center font-display text-4xl uppercase text-white md:text-5xl">
          Evaluation Complete
        </h1>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 border-2 border-gold/50 bg-gradient-to-b from-scarlet/20 to-black p-8 text-center"
        >
          <p className="font-mono text-sm uppercase text-gray-400">Social Credit Score</p>
          <AnimatedScore score={result.score} />
          <p className="mt-2 font-mono text-lg uppercase text-gold">{result.tier}</p>
          <p className="mt-1 text-sm text-gray-500">{result.tierDescription}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 grid gap-4 md:grid-cols-2"
        >
          <motion.div className="border border-scarlet/50 bg-black/80 p-4">
            <p className="font-mono text-[10px] uppercase text-gray-500">Citizen Status</p>
            <p className="mt-1 font-display text-xl uppercase text-scarlet">{result.citizenStatus}</p>
          </motion.div>
          <motion.div className="border border-warning/50 bg-black/80 p-4">
            <p className="font-mono text-[10px] uppercase text-gray-500">Threat Level</p>
            <p className={`mt-1 font-display text-xl uppercase ${threatColor}`}>{result.threatLevel}</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 border border-neon/30 bg-black/80 p-4"
        >
          <p className="font-mono text-xs uppercase text-neon">AI Psychological Analysis</p>
          <ul className="mt-3 space-y-2">
            {result.insights.map((insight) => (
              <li key={insight} className="border-l-2 border-neon/50 pl-3 text-sm italic text-gray-300">
                &ldquo;{insight}&rdquo;
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 border border-warning/30 bg-warning/5 p-4"
        >
          <p className="font-mono text-xs uppercase text-warning">Behavioural Risks Identified</p>
          <ul className="mt-2 list-inside list-disc text-sm text-gray-300">
            {result.concerns.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-4 border border-gold/30 bg-gold/5 p-4"
        >
          <p className="font-mono text-xs uppercase text-gold">Mandatory Corrective Products™</p>
          <ul className="mt-2 space-y-1 text-sm">
            {result.recommendations.map((r) => (
              <li key={r} className="flex items-center gap-2">
                <span className="text-scarlet">▸</span> {r}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8"
          ref={cardRef}
        >
          <p className="mb-3 text-center font-mono text-xs uppercase text-gray-500">Official Share Card</p>
          <ShareCard result={result} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-2 border-2 border-neon bg-neon/10 px-6 py-3 font-display uppercase tracking-widest text-neon hover:bg-neon/20"
          >
            <FiShare2 />
            {copied ? 'Copied!' : 'Share Score'}
          </button>
          <button
            type="button"
            onClick={onRetry}
            className="flex items-center gap-2 border-2 border-gold px-6 py-3 font-display uppercase tracking-widest text-gold hover:bg-gold/10"
          >
            <FiRefreshCw />
            Re-Evaluate
          </button>
        </motion.div>

        <p className="mt-8 text-center font-mono text-[10px] text-gray-600">
          Your compliance rating has been updated. Individuality levels noted.
        </p>
      </motion.div>
    </motion.div>
  );
}
