import type { RequestHandler } from "@sveltejs/kit";
import hljs from "highlight.js";
import { Marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
import { markedHighlight } from "marked-highlight";
import { fetchResponse } from "$lib/fetch";

export const prerender = true;

export const GET: RequestHandler = async (req) => {
  const { version } = req.params;
  const spec = await fetchResponse(
    `https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/versions/${version}.md`,
    { fetch },
  );
  const marked = new Marked(
    markedHighlight({
      langPrefix: "hljs language-",
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
    }),
  );
  marked.use(gfmHeadingId());
  let html = await marked.parse(await spec.text(), { gfm: true });
  html = html.replace(
    / href="..\//,
    ' href="https://github.com/OAI/OpenAPI-Specification/tree/main/',
  );
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
};
