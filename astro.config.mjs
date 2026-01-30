import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeCallouts from "rehype-callouts";
import { rehypeGithubAlerts } from "rehype-github-alerts";
import remarkRehype from "remark-rehype";

// https://astro.build/config
export default defineConfig({
  site: "https://myani.org",
  integrations: [sitemap()],
  output: "static",
  prefetch: true,

  redirects: {
    "/downloads/stable": "/downloads",
  },

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    remarkPlugins: [remarkRehype],
    rehypePlugins: [rehypeGithubAlerts, rehypeCallouts],
  },
});
