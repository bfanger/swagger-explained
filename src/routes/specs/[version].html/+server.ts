import type { RequestHandler } from "@sveltejs/kit";
import { marked } from "marked";
import { fetchResponse } from "$lib/fetch";

export const prerender = true;

export const GET: RequestHandler = async (req) => {
  const { version } = req.params;
  const spec = await fetchResponse(
    `https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/versions/${version}.md`,
    { fetch },
  );
  let html = await marked(await spec.text());
  html = html.replace(
    / href="..\//,
    ' href="https://github.com/OAI/OpenAPI-Specification/tree/main/',
  );
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
};
