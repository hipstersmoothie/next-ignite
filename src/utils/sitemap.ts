import path from "path";
import sitemap from "nextjs-sitemap-generator";
import { getConfig } from "./get-config";

const config = getConfig();
const buildDir = path.join(process.cwd(), "docs/out");

export const buildSitemap = () =>
  sitemap({
    baseUrl:
      config.url && config.url.endsWith("/")
        ? config.url.slice(0, -1)
        : config.url,
    pagesDirectory: buildDir,
    targetDirectory: buildDir,
    ignoreIndexFiles: true,
    ignoredPaths: ["404"],
    ignoredExtensions: ["png", "jpg", "svg", "ico", "js", "xml", "json"],
  });
