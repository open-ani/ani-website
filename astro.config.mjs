import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from "@astrojs/tailwind";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), tailwind()],
  output: 'hybrid',
  adapter: node({
    mode: "standalone"
  })
});