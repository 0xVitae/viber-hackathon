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
  category: EmotionalCategory[];
}

export interface TherapyResponse {
  advice: string;
  reasoning?: string;
  productIds: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  products?: Product[];
  timestamp: number;
}

export type SeverityLevel =
  | "Mildly inconvenienced"
  | "Spiralling"
  | "Existential"
  | "Gym arc incoming"
  | "Listening to Frank Ocean";
