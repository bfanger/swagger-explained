/* eslint-disable import/no-extraneous-dependencies */
import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: preprocess(),
  kit: {
    target: "svelte-app",
    adapter: adapter(),
    prerender: {
      pages: [
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
