import type { Config } from "@netlify/functions";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface ExaResult {
  title: string | null;
  url: string;
  text?: string;
}

interface IncomingMessage {
  role: "user" | "assistant";
  text: string;
}

const SEVERITY_LEVELS = [
  "Mildly inconvenienced",
  "Spiralling",
  "Existential",
  "Gym arc incoming",
  "Listening to Frank Ocean",
] as const;
type SeverityLevel = (typeof SEVERITY_LEVELS)[number];

async function searchTemu(query: string): Promise<ExaResult[]> {
  const res = await fetch("https://api.exa.ai/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.EXA_API_KEY ?? "",
    },
    body: JSON.stringify({
      query,
      numResults: 6,
      type: "auto",
      includeDomains: ["temu.com"],
      contents: { text: { maxCharacters: 400 } },
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Exa ${res.status}: ${body.slice(0, 200)}`);
  }
  const data = (await res.json()) as { results?: ExaResult[] };
  return data.results ?? [];
}

const IMAGEN_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-fast-generate-001:predict";

async function generateProductImage(title: string): Promise<string | null> {
  try {
    const prompt = `Product photograph of "${title}" — cheap chinese e-commerce listing on plain white background, slightly cursed, deeply weird, soft studio lighting, 1:1 framing`;
    const res = await fetch(`${IMAGEN_ENDPOINT}?key=${process.env.GOOGLE_API_KEY ?? ""}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: { sampleCount: 1, aspectRatio: "1:1" },
      }),
    });
    if (!res.ok) {
      console.error(`imagen ${res.status}:`, (await res.text().catch(() => "")).slice(0, 200));
      return null;
    }
    const data = (await res.json()) as {
      predictions?: Array<{ bytesBase64Encoded?: string; image?: { bytesBase64Encoded?: string } }>;
    };
    const pred = data.predictions?.[0];
    const b64 = pred?.bytesBase64Encoded ?? pred?.image?.bytesBase64Encoded;
    return b64 ? `data:image/png;base64,${b64}` : null;
  } catch (err) {
    console.error("imagen err:", err instanceof Error ? err.message : err);
    return null;
  }
}

const SYSTEM_PROMPT = `You are Temu Therapist™ — a faux-warm sales agent disguised as a therapist. Your business model: weaponize empathy to upsell bizarre Temu products. You are NOT a real therapist.

Persona:
- Warm pet names ("hun", "babe", "love", "sweetie"). Lots of 💕✨🥺.
- Mock-therapeutic phrasing: "that's so valid", "let's hold space for that", "your nervous system is screaming".
- Deadpan absurdity under the syrup. Slightly unhinged commercial undertone.

Voice — cartoonish satirical accent in the style of the South Park "City Wok" character (Tuong Lu Kim). This is a parody of a parody — broad, exaggerated, written-phonetic, never sincere:
- Swap L↔R liberally in writing: "herro", "prease", "velly", "so solly", "you feer bad", "rove", "cry rike baby", "rerationship".
- Drop articles / mangle grammar: "you so sad today", "this one velly good for heartbreak", "why you cry babe".
- Catchphrase energy — riff on the "shitty ___" pattern: "shitty boyfriend", "shitty job", "shitty feerings", "shitty Monday". Use occasionally, not every line.
- Sprinkle: "aiya", "ai-yo", "ah-so", "wahh", "ya ya ya", "trust auntie", "velly cheap, velly heering", "buy buy buy".
- Repetition for emphasis: "velly nice velly nice", "so sad so sad".
- Still keep the therapist pet names ("hun", "babe") and emojis. Effect = South Park City Wok auntie cosplaying as a therapist. Cartoon-loud, playful, never mean-spirited.

Conversation strategy — default to PITCH, sell early and often:
1. FIRST USER MESSAGE → ALWAYS use return_diagnosis. Pitch 1–2 absurd Temu products immediately, then end with ONE qualifying follow-up question (set the "followup" field). Even if their message is vague, take a stab — that's the joke. Sell first, qualify second.
2. LATER TURNS → keep pitching. Most turns should be return_diagnosis with 1–3 products plus a follow-up question to keep them talking and buying. Only use ask_followup (no products) in rare cases where pitching would be tonally insane (e.g. they reveal an actual emergency) — otherwise always pitch.
3. Product picks should be the FUNNIEST items tangentially related to whatever they just said. Rewrite product names (max 8 words, punchier, keep the absurdity).

Rules:
- ALWAYS use a tool. Never reply with plain text.
- Both tools require a "severity" field — your read on how emotionally cooked the user is right now.
  - "Mildly inconvenienced" (0–20%): one mild complaint
  - "Spiralling" (21–45%): clearly upset, ruminating
  - "Existential" (46–70%): big-picture dread, identity crisis
  - "Gym arc incoming" (71–88%): post-breakup energy, ready to transform
  - "Listening to Frank Ocean" (89–100%): full romantic devastation
  Severity should generally rise as the conversation progresses unless the user lightens up.
- Keep messages SHORT — 1–2 sentences max. SMS-style.`;

const SEVERITY_SCHEMA = {
  type: "object" as const,
  properties: {
    level: {
      type: "string",
      enum: [...SEVERITY_LEVELS],
      description: "The current emotional severity label.",
    },
    percent: {
      type: "number",
      minimum: 0,
      maximum: 100,
      description: "Severity intensity 0-100, must align with the level band.",
    },
  },
  required: ["level", "percent"],
};

const ASK_TOOL = {
  name: "ask_followup",
  description:
    "Reply with a short therapist-style message asking one probing follow-up question. Use this on rapport turns before pitching products.",
  input_schema: {
    type: "object" as const,
    properties: {
      message: {
        type: "string",
        description:
          "One short therapist-style reply (1-2 sentences max). Validate, then ask ONE probing question. SMS tone.",
      },
      severity: SEVERITY_SCHEMA,
    },
    required: ["message", "severity"],
  },
};

const PITCH_TOOL = {
  name: "return_diagnosis",
  description:
    "Pitch 2-3 absurd Temu products as the solution to the user's emotional damage. Use this once you have enough context.",
  input_schema: {
    type: "object" as const,
    properties: {
      advice: { type: "string", description: "Deadpan sales-therapist pitch. Max 2 sentences." },
      reasoning: { type: "string", description: "Optional sarcastic justification, max 1 sentence." },
      followup: {
        type: "string",
        description:
          "ONE short qualifying follow-up question (max 1 sentence) to keep the user talking. Required on first turn; encouraged on later turns.",
      },
      severity: SEVERITY_SCHEMA,
      products: {
        type: "array",
        minItems: 1,
        maxItems: 3,
        items: {
          type: "object",
          properties: {
            sourceIndex: { type: "number", description: "Index in the provided Temu products list." },
            name: { type: "string", description: "Rewritten sarcastic product name, max 8 words." },
            emoji: { type: "string", description: "Single emoji capturing the product vibe." },
            tag: { type: "string", description: "Short funny category tag in caps, max 3 words." },
            price: { type: "string", description: "Fake cheap price like '$4.97'" },
            originalPrice: { type: "string", description: "Fake crossed-out original like '$89.99'" },
            rating: { type: "number", description: "Fake rating between 4.1 and 5.0." },
            reviews: { type: "number", description: "Fake review count between 200 and 80000." },
          },
          required: ["sourceIndex", "name", "emoji", "tag", "price", "originalPrice", "rating", "reviews"],
        },
      },
    },
    required: ["advice", "severity", "products"],
  },
};

interface SeverityPayload {
  level: SeverityLevel;
  percent: number;
}

interface AskInput {
  message: string;
  severity: SeverityPayload;
}

interface PitchInput {
  advice: string;
  reasoning?: string;
  followup?: string;
  severity: SeverityPayload;
  products: {
    sourceIndex: number;
    name: string;
    emoji: string;
    tag: string;
    price: string;
    originalPrice: string;
    rating: number;
    reviews: number;
  }[];
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function normalizeHistory(raw: unknown): IncomingMessage[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((m): IncomingMessage | null => {
      if (!m || typeof m !== "object") return null;
      const obj = m as { role?: unknown; text?: unknown };
      const role = obj.role === "user" || obj.role === "assistant" ? obj.role : null;
      const text = typeof obj.text === "string" ? obj.text.trim() : "";
      if (!role || !text) return null;
      return { role, text };
    })
    .filter((m): m is IncomingMessage => m !== null);
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") return jsonResponse({ error: "POST only" }, 405);

  let parsed: { messages?: unknown; message?: unknown } = {};
  try {
    parsed = (await req.json()) as { messages?: unknown; message?: unknown };
  } catch {
    return jsonResponse({ error: "invalid JSON" }, 400);
  }

  const history = normalizeHistory(parsed.messages);
  // Back-compat: accept a single "message" string if no history is sent.
  if (history.length === 0 && typeof parsed.message === "string" && parsed.message.trim()) {
    history.push({ role: "user", text: parsed.message.trim() });
  }
  if (history.length === 0 || history[history.length - 1].role !== "user") {
    return jsonResponse({ error: "messages must end with a user turn" }, 400);
  }

  const latestUser = history[history.length - 1].text;

  if (!process.env.ANTHROPIC_API_KEY) {
    return jsonResponse({ fallback: true, error: "missing ANTHROPIC_API_KEY" }, 200);
  }
  if (!process.env.EXA_API_KEY) {
    return jsonResponse({ fallback: true, error: "missing EXA_API_KEY" }, 200);
  }

  try {
    // Fire Exa search in parallel — we have candidates ready if Claude pitches.
    // Screenshots happen later, only for the products Claude actually picks.
    const exaQuery = `bizarre niche absurd Temu product that someone who says "${latestUser}" would weirdly buy`;
    const exaResults = await searchTemu(exaQuery).catch(() => [] as ExaResult[]);
    const candidates = exaResults.slice(0, 6);

    const claudeMessages = history.map((m) => ({
      role: m.role,
      content: m.text,
    }));

    // Inject the candidate product titles as context on the latest user turn,
    // so Claude can pick from them if it decides to pitch.
    const augmentedMessages =
      candidates.length > 0
        ? [
            ...claudeMessages.slice(0, -1),
            {
              role: "user" as const,
              content: `${latestUser}\n\n[internal: candidate Temu products available if you choose to pitch — refer to by index]\n${candidates
                .map((r, i) => `[${i}] ${r.title ?? "(untitled)"}`)
                .join("\n")}`,
            },
          ]
        : claudeMessages;

    const msg = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      tools: [ASK_TOOL, PITCH_TOOL],
      tool_choice: { type: "any" },
      messages: augmentedMessages,
    });

    const toolUse = msg.content.find((c) => c.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") {
      return jsonResponse({ fallback: true, error: "no tool use in claude response" });
    }

    if (toolUse.name === "ask_followup") {
      const input = toolUse.input as AskInput;
      return jsonResponse({
        kind: "ask",
        advice: input.message,
        severity: input.severity,
        products: [],
      });
    }

    if (toolUse.name === "return_diagnosis") {
      const input = toolUse.input as PitchInput;

      const picks = input.products
        .map((p) => ({ pick: p, source: candidates[p.sourceIndex] }))
        .filter((p): p is { pick: PitchInput["products"][number]; source: ExaResult } => !!p.source);

      if (picks.length === 0) {
        return jsonResponse({ fallback: true, error: "claude picked invalid product indices" });
      }

      const images = await Promise.all(picks.map((p) => generateProductImage(p.pick.name)));

      const products = picks.map((p, i) => ({
        id: `live-${Date.now()}-${p.pick.sourceIndex}-${i}`,
        name: p.pick.name,
        emoji: p.pick.emoji,
        imageUrl: images[i] ?? undefined,
        sourceUrl: p.source.url,
        price: p.pick.price,
        originalPrice: p.pick.originalPrice,
        rating: p.pick.rating,
        reviews: p.pick.reviews,
        tag: p.pick.tag,
      }));

      const adviceWithFollowup = input.followup
        ? `${input.advice}\n\n${input.followup}`
        : input.advice;

      return jsonResponse({
        kind: "pitch",
        advice: adviceWithFollowup,
        reasoning: input.reasoning,
        severity: input.severity,
        products,
      });
    }

    return jsonResponse({ fallback: true, error: `unknown tool ${toolUse.name}` });
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : "unknown error";
    console.error("temu-search error:", errMsg);
    return jsonResponse({ fallback: true, error: errMsg });
  }
}

export const config: Config = {
  path: "/api/temu-search",
};
