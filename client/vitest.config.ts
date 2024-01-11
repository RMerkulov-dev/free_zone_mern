import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Your Vitest configurations
    globals: true,
    setupFiles: "./test-setup.ts",
    environment: "jsdom",
  },
});
