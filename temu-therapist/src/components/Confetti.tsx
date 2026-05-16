import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const COLORS = ["#ff6b00", "#39ff14", "#ffd700", "#e63900", "#ffea00"];

interface ConfettiProps {
  active: boolean;
}

export function Confetti({ active }: ConfettiProps) {
  const [pieces, setPieces] = useState<{ id: number; x: number; color: string; delay: number }[]>([]);

  useEffect(() => {
    if (!active) return;
    setPieces(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 0.5,
      }))
    );
    const t = setTimeout(() => setPieces([]), 3000);
    return () => clearTimeout(t);
  }, [active]);

  if (!active || pieces.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute h-3 w-2 rounded-sm"
          style={{ left: `${p.x}%`, backgroundColor: p.color, top: -20 }}
          initial={{ y: -20, rotate: 0, opacity: 1 }}
          animate={{ y: "100vh", rotate: 720, opacity: 0 }}
          transition={{ duration: 2.5, delay: p.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}
