import antfu from "@antfu/eslint-config";
import { config as baseConfig } from "./base.js";
import eslintPluginAstro from "eslint-plugin-astro";

/**
 * ESLint configuration for Astro projects
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  ...baseConfig,
  antfu({
    typescript: true,
  }),
  {
    plugins: {
      astro: eslintPluginAstro,
    },
    rules: {
      "astro/no-conflict-set-directives": "error",
      "astro/no-unused-define-vars-in-style": "error",
    },
  },
];

export default config;
