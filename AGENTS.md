# AGENTS.md

Compact instructions for AI agents working on `animeko-website` (https://myani.org).

## Stack

- **Framework:** Astro v6 (static output, deployed to Cloudflare Pages via `wrangler.jsonc`)
- **UI:** SolidJS v1 (JSX in `.tsx` files)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite`
- **Lint/Format:** Biome v2 — do NOT use Prettier or ESLint
- **Package Manager:** pnpm v10 (lockfile: `pnpm-lock.yaml`; also has `bun.lock` but use pnpm)
- **Language:** TypeScript strict mode. Path alias `@/*` → `src/*`

## Commands

```
pnpm dev              # Dev server
pnpm build            # astro check + astro build (run before committing)
pnpm code:fix         # biome check --write . (lint + format fix)
pnpm test:logic       # node --experimental-strip-types --test src/components/modules/*.test.ts
pnpm astro check      # Type-check only (also runs as pre-commit on *.astro via lint-staged)
```

Verification order: `pnpm code:fix` → `pnpm build` → if UI changed, `pnpm dev` to spot-check.

## Testing

Logic tests use Node's built-in test runner (`node:test` + `node:assert/strict`). Test files live alongside source as `*.test.ts` in `src/components/modules/`. Run with `pnpm test:logic`.

## Content Collections

Defined in `src/content.config.ts`:

- **changelogs** — custom loader fetches release data from an external API at build time. Schema: `version`, `downloadUrlAlternatives`, `publishTime` (unix seconds → ISO date), `description` (rendered as markdown).
- **wiki** — glob loader over `src/content/wiki/*.md`. Frontmatter: `title` (required), `order` (optional), `authors` (optional array).

## Key Source Layout

```
src/
  components/
    common/       # NavBar, Footer, GoogleAnalytics
    home/         # Landing page sections (Header, Features, FAQ, etc.)
    modules/      # Interactive components (DownloadList.tsx) + logic tests
  content/
    wiki/         # Wiki markdown files
  config/         # ads.ts
  layouts/        # Layout, Doc, Post, Changelog
  pages/          # File-based routes (index, downloads, changelogs, wiki/*, about, 404)
  plugins/        # rehypeMarkdownImages.ts (custom rehype plugin)
  scripts/        # Client-side scripts (analytics, image enhancement)
  styles/         # Global CSS
```

## Code Style (enforced by biome.json)

- 2-space indent, 120 char line width, LF line endings, double quotes, semicolons always, ES5 trailing commas
- Arrow parens always, bracket spacing true
- `organizeImports` enabled; remove unused imports
- `noNonNullAssertion` is OFF (allowed but use sparingly)
- Biome rules are relaxed for `.astro`, `.svelte`, `.vue` files (unused vars/imports off)

## Deployment

Cloudflare Pages static asset hosting. `wrangler.jsonc` points to `./dist` with auto-trailing-slash HTML handling. CI (`pr_check.yml`) runs on PRs: pnpm install → `pnpm build` with Node 23.x and `--max_old_space_size=8192`.

## Environment

Only one env var in `.env.example`: `PUBLIC_GA_MEASUREMENT_ID` (Google Analytics). No other secrets needed for local dev.

## Pre-commit Hooks

`husky` + `lint-staged`: runs `astro check` on `*.astro` files and `biome check` on all staged files. Do not bypass or disable.

## Agent Rules

- Do NOT add new dependencies without explicit instruction.
- Do NOT commit `console.log` statements.
- Read files before editing to preserve structure.
- Content is bilingual (English + Chinese). See `README_CN.md` and `CONTRIBUTING_CN.md`.
- The project has OpenCode skills in `.opencode/skills/` for UI baseline, accessibility, metadata, and motion performance — load relevant skills when those topics apply.
