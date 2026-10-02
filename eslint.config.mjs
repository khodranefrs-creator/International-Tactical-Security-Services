import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Local QA tooling, not part of the shipped site.
    "verify.js",
    "check-tokens.js",
    "check-media-refs.js",
    "check-reveal.js",
    "check-tokens-selftest.js",
    "check-content.js",
    "fix-assets.js",
    ".verify/**",
  ]),
]);

export default eslintConfig;
