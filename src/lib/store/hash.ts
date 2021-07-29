import { derived } from "svelte/store";
// eslint-disable-next-line import/no-unresolved, import/extensions
import { navigating } from "$app/stores";

function getHash() {
  if (typeof window === "undefined") {
    return "";
  }
  return window.location.hash;
}

const hash = derived(navigating, () => {
  return getHash();
});
export default hash;
