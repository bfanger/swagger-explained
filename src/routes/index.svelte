<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";
  import type { OpenApi, Specification } from "$lib/openapi.types";
  import { fetchData, fetchResponse } from "$lib/fetch";

  export const load: Load = async ({ fetch }) => {
    // "https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v3.0/petstore.yaml"
    const url =
      "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/petstore.yaml";
    const spec = (await fetchData(url)) as OpenApi;
    if (!spec.openapi) {
      throw new Error("unknown version");
    }
    const html = await fetchResponse("/specs/" + spec.openapi + ".md", {
      fetch,
    });
    return {
      props: {
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

  export let spec: Specification;
  export let html: string;
</script>

<MasterDetail>
  <Browse slot="master" {spec} />

  <Info {html} />
  <slot />
</MasterDetail>
