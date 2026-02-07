import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCallouts from "rehype-callouts";
import { rehypeGithubAlerts } from "rehype-github-alerts";
import rehypeSlug from "rehype-slug";
import remarkRehype from "remark-rehype";

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
    remarkPlugins: [remarkRehype],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend", // 改为 prepend，在标题前添加锚点
          content: {
            type: "element",
            tagName: "span",
            properties: {
              className: ["anchor-icon"],
              "aria-hidden": "true",
            },
            children: [
              {
                type: "text",
                value: "#", // # 符号放在标题前面
              },
            ],
          },
          properties: {
            className: ["heading-anchor"],
            "aria-label": "跳转到此标题",
            title: "跳转到此标题",
          },
        },
      ],
      rehypeGithubAlerts,
      rehypeCallouts,
    ],
  },
});
