# Contributing to Animeko Website

Thank you for your interest in contributing to the **Animeko Website**! This project is the official website for Animeko, built with Astro.

## 🛠 Tech Stack

- **Framework:** [Astro](https://astro.build/) (Static Site Generation)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4)
- **Language:** TypeScript
- **Linting & Formatting:** [Biome](https://biomejs.dev/)
- **Package Manager:** [pnpm](https://pnpm.io/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js:** v22.x or later recommended.
- **pnpm:** v10.x or later.

## 🚀 Development Workflow

### 1. Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/open-ani/animeko-website.git
cd animeko-website
pnpm install
```

### 2. Start Development Server

Start the local development server:

```bash
pnpm dev
# or
pnpm start
```

The site will be available at `http://localhost:4321`.

### 3. Build for Production

To build the project for production (and run type checks):

```bash
pnpm build
```

### 4. Linting and Formatting

We use **Biome** for both linting and formatting. Please do not use Prettier or ESLint.

```bash
pnpm code:lint
```

## 📂 Project Structure

We follow a modular structure to keep the codebase organized:

- **`src/pages/`**: Standard Astro file-based routing.
- **`src/components/common/`**: Global reusable components (e.g., Header, Footer, Button).
- **`src/components/modules/`**: Feature-specific components (e.g., DownloadList, FAQ).
- **`src/lib/types/`**: TypeScript type definitions.
- **`src/layouts/`**: Page layouts.

**Note:** We use the `@/` alias which maps to `src/`.

## 📏 Coding Conventions

- **Code Style:** We enforce strict linting rules via `biome.json`. Please run `pnpm code:lint` before committing.
- **Agents:** If you are an AI agent, please refer to `AGENTS.md` for specific instructions.

## 🤝 Pull Request Process

1.  **Fork** the repository to your own GitHub account.
2.  **Clone** your fork locally.
3.  **Create a new branch** for your feature or bugfix (`git checkout -b feature/amazing-feature`).
4.  **Commit** your changes with clear messages.
5.  **Push** to your branch (`git push origin feature/amazing-feature`).
6.  **Open a Pull Request** against the `main` branch of the original repository.

We appreciate your help in making Animeko better!
