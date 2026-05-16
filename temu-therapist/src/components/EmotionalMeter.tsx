import { motion } from "framer-motion";
import type { SeverityLevel } from "../types";

interface EmotionalMeterProps {
  level: SeverityLevel;
  percent: number;
}

const COLORS = ["#39ff14", "#ffea00", "#ff6b00", "#e63900", "#9333ea"];

export function EmotionalMeter({ level, percent }: EmotionalMeterProps) {
  const colorIndex = Math.min(Math.floor(percent / 25), COLORS.length - 1);

  return (
    <div className="rounded-xl border-4 border-black bg-white p-3 shadow-[4px_4px_0_#000]">
      <motion.div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase text-gray-500">Emotional Severity</span>
        <motion.span
          key={level}
          className="text-xs font-black text-red-600"
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
        >
          {level}
        </motion.span>
      </motion.div>
      <div className="mt-2 h-4 overflow-hidden rounded-full border-2 border-black bg-gray-200">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: COLORS[colorIndex] }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ type: "spring", stiffness: 80 }}
        />
      </div>
      <motion.p
        className="mt-1 text-[10px] font-bold text-orange-600"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        {percent >= 80 ? "⚠️ CRITICAL — ADD TO CART IMMEDIATELY" : "Monitoring your spiral..."}
      </motion.p>
    </div>
  );
}
