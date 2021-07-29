<script lang="ts">
  import DataNode from "./DataNode.svelte";
  import LinkNode from "./LinkNode.svelte";
  import type { AnyNode, ContainerNode, ValueNode } from "./types";

  export let node: AnyNode;
  export let skipindent: boolean = false;

  let value: ValueNode["value"];
  $: value = (<any>node).value;
  let nodes: ContainerNode["nodes"];
  $: nodes = (<any>node).nodes || [];
  let href: ContainerNode["href"];
  $: href = (<any>node).href;

  $: named = typeof node.name !== "undefined";
</script>

<svelte:component this={href ? LinkNode : DataNode} {...href ? { href } : {}}>
  {#if named}
    <span class="name">{node.name}</span><span class="double-colon">:</span>
  {/if}
  {#if node.type === "VALUE"}
    <span
      class:string={typeof value === "string"}
      class:number={typeof value === "number"}
      class:boolean={typeof value === "boolean"}>{JSON.stringify(value)}</span
    >
  {:else}
    <div style="width:100%">
      {#each nodes as subnode}
        <div class="line">
          {#if node.type === "ARRAY"}<span class="dash">-&nbsp;</span
            >{:else if skipindent === false}&nbsp;&nbsp;{/if}
          <svelte:self node={subnode} skipindent={node.type === "ARRAY"} />
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
    justify-items: start;
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
