# Contributing to Animeko Website

This guide describes how to contribute to the Animeko website.

## Project Structure

- `src/pages/`: File-based routing for Astro pages.
- `src/components/`: Reusable UI components (Astro or Solid).
- `src/layouts/`: Shared page layouts.
- `src/styles/`: Global styles and Tailwind layers.
- `src/ui/`: Design-system style UI building blocks.
- `src/types/`: Shared TypeScript types.
- `public/`: Static assets served at site root.

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

## Code Standards

- Use TypeScript (strict mode is enabled).
- Follow Biome formatting and linting rules in `biome.json`.
- Use Tailwind CSS v4 for styling.
- Keep imports organized and remove unused code.

## Commit Standards

- Use concise, descriptive commit messages.
- Gitmoji is recommended: <https://gitmoji.dev/>

## Code Quality Requirements

Run these before submitting:

```bash
pnpm code:fix
pnpm build
```

`pnpm build` includes type checking via `astro check`.
