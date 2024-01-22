<script lang="ts">
  import type { MappedNode } from "./types";

  export let spaces: number;
  export let name: string | undefined;
  export let value: MappedNode["value"] = undefined;

  function formatValue(val: MappedNode["value"]) {
    if (typeof val !== "string") {
      return val;
    }
    if (/[#]/.test(val) && /[']/.test(val) === false) {
      return `'${val}'`;
    }
    if (/^[0-9]+(\.[0-9]+)?$/.test(val) || val === "object") {
      return `"${val}"`;
    }
    return val;
  }
  function looksNumeric(s: string) {
    return /^[0-9]+(\.[0-9]+)?$/.test(s);
  }
  function formatName(val: string) {
    if (looksNumeric(val)) {
      return `"${val}"`;
    }
    return val;
  }
  // Note: The template looks ugly, but thats because the whitespace is important
</script>

{#each Array(spaces) as _}&nbsp;{/each}{#if name}<span
    class="name"
    class:string={looksNumeric(name)}
    >{formatName(name)}<span class="double-colon">:</span></span
  >{:else}<span class="dash">-</span
  >{/if}&nbsp;{#if typeof value !== "undefined"}<span
    class:string={typeof value === "string"}
    class:number={typeof value === "number"}
    class:boolean={typeof value === "boolean"}>{formatValue(value)}</span
  >{/if}

<style>
  .name {
    color: #f2777a;
  }

  .double-colon {
    color: #bd8fbd;
  }

  .dash {
    color: #ccc;
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
</style>
