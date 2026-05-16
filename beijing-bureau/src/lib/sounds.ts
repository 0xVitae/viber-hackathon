let audioCtx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext()
  return audioCtx
}

function beep(freq: number, duration: number, type: OscillatorType = 'square', volume = 0.08) {
  try {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.value = freq
    gain.gain.value = volume
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    osc.stop(ctx.currentTime + duration)
  } catch {
    /* audio not available */
  }
}

export function playAlert(enabled: boolean) {
  if (!enabled) return
  beep(440, 0.1)
  setTimeout(() => beep(330, 0.15), 100)
}

export function playSiren(enabled: boolean) {
  if (!enabled) return
  for (let i = 0; i < 6; i++) {
    setTimeout(() => beep(200 + i * 80, 0.12, 'sawtooth', 0.06), i * 150)
  }
}

export function playSubmit(enabled: boolean) {
  if (!enabled) return
  beep(880, 0.05, 'sine', 0.05)
  setTimeout(() => beep(660, 0.08, 'sine', 0.05), 60)
}

export function playDeduction(enabled: boolean) {
  if (!enabled) return
  beep(150, 0.3, 'sawtooth', 0.1)
}
