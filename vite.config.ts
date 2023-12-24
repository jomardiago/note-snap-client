/// <reference types="vitest" />

import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    coverage: {
      provider: "istanbul", // or 'v8',
      exclude: [
        ...configDefaults.exclude,
        "src/apis/**",
        "src/providers/**",
        "src/stores/**",
        "src/util/**",
        "src/lib/**",
        "src/tests/**",
        "src/components/ui",
        ".eslintrc.cjs",
        "tailwind.config.js",
      ],
    },
  },
});
