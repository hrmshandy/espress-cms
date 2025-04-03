import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'vue/index': 'src/vue/index.ts',
    'astro/index': 'src/astro/index.ts',
  },
  format: ['esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['vue', 'astro'],
});
