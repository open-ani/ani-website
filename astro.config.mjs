import sitemap from '@astrojs/sitemap'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import remarkRehype from 'remark-rehype';
import rehypeCallouts from 'rehype-callouts';
import { rehypeGithubAlerts } from 'rehype-github-alerts';

// https://astro.build/config
export default defineConfig({
  site: 'https://myani.org',
  integrations: [vue(), sitemap()],
  output: 'static',
  prefetch: true,

  redirects: {
    '/downloads/stable': '/downloads',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    remarkPlugins: [remarkRehype],
    rehypePlugins: [rehypeGithubAlerts, rehypeCallouts]
  },
})
