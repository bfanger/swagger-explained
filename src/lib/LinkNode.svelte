<script lang="ts">
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  export let href: string;
  const id = {};
  const hover = getContext<Writable<any>>("Browse");
  let el: HTMLAnchorElement;

  function onMouseover(e: MouseEvent) {
    let target = e.target as HTMLElement;
    while (target) {
      if (target.classList.contains("link")) {
        if (el === target) {
          hover.set(id);
        }
        return;
      }
      target = target.parentElement;
    }
  }
  function onMouseleave() {
    if ($hover == id) {
      hover.set(undefined);
    }
  }
  function onFocus() {
    hover.set(id);
  }
</script>

<a
  class="link"
  class:hover={$hover === id}
  {href}
  bind:this={el}
  on:mouseover={onMouseover}
  on:mouseleave={onMouseleave}
  on:focus={onFocus}
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
    border-color: rgba(#eee, 0.8);
    :global(.link) {
      border-color: rgba(#eee, 0.15);
    }
    > .title {
      display: block;
    }
  }
</style>
