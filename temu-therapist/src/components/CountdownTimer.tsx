import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export function CountdownTimer() {
  const [seconds, setSeconds] = useState(() => Math.floor(Math.random() * 120) + 60);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => (s <= 0 ? Math.floor(Math.random() * 180) + 30 : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");

  return (
    <motion.div
      className="flex items-center gap-2 rounded-lg border-2 border-red-600 bg-red-50 px-3 py-2"
      animate={seconds < 30 ? { scale: [1, 1.03, 1] } : {}}
      transition={{ repeat: Infinity, duration: 0.5 }}
    >
      <Clock className="h-4 w-4 text-red-600" />
      <div>
        <p className="text-[10px] font-bold uppercase text-red-600">Emotional discount expires in</p>
        <p className="font-display text-xl text-red-700 tabular-nums">
          {mins}:{secs}
        </p>
      </div>
    </motion.div>
  );
}
