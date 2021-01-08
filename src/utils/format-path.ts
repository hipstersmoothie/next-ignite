import path from "path";


export function formatPath(p: string) {
  return path.join(process.env.BASE_PATH, `/${p.replace(/\.mdx$/, "")}`);
}

export function postFixHTML(p: string) {
  return process.env.STATIC_HTML_URLS ? `${p}.html` : p;
}
