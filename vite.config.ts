/// <reference types="vitest/config" />
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function resolvePath(path: string) {
  return fileURLToPath(new URL(path, import.meta.url));
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@core": resolvePath("./src/core"),
      "@application": resolvePath("./src/application"),
      "@infrastructure": resolvePath("./src/infrastructure"),
      "@presentation": resolvePath("./src/presentation"),
      "@shared": resolvePath("./src/shared"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    exclude: ["**/node_modules/**", "**/e2e/**"],
  },
});
