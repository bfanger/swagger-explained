import type { RequestHandler } from "@sveltejs/kit";
import marked from "marked";
import { fetchResponse } from "$lib/fetch";

export const get: RequestHandler = async (req) => {
  const { version } = req.params;
  const spec = await fetchResponse(
    `https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/versions/${version}.md`
  );
  let html = marked(await spec.text());
  html = html.replace(
    / href="..\//,
    ' href="https://github.com/OAI/OpenAPI-Specification/tree/main/'
  );
  return {
    body: html,
  };
};
