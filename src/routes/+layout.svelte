<slot />

<svelte:head>
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;700&display=swap"
  />
</svelte:head>

<style>
  :global(html) {
    height: 100%;
    font-size: 10px;
  }

  :global(body) {
    height: 100%;
    margin: 0;
    padding: 0;
    font:
      15px/1.5 "Open Sans",
      sans-serif;
  }

  :global(svelte-app) {
    display: contents;
  }
</style>
