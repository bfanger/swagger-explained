<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";
  import type { JSONValue } from "@sveltejs/kit/types/endpoint";
  import type { Specification } from "$lib/types";
  import { fetchData, fetchResponse } from "$lib/fetch";

  const fallbackUrl =
    "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/petstore.yaml";
  export const load: Load = async ({ fetch, page }) => {
    let url = page.query.get("url") || "";

    const match = url.match(
      /^https:\/\/github.com\/([^/]+\/[^/]+)\/blob\/(.+)$/
    );
    const pathname = typeof location === "undefined" ? "/" : location.pathname;
    if (match) {
      return {
        status: 301,
        redirect:
          pathname +
          "?url=" +
          encodeURIComponent(
            `https://raw.githubusercontent.com/${match[1]}/${match[2]}`
          ),
      };
    }
    const spec = await fetchData<{ [key: string]: JSONValue }>(
      url || fallbackUrl
    );
    let version = spec.openapi || spec.swagger;
    if (!version) {
      throw new Error("unknown version");
    }

    const html = await fetchResponse(
      "/swagger-explained/specs/" + version + ".html",
      {
        fetch,
      }
    );
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
  import ToolBar from "$lib/ToolBar.svelte";

  export let url: string;
  export let spec: Specification;
  export let html: string;
</script>

<svelte:head>
  <title>OpenAPI Explained</title>
  <meta
    name="description"
    content="Interactive OpenAPI and Swagger Specification, Read and navigate the spec based on (your) yaml or json documentation."
  />
</svelte:head>
<div class="page">
  <ToolBar {url} />
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

  main {
    flex: 1;
    overflow: hidden; /* why does this work */
  }
</style>
