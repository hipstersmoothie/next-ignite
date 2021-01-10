import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import parseGithubUrl from "parse-github-url";
import glob from "fast-glob";
import rehypePrism from "@mapbox/rehype-prism";
import autoLink from "rehype-autolink-headings";
import a11yEmoji from "rehype-accessible-emojis";
import slug from "rehype-slug";
import emoji from "remark-emoji";
import PurgeCSSPlugin from "purgecss-webpack-plugin";

import {
  getTopLevelSections,
  getHasHomepage,
  getPages,
  getBlogPosts,
  PAGES_DIR,
  MDX_DATA_DIR,
  DOCS_DIR,
} from "./utils/docs-data";
import { IgniteConfig } from "./utils/types";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

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

const getCreationDate = (file: string) => {
  try {
    return execSync(
      `git log --format=%aD ${path.join("docs/pages", file)} | tail -1`,
      {
        encoding: "utf8",
        stdio: ["pipe", "ignore", "ignore"],
      }
    );
  } catch (error) {
    return "";
  }
};

const getAuthor = (file: string) => {
  try {
    return execSync(
      `git log --format="%an || %ae" ${path.join(
        "docs/pages",
        file
      )} | tail -1`,
      {
        encoding: "utf8",
        stdio: ["pipe", "ignore", "ignore"],
      }
    ).split(" || ");
  } catch (error) {
    return ["", ""];
  }
};

const withMdxEnhanced = require("next-mdx-enhanced")({
  layoutPath: path.resolve(path.join(__dirname, "./layouts")),
  remarkPlugins: [emoji],
  rehypePlugins: [
    slug,
    [
      autoLink,
      {
        behavior: "wrap",
        properties: {
          className: 'header-link no-underline text-gray-900" hover:underline',
        },
      },
    ],
    a11yEmoji,
    [rehypePrism, { ignoreMissing: true }],
  ],
  extendFrontMatter: {
    process: (_, frontMatter) => {
      let { __resourcePath, date, layout, ...rest } = frontMatter;
      const creationDate = getCreationDate(__resourcePath);
      const [author, email] = getAuthor(__resourcePath);

      if (!layout) {
        const defaultLayout = __resourcePath.split("/")[0];

        if (__resourcePath === "index.mdx") {
          layout = "home-page";
        } else if (__resourcePath.includes("_sidebar.mdx")) {
          return {};
        } else if (
          fs.existsSync(path.join(__dirname, `layouts/${defaultLayout}.js`))
        ) {
          layout = defaultLayout;
        } else {
          layout = "docs";
        }
      }

      return {
        layout,
        date: date || creationDate,
        author: rest.author || author,
        email: rest.email || email,
      };
    },
    phase: "both",
  },
});

const publicDir = "./docs/public/";
const DEFAULT_LOGO = "https://hipstersmoothie.github.io/next-ignite/logo.svg";

// ignite config options
// url - the url your site is deployed to
// name - The name of the project you are documenting
// repo - The repo the documentation is for
// order - string array of top level section order
// htmlUrls - Add .html to the end of each URL
module.exports = (igniteConfig: IgniteConfig = {}) => (nextConfig = {}) => {
  const debug = process.env.NODE_ENV !== "production";
  const { pathname } = igniteConfig.url
    ? new URL(igniteConfig.url)
    : { pathname: "/" };
  const BASE_PATH = debug
    ? ""
    : pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
  const favicon = glob.sync(path.join(publicDir, "**/favicon.*"))[0];
  const faviconDark = glob.sync(path.join(publicDir, "**/favicon-dark.*"))[0];
  const logo = glob.sync(path.join(publicDir, "**/logo.*"))[0];
  const darkLogo = glob.sync(path.join(publicDir, "**/logo-dark.*"))[0];

  const env = {
    BASE_PATH: debug ? "/" : BASE_PATH || "/",
    STATIC_HTML_URLS: debug
      ? ""
      : igniteConfig.htmlUrls === true
      ? "true" || undefined
      : "",
    PROJECT_NAME: igniteConfig.name,
    FAVICON: favicon ? path.relative(publicDir, favicon) : "",
    FAVICON_DARK: faviconDark ? path.relative(publicDir, faviconDark) : "",
    PROJECT_LOGO: logo ? path.relative(publicDir, logo) : DEFAULT_LOGO,
    PROJECT_LOGO_DARK: darkLogo
      ? path.relative(publicDir, darkLogo)
      : DEFAULT_LOGO,
    REPO_URL: getFullGitHubUrl(igniteConfig.repo),
    PAGES_DIR,
    MDX_DATA_DIR,
    DOCS_URL: igniteConfig.url,
    HAS_HOMEPAGE: getHasHomepage() ? "true" : undefined,
    TOP_LEVEL_SECTIONS: JSON.stringify(getTopLevelSections(igniteConfig.order)),
    BLOG_POSTS: JSON.stringify(
      getBlogPosts().map((p) => path.relative(PAGES_DIR, p))
    ),
    PAGES: JSON.stringify(getPages().map((p) => path.relative(PAGES_DIR, p))),
  };

  process.env = {
    ...process.env,
    ...env,
  };

  return withBundleAnalyzer(
    withMdxEnhanced({
      ...nextConfig,
      basePath: BASE_PATH,
      publicRuntimeConfig: {
        assetPrefix: BASE_PATH,
      },
      env,
      webpack: (config, { webpack }) => {
        config.plugins.push(
          new PurgeCSSPlugin({
            paths: glob.sync([
              path.join(__dirname, "./components/*.js"),
              path.join(__dirname, "./layouts/*.js"),
              path.join(DOCS_DIR, "./**/*.{js,jsx,ts,tsx,mdx}"),
            ]),
            safelist: {
              standard: [/^.bg-/, /^.text-/],
              greedy: [/dark:bg-/, /dark:text-/],
            }
          })
        );

        return config;
      },
    })
  );
};
