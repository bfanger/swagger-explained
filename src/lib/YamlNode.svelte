<script lang="ts">
  import type { MappedNode } from "./types";
  import LinkNode from "./LinkNode.svelte";
  import Slot from "./Slot.svelte";
  import YamlLine from "./YamlLine.svelte";

  export let node: MappedNode;
  export let indent = 0;
  export let isArrayItem = false;

  const SlotNode = Slot as any;

  // Note: The template looks ugly, but thats because the whitespace is important
</script>

{#each node.nodes || [] as subnode, i}<svelte:component
    this={subnode.href ? LinkNode : SlotNode}
    {...subnode.href ? { href: subnode.href } : {}}
    ><YamlLine
      spaces={isArrayItem && i == 0 ? 0 : indent * 2}
      name={subnode.name}
      value={subnode.value}
    />{#if subnode.nodes}{#if subnode.name}<br />{/if}<svelte:self
        node={subnode}
        indent={indent + 1}
        isArrayItem={typeof subnode.name == "undefined"}
      />{:else}<br />{/if}</svelte:component
  >{/each}
