// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    // The Vite plugin will be loaded automatically from node_modules
    // when the project is built
  },
  output: 'server',
});
