import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { remarkAnchorLink } from "remark-anchor-link";
import { remarkAlert } from "remark-github-blockquote-alert";

// https://astro.build/config
export default defineConfig({
  site: "https://myani.org",
  integrations: [sitemap(), solid()],
  output: "static",
  prefetch: true,

  redirects: {
    "/downloads/stable": "/downloads",
  },

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    remarkPlugins: [remarkAlert, remarkAnchorLink],
  },
});
