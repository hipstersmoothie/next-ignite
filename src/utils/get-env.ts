import path from "path";
import glob from "fast-glob";
import parseGithubUrl from "parse-github-url";

import {
  getTopLevelSections,
  getHasHomepage,
  getPages,
  getBlogPosts,
  PAGES_DIR,
  MDX_DATA_DIR,
} from "./docs-data";
import { IgniteConfig } from "./types";

const publicDir = "./docs/public/";
const DEFAULT_LOGO = "https://hipstersmoothie.github.io/next-ignite/logo.svg";

const getFullGitHubUrl = (url: string) => {
  const repo = parseGithubUrl(url);

  if (!repo) {
    return "https://hipstersmoothie.github.io/next-ignite/docs/configuration#repo";
  }

  if (repo.href.startsWith("http")) {
    return repo.href;
  }

  return `https://github.com/${repo.repo}`;
};

export const getEnv = (config: IgniteConfig) => {
  const debug = process.env.NODE_ENV !== "production";
  const { pathname } = config.url ? new URL(config.url) : { pathname: "/" };
  const BASE_PATH = debug
    ? ""
    : pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
  const manifest = glob.sync(path.join(publicDir, "**/manifest.json"))[0];
  const favicon = glob.sync(path.join(publicDir, "**/favicon.*"))[0];
  const faviconDark = glob.sync(path.join(publicDir, "**/favicon-dark.*"))[0];
  const logo = glob.sync(path.join(publicDir, "**/logo.*"))[0];
  const darkLogo = glob.sync(path.join(publicDir, "**/logo-dark.*"))[0];
  const PROJECT_LOGO = logo ? path.relative(publicDir, logo) : DEFAULT_LOGO;

  return {
    BUILD_PWA: String(Boolean(manifest)),
    BASE_PATH: debug ? "/" : BASE_PATH || "/",
    STATIC_HTML_URLS: debug
      ? ""
      : config.htmlUrls === true
      ? "true" || undefined
      : "",
    PROJECT_NAME: config.name,
    FAVICON: favicon ? path.relative(publicDir, favicon) : "",
    FAVICON_DARK: faviconDark ? path.relative(publicDir, faviconDark) : "",
    PROJECT_LOGO,
    PROJECT_LOGO_DARK: darkLogo
      ? path.relative(publicDir, darkLogo)
      : PROJECT_LOGO || DEFAULT_LOGO,
    REPO_URL: getFullGitHubUrl(config.repo),
    PAGES_DIR,
    MDX_DATA_DIR,
    DOCS_URL: config.url,
    HAS_HOMEPAGE: getHasHomepage() ? "true" : undefined,
    TOP_LEVEL_SECTIONS: JSON.stringify(getTopLevelSections(config.order)),
    BLOG_POSTS: JSON.stringify(
      getBlogPosts().map((p) => path.relative(PAGES_DIR, p))
    ),
    PAGES: JSON.stringify(getPages().map((p) => path.relative(PAGES_DIR, p))),
  };
};
