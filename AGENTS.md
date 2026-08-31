# AGENTS.md — cookie-store-front-end

Workflow & guardrails for opencode when working on this React SPA.
Goal: keep the context window small while shipping UI features correctly.

## Project context (read once, reference by path)

- Stack: Vite + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui (Radix) + react-router v7.
- Entry: `src/main.tsx` -> `src/App.tsx` (routes). Global styles: `src/index.css` (Tailwind v4 CSS-first theme — there is no `tailwind.config` file, do not create one).
- Path alias: `@/*` -> `src/*` (see `tsconfig.app.json`). Use it for imports; avoid cross-folder relative imports.
- Structure:
  - `src/components/ui/` — generated shadcn primitives (Radix); do not hand-edit.
  - `src/components/layout/` — Header/Footer/Layout chrome.
  - `src/pages/` — route pages (Home, Menu, Checkout, Login, Register, About, Contact).
  - `src/context/` — React context (Cart).
  - `src/data/` — static content (`cookies.ts`).
  - `src/lib/utils.ts` — `cn()` helper.
- State: cart lives in `src/context/CartProvider.tsx`. The SPA is UI-only today (no API calls) — keep it that way unless the user asks to wire the backend.
- Icons: hugeicons + lucide-react. shadcn style `radix-mira` (see `components.json`).

## One session = one feature (context budget rule)

- One feature or bugfix per chat. Before coding: (1) restate the feature, (2) list files you expect to touch, (3) confirm with the user.
- Do not dump large files/logs into chat. Read in slices with `offset`/`limit` or grep to the exact lines.

## Read strategy (how to keep context low)

- Prefer `grep`/`glob` to locate code; open only the relevant slices.
- Use the `explore` subagent for codebase-wide searches; request a concise summary with `file:line` references, not full file dumps.

## Commands (run from this package directory)

- `npm run dev` — Vite dev server.
- `npm run build` — `tsc -b && vite build` (typecheck + build).
- `npm run lint` — oxlint.
- `npm run preview` — serve the production build.

## Feature workflow (checklist)

1. Read the relevant spec only (backend `issue.md` if cross-referencing).
2. Locate the page/component with `grep`/`glob`; read the smallest relevant slice.
3. Implement following existing patterns (Radix + shadcn, cva, `cn()`). Reuse components from `ui/`/`layout/` before writing new ones.
4. Verify: `npm run lint`, then `npm run build` (includes typecheck). Fix all errors.
5. Report changes as a short diff summary with `file:line` references.

## Guardrails

- Touch only what the feature needs; never rewrite unrelated files.
- Do not hand-edit generated `src/components/ui/*` files.
- Respect tsconfig strictness: `noUnusedLocals`/`noUnusedParameters`, `verbatimModuleSyntax` (use `import type` for type-only imports).
- Tailwind v4 theme lives in CSS (`src/index.css`); do not add a Tailwind config file.
- When in doubt about scope, ask one targeted question before proceeding.