import sitemap from '@astrojs/sitemap'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

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
})
