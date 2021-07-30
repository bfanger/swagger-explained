<script lang="ts">
  import parseSpecification from "./parseSpecification";
  import YamlNode from "./YamlNode.svelte";
  import LinkNode from "./LinkNode.svelte";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import type { Specification } from "./types";

  export let spec: Specification;
  const hover = writable<any>(null);
  setContext("Browse", hover);

  $: node = parseSpecification(spec);
</script>

<div class="browse">
  <LinkNode href={node.href}>
    <YamlNode {node} />
  </LinkNode>
</div>

<slot />

<style lang="scss">
  .browse {
    background: #2d2d2d;
    color: #ccc;
    font: 11px / normal "Monaco", "Menlo", "Ubuntu Mono", "Consolas",
      "source-code-pro", monospace;
    height: 100%;
    white-space: nowrap;
    position: relative;
    overflow: scroll;
    padding: 0.7rem 0.5rem;
  }
</style>
