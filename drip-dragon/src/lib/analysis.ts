import {
  AURA_LEVELS,
  CITIZEN_STATUSES,
  LUXURY_VERDICTS,
  OBSERVATIONS,
  PATRIOTIC_ANALYSIS,
  RECOMMENDATIONS,
  ROAST_OBSERVATIONS,
  THREAT_LEVELS,
  TIERS,
  VIOLATIONS,
} from '../data/pools';
import type { DripReport } from '../types';

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickMany<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, arr.length));
}

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateDripReport(roastMode: boolean): DripReport {
  const baseScore = rand(280, 920);
  const jitter = rand(-25, 25);
  const score = Math.max(0, Math.min(1000, baseScore + jitter));

  const tier = TIERS.find((t) => score >= t.min && score <= t.max) ?? TIERS[TIERS.length - 1];
  const threat = THREAT_LEVELS.find((t) => score <= t.max) ?? THREAT_LEVELS[0];

  const dripStability = rand(35, 98);
  const westernInfluence = rand(12, 89);
  const npcProbability = score < 500 ? rand(55, 95) : rand(5, 45);

  const auraScore = Math.max(0, Math.min(100, Math.round(score / 10 + rand(-15, 15))));
  const aura =
    [...AURA_LEVELS].reverse().find((a) => auraScore >= a.min) ?? AURA_LEVELS[AURA_LEVELS.length - 1];

  const observationPool = roastMode ? [...OBSERVATIONS, ...ROAST_OBSERVATIONS] : OBSERVATIONS;

  const socialCreditAdjustment = rand(-80, 40);

  return {
    score,
    tier: tier.name,
    tierDescription: tier.desc,
    citizenStatus: pick(CITIZEN_STATUSES),
    auraLevel: aura.label,
    auraDescription: aura.desc,
    threatLevel: threat.level,
    threatColor: threat.color,
    socialCreditAdjustment,
    observations: pickMany(observationPool, 3),
    violations: pickMany(VIOLATIONS, roastMode ? 4 : 3),
    recommendations: pickMany(RECOMMENDATIONS, 3),
    patrioticAnalysis: pick(PATRIOTIC_ANALYSIS),
    westernInfluence,
    npcProbability,
    dripStability,
    dhGateConfidence: rand(8, 94),
    luxuryVerdict: pick(LUXURY_VERDICTS),
  };
}
