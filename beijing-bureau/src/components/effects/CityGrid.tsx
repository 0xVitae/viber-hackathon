export function CityGrid() {
  return (
    <div
      className="pointer-events-none fixed inset-0 opacity-20"
      style={{
        backgroundImage: `
          linear-gradient(rgba(196,30,30,0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(196,30,30,0.3) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        animation: 'grid-move 20s linear infinite',
      }}
      aria-hidden
    />
  )
}
