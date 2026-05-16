# What's My Social Credit Score?

Satirical AI Citizen Evaluation Platform™ — *"Your future, quantified."*

A dystopian personality quiz parodying surveillance culture, algorithmic judgement, and corporate scoring systems. Built for hackathons: no backend, no real AI — just hardcoded chaos and polished UI.

## Run locally

```bash
cd social-credit-score
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- Framer Motion
- React Icons

## Features

- Landing page with surveillance aesthetic
- 12-question citizen questionnaire (multiple choice + sliders)
- Fake AI analysis sequence with animated stages
- Social credit score (0–1000) with tiers, threats, and satirical copy
- Shareable result card + Web Share API / clipboard fallback
- Live citizen feed overlay (stretch)

## Tech notes

Scoring runs client-side from answer penalties and tags. Results vary slightly on replay due to randomized insights and recommendations.
