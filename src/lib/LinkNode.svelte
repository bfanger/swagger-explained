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

<style>
  .link {
    display: block;

    width: 100%;
    min-width: max-content;

    text-decoration: none;

    outline: 1px solid rgb(238 238 238 / 5%);
  }

  .title {
    pointer-events: none;

    position: absolute;
    z-index: 1;
    right: -4px;

    display: none;

    padding: 1px 6px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;

    font-size: 10px;
    color: black;

    background-color: #eeec;
  }

  .hover,
  :focus {
    outline-color: #eeec;

    :global(.link) {
      outline-color: #eeeeee26;
    }

    > .title {
      display: block;
    }
  }
</style>
