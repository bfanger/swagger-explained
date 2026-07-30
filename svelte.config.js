import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import SPECS from "./src/specs.gen.ts";

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    prerender: {
      handleMissingId: "ignore",
      entries: ["*", ...SPECS.map((version) => `/specs/${version}.html`)],
    },
  },
};
