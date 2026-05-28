# Engnova — English learning platform

A full-stack English learning app built with **Next.js 16 (App Router)**,
**TypeScript**, **Prisma + PostgreSQL**, **Material UI**, **NextAuth.js v5**,
and **Zod**. It covers vocabulary, grammar, reading, listening, and speaking
with a clean, mobile-friendly UI.

> Built against Next.js 16's breaking changes: async `params`/`searchParams`,
> `proxy.ts` (replaces `middleware.ts`), and the `@mui/material-nextjs` App Router
> integration.

---

## Feature overview

| Area | What's included |
| --- | --- |
| **Auth** | Auto sign-in as the demo seed user (NextAuth.js Credentials + JWT). |
| **Vocabulary** | Filterable word list with pronunciation & part of speech, level chips, save bookmark, flashcards with TTS pronunciation, multiple-choice quiz. |
| **Grammar** | Lesson list grouped by level + detail page with tiny markdown renderer + auto-graded quiz. |
| **Reading** | Article list + reader with highlighted vocabulary (click for popover) + comprehension quiz. |
| **Listening** | Audio player + transcript reveal + listening quiz. |
| **Speaking** | Level-tagged prompts, browser-native speech recognition, type fallback, heuristic AI-style feedback, server-saved attempts. |

---

## Project structure

```
Engnova/
├── app/                              # Next.js App Router
│   ├── (dashboard)/
│   │   ├── layout.tsx                # Dashboard layout (demo session + sidebar)
│   │   ├── vocabulary/page.tsx
│   │   ├── grammar/page.tsx
│   │   ├── grammar/[slug]/page.tsx
│   │   ├── reading/page.tsx
│   │   ├── reading/[slug]/page.tsx
│   │   ├── listening/page.tsx
│   │   ├── listening/[slug]/page.tsx
│   │   └── speaking/page.tsx
│   ├── api/auth/[...nextauth]/route.ts
│   ├── layout.tsx                    # Root + MUI/Auth providers
│   ├── providers.tsx
│   ├── page.tsx                      # Redirects to /vocabulary
│   └── globals.css
├── proxy.ts                          # Next 16's middleware replacement
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── actions/                      # Server actions
│   │   ├── quiz.ts
│   │   ├── speaking.ts
│   │   └── vocabulary.ts
│   ├── components/                   # Reusable UI
│   │   ├── DashboardShell.tsx
│   │   ├── Flashcard.tsx
│   │   ├── LessonCard.tsx
│   │   ├── LessonContent.tsx
│   │   ├── ListeningPlayer.tsx
│   │   ├── PageHeader.tsx
│   │   ├── QuizRunner.tsx
│   │   ├── ReadingViewer.tsx
│   │   ├── SaveWordButton.tsx
│   │   ├── SpeakingPractice.tsx
│   │   └── VocabularyClient.tsx
│   └── lib/
│       ├── auth.ts                   # NextAuth main config (uses Prisma)
│       ├── auth.config.ts            # Edge-safe config (used by proxy.ts)
│       ├── session.ts                # Demo user session helper
│       ├── prisma.ts
│       ├── theme.ts                  # MUI theme
│       ├── utils.ts
│       └── validations.ts            # Zod schemas
├── types/next-auth.d.ts
├── public/                           # Place /public/audio/*.mp3 here
├── .env.example
├── package.json
├── next.config.ts
└── tsconfig.json
```

---

## Step-by-step setup

### 1. Prerequisites

- **Node.js 20.9+** (Next.js 16 minimum)
- **pnpm** (recommended), or npm / yarn / bun
- No separate database install required — local dev uses **SQLite** (`prisma/dev.db`)

### 2. Install dependencies

```bash
pnpm install
```

> If you previously installed the project under a different folder name (so the
> pnpm store paths drifted), delete `node_modules` and `pnpm-lock.yaml` first
> and reinstall.

### 3. Configure environment

```bash
cp .env.example .env
```

Default `.env` uses SQLite (no Postgres install needed):

```env
DATABASE_URL="file:./prisma/dev.db"
AUTH_SECRET="paste-a-random-base64-string"
AUTH_URL="http://localhost:3000"
```

> On Windows PowerShell, generate the secret with:
> `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`

### 4. Initialize the database

```bash
pnpm install          # runs prisma generate via postinstall
pnpm db:push
pnpm db:seed
```

If you see `Can't resolve '@prisma/client'`, run `pnpm db:generate` and restart the dev server.

This creates the demo learner account (`demo@engnova.dev`) used automatically when you open the app.

You can also use **Prisma Studio** to browse data:

```bash
pnpm db:studio
```

### 5. Run the dev server

```bash
pnpm dev
```

Open <http://localhost:3000>.

### 6. Optional — add listening audio

The seeded "Ordering Coffee" lesson points at `/audio/ordering-coffee.mp3`.
Drop your own MP3 at `public/audio/ordering-coffee.mp3` and refresh, or update
the lesson's `audioUrl` in Prisma Studio.

---

## Scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Start the dev server (Turbopack, default in Next 16) |
| `pnpm build` | Production build |
| `pnpm start` | Run the production build |
| `pnpm lint` | ESLint flat config |
| `pnpm db:generate` | Regenerate Prisma client |
| `pnpm db:migrate` | Create / apply a dev migration |
| `pnpm db:push` | Push schema without a migration (prototyping) |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm db:seed` | Run `prisma/seed.ts` |

---

## How auth is wired

- **`src/lib/session.ts`** — `getSessionUser()` signs in the seeded demo account
  (`demo@engnova.dev`) when no session exists.
- **`src/lib/auth.ts`** — NextAuth **Credentials** provider (used for the demo sign-in).
- **`src/lib/auth.config.ts`** — edge-safe config; redirects `/` → `/vocabulary`.
- **`proxy.ts`** — Next.js 16's replacement for `middleware.ts`.
- **`app/api/auth/[...nextauth]/route.ts`** — NextAuth route handlers.
- Run **`pnpm db:seed`** before first use so the demo user exists.

---

## Extending the content

- **Add words** → seed file or Prisma Studio (`Vocabulary` table).
- **Add a lesson** → insert a `Lesson` row with `type` set to one of `GRAMMAR`,
  `READING`, `LISTENING`. Use `slug` for the URL. `highlight` is a `string[]`
  of words the Reading viewer should highlight.
- **Add a quiz** → insert a `Quiz` with related `Question` and `Answer` rows.
  Optionally link it to a lesson via `lessonId`.
- **Add speaking prompts** → either expand the in-memory array in
  `app/(dashboard)/speaking/page.tsx`, or add a `SpeakingPrompt` model to
  Prisma and read it server-side.

---

## Notes on Next.js 16 specifics

- All `params` and `searchParams` are awaited (`await params`).
- `cookies()` / `headers()` would be awaited — none used directly here.
- Route gating uses `proxy.ts` (not `middleware.ts`).
- ESLint uses the **flat config** format (`eslint.config.mjs`).
- Turbopack is the default for `dev` and `build`.

---

## Troubleshooting

### “Cannot connect to PostgreSQL”

Use SQLite for local dev: set `DATABASE_URL="file:./prisma/dev.db"` in `.env`, then run `pnpm db:push && pnpm db:seed` and restart `pnpm dev`.

For PostgreSQL instead, switch `provider` in `prisma/schema.prisma` back to `postgresql` and use a valid `DATABASE_URL` (see `docker-compose.yml`).

---

## Production checklist

- Set `AUTH_SECRET` to a strong random value.
- Behind a reverse proxy, also set `AUTH_TRUST_HOST=true`.
- Replace `password123` for the demo user (or remove the seed entry).
- Swap the heuristic feedback in `SpeakingPractice` for a real model call
  (e.g. Anthropic or OpenAI) — wire it through a server action.
- Configure HTTPS, CSP, and rate-limiting on `/api/auth/*`.
