import type { Answer, EvaluationResult } from '../types';

const BASE_SCORE = 750;

const TIERS = [
  { min: 900, max: 1000, name: 'Supreme Citizen', desc: 'Exemplary harmony. Reserved seating at all government events.' },
  { min: 700, max: 899, name: 'Trusted Contributor', desc: 'Acceptable levels of conformity detected.' },
  { min: 500, max: 699, name: 'Under Passive Monitoring', desc: 'Your file has been… noted.' },
  { min: 300, max: 499, name: 'Behavioural Concern', desc: 'Corrective measures recommended within 48 hours.' },
  { min: 0, max: 299, name: 'Immediate Investigation', desc: 'Do not leave your residence. A representative is en route.' },
];

const STATUS_BY_TAGS: Record<string, string[]> = {
  'gym-bro': ['Potential Gym Bro Radicalisation', 'Mirror Selfie Insurgent', 'Protein Powder Sympathiser'],
  podcast: ['Pre-Podcast Radicalisation Stage', 'Audio Content Threat Vector', 'Unlicensed Opinion Distributor'],
  entrepreneur: ['Startup Delusion Syndrome', 'LinkedIn Warrior Class', 'Stealth Hustle Operative'],
  crypto: ['Decentralised Disobedience', 'Blockchain Behavioural Anomaly', 'Volatile Asset Deviant'],
  chaos: ['Chaos Agent (Tier 2)', 'Societal Discord Enthusiast', 'Pineapple Pizza Collaborator'],
  keyboard: ['Mechanical Keyboard Militant', 'Click-Clack Dissident', 'Tactile Feedback Extremist'],
  grindset: ['Sigma Grindset Contagion', 'Motivational Content Host', '5AM Club Suspect'],
  compliant: ['Model Citizen (Provisional)', 'Harmony-Aligned Asset', 'Green Man Respecter'],
};

const CONCERNS: Record<string, string[]> = {
  'podcast-risk': ['excessive podcast exposure', 'unlicensed verbal ambition', 'microphone acquisition probable'],
  entrepreneur: ['dangerous levels of ambition', 'business plan detected in cache', 'entrepreneurial behaviour flagged'],
  'gym-bro': ['mirror selfie frequency alarming', 'protein consumption above quota', 'gym discourse contamination'],
  alpha: ['toxic masculinity metrics elevated', 'alpha terminology in active deployment'],
  doomscroll: ['irregular digital consumption patterns', 'algorithm dependency syndrome'],
  'sleep-risk': ['irregular sleep patterns', 'circadian non-compliance'],
  delusion: ['unrealistic self-improvement trajectory', 'main character syndrome indicators'],
  keyboard: ['auditory disturbance to collective peace', 'mechanical keyboard ownership on record'],
  crypto: ['financial anarchist tendencies', '3am chart analysis detected'],
  chaos: ['rule-adjacent lifestyle choices', 'culinary terrorism suspected'],
  'under-review': ['gym mirror content under active review', 'influencer pathway probable'],
  individualist: ['individuality levels exceed acceptable thresholds', 'independent thought patterns noted'],
  'self-improvement': ['emotional attachment to self-improvement content', 'unread book hoarding'],
};

const INSIGHTS = [
  'Subject exhibits high levels of delusion and entrepreneurial optimism.',
  'Citizen may attempt to launch podcast within 90 days.',
  'Detected emotional attachment to self-improvement content.',
  'Neural patterns suggest Interstellar rewatch scheduled this weekend.',
  'Individuality levels exceed acceptable thresholds for current sector.',
  'Compliance rating fluctuates based on TikTok algorithm exposure.',
  'Your future has been statistically evaluated. Outcome: concerning.',
  'Behavioural model predicts late-night crypto tab opening.',
  'Citizen viability assessed. Viability: debatable.',
  'Harmony index compromised by mechanical keyboard acoustics.',
];

const RECOMMENDATIONS = [
  'Purchase RGB rice cooker immediately.',
  'Emotional support duck (tactical edition).',
  'Tactical water bottle with compliance tracker.',
  'RGB productivity lamp — restores 12 harmony points.',
  'Government-approved white noise machine (keyboard suppression).',
  'Enroll in Mandatory Fun™ workshop (Sector 8).',
  'Delete podcast app. Install approved silence app.',
  'Replace mechanical keyboard with sponge-based alternative.',
  'Subscribe to State-Approved Motivational Content™.',
  'Attend pineapple pizza rehabilitation (virtual).',
];

const THREAT_LEVELS = [
  { max: 299, level: 'CRITICAL', color: '#ff0000' },
  { max: 499, level: 'ELEVATED', color: '#ff6600' },
  { max: 699, level: 'MODERATE', color: '#ffd700' },
  { max: 899, level: 'LOW', color: '#39ff14' },
  { max: 1000, level: 'MINIMAL', color: '#39ff14' },
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickMany<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function calculateScore(answers: Answer[]): EvaluationResult {
  const totalPenalty = answers.reduce((sum, a) => sum + a.penalty, 0);
  const allTags = answers.flatMap((a) => a.tags);
  const tagSet = new Set(allTags);

  let score = Math.max(0, Math.min(1000, BASE_SCORE + totalPenalty));
  score += Math.floor(Math.random() * 21) - 10;
  score = Math.max(0, Math.min(1000, score));

  const tier = TIERS.find((t) => score >= t.min && score <= t.max) ?? TIERS[TIERS.length - 1];

  const statusPool: string[] = [];
  for (const tag of tagSet) {
    if (STATUS_BY_TAGS[tag]) statusPool.push(...STATUS_BY_TAGS[tag]);
  }
  const citizenStatus = statusPool.length > 0 ? pick(statusPool) : pick([
    'Routine Citizen',
    'Unremarkable Contributor',
    'Harmoniously Average',
    'Pending Reclassification',
  ]);

  const concernPool: string[] = [];
  for (const tag of tagSet) {
    if (CONCERNS[tag]) concernPool.push(...CONCERNS[tag]);
  }
  const concerns = concernPool.length > 0 ? pickMany([...new Set(concernPool)], 3) : pickMany([
    'insufficient data for full trust',
    'Friday night activities unverified',
    'ambient chaos levels nominal',
  ], 3);

  const threat = THREAT_LEVELS.find((t) => score <= t.max) ?? THREAT_LEVELS[0];

  const penalties = answers
    .filter((a) => a.penalty < 0)
    .map((a) => ({ label: a.questionId, amount: a.penalty }))
    .slice(0, 5);

  return {
    score,
    tier: tier.name,
    tierDescription: tier.desc,
    threatLevel: threat.level,
    citizenStatus,
    concerns,
    insights: pickMany(INSIGHTS, 2),
    recommendations: pickMany(RECOMMENDATIONS, 3),
    penalties,
  };
}
