<script lang="ts">
  import { onMount } from "svelte";
  import hash from "./store/hash";

  import "highlight.js/styles/github.min.css";

  export let html: string;

  let el: HTMLDivElement | undefined;
  $: if (el) {
    el.innerHTML = html;
  }

  function intoView(selector: string) {
    if (!el || !selector) {
      return false;
    }
    let target: Element | null | undefined = el.querySelector(selector);
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
    el?.scrollTo(0, 0);
    intoView($hash);
  });
  $: intoView($hash);
</script>

<!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
<div bind:this={el} class="info" on:click={onClick}>
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
      padding: 6px 10px;
      background-color: #eaebec;
      border-left: 1px solid #f7f8f8;

      &:not([align]) {
        text-align: left;
      }
    }

    :global(tr) {
      border-top: 1px solid #eaebec;
    }

    :global(td) {
      padding: 8px;
      border-left: 1px solid #eaebec;
    }

    :global(code) {
      font: monospace;
      font-size: 12px;
    }

    :global(pre) {
      position: relative;

      overflow: scroll;
      display: block;

      font-size: 12px;
      color: #292929;
      white-space: pre;

      border: 1px solid #e3e3e3;
      border-radius: 6px;

      &:not(:has(.hljs)) {
        display: block;
        padding: 1em;
        background: #fdfdfd;
      }

      &:has(.hljs)::after {
        position: absolute;
        top: 0;
        right: 0;

        padding: 2px 4px;

        font-size: 10px;

        border-bottom-left-radius: 4px;
      }

      :global(.language-json),
      :global(.language-js) {
        background-color: #f8f7fa;
      }

      &:has(.language-json)::after {
        content: "JSON";
        color: #8862ae;
        background-color: #e1d5ec;
      }

      &:has(.language-js)::after {
        content: "JS";
        color: #8862ae;
        background-color: #e1d5ec;
      }

      :global(.language-yaml) {
        position: relative;
        background-color: #f9faf9;
      }

      &:has(.language-yaml)::after {
        content: "YAML";
        color: #62a03f;
        background-color: #dbedd0;
      }
    }
  }
</style>
