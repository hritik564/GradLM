# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### GradLM (`artifacts/gradlm`)
A high-converting single-page study abroad consultancy website. Premium React + Vite + Tailwind CSS landing page.

**Brand**: Electric blue (#2D31FA) to violet (#7B2FBE) gradient, Inter font, white background with soft blue section breaks.

**Sections**:
1. Sticky Navbar — GradLM logo, nav links, "Get Free Counselling" CTA
2. Hero — Bold headline, SVG illustration, trust signals, floating badges
3. Stats Bar — Animated counters: 12K students, 95% visa rate, 50+ universities, ₹0 fee
4. Services — University Selection, Education Loans, Visa Assistance cards
5. How It Works — 3-step journey with dotted connector
6. Testimonials — Infinite auto-scrolling carousel with 8 student testimonials
7. University Marquee — Two-row scrolling strip (MIT, Stanford, Harvard, Oxford, etc.)
8. Lead Form Section — Split layout with gradient panel + multi-step form (3 steps)
9. FAQ — Accordion with 5 questions
10. Footer — 4-column links, social icons

**Components**: `src/components/` — Navbar, Hero, Stats, Services, HowItWorks, Testimonials, LeadForm, LeadFormSection, LeadFormModal, UniversityMarquee, FAQ, Footer

**Features**: Intersection Observer scroll animations, CSS-only marquee animations, animated counters, multi-step form with validation, success state with animated checkmark, lead form modal.
