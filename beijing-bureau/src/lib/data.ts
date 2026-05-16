export const OFFENCES = [
  'Excessive enjoyment',
  'Illegal fun',
  'Owning multiple VPNs',
  'Public dancing',
  'Consuming western memes',
  'Unlicensed optimism',
  'Excessive individuality',
  'Jaywalking with confidence',
  'Pineapple pizza support',
  'Listening to podcasts unironically',
  'Watching motivational reels',
  'Unauthorized smiling',
  'Western breakfast consumption',
  'Unregulated TikTok scrolling',
  'Suspicious quietness',
  'Free thought detected',
  'Excessive happiness',
  'Illegal whistling',
  'Unpatriotic nap duration',
] as const

export const THREAT_LEVELS = [
  { value: 1, label: '1 — Minor Discord' },
  { value: 3, label: '3 — Notable Deviation' },
  { value: 5, label: '5 — Harmony Risk' },
  { value: 7, label: '7 — Serious Infraction' },
  { value: 9, label: '9 — CRITICAL THREAT' },
  { value: 10, label: '10 — EXISTENTIAL DANGER' },
]

export const PROCESSING_STEPS = [
  'Facial Recognition Activated',
  'CCTV Scan In Progress',
  'Threat Analysis Running',
  'Behavioural Pattern Extraction',
  'Harmony Assessment',
  'Patriotism Verification',
  'Social Stability Calculation',
  'Freedom Detection Sweep',
]

export const AI_OUTPUTS = [
  'Citizen appears emotionally unstable.',
  'Detected dangerous levels of free thought.',
  'Suspicious happiness levels detected.',
  'Potential sigma male activity.',
  'Western influence markers identified.',
  'Morale integrity compromised beyond repair.',
  'Citizen posture: suspicious.',
  'Emotional resistance identified.',
  'Unauthorized optimism in sector 7.',
  'Harmony disruption probability: 94.7%.',
]

export const PROPAGANDA_MESSAGES = [
  'THANK YOU FOR YOUR PATRIOTISM.',
  'Harmony levels increasing.',
  'Your report protects society.',
  'Citizen compliance rewarded.',
  'Freedom detected. Investigating.',
  'Your loyalty has been noted.',
  'Excessive happiness requires review.',
  'Thank you for strengthening harmony.',
  'Citizen morale inconsistent — monitoring initiated.',
  'Report received. Surveillance enhanced.',
  'Patriotism quotient elevated.',
  'District harmony restored by your vigilance.',
]

export const LEGAL_CONSEQUENCES = [
  'Mandatory re-education seminar (4 hours)',
  'Community harmony workshop attendance',
  'Patriotism score review in 72 hours',
  'Increased CCTV monitoring — indefinite',
  'Social credit rehabilitation program',
  'Public apology broadcast scheduled',
  'Fun privileges revoked for 30 days',
  'Meme consumption permit suspended',
]

export const PROPAGANDA_VERDICTS = [
  'Citizen morale integrity compromised.',
  'Harmony equilibrium destabilized.',
  'Patriotism levels critically insufficient.',
  'Subject flagged for enhanced surveillance.',
  'Social stability index: UNACCEPTABLE.',
  'Citizen classified as harmony liability.',
]

export const STATUSES = [
  'Under Monitoring',
  'Active Investigation',
  'Harmony Rehabilitation',
  'Enhanced Surveillance',
  'Citizen Watchlist',
  'Priority Target',
]

export const LEADERBOARD: { name: string; reports: number; patriotism: number }[] = [
  { name: 'PandaWatcher', reports: 2847, patriotism: 99 },
  { name: 'RiceProtector', reports: 2103, patriotism: 97 },
  { name: 'HarmonyHunter', reports: 1892, patriotism: 96 },
  { name: 'DefinitelyNotACop', reports: 1654, patriotism: 94 },
  { name: 'CitizenZero', reports: 1432, patriotism: 92 },
  { name: 'RedStarGazer', reports: 1201, patriotism: 89 },
  { name: 'BureauFan42', reports: 987, patriotism: 87 },
]

export const IMAGE_ANALYSIS_RESPONSES = [
  'Suspicious happiness levels detected.',
  'Potential sigma male activity.',
  'Western aesthetic contamination identified.',
  'Unauthorized joy signature in image data.',
  'Food item appears too delicious — investigation warranted.',
  'Pet detected. Loyalty of animal: UNVERIFIED.',
  'Background contains unapproved colours.',
  'Subject smiling without permit.',
]

export const SCANNER_OUTPUTS = [
  'Citizen posture: suspicious.',
  'Detected western influence.',
  'Emotional resistance identified.',
  'Blink rate exceeds harmony threshold.',
  'Micro-expression: concealed dissent.',
  'Eye contact duration: threatening.',
  'Facial symmetry: too individualistic.',
]

export const DASHBOARD_STATS = {
  citizensMonitored: 14382991,
  harmonyLevel: 97.4,
  illegalFunToday: 842,
  activeInvestigations: 12847,
  threatsNeutralized: 3847291,
}
