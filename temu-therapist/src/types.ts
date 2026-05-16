export type EmotionalCategory =
  | "sadness"
  | "breakup"
  | "burnout"
  | "existential"
  | "lonely"
  | "default";

export interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  emoji: string;
  tag: string;
  category?: EmotionalCategory[];
  imageUrl?: string;
  sourceUrl?: string;
}

export interface TherapyResponse {
  advice: string;
  reasoning?: string;
  productIds: string[];
}

export type SeverityLevel =
  | "Mildly inconvenienced"
  | "Spiralling"
  | "Existential"
  | "Gym arc incoming"
  | "Listening to Frank Ocean";

export interface Severity {
  level: SeverityLevel;
  percent: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  products?: Product[];
  severity?: Severity;
  timestamp: number;
}
