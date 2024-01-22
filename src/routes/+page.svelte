<script lang="ts">
  import type { PageData } from "./$types";
  import Info from "$lib/Info.svelte";
  import Browse from "$lib/Browse.svelte";
  import MasterDetail from "$lib/MasterDetail.svelte";
  import ToolBar from "$lib/ToolBar.svelte";

  export let data: PageData;
</script>

<svelte:head>
  <title>OpenAPI Explained</title>
  <meta
    name="description"
    content="Interactive OpenAPI and Swagger Specification, Read and navigate the spec based on (your) yaml or json documentation."
  />
</svelte:head>
<div class="page">
  <ToolBar url={data.url} />
  <main>
    <MasterDetail>
      <svelte:fragment slot="master">
        {#if data.spec}
          <Browse spec={data.spec} />
        {/if}
      </svelte:fragment>

      <Info html={data.html} />
      <slot />
    </MasterDetail>
  </main>
</div>

<style lang="scss">
  .page {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  main {
    overflow: hidden; /* why does this work */
    flex: 1;
  }
</style>
