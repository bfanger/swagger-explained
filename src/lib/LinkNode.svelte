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
  ><div class="title">{href}</div>
  <slot /></a
>

<style lang="scss">
  .link {
    display: block;
    text-decoration: none;
    outline: 1px solid rgba(#eee, 0.05);
    width: 100%;
    min-width: max-content;
  }
  .title {
    position: absolute;
    right: -4px;
    z-index: 1;
    pointer-events: none;
    background-color: rgba(#eee, 0.8);
    color: black;
    padding: 1px 6px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    display: none;
    font-size: 10px;
  }
  .hover,
  :focus {
    outline-color: rgba(#eee, 0.8);
    :global(.link) {
      outline-color: rgba(#eee, 0.15);
    }
    > .title {
      display: block;
    }
  }
</style>
