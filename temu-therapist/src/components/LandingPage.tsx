import { motion } from "framer-motion";
import { Sparkles, ShoppingBag, HeartCrack } from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <motion.div
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 pt-16 pb-24 sm:py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-orange-600"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
      />

      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)`,
        }}
      />

      <div className="absolute top-0 left-0 right-0 overflow-hidden bg-black/30 py-1.5 sm:py-2">
        <div className="animate-marquee flex whitespace-nowrap text-xs font-bold text-yellow-300 sm:text-sm">
          <span className="mx-6 sm:mx-8">🔥 HEALING 74% OFF</span>
          <span className="mx-6 sm:mx-8">🛒 FREE SHIPPING IF YOU CRY NOW</span>
          <span className="mx-6 sm:mx-8">✨ EMOTIONAL SUPPORT CERTIFIED</span>
          <span className="mx-6 sm:mx-8">🔥 HEALING 74% OFF</span>
          <span className="mx-6 sm:mx-8">🛒 FREE SHIPPING IF YOU CRY NOW</span>
          <span className="mx-6 sm:mx-8">✨ EMOTIONAL SUPPORT CERTIFIED</span>
        </div>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-2xl text-center"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
      >
        <motion.div
          className="mb-5 inline-flex items-center gap-1.5 rounded-full border-[3px] border-yellow-300 bg-white px-4 py-1.5 text-[11px] font-black uppercase tracking-wider text-orange-600 shadow-lg sm:mb-6 sm:gap-2 sm:border-4 sm:px-6 sm:py-2 sm:text-sm"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
          FDA-Adjacent Wellness
          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
        </motion.div>

        <h1 className="font-display text-[2.5rem] leading-[1.05] text-white drop-shadow-[3px_3px_0_#000] sm:text-7xl sm:drop-shadow-[4px_4px_0_#000]">
          Welcome to
          <br />
          <span className="text-yellow-300">Temu Therapist</span>
        </h1>

        <p className="mt-2 font-display text-lg text-yellow-200 sm:text-2xl">
          Healing. But affordable.
        </p>

        <p className="mt-5 px-2 text-base font-semibold text-white/95 sm:mt-6 sm:text-xl">
          Why heal emotionally when you can consume materially?
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3 text-5xl sm:mt-8 sm:gap-4 sm:text-6xl">
          {["🦐", "🦆", "🐸", "🚽", "🐺"].map((emoji, i) => (
            <motion.span
              key={emoji}
              className="animate-float"
              style={{ animationDelay: `${i * 0.2}s` }}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.15 }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>

        <motion.button
          type="button"
          onClick={onStart}
          className="mt-8 group relative inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-2xl border-[3px] border-black bg-neon-green px-6 py-4 font-display text-xl uppercase text-black shadow-[5px_5px_0_#000] transition active:translate-x-1 active:translate-y-1 active:shadow-[3px_3px_0_#000] sm:mt-10 sm:w-auto sm:gap-3 sm:border-4 sm:px-10 sm:py-5 sm:text-2xl sm:shadow-[6px_6px_0_#000] sm:hover:scale-105 sm:hover:shadow-[8px_8px_0_#000]"
          whileTap={{ scale: 0.98 }}
        >
          <HeartCrack className="h-6 w-6 sm:h-8 sm:w-8" />
          Start Healing
          <ShoppingBag className="h-6 w-6 transition group-hover:rotate-12 sm:h-8 sm:w-8" />
        </motion.button>

        <p className="mt-5 px-4 text-xs font-medium text-white/80 sm:mt-6 sm:text-sm">
          No real therapy. Only products. Terms of sadness apply.
        </p>
      </motion.div>

      <motion.div
        className="absolute bottom-3 right-3 z-20 animate-float rounded-lg border-[3px] border-red-600 bg-yellow-300 px-2.5 py-1 text-xs font-black text-red-700 shadow-lg sm:bottom-8 sm:right-8 sm:rounded-xl sm:border-4 sm:px-4 sm:py-2 sm:text-base"
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ delay: 1, type: "spring" }}
      >
        🔥 2 LEFT!
      </motion.div>
    </motion.div>
  );
}
