import antfu from "@antfu/eslint-config";
import { config as baseConfig } from "./base.js";
import eslintPluginVue from "eslint-plugin-vue";

/**
 * ESLint configuration for Vue projects
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  ...baseConfig,
  antfu({
    vue: true,
    typescript: true,
  }),
  {
    plugins: {
      vue: eslintPluginVue,
    },
    rules: {
      "vue/multi-word-component-names": "warn",
      "vue/require-default-prop": "off",
      "vue/no-v-html": "warn",
    },
  },
];

export default config;
