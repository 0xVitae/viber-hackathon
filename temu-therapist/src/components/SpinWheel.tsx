import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { WHEEL_PRIZES } from "../data/popups";

interface SpinWheelProps {
  onClose: () => void;
}

export function SpinWheel({ onClose }: SpinWheelProps) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const prize = WHEEL_PRIZES[Math.floor(Math.random() * WHEEL_PRIZES.length)];
    const extra = 1440 + Math.random() * 360;
    setRotation((r) => r + extra);
    setTimeout(() => {
      setSpinning(false);
      setResult(prize);
    }, 3000);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/60 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative my-auto w-full max-w-sm rounded-2xl border-[3px] border-black bg-white p-5 shadow-[6px_6px_0_#ff6b00] sm:border-4 sm:p-6 sm:shadow-[8px_8px_0_#ff6b00]"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 -right-3 rounded-full border-2 border-black bg-red-500 p-1 text-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-center font-display text-lg uppercase sm:text-xl">Spin for Mental Stability</h2>

        <div className="relative mx-auto mt-5 h-44 w-44 sm:mt-6 sm:h-48 sm:w-48">
          <div className="absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-2 text-2xl">▼</div>
          <motion.div
            className="h-full w-full rounded-full border-4 border-black"
            style={{
              background: `conic-gradient(${WHEEL_PRIZES.map((_, i) => {
                const colors = ["#ff6b00", "#39ff14", "#ffd700", "#e63900", "#9333ea", "#ffea00", "#00bcd4", "#ff69b4"];
                return `${colors[i % colors.length]} ${(i / WHEEL_PRIZES.length) * 360}deg ${((i + 1) / WHEEL_PRIZES.length) * 360}deg`;
              }).join(", ")})`,
            }}
            animate={{ rotate: rotation }}
            transition={{ duration: 3, ease: [0.2, 0.8, 0.2, 1] }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-black bg-white font-black text-xs">
              SPIN
            </div>
          </div>
        </div>

        <motion.button
          type="button"
          onClick={spin}
          disabled={spinning}
          className="mt-6 w-full rounded-xl border-4 border-black bg-neon-green py-3 font-display text-lg uppercase disabled:opacity-50"
          whileHover={{ scale: spinning ? 1 : 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          {spinning ? "HEALING..." : "SPIN NOW"}
        </motion.button>

        <AnimatePresence>
          {result && (
            <motion.p
              className="mt-4 text-center font-black text-orange-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              🎉 You won: {result}!
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
