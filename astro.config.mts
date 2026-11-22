import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { remarkAlert } from "remark-github-blockquote-alert";
import rehypeMarkdownImages from "./src/plugins/rehypeMarkdownImages.js";

// https://astro.build/config
export default defineConfig({
  site: "https://animeko.org",
  // Workers static assets serve pages at /path/ and answer /path with a redirect, so links must carry the slash.
  trailingSlash: "always",
  integrations: [sitemap(), solid()],
  output: "static",
  prefetch: true,

  redirects: {
    "/downloads/stable": "/downloads/",
  },

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    shikiConfig: {
      theme: "github-dark-dimmed",
    },
    remarkPlugins: [remarkAlert],
    rehypePlugins: [
      rehypeMarkdownImages,
      // https://docs.astro.build/en/guides/markdown-content/#heading-ids-and-plugins
      [rehypeHeadingIds, { headingIdCompat: true }],
      [
        rehypeAutolinkHeadings,
        {
          properties: { class: "anchor", ariaHidden: true, tabIndex: -1 },
          content: {
            type: "text",
            value: "#",
          },
        },
      ],
    ],
  },
});
