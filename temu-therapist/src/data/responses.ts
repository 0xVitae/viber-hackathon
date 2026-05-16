import type { EmotionalCategory, TherapyResponse } from "../types";

const CATEGORY_KEYWORDS: Record<EmotionalCategory, string[]> = {
  sadness: ["sad", "empty", "depressed", "cry", "crying", "down", "hopeless", "miserable", "grief"],
  breakup: ["dumped", "broke up", "breakup", "break up", "ex", "boyfriend", "girlfriend", "left me", "cheated", "divorce"],
  burnout: ["burnt out", "burned out", "burnout", "tired", "exhausted", "overwork", "stress", "work", "dead inside"],
  existential: ["purpose", "meaning", "life", "exist", "pointless", "why am i", "nothing matters", "nihil"],
  lonely: ["lonely", "alone", "isolated", "no friends", "single", "nobody"],
  default: [],
};

const RESPONSES: Record<EmotionalCategory, TherapyResponse[]> = {
  sadness: [
    {
      advice: "Your sadness may be caused by insufficient RGB lighting.",
      reasoning: "Clinical studies (made up just now) show 74% of sadness is LED-deficiency.",
      productIds: ["rgb-toilet", "shrimp-slippers", "crying-pillow"],
    },
    {
      advice: "Have you tried purchasing comfort? It's 98% off today.",
      reasoning: "Emotional regulation through consumerism is FDA-adjacent.",
      productIds: ["support-duck", "crying-pillow"],
    },
    {
      advice: "Your tears could power this USB pillow. That's called healing.",
      productIds: ["crying-pillow", "trauma-crocs"],
    },
  ],
  breakup: [
    {
      advice: "Many warriors begin their journey this way. Consider the wolf path.",
      reasoning: "Rejection is just the universe redirecting you to tactical apparel.",
      productIds: ["wolf-hoodie", "gym-band", "banana-holder"],
    },
    {
      advice: "Your ex didn't deserve you OR this banana holder. Both are elite.",
      productIds: ["banana-holder", "samurai-umbrella", "trauma-crocs"],
    },
    {
      advice: "Heartbreak is temporary. These Crocs are forever (limited stock).",
      productIds: ["trauma-crocs", "wolf-hoodie"],
    },
  ],
  burnout: [
    {
      advice: "Your nervous system needs percussive therapy. By hammer.",
      reasoning: "Rest is for people who haven't discovered WiFi tea yet.",
      productIds: ["massage-hammer", "absurd-tea", "rgb-rice"],
    },
    {
      advice: "Burnout is just your body asking for more gadgets.",
      productIds: ["incense-launcher", "absurd-tea", "rgb-rice"],
    },
    {
      advice: "You don't need a vacation. You need a Bluetooth incense launcher.",
      productIds: ["incense-launcher", "massage-hammer"],
    },
  ],
  existential: [
    {
      advice: "Have you considered tiny plastic frogs?",
      reasoning: "500 frogs = 500 purposes. Math checks out.",
      productIds: ["mini-frogs", "galaxy-projector"],
    },
    {
      advice: "The void can be filled. With a galaxy projector. And frogs.",
      productIds: ["galaxy-projector", "mini-frogs", "samurai-umbrella"],
    },
    {
      advice: "You may be experiencing insufficient LED exposure.",
      productIds: ["rgb-toilet", "mini-frogs", "wolf-hoodie"],
    },
  ],
  lonely: [
    {
      advice: "Loneliness is just your soul asking for a duck.",
      reasoning: "This duck has 67,201 reviews. You're not alone — they are.",
      productIds: ["support-duck", "shrimp-slippers", "galaxy-projector"],
    },
    {
      advice: "Connection starts with LED shrimp slippers. Trust the process.",
      productIds: ["shrimp-slippers", "support-duck", "crying-pillow"],
    },
  ],
  default: [
    {
      advice: "Based on my analysis, your trauma qualifies for free shipping.",
      productIds: ["shrimp-slippers", "banana-holder", "mini-frogs"],
    },
    {
      advice: "Healing is now 74% off. Your feelings are valid AND purchasable.",
      productIds: ["rgb-rice", "support-duck", "rgb-toilet"],
    },
    {
      advice: "You deserve premium emotional accessories. Add to cart immediately.",
      productIds: ["incense-launcher", "trauma-crocs", "wolf-hoodie"],
    },
  ],
};

export function categorizeInput(text: string): EmotionalCategory {
  const lower = text.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS) as [EmotionalCategory, string[]][]) {
    if (category === "default") continue;
    if (keywords.some((kw) => lower.includes(kw))) return category;
  }
  return "default";
}

export function getTherapyResponse(text: string): TherapyResponse {
  const category = categorizeInput(text);
  const pool = RESPONSES[category];
  const response = pool[Math.floor(Math.random() * pool.length)];
  const productIds = response.productIds.slice(0, Math.random() > 0.5 ? 2 : 1);
  return { ...response, productIds };
}
