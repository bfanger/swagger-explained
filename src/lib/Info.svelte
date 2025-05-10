<script lang="ts">
  import { onMount } from "svelte";
  import hash from "./store/hash";

  import "highlight.js/styles/github.min.css";

  export let html: string;

  let el: HTMLDivElement | undefined;
  $: if (el) {
    // eslint-disable-next-line svelte/no-dom-manipulating
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

<style>
  .info {
    padding: 0 2rem;
    font-size: 1.3rem;
    color: #212529;

    :global {
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin-top: 1rem;
        margin-bottom: 0.5rem;

        font-size: 1.9rem;
        font-weight: 500;
        line-height: 1.5;
      }

      h1 {
        font-size: 2.6rem;
      }

      h2 {
        font-size: 2.2rem;
      }

      h3 {
        font-size: 1.9rem;
      }

      h4 {
        font-size: 1.7rem;
      }

      h5 {
        font-size: 1.7rem;
      }

      h6 {
        font-size: 1.5rem;
      }

      a {
        color: #3489d1;
        text-decoration: none;

        &:hover {
          color: #1a5d97;
          text-decoration: underline;
        }
      }

      table {
        border-collapse: collapse;
        margin-top: 20px;
        border: 1px solid #eaebec;
      }

      th {
        padding: 6px 10px;
        border-left: 1px solid #f7f8f8;
        background-color: #eaebec;

        &:not([align]) {
          text-align: left;
        }
      }

      tr {
        border-top: 1px solid #eaebec;
      }

      td {
        padding: 8px;
        border-left: 1px solid #eaebec;
      }

      code {
        font-family: monospace;
        font-size: 12px;
      }

      pre {
        position: relative;

        overflow: scroll;
        display: block;

        border: 1px solid #e3e3e3;
        border-radius: 6px;

        font-size: 12px;
        color: #292929;
        white-space: pre;

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
          border-bottom-left-radius: 4px;

          font-size: 10px;
        }

        .language-json,
        .language-js {
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

        .language-yaml {
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
  }
</style>
