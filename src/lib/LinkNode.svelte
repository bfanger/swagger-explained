<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  export let href: string;
  const id = {};
  const hover = getContext<Writable<any>>("Browse");

  function onMouseenter() {
    hover.set(id);
  }
  function onMouseleave() {
    if ($hover == id) {
      hover.set(undefined);
    }
  }
</script>

<a
  class="link"
  class:hover={$hover === id}
  {href}
  on:mouseenter={onMouseenter}
  on:mouseleave={onMouseleave}
>
  <slot />
  <div class="title">{href}</div>
</a>

<style lang="scss">
  .link {
    display: block;
    text-decoration: none;
    border: 1px solid rgba(#eee, 0.05);
    position: relative;
  }
  .title {
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
    background-color: rgba(#eee, 0.8);
    color: black;
    padding: 0 3px;
    border-bottom-right-radius: 4px;
    display: none;
    font-size: 9px;
  }
  .hover {
    border-color: rgba(#eee, 0.5);
    :global(.link) {
      border-color: rgba(#eee, 0.3);
    }
    > .title {
      display: block;
    }
  }
</style>
