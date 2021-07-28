<script lang="ts">
  import parseSpecification from "./parseSpecification";
  import type { Specification } from "./openapi.types";
  import YamlNode from "./YamlNode.svelte";

  export let spec: Specification;

  $: node = parseSpecification(spec);
</script>

<div class="browse">
  <YamlNode {node} />
</div>

<slot />

<style lang="scss">
  .browse {
    background: #222;
    font: 10px / normal "Monaco", "Menlo", "Ubuntu Mono", "Consolas",
      "source-code-pro", monospace;
    color: white;
    height: 100%;
    width: 100%;
    overflow: scroll;
    > :global(*) {
      padding: 0.7rem 0.5rem;
      box-sizing: border-box;
    }
  }
</style>
