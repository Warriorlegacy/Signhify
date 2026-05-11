# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Signhify Agency website — a Next.js 14 performance marketing and SaaS development agency site. The main landing page is at `/agency`, with sub-routes for `gymflow` (product) and `investors` (info page).

## Development Commands

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Generate Prisma client + Next.js build
npm run start        # Start production server
npm run lint         # ESLint
npm run type-check   # TypeScript check

# Database
npm run db:push      # Push schema to PostgreSQL
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Run seed script (prisma/seed.ts)
```

## Architecture

### App Router Structure
```
app/
├── page.tsx              # Redirects to /agency
├── layout.tsx            # Root layout (Inter font, Providers)
├── globals.css           # Tailwind base + CSS variables (dark/light themes)
├── agency/page.tsx       # Main marketing page (full inline styles)
├── (marketing)/
│   ├── layout.tsx        # Shared marketing layout
│   ├── gymflow/page.tsx  # Gymflow SaaS product page
│   └── investors/page.tsx
└── api/
    ├── leads/route.ts    # POST - captures leads to PostgreSQL via Prisma
    ├── chat/route.ts     # POST - AI chatbot via Groq API (llama-3.1-8b-instant)
    ├── stripe/
    │   ├── checkout/route.ts
    │   ├── webhook/route.ts
    │   └── portal/route.ts
    └── health/route.ts
```

### Data Layer
- **Prisma** + **PostgreSQL** for persistence (leads, customers, subscriptions)
- `lib/db.ts` — Prisma singleton (global ForPrisma pattern)
- `lib/stripe.ts` — Stripe client instance
- `lib/utils.ts` — Utility functions

### AI Chatbot
- `app/api/chat/route.ts` — Groq API (llama-3.1-8b-instant) with `SYSTEM_PROMPT` embedding all Signhify knowledge
- Client-side chatbot in `app/agency/page.tsx` (vanilla JS via useEffect, not the React component in components/chatbot.tsx)
- `components/chatbot.tsx` — Separate React chatbot component for Gymflow pages

### Key Environment Variables
```
DATABASE_URL          # PostgreSQL connection string
GROQ_API_KEY          # Groq API for /api/chat
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
ANTHROPIC_API_KEY     # Listed in .env.example but not currently used (Groq is active)
RESEND_API_KEY
NEXT_PUBLIC_APP_URL
```

### Styling
- **Tailwind CSS** for utilities and base (globals.css)
- **Inline `<style>` blocks** in agency page (no separate CSS file for the page)
- CSS variables for theming: `--bg`, `--surface`, `--accent-1` (#00ff87), `--accent-2` (#a855f7), `--accent-3` (#00e5ff)
- Dark mode default, light mode via `[data-theme='light']`
- Fonts: Outfit (body), Syne (headings) via Google Fonts

## Important Notes

- `app/agency/page.tsx` contains all client-side JS logic (chatbot, cursor glow, scroll reveals, portfolio card interactions) as inline `<style>` + useEffect scripts — not using React state for interactions
- Portfolio section has "nuclear fix" CSS overrides ensuring cards are always visible (`opacity: 1 !important`)
- Lead form on agency page redirects to WhatsApp instead of using `/api/leads`
- The `static-backup/` folder contains the old static HTML version — do not mix code between them
- `/api/chat` requires `GROQ_API_KEY` — falls back to error message without it