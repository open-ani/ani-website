# Contributing to Animeko Website

This guide describes how to contribute to the Animeko website.

## Stack

- Framework: Astro v6 (static output, deployed to Cloudflare Pages)
- UI: SolidJS v1 (JSX in `.tsx` files)
- Styling: Tailwind CSS v4 via `@tailwindcss/vite`
- Lint/Format: Biome v2 — do NOT use Prettier or ESLint
- Package Manager: pnpm v10
- Language: TypeScript strict mode. Path alias `@/*` → `src/*`

## Project Structure

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
public/           # Static assets served at site root
```

## Development Environment

- Node.js 22+ (recommended)
- pnpm 10+

## Local Development

Install dependencies:

```bash
pnpm install
```

Start the dev server:

```bash
pnpm dev
```

The site runs at `http://localhost:4321` by default. Use `pnpm start` as an alias for `pnpm dev`.

## Available Commands

```
pnpm dev              # Dev server
pnpm build            # astro check + astro build (run before committing)
pnpm code:fix         # biome check --write . (lint + format fix)
pnpm test:logic       # node --experimental-strip-types --test src/components/modules/*.test.ts
pnpm astro check      # Type-check only (also runs as pre-commit on *.astro via lint-staged)
```

## Code Standards

- Use TypeScript (strict mode is enabled).
- Follow Biome formatting and linting rules in `biome.json` (2-space indent, 120 char line width, double quotes, semicolons, ES5 trailing commas).
- Use Tailwind CSS v4 for styling.
- Keep imports organized and remove unused code.

## Testing

Logic tests use Node's built-in test runner (`node:test` + `node:assert/strict`). Test files live alongside source as `*.test.ts` in `src/components/modules/`. Run with `pnpm test:logic`.

## Commit Standards

- Use concise, descriptive commit messages.
- Gitmoji is recommended: <https://gitmoji.dev/>

## Pre-commit Hooks

`husky` + `lint-staged` run automatically on commit:
- `astro check` on `*.astro` files
- `biome check` on all staged files

Do not bypass or disable these hooks.

## Code Quality Requirements

Verification order before submitting:

```bash
pnpm code:fix
pnpm build
```

If you changed UI, also run `pnpm dev` to spot-check. `pnpm build` includes type checking via `astro check`.
