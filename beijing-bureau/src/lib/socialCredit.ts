import type { PatriotismTier } from '../types/report'

const OFFENCE_PENALTIES: Record<string, number> = {
  'Jaywalking with confidence': 15,
  'Pineapple pizza support': 300,
  'Listening to podcasts unironically': 75,
  'Watching motivational reels': 500,
  'Excessive individuality': 450,
  'Owning multiple VPNs': 800,
  'Free thought detected': 999,
  'Illegal fun': 200,
  'Consuming western memes': 350,
}

export function calculateDeduction(
  offence: string,
  threatLevel: number,
  patriotismRating: number,
  emergency = false,
): number {
  const base = OFFENCE_PENALTIES[offence] ?? 50 + threatLevel * 40
  const threatMultiplier = 1 + threatLevel * 0.15
  const patriotismPenalty = patriotismRating < 50 ? 100 : 0
  const total = Math.round((base * threatMultiplier + patriotismPenalty) * (emergency ? 3 : 1))
  return -Math.min(total, 9999)
}

export function getPatriotismTier(reportCount: number): PatriotismTier {
  if (reportCount >= 15) return 'Supreme Patriot'
  if (reportCount >= 10) return 'Community Defender'
  if (reportCount >= 5) return 'Trusted Citizen'
  if (reportCount >= 2) return 'Monitored'
  return 'Questionable'
}

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}
