const EXA_ENDPOINT = "https://api.exa.ai/search";

export interface ExaSearchInput {
  query: string;
  numResults?: number;
  category?: "company" | "research paper" | "news" | "pdf" | "github" | "tweet" | "personal site" | "linkedin profile" | "financial report";
  includeDomains?: string[];
  excludeDomains?: string[];
  type?: "neural" | "keyword" | "auto";
}

export interface ExaSearchResult {
  title: string | null;
  url: string;
  publishedDate?: string;
  author?: string;
  score?: number;
  text?: string;
}

export interface ExaSearchResponse {
  results: ExaSearchResult[];
  requestId?: string;
}

export class ExaApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ExaApiError";
    this.status = status;
  }
}

export async function searchExa(input: ExaSearchInput): Promise<ExaSearchResponse> {
  const apiKey = import.meta.env.VITE_EXA_API_KEY;
  if (!apiKey) {
    throw new ExaApiError("VITE_EXA_API_KEY is not set. Add it to .env.local and restart vite.");
  }

  const res = await fetch(EXA_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      query: input.query,
      numResults: input.numResults ?? 5,
      type: input.type ?? "auto",
      category: input.category,
      includeDomains: input.includeDomains,
      excludeDomains: input.excludeDomains,
      contents: { text: { maxCharacters: 1500 } },
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new ExaApiError(`Exa request failed: ${res.status} ${body}`, res.status);
  }

  const data = (await res.json()) as { results?: unknown[]; requestId?: string };
  const results: ExaSearchResult[] = (data.results ?? []).map((r) => {
    const row = r as Record<string, unknown>;
    return {
      title: (row.title as string | null) ?? null,
      url: String(row.url ?? ""),
      publishedDate: row.publishedDate as string | undefined,
      author: row.author as string | undefined,
      score: row.score as number | undefined,
      text: row.text as string | undefined,
    };
  });

  return { results, requestId: data.requestId };
}

export const exaSearchTool = {
  name: "exa_search",
  description:
    "Search the live web with Exa. Use for finding current information, products, articles, or any factual lookup the model can't answer from training data. Returns a list of results with title, url, and a text excerpt.",
  input_schema: {
    type: "object" as const,
    properties: {
      query: {
        type: "string",
        description: "Natural-language description of the ideal page to find. Describe content, not keywords. Example: 'cheapest Temu product scraper API with free tier'.",
      },
      numResults: {
        type: "integer",
        minimum: 1,
        maximum: 25,
        description: "How many results to return. Default 5.",
      },
      category: {
        type: "string",
        enum: ["company", "research paper", "news", "pdf", "github", "tweet", "personal site", "linkedin profile", "financial report"],
        description: "Optional category filter.",
      },
      includeDomains: {
        type: "array",
        items: { type: "string" },
        description: "Only return results from these domains (e.g. ['temu.com']).",
      },
      excludeDomains: {
        type: "array",
        items: { type: "string" },
        description: "Never return results from these domains.",
      },
    },
    required: ["query"],
  },
} as const;

export async function runExaSearchTool(args: ExaSearchInput): Promise<string> {
  const { results } = await searchExa(args);
  if (results.length === 0) return "No results.";
  return results
    .map((r, i) => {
      const lines = [`[${i + 1}] ${r.title ?? r.url}`, r.url];
      if (r.publishedDate) lines.push(`Published: ${r.publishedDate}`);
      if (r.text) lines.push(r.text.slice(0, 800));
      return lines.join("\n");
    })
    .join("\n\n---\n\n");
}
