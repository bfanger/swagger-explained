<script lang="ts">
  import { onMount } from "svelte";
  import hash from "./store/hash";

  export let html: string;

  let el: HTMLDivElement;

  function intoView(selector: string) {
    if (!el || !selector) {
      return false;
    }
    let target = el.querySelector(selector);
    if (!target) {
      target = el.querySelector("a[name=" + selector.substr(1) + "]");
    }
    if (target) {
      target.scrollIntoView();
      return true;
    }
    return false;
  }

  function onClick(event: MouseEvent) {
    let target = event.target as HTMLElement;
    if (event.ctrlKey || event.shiftKey || event.metaKey) {
      return;
    }
    while (target) {
      if (target.nodeName === "A") {
        const href = target.getAttribute("href");
        if (href.match(/^#/)) {
          const scrolled = intoView(href);
          if (scrolled) {
            event.preventDefault();
          }
        }
        break;
      }
      target = target.parentElement;
    }
  }
  onMount(() => {
    intoView($hash);
  });
  $: intoView($hash);
</script>

<div bind:this={el} class="info" on:click={onClick}>
  {@html html}
</div>

<style lang="scss">
  .info {
    color: #212529;
    padding: 0 2rem;
    font-size: 1.3rem;
    %heading {
      margin-top: 1rem;
      margin-bottom: 0.5rem;
      font-size: 1.9rem;
      font-weight: 500;
      line-height: 1.5;
    }
    :global(h1) {
      @extend %heading;
      font-size: 2.6rem;
    }
    :global(h2) {
      @extend %heading;
      font-size: 2.2rem;
      // line-height: 2.1975rem;
    }
    :global(h3) {
      @extend %heading;
      font-size: 1.9rem;
    }
    :global(h4) {
      @extend %heading;
      font-size: 1.7rem;
    }
    :global(h5) {
      @extend %heading;
      font-size: 1.7rem;
    }
    :global(a) {
      text-decoration: none;
      color: #3489d1;
      &:hover {
        text-decoration: underline;
        color: #1a5d97;
      }
    }
    :global(table) {
      border-collapse: collapse;
      margin-top: 20px;
      border: 1px solid #eaebec;
    }
    :global(th) {
      border-left: 1px solid #f7f8f8;
      padding: 10px;
      background-color: #eaebec;
    }
    :global(tr) {
      border-top: 1px solid #eaebec;
    }
    :global(td) {
      border-left: 1px solid #eaebec;
      padding: 10px;
    }

    :global(pre) {
      border: 1px solid #888;
      border-radius: 6px;
      font-size: 14px;
      display: block;
      padding: 10px;
      background-color: #333;
      color: #f1f2f3;
    }
  }
</style>
