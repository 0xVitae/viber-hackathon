import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface VideoAdPopupProps {
  src: string;
  skipAfterSeconds?: number;
}

export function VideoAdPopup({ src, skipAfterSeconds = 5 }: VideoAdPopupProps) {
  const [open, setOpen] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(skipAfterSeconds);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) return;
    if (secondsLeft <= 0) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [open, secondsLeft]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const canSkip = secondsLeft <= 0;
  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-[420px]"
            initial={{ scale: 0.6, rotate: -6, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: "spring", damping: 14, stiffness: 200 }}
          >
            <div className="rounded-2xl border-4 border-black bg-white p-2 shadow-[8px_8px_0_#000] sm:p-3">
              <div className="mb-2 flex items-center justify-between gap-2 px-1">
                <span className="rounded-full border-2 border-black bg-yellow-300 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
                  Sponsored · Cannot Skip*
                </span>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close ad"
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-black bg-white text-black shadow-[2px_2px_0_#000] transition-transform hover:scale-110 hover:bg-red-500 hover:text-white active:scale-95"
                >
                  <X className="h-5 w-5" strokeWidth={3} />
                </button>
              </div>

              <div className="relative overflow-hidden rounded-xl border-2 border-black bg-black">
                <video
                  ref={videoRef}
                  src={src}
                  autoPlay
                  muted
                  playsInline
                  controls={false}
                  className="block aspect-[9/16] w-full"
                  onEnded={close}
                />

                <div className="pointer-events-none absolute left-2 top-2 rounded-full border-2 border-black bg-red-600 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                  ● LIVE AD
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between gap-2 px-1">
                <span className="text-[11px] font-bold text-gray-500">
                  *or click the X if you must.
                </span>
                {canSkip ? (
                  <button
                    type="button"
                    onClick={close}
                    className="rounded-full border-2 border-black bg-neon-green px-4 py-1.5 text-xs font-black uppercase shadow-[2px_2px_0_#000] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#000]"
                  >
                    Skip Ad ▶
                  </button>
                ) : (
                  <span className="rounded-full border-2 border-black bg-gray-200 px-4 py-1.5 text-xs font-black uppercase text-gray-600">
                    Skip in {secondsLeft}s
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
