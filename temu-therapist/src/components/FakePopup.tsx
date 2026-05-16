import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface FakePopupProps {
  message: string;
  onDismiss: () => void;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
}

const POSITIONS = {
  "top-left": "top-16 left-2 sm:top-24 sm:left-4",
  "top-right": "top-16 right-2 sm:top-24 sm:right-4",
  "bottom-left": "bottom-20 left-2 sm:bottom-24 sm:left-4",
  "bottom-right": "bottom-20 right-2 sm:bottom-24 sm:right-4",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

export function FakePopup({ message, onDismiss, position = "bottom-right" }: FakePopupProps) {
  return (
    <AnimatePresence>
      <motion.div
        className={`fixed z-50 w-[min(15rem,calc(100vw-1rem))] sm:w-auto sm:max-w-xs ${POSITIONS[position]}`}
        initial={{ opacity: 0, x: position.includes("right") ? 80 : -80, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="animate-shake rounded-xl border-[3px] border-black bg-yellow-300 p-3 shadow-[4px_4px_0_#000] sm:border-4 sm:p-4 sm:shadow-[6px_6px_0_#000]">
          <button
            type="button"
            onClick={onDismiss}
            className="absolute -top-2 -right-2 rounded-full border-2 border-black bg-white p-1 hover:bg-gray-100"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="pr-4 text-xs font-black uppercase text-black sm:text-sm">{message}</p>
          <button
            type="button"
            onClick={onDismiss}
            className="mt-2.5 w-full rounded-lg border-2 border-black bg-neon-green py-1.5 text-[11px] font-black uppercase hover:scale-105 sm:mt-3 sm:py-2 sm:text-xs"
          >
            CLAIM HEALING
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
