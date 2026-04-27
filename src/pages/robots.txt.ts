// SPDX-License-Identifier: Apache-2.0
import type { APIRoute } from "astro";
import { SITE } from "@/data/constants";

export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /

Sitemap: ${SITE.url}/sitemap-index.xml
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
