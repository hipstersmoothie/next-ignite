import path from "path";

export function formatPath(p: string) {
  return path.join(process.env.BASE_PATH, `/${p.replace(/\.mdx$/, "")}`);
}

export function postFixHTML(p: string) {
  if (!process.env.STATIC_HTML_URLS) {
    return p
  }

  if (path.basename(p).includes('#')) {
    return p.replace('#', '.html#')
  }

  return  `${p}.html`;
}
