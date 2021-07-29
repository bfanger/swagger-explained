<script lang="ts">
  import parseSpecification from "./parseSpecification";
  import YamlNode from "./YamlNode.svelte";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import type { Specification } from "./types";

  export let spec: Specification;
  const hover = writable<any>(null);
  setContext("Browse", hover);

  $: node = parseSpecification(spec);
</script>

<div class="browse">
  <YamlNode {node} />
</div>

<slot />

<style lang="scss">
  .browse {
    background: #1f1f1f;
    font: 10px / normal "Monaco", "Menlo", "Ubuntu Mono", "Consolas",
      "source-code-pro", monospace;
    color: white;
    height: 100%;
    width: 100%;
    white-space: nowrap;
    overflow: scroll;
    > :global(*) {
      padding: 0.7rem 0.5rem;
      box-sizing: border-box;
    }
  }
</style>
