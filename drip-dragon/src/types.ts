export type AppPhase = 'landing' | 'upload' | 'analysis' | 'results';

export interface DripReport {
  score: number;
  tier: string;
  tierDescription: string;
  citizenStatus: string;
  auraLevel: string;
  auraDescription: string;
  threatLevel: string;
  threatColor: string;
  socialCreditAdjustment: number;
  observations: string[];
  violations: string[];
  recommendations: string[];
  patrioticAnalysis: string;
  westernInfluence: number;
  npcProbability: number;
  dripStability: number;
  dhGateConfidence?: number;
  luxuryVerdict?: string;
}
