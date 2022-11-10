import { error, redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { fetchData, fetchResponse } from "$lib/fetch";
import type { JSONValue } from "$lib/types";

const fallbackUrl =
  "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/petstore.yaml";

export const load: PageLoad = async ({ url, fetch }) => {
  let specUrl = "";
  if (typeof window !== "undefined" && url.searchParams.has("url")) {
    specUrl = url.searchParams.get("url") || "";
  }
  const match = specUrl.match(
    /^https:\/\/github.com\/([^/]+\/[^/]+)\/blob\/(.+)$/
  );
  if (match) {
    const pathname =
      typeof window === "undefined" ? "/" : window.location.pathname;
    specUrl = `https://raw.githubusercontent.com/${match[1]}/${match[2]}`;
    throw redirect(301, `${pathname}?url=${encodeURIComponent(specUrl)}`);
  }
  const spec = await fetchData<{ [key: string]: JSONValue }>(
    specUrl || fallbackUrl
  );
  const version = spec.openapi || spec.swagger;
  if (!version) {
    throw error(400, "unknown version");
  }
  const html = await fetchResponse(`specs/${version}.html`, {
    fetch,
  });
  return {
    url: specUrl,
    spec,
    html: await html.text(),
  };
};
