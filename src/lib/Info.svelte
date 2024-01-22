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
      target = el.querySelector(`a[name=${selector.substring(1)}]`);
    }
    if (target) {
      target.scrollIntoView();
      return true;
    }
    return false;
  }

  function onClick(event: MouseEvent) {
    let target = event.target as HTMLElement | null;
    if (event.ctrlKey || event.shiftKey || event.metaKey) {
      return;
    }
    while (target) {
      if (target.nodeName === "A") {
        const href = target.getAttribute("href");
        if (href?.match(/^#/)) {
          const scrolled = intoView(href);
          if (scrolled) {
            // event.preventDefault();
          }
        }
        break;
      }
      target = target.parentElement;
    }
  }
  onMount(() => {
    el.scrollTo(0, 0);
    intoView($hash);
  });
  $: intoView($hash);
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div bind:this={el} class="info" on:click={onClick} on:keypress={undefined}>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html html}
</div>

<style lang="scss">
  .info {
    padding: 0 2rem;
    font-size: 1.3rem;
    color: #212529;
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

    :global(h6) {
      @extend %heading;

      font-size: 1.5rem;
    }

    :global(a) {
      color: #3489d1;
      text-decoration: none;

      &:hover {
        color: #1a5d97;
        text-decoration: underline;
      }
    }

    :global(table) {
      border-collapse: collapse;
      margin-top: 20px;
      border: 1px solid #eaebec;
    }

    :global(th) {
      padding: 10px;
      background-color: #eaebec;
      border-left: 1px solid #f7f8f8;
    }

    :global(tr) {
      border-top: 1px solid #eaebec;
    }

    :global(td) {
      padding: 10px;
      border-left: 1px solid #eaebec;
    }

    :global(pre) {
      overflow: scroll;
      display: block;

      padding: 10px;

      font-size: 14px;
      color: #292929;
      white-space: pre;

      background-color: #f2f2f2;
      border: 1px solid #e3e3e3;
      border-radius: 6px;
    }
  }
</style>
