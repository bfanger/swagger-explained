<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";
  import type { JSONValue } from "@sveltejs/kit/types/endpoint";
  import type { Specification } from "$lib/types";
  import { fetchData, fetchResponse } from "$lib/fetch";

  export const load: Load = async ({ fetch, page: { query } }) => {
    let url =
      query.get("url") ||
      "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/petstore.yaml";
    const match = url.match(
      /^https:\/\/github.com\/([^/]+\/[^/]+)\/blob\/(.+)$/
    );
    if (match) {
      console.log(match);
      url = `https://raw.githubusercontent.com/${match[1]}/${match[2]}`;
      console.log(url);
    }
    const spec = await fetchData<{ [key: string]: JSONValue }>(url);
    let version = spec.openapi || spec.swagger;
    if (!version) {
      throw new Error("unknown version");
    }
    const html = await fetchResponse("/specs/" + version + ".md", {
      fetch,
    });
    return {
      props: {
        url,
        spec,
        html: await html.text(),
      },
    };
  };
</script>

<script lang="ts">
  import Info from "$lib/Info.svelte";
  import Browse from "$lib/Browse.svelte";
  import MasterDetail from "$lib/MasterDetail.svelte";

  export let url: string;
  export let spec: Specification;
  export let html: string;
</script>

<svelte:head>
  <title>Interactive OpenAPI-Specification</title>
</svelte:head>
<div class="page">
  <header>
    <form>
      <input name="url" class="url" value={url} />
      <input type="submit" value="explain" />
    </form>
  </header>
  <main>
    <MasterDetail>
      <svelte:fragment slot="master">
        <Browse {spec} />
      </svelte:fragment>

      <Info {html} />
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
  header {
    background-color: black;
    flex-shrink: 0;
  }
  form {
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .url {
    width: 70%;
  }
  main {
    flex: 1;
    overflow: hidden; /* why does this work */
  }
</style>
