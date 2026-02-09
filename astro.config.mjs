import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
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
    shikiConfig: {
      theme: "github-dark-dimmed",
    },
    remarkPlugins: [remarkAlert],
    rehypePlugins: [
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
