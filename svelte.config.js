import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    prerender: {
      handleMissingId: "ignore",
      entries: [
        "*",
        "/specs/1.2.html",
        "/specs/2.0.html",
        "/specs/3.0.0.html",
        "/specs/3.0.1.html",
        "/specs/3.0.2.html",
        "/specs/3.0.3.html",
        "/specs/3.1.0.html",
      ],
    },
  },
};
