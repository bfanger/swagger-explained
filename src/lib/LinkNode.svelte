<script lang="ts">
  import type { Writable } from "svelte/store";
  import { getContext } from "svelte";

  export let href: string | undefined;
  const id = {};
  const hover = getContext<Writable<any>>("Browse");
  let el: HTMLAnchorElement;

  function onMouseover(e: MouseEvent) {
    let target = e.target as HTMLElement | null;
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
    if ($hover === id) {
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

    width: 100%;
    min-width: max-content;

    text-decoration: none;

    outline: 1px solid rgba(#eee, 0.05);
  }

  .title {
    pointer-events: none;

    position: absolute;
    z-index: 1;
    right: -4px;

    display: none;

    padding: 1px 6px;

    font-size: 10px;
    color: black;

    background-color: rgba(#eee, 0.8);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
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
