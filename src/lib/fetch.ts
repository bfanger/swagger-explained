import { parse } from "yaml";

type Fetch = typeof fetch;

type FetchOptions = RequestInit & {
  fetch?: Fetch;
};

export async function fetchResponse(
  info: RequestInfo,
  options: FetchOptions = {},
) {
  const fetch: Fetch = options.fetch || globalThis.fetch;

  const { fetch: _, ...fetchOptions } = options;
  const response = await fetch(info, fetchOptions);
  if (response.ok === false) {
    throw new Error("Request failed");
  }
  return response;
}

export async function fetchJson<T = unknown>(
  info: RequestInfo,
  options: FetchOptions = {},
) {
  const response = await fetchResponse(info, options);
  const json = await response.json();
  return json as T;
}

export async function fetchYaml(info: RequestInfo, options: FetchOptions = {}) {
  const response = await fetchResponse(info, options);
  return parse(await response.text()) as unknown;
}

export async function fetchData<T = unknown>(
  info: RequestInfo,
  options: FetchOptions = {},
): Promise<T> {
  const url = typeof info === "string" ? info : info.url;
  const match = url.match(/[^./].([^.]+)$/);
  const ext = match?.[1] !== undefined && match[1].toLowerCase();
  const response = await fetchResponse(info, options);
  const contentType = response.headers.get("Content-Type")?.split(";")[0] ?? "";
  let type = "AUTO";

  if (contentType.match(/yaml/i)) {
    type = "YAML";
  }
  if (contentType.match(/json/i)) {
    type = "JSON";
  }
  if (type === "AUTO" && ext === "yaml") {
    type = "YAML";
  }
  if (type === "AUTO" && ext === "json") {
    type = "JSON";
  }
  if (type === "YAML") {
    return parse(await response.text()) as T;
  }
  if (type === "JSON") {
    const json = await response.json();
    return json as T;
  }
  throw new Error(`Unsupported Content-Type: ${contentType}`);
}
