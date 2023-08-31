import { derived } from "svelte/store";
import { navigating } from "$app/stores";

function getHash() {
  if (typeof window === "undefined") {
    return "";
  }
  return window.location.hash;
}

const hash = derived(navigating, () => getHash());
export default hash;
