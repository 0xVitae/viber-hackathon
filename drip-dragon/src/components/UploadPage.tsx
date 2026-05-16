import { motion } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import { FiAlertTriangle, FiUpload, FiX } from 'react-icons/fi';

interface UploadPageProps {
  imageUrl: string | null;
  onImage: (url: string) => void;
  onBack: () => void;
  onAnalyse: () => void;
  roastMode: boolean;
  onRoastModeChange: (v: boolean) => void;
}

export function UploadPage({
  imageUrl,
  onImage,
  onBack,
  onAnalyse,
  roastMode,
  onRoastModeChange,
}: UploadPageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [scanning, setScanning] = useState(false);

  const processFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) return;
      setScanning(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setTimeout(() => {
          onImage(url);
          setScanning(false);
        }, 1200);
      };
      reader.readAsDataURL(file);
    },
    [onImage],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen flex-col items-center px-4 py-28"
    >
      <div className="w-full max-w-2xl">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 font-mono text-xs text-gray-500 uppercase tracking-widest hover:text-dragon-neon"
        >
          ‹ Return to surveillance grid
        </button>

        <h1 className="font-display text-4xl text-white uppercase md:text-5xl">
          Citizen Fit Upload
        </h1>
        <p className="mt-2 font-mono text-sm text-gray-400">
          Submit mirror selfie, outfit pic, or group fit check for government review.
        </p>

        <label className="mt-6 flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={roastMode}
            onChange={(e) => onRoastModeChange(e.target.checked)}
            className="accent-dragon-red"
          />
          <span className="font-mono text-xs text-dragon-warning uppercase">
            🔥 Roast Mode — AI becomes aggressively judgemental
          </span>
        </label>

        <motion.div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => !imageUrl && inputRef.current?.click()}
          className={`relative mt-8 cursor-pointer overflow-hidden border-2 border-dashed transition ${
            dragging
              ? 'border-dragon-neon bg-dragon-neon/10'
              : 'border-dragon-red/50 bg-black/60 hover:border-dragon-gold/60'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) processFile(file);
            }}
          />

          {scanning && (
            <motion.div
              className="scan-beam absolute right-0 left-0 z-20 h-1 bg-dragon-neon shadow-[0_0_20px_#39ff14]"
              initial={{ top: 0 }}
            />
          )}

          {imageUrl ? (
            <motion.div className="relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <img src={imageUrl} alt="Uploaded fit" className="max-h-[420px] w-full object-contain" />
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-4 left-4 border-t-2 border-l-2 border-dragon-neon w-12 h-12" />
                <motion.div className="absolute top-4 right-4 border-t-2 border-r-2 border-dragon-neon w-12 h-12" />
                <div className="absolute bottom-4 left-4 border-b-2 border-l-2 border-dragon-neon w-12 h-12" />
                <div className="absolute bottom-4 right-4 border-b-2 border-r-2 border-dragon-neon w-12 h-12" />
                <motion.div
                  className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dragon-red"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.p
                  className="absolute bottom-6 left-0 right-0 text-center font-mono text-xs text-dragon-neon uppercase"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  Facial lock-on acquired
                </motion.p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onImage('');
                }}
                className="absolute top-2 right-2 z-30 border border-dragon-red bg-black/80 p-2 text-dragon-red hover:bg-dragon-red hover:text-white"
              >
                <FiX />
              </button>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-6">
              <FiUpload className="text-4xl text-dragon-gold" />
              <p className="mt-4 font-display text-2xl text-white uppercase">
                Drag & Drop Fit Evidence
              </p>
              <p className="mt-2 font-mono text-xs text-gray-500">
                or click to browse — surveillance scanner ready
              </p>
              <motion.div
                className="mt-6 flex items-center gap-2 border border-dragon-warning/40 bg-dragon-warning/10 px-3 py-1 font-mono text-[10px] text-dragon-warning"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <FiAlertTriangle />
                All uploads monitored by Fashion Harmony Bureau
              </motion.div>
            </div>
          )}
        </motion.div>

        <motion.button
          type="button"
          disabled={!imageUrl}
          onClick={onAnalyse}
          whileHover={imageUrl ? { scale: 1.02 } : {}}
          whileTap={imageUrl ? { scale: 0.98 } : {}}
          className="mt-8 w-full border-2 border-dragon-neon bg-dragon-neon/15 py-4 font-display text-2xl tracking-widest text-dragon-neon uppercase transition disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:bg-dragon-neon/25 enabled:hover:shadow-[0_0_30px_rgba(57,255,20,0.3)]"
        >
          Submit For Government Inspection
        </motion.button>
      </div>
    </motion.div>
  );
}
