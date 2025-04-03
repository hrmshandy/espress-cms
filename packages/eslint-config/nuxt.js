import antfu from "@antfu/eslint-config";
import { config as baseConfig } from "./base.js";
import { config as vueConfig } from "./vue.js";

/**
 * ESLint configuration for Nuxt projects
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  ...baseConfig,
  ...vueConfig,
  antfu({
    vue: true,
    typescript: true,
    // Nuxt specific configuration
    unocss: true,
  }),
  {
    rules: {
      // Nuxt specific rules
      "vue/valid-v-slot": ["error", { allowModifiers: true }],
    },
  },
];

export default config;
