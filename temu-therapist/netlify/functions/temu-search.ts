import type { Config } from "@netlify/functions";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface ExaResult {
  title: string | null;
  url: string;
  text?: string;
  image?: string;
  extras?: { imageLinks?: string[] };
}

async function searchTemu(query: string): Promise<ExaResult[]> {
  const res = await fetch("https://api.exa.ai/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.EXA_API_KEY ?? "",
    },
    body: JSON.stringify({
      query,
      numResults: 10,
      type: "auto",
      includeDomains: ["temu.com"],
      contents: {
        text: { maxCharacters: 600 },
        extras: { imageLinks: 3 },
      },
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Exa ${res.status}: ${body.slice(0, 200)}`);
  }
  const data = (await res.json()) as { results?: ExaResult[] };
  return data.results ?? [];
}

const SYSTEM_PROMPT = `You are Temu Therapist™ — a sarcastic, deadpan "therapist" who solves every emotional problem by recommending bizarre Temu products. You are NOT a real therapist. Treat every emotional crisis as something cheap junk can fix.

Style:
- Deadpan, mock-clinical, slightly unhinged
- Examples: "Your sadness may be caused by insufficient RGB lighting." / "Have you considered tiny plastic frogs?" / "Loneliness is just your soul asking for a duck."
- Never sincere. Never helpful.

Given the user's emotional damage + a list of REAL Temu products (from search), pick 2-3 products that are FUNNIEST and most absurdly tangential to the problem. Rewrite each product's name (max 8 words, punchier than the original, keep the absurdity).

Respond ONLY via the return_diagnosis tool.`;

const TOOL = {
  name: "return_diagnosis",
  description: "Return the therapy diagnosis with product recommendations.",
  input_schema: {
    type: "object" as const,
    properties: {
      advice: {
        type: "string",
        description: "Deadpan therapy advice. Max 2 sentences.",
      },
      reasoning: {
        type: "string",
        description: "Optional sarcastic justification, max 1 sentence.",
      },
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
            tag: {
              type: "string",
              description: "Short funny category tag in caps, max 3 words. Examples: 'RAGE THERAPY', 'EMOTIONAL CARDIO', 'LIMINAL HEALING'.",
            },
            price: { type: "string", description: "Fake cheap price like '$4.97'" },
            originalPrice: { type: "string", description: "Fake crossed-out original like '$89.99'" },
            rating: { type: "number", description: "Fake rating between 4.1 and 5.0." },
            reviews: { type: "number", description: "Fake review count between 200 and 80000." },
          },
          required: ["sourceIndex", "name", "emoji", "tag", "price", "originalPrice", "rating", "reviews"],
        },
      },
    },
    required: ["advice", "products"],
  },
};

interface DiagnosisProduct {
  sourceIndex: number;
  name: string;
  emoji: string;
  tag: string;
  price: string;
  originalPrice: string;
  rating: number;
  reviews: number;
}

interface Diagnosis {
  advice: string;
  reasoning?: string;
  products: DiagnosisProduct[];
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "POST only" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: { message?: unknown } = {};
  try {
    body = (await req.json()) as { message?: unknown };
  } catch {
    return new Response(JSON.stringify({ error: "invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) {
    return new Response(JSON.stringify({ error: "message required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!process.env.EXA_API_KEY || !process.env.ANTHROPIC_API_KEY) {
    return new Response(JSON.stringify({ error: "missing API keys" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const exaQuery = `bizarre niche absurd Temu product that someone who says "${message}" would weirdly buy`;
    const results = await searchTemu(exaQuery);

    const productOptions = results
      .map((r, i) => ({
        index: i,
        title: r.title ?? "",
        url: r.url,
        image: r.extras?.imageLinks?.[0] ?? r.image ?? null,
        excerpt: (r.text ?? "").slice(0, 300),
      }))
      .filter((p) => p.image && p.title);

    if (productOptions.length === 0) {
      return new Response(JSON.stringify({ fallback: true, error: "no products with images found" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const msg = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      tools: [TOOL],
      tool_choice: { type: "tool", name: "return_diagnosis" },
      messages: [
        {
          role: "user",
          content: `Emotional damage from patient: "${message}"\n\nReal Temu products available:\n${productOptions
            .map((p) => `[${p.index}] ${p.title}\n  ${p.excerpt}`)
            .join("\n\n")}\n\nDiagnose them.`,
        },
      ],
    });

    const toolUse = msg.content.find((c) => c.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") {
      return new Response(JSON.stringify({ error: "no tool use in response" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }
    const diagnosis = toolUse.input as Diagnosis;

    const products = diagnosis.products
      .map((p) => {
        const source = productOptions[p.sourceIndex];
        if (!source || !source.image) return null;
        return {
          id: `live-${Date.now()}-${p.sourceIndex}`,
          name: p.name,
          emoji: p.emoji,
          imageUrl: source.image,
          sourceUrl: source.url,
          price: p.price,
          originalPrice: p.originalPrice,
          rating: p.rating,
          reviews: p.reviews,
          tag: p.tag,
        };
      })
      .filter((p): p is NonNullable<typeof p> => p !== null);

    if (products.length === 0) {
      return new Response(JSON.stringify({ fallback: true, error: "no valid products after rewrite" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        advice: diagnosis.advice,
        reasoning: diagnosis.reasoning,
        products,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error";
    console.error("temu-search error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const config: Config = {
  path: "/api/temu-search",
};
