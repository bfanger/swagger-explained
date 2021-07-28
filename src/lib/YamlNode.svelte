<script lang="ts">
  import DataNode from "./DataNode.svelte";
  import LinkNode from "./LinkNode.svelte";

  import type { AnyNode } from "./specification.types";

  export let node: AnyNode;
  $: named = typeof node.name !== "undefined";
  $: href = ["OBJECT", "VALUE", "ARRAY"].includes(node.type)
    ? undefined
    : "#" + node.type;
</script>

<svelte:component this={href ? LinkNode : DataNode} {...href ? { href } : {}}>
  {#if named}
    <span class="name">{node.name}</span><span class="double-colon">:</span>
  {/if}
  {#if node.type === "VALUE"}
    <span
      class:string={typeof node.value === "string"}
      class:number={typeof node.value === "number"}
      class:boolean={typeof node.value === "boolean"}
      >{JSON.stringify(node.value)}</span
    >
  {:else}
    <div style="width:100%">
      {#each node.nodes as subnode}
        <div class="line">
          {#if node.type === "ARRAY"}<span class="dash">-&nbsp;</span
            >{:else}&nbsp;&nbsp;{/if}
          <svelte:self node={subnode} />
        </div>
      {/each}
    </div>
  {/if}
</svelte:component>

<style>
  .name {
    color: #f2777a;
  }
  .line {
    display: flex;
    white-space: nowrap;
  }
  .string {
    color: #96c896;
  }
  .boolean {
    color: #f08d55;
  }
  .number {
    color: #f08d55;
  }
  .dash {
    color: #ccc;
  }
  .double-colon {
    color: #bd8fbd;
  }
</style>
