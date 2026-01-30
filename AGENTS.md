# AGENTS.md

This document provides context, conventions, and instructions for AI agents (and human developers) working on the `animeko-website` repository. 

## 1. Project Overview

- **Framework:** [Astro](https://astro.build/) (v5.x)
- **UI Framework:** [SolidJS](https://solidjs.com/) (v1.x)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4.x) using `@tailwindcss/vite`.
- **Linter/Formatter:** [Biome](https://biomejs.dev/) (v2.x).
- **Package Manager:** [pnpm](https://pnpm.io/) (v10.x).
- **Language:** TypeScript (Strict mode enabled).

## 2. Development & Build Commands

Always use `pnpm` for script execution.

### Core Commands
- **Start Development Server:**
  ```bash
  pnpm dev
  # or
  pnpm start
  ```
  Runs `astro dev`.

- **Build Production Artifacts:**
  ```bash
  pnpm build
  ```
  Runs `astro check` (type checking) followed by `astro build`. 
  *Note: Always run this before submitting changes to ensure type safety.*

- **Preview Production Build:**
  ```bash
  pnpm preview
  ```

### Linting & Formatting
The project uses **Biome** for both linting and formatting. Do not use Prettier or ESLint commands.

- **Lint and Fix Code:**
  ```bash
  pnpm code:lint
  ```
  Executes `biome lint . --fix`.

- **Type Checking:**
  ```bash
  pnpm astro check
  ```
  Checks `.astro` files and TypeScript validity.

### Testing
There is currently no dedicated unit test runner (like Vitest) configured in `package.json`.
**Verification Strategy for Agents:**
1. **Static Analysis:** Run `pnpm code:lint` to catch syntax and style errors.
2. **Type Safety:** Run `pnpm build` (which includes `astro check`) to verify type integrity.
3. **Runtime Verification:** If making UI changes, ensure the dev server starts without errors via `pnpm dev`.

## 3. Code Style & Conventions

Strictly adhere to the rules defined in `biome.json`.

### Formatting Rules
- **Indentation:** 2 spaces.
- **Line Width:** 120 characters.
- **Line Endings:** LF.
- **Quotes:** Double quotes (`"`) for both JS/TS and JSX/Astro attributes.
- **Semicolons:** Always include semicolons.
- **Trailing Commas:** ES5 compatible (objects, arrays, etc.).
- **Arrow Parentheses:** Always included (e.g., `(arg) => ...`).
- **Bracket Spacing:** `true` (e.g., `{ foo }`).

### Naming Conventions
- **Components:** PascalCase (e.g., `MyComponent.vue`, `Header.astro`).
- **Files/Directories:** Kebab-case is generally preferred for pages and assets, though component files usually match the component name.
- **Variables/Functions:** camelCase.
- **Constants:** UPPER_CASE or camelCase depending on context.

### TypeScript
- **Strict Mode:** Enabled via `astro/tsconfigs/strict`.
- **No `any`:** Avoid `any` types. Use proper interfaces or `unknown` if necessary.
- **Non-null Assertions:** Biome rule `noNonNullAssertion` is disabled ("off"), but use them sparingly.
- **Unused Variables:** specific Biome rules (`noUnusedVariables`) are set to "warn" or "error". Clean up unused code.

### CSS / Tailwind
- **Tailwind v4:** This project uses Tailwind CSS v4.
- **Directives:** `@apply`, `@theme`, and other Tailwind directives are supported.
- **Ordering:** Biome handles class sorting/attribute positioning automatically ("auto").

### Imports
- **Organization:** Biome `organizeImports` is enabled.
- **Unused Imports:** `noUnusedImports` is set to "warn". Remove them.
- **File Extensions:** Use explicit extensions where appropriate in ESM, though standard bundler resolution applies.

## 4. Directory Structure

- `src/pages/`: Astro file-based routing.
- `src/components/`: Reusable UI components (Astro or Vue).
- `src/layouts/`: Astro layouts (e.g., BaseLayout).
- `src/styles/`: Global styles (CSS/Tailwind).
- `src/ui/`: Likely atomic or design-system specific UI components.
- `src/types/`: TypeScript type definitions.
- `public/`: Static assets served at root.

## 5. Error Handling

- **Async/Await:** Prefer `async/await` over raw promises.
- **Try/Catch:** Use standard try/catch blocks for API calls or risky operations.
- **Console Logs:** Avoid committing `console.log` statements. Use proper logging if available, or remove debug logs before finalizing.

## 6. Git & CI Workflow

- **Pre-commit:** `husky` and `lint-staged` are configured.
    - `*.vue`: Runs `biome lint --fix`.
    - `*.astro`: Runs `astro check`.
- **CI Pipeline:** GitHub Actions (`pr_prew.yml`) runs on Pull Requests.
    - Installs dependencies with `pnpm`.
    - Runs `pnpm build`.
    - Environment: Node.js 23.x.

## 7. Agent Behavior Guidelines

- **File Modification:** When editing files, always read the file first to preserve existing structure.
- **Dependencies:** Do NOT add new dependencies without explicit instruction. Use existing packages (`@headlessui/vue`, `@iconify/vue`, etc.).
- **Vue Components:** Use the `<script setup>` syntax for Vue components.
- **Astro Components:** Keep frontmatter (JavaScript fence `---`) clean and typed.
- **Safety:** Do not bypass `lint-staged` hooks. Ensure your code passes `pnpm code:lint` and `pnpm build` before marking a task as complete.

---
*Generated for AI Agents interacting with the animeko-website repository.*
