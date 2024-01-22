<script lang="ts">
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import parseSpecification from "./parseSpecification";
  import YamlNode from "./YamlNode.svelte";
  import LinkNode from "./LinkNode.svelte";
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

    overflow: scroll;

    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0.7rem 0.5rem;

    font:
      11px / normal Monaco,
      Menlo,
      "Ubuntu Mono",
      Consolas,
      source-code-pro,
      monospace;
    color: #ccc;
    white-space: nowrap;

    background: #2d2d2d;
  }
</style>
