import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LIVE_ACTIVITY } from "../data/popups";

export function LiveActivityFeed() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const add = () => {
      const msg = LIVE_ACTIVITY[Math.floor(Math.random() * LIVE_ACTIVITY.length)];
      setItems((prev) => [msg, ...prev].slice(0, 5));
    };
    add();
    const id = setInterval(add, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hidden lg:block w-56 shrink-0">
      <div className="sticky top-4 rounded-xl border-4 border-black bg-white p-3 shadow-[4px_4px_0_#000]">
        <p className="text-xs font-black uppercase text-orange-600">🔴 Live Healing Activity</p>
        <ul className="mt-2 space-y-2">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.li
                key={`${item}-${i}`}
                className="rounded-lg bg-orange-50 px-2 py-1.5 text-[11px] font-semibold text-gray-800"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, height: 0 }}
                layout
              >
                {item}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
