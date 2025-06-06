import { error, redirect } from "@sveltejs/kit";
import type { JSONValue } from "$lib/types";
import { fetchData, fetchResponse } from "$lib/fetch";
import type { PageLoad } from "./$types";

const fallbackUrl =
  "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/refs/heads/main/_archive_/schemas/v3.0/pass/petstore.yaml";

export const load: PageLoad = async ({ url, fetch }) => {
  let specUrl = "";
  if (typeof window !== "undefined" && url.searchParams.has("url")) {
    specUrl = url.searchParams.get("url") || "";
  }
  const match = specUrl.match(
    /^https:\/\/github.com\/([^/]+\/[^/]+)\/blob\/(.+)$/,
  );
  if (match) {
    const pathname =
      typeof window === "undefined" ? "/" : window.location.pathname;
    specUrl = `https://raw.githubusercontent.com/${match[1]}/${match[2]}`;
    redirect(301, `${pathname}?url=${encodeURIComponent(specUrl)}`);
  }
  let spec: { [key: string]: JSONValue };
  try {
    spec = await fetchData(specUrl || fallbackUrl, { fetch });
  } catch (err) {
    console.error(err);
    error(502, `Unable to fetch: ${specUrl || fallbackUrl}`);
  }
  const version = spec.openapi || spec.swagger;
  if (!version) {
    error(400, "unknown version");
  }
  const html = await fetchResponse(`specs/${version as string}.html`, {
    fetch,
  });
  return {
    url: specUrl,
    spec,
    html: await html.text(),
  };
};
