export function RadarSweep({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-full ${className}`} aria-hidden>
      <div className="absolute inset-0 rounded-full border border-bureau-red/40 bg-bureau-dark/80" />
      <div
        className="animate-radar absolute inset-0 origin-center"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, rgba(196,30,30,0.6) 30deg, transparent 60deg)',
        }}
      />
      <div className="absolute inset-[25%] rounded-full border border-bureau-gold/20" />
      <div className="absolute inset-[45%] rounded-full border border-bureau-gold/10" />
      <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bureau-red" />
    </div>
  )
}
