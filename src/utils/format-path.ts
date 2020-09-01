import path from "path";

declare var BASE_PATH: string;
declare var STATIC_HTML_URLS: string;

export function formatPath(p: string) {
  return path.join(BASE_PATH, `/${p.replace(/\.mdx$/, "")}`);
}

export function postFixHTML(p: string) {
  return STATIC_HTML_URLS ? `${p}.html` : p;
}
