import yaml from "yaml";

export type Fetch = (
  info: RequestInfo,
  init?: RequestInit
) => Promise<Response>;

type FetchOptions = RequestInit & {
  fetch?: Fetch;
};

export async function fetchResponse(
  info: RequestInfo,
  options: FetchOptions = {}
): Promise<Response> {
  const fetch: Fetch = options.fetch || globalThis.fetch;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { fetch: _, ...fetchOptions } = options;

  const response = await fetch(info, fetchOptions);
  if (response.ok === false) {
    throw new Error("Request failed");
  }
  return response;
}

export async function fetchJson<T = unknown>(
  info: RequestInfo,
  options: FetchOptions = {}
): Promise<T> {
  const response = await fetchResponse(info, options);
  return response.json();
}

export async function fetchYaml(
  info: RequestInfo,
  options: FetchOptions = {}
): Promise<unknown> {
  const response = await fetchResponse(info, options);
  return yaml.parse(await response.text());
}

export async function fetchData<T = unknown>(
  info: RequestInfo,
  options: FetchOptions = {}
): Promise<T> {
  const url = typeof info === "string" ? (info as string) : info.url;
  const match = url.match(/[^./].([^.]+)$/);
  const ext = match && match[1].toLowerCase();
  const response = await fetchResponse(info, options);
  const contentType = response.headers.get("Content-Type").split(";")[0];
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
    return yaml.parse(await response.text());
  }
  if (type === "JSON") {
    return response.json();
  }
  throw new Error(`Unsupported Content-Type: ${contentType}`);
}
