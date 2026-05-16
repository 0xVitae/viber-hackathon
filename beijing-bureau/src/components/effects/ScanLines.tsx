export function ScanLines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      <div className="animate-scanline absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-bureau-neon/30 to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
        }}
      />
    </div>
  )
}
