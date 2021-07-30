<script lang="ts">
  import type { MappedNode } from "./types";

  export let spaces: number;
  export let name: string | undefined;
  export let value: MappedNode["value"] = undefined;

  function formatValue(value: MappedNode["value"]) {
    if (typeof value !== "string") {
      return value;
    }
    if (/[#]/.test(value) && /[']/.test(value) === false) {
      return "'" + value + "'";
    }
    if (/^[0-9]+(\.[0-9]+)?$/.test(value) || value === "object") {
      return '"' + value + '"';
    }
    return value;
  }
  function looksNumeric(s: string) {
    return /^[0-9]+(\.[0-9]+)?$/.test(s);
  }
  function formatName(name: string) {
    if (looksNumeric(name)) {
      return '"' + name + '"';
    }
    return name;
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
