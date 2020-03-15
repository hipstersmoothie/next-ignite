import path from 'path'

declare var BASE_PATH: string;

export function formatPath(p: string) {
  return path.join(BASE_PATH, `/${p.replace(/\.mdx$/, "")}`);
}
