import { readable } from "svelte/store";

function getHash() {
  if (typeof window === "undefined") {
    return "";
  }
  return window.location.hash;
}

const hash = readable(getHash(), (set) => {
  if (typeof window === "undefined") {
    return undefined;
  }
  function listener() {
    set(getHash());
  }
  window.addEventListener("hashchange", listener);

  return () => {
    window.removeEventListener("hashchange", listener);
  };
});
export default hash;
