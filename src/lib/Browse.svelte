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
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0.7rem 0.5rem;
    overflow: scroll;
    color: #ccc;
    background: #2d2d2d;
    font: 11px / normal "Monaco", "Menlo", "Ubuntu Mono", "Consolas",
      "source-code-pro", monospace;
    white-space: nowrap;
  }
</style>
