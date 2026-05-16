import { motion } from "framer-motion";
import { Package } from "lucide-react";
import type { Product } from "../types";

interface TherapyBundleProps {
  products: Product[];
  onDismiss: () => void;
}

export function TherapyBundle({ products, onDismiss }: TherapyBundleProps) {
  const total = products.reduce((sum, p) => sum + parseFloat(p.price.replace("$", "")), 0);
  const fakeOriginal = 847;

  return (
    <motion.div
      className="fixed inset-0 z-[55] flex items-center justify-center overflow-y-auto bg-black/50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="my-auto w-full max-w-md rounded-2xl border-[3px] border-black bg-gradient-to-b from-yellow-100 to-orange-100 p-5 shadow-[6px_6px_0_#000] sm:border-4 sm:p-6 sm:shadow-[8px_8px_0_#000]"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
      >
        <div className="flex items-center gap-2">
          <Package className="h-7 w-7 text-orange-600 sm:h-8 sm:w-8" />
          <h2 className="font-display text-xl uppercase leading-tight sm:text-2xl">Complete Healing Bundle</h2>
        </div>
        <p className="mt-1 text-xs font-bold text-red-600 sm:text-sm">Normally ${fakeOriginal}, now ${total.toFixed(2)}</p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {products.map((p) => (
            <div key={p.id} className="rounded-lg border-2 border-black bg-white p-2 text-center">
              <span className="text-2xl sm:text-3xl">{p.emoji}</span>
              <p className="mt-1 text-[9px] font-bold line-clamp-2">{p.name}</p>
            </div>
          ))}
        </div>

        <motion.button
          type="button"
          className="mt-4 w-full rounded-xl border-[3px] border-black bg-neon-green py-3 font-display text-base uppercase leading-tight sm:border-4 sm:text-lg"
          whileHover={{ scale: 1.02 }}
          onClick={onDismiss}
        >
          BUY ENTIRE BREAKDOWN — ${total.toFixed(2)}
        </motion.button>
        <button type="button" onClick={onDismiss} className="mt-2 w-full text-xs font-bold text-gray-500 underline">
          No thanks, I enjoy suffering
        </button>
      </motion.div>
    </motion.div>
  );
}
