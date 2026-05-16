export interface Report {
  id: string
  citizenName: string
  offence: string
  threatLevel: number
  description: string
  patriotismRating: number
  deduction: number
  status: string
  propagandaMessage: string
  legalConsequence: string
  aiAnalysis: string
  timestamp: number
  evidenceFileName?: string
}

export type PatriotismTier =
  | 'Questionable'
  | 'Monitored'
  | 'Trusted Citizen'
  | 'Community Defender'
  | 'Supreme Patriot'

export interface LeaderboardEntry {
  rank: number
  name: string
  reports: number
  patriotism: number
}
