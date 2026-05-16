import type { SeverityLevel } from "../types";

const LEVELS: SeverityLevel[] = [
  "Mildly inconvenienced",
  "Spiralling",
  "Existential",
  "Gym arc incoming",
  "Listening to Frank Ocean",
];

export function getSeverity(messageCount: number): { level: SeverityLevel; percent: number } {
  const index = Math.min(Math.floor(messageCount / 2), LEVELS.length - 1);
  const percent = Math.min(20 + messageCount * 18, 100);
  return { level: LEVELS[index], percent };
}
