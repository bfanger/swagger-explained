import { existsSync } from "node:fs";
import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import SPECS from "./src/specs.gen.ts";
import { sveltekit } from "@sveltejs/kit/vite";
import { configDefaults, defineConfig } from "vitest/config";

const inDocker = existsSync("/.dockerenv");

export default defineConfig({
  plugins: [
    sveltekit({
      preprocess: vitePreprocess(),
      adapter: adapter(),
      prerender: {
        handleMissingId: "ignore",
        entries: [
          "*",
          ...SPECS.map((version) => `/specs/${version}.html` as `/${string}`),
        ],
        handleHttpError: ({ status, path, referrer, message }) => {
          // The spec pages are rendered from markdown hosted on GitHub, which
          // contains relative links to sibling spec pages and example files that
          // do not resolve to app routes. Ignore their 404s during prerendering
          // instead of failing the build.
          if (status === 404 && referrer?.startsWith("/specs/")) {
            return;
          }
          throw new Error(`${message} (${path})`);
        },
      },
    }),
  ],
  server: inDocker
    ? { host: true, watch: { usePolling: true, interval: 1000 } }
    : undefined,
  test: {
    exclude: [...configDefaults.exclude, "package", "playwright"],
  },
});
