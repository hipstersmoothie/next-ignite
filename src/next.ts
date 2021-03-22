import { IShikiTheme } from "shiki";
import fs from "fs";
import path from "path";

import { execSync } from "child_process";
import autoLink from "rehype-autolink-headings";
import a11yEmoji from "rehype-accessible-emojis";
import shiki from "rehype-shiki-reloaded";
import slug from "rehype-slug";
import emoji from "remark-emoji";
import withPWA from "next-pwa";

import { getEnv } from "./utils/get-env";
import { IgniteConfig } from "./utils/types";
import { getAuthor } from "./utils/get-author";
import { DOCS_DIR } from "./utils/docs-data";
import mdxEnhanced from "next-mdx-enhanced";
import { createAdditionalManifestAssets } from "./utils/create-additional-manifest-asset";

const cachingStrategy = require("next-pwa/cache");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const getCreationDate = (file: string) => {
  try {
    return execSync(
      `git log --diff-filter=A --follow --format=%aD -- ${path.join(
        "docs/pages",
        file
      )} | tail -1`,
      {
        encoding: "utf8",
        stdio: ["pipe", "ignore", "ignore"],
      }
    );
  } catch (error) {
    return "";
  }
};

const resolveTheme = (theme: string | IShikiTheme, defaultTheme: string) => {
  return theme
    ? typeof theme === "string" && fs.existsSync(theme)
      ? path.resolve(theme)
      : theme
    : defaultTheme;
};

// ignite config options
// url - the url your site is deployed to
// name - The name of the project you are documenting
// repo - The repo the documentation is for
// order - string array of top level section order
// htmlUrls - Add .html to the end of each URL
export default (igniteConfig: IgniteConfig = {}) => (nextConfig = {}) => {
  const debug = process.env.NODE_ENV !== "production";
  const env = getEnv(igniteConfig);
  const basePath = debug
    ? ""
    : env.BASE_PATH !== "/"
    ? env.BASE_PATH
    : undefined;

  process.env = {
    ...process.env,
    ...env,
  };

  const withMdxEnhanced = mdxEnhanced({
    layoutPath: path.resolve(path.join(__dirname, "./layouts")),
    remarkPlugins: [emoji, ...(igniteConfig.remarkPlugins || [])],
    rehypePlugins: [
      slug,
      [
        autoLink,
        {
          behavior: "wrap",
          properties: {
            className:
              'header-link no-underline text-gray-900" hover:underline',
          },
        },
      ],
      a11yEmoji,
      [
        shiki,
        {
          theme: resolveTheme(igniteConfig.lightSyntaxTheme, "github-light"),
          darkTheme: resolveTheme(igniteConfig.darkSyntaxTheme, "github-dark"),
          langs: [
            {
              id: "mdx",
              scopeName: "text.html.markdown.jsx",
              path: path.join(__dirname, "./utils/mdx-lang.json"),
            },
          ],
        },
      ],
      ...(igniteConfig.rehypePlugins || []),
    ],
    extendFrontMatter: {
      process: (mdx: string, frontMatter) => {
        let {
          __resourcePath,
          date,
          layout,
          description,
          ...rest
        } = frontMatter;
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

        if (!description && layout === "blog") {
          const [, firstParagraph] =
            mdx.match(/---\n\n^([^#].+?)(?=^$)/ms) ||
            mdx.match(/\n\n^([^#].+?)(?=^$)/ms) ||
            [];

          if (firstParagraph) {
            description = firstParagraph;
          }
        }

        return {
          layout,
          description,
          date: date || creationDate,
          author: rest.author || author,
          email: rest.email || email,
        };
      },
      phase: "both",
    },
  });

  const config = withBundleAnalyzer(
    withMdxEnhanced({
      ...nextConfig,
      basePath,
      publicRuntimeConfig: {
        assetPrefix: basePath,
      },
      env: {
        ...env,
        browser: "true",
      },
    })
  );

  config.ignite = igniteConfig;

  if (env.BUILD_PWA === "true") {
    cachingStrategy[0] = {
      ...cachingStrategy[0],
      urlPattern: env.BASE_PATH,
    };

    return withPWA({
      ...config,
      pwa: {
        disable: process.env.NODE_ENV !== "production",
        subdomainPrefix: env.BASE_PATH,
        runtimeCaching: cachingStrategy,
        additionalManifestEntries: [
          ...createAdditionalManifestAssets(
            path.join(DOCS_DIR, "public", "**/*"),
            env.BASE_PATH
          ),
          { url: "replace-me", revision: "replace-me" },
        ],
      },
    });
  }

  return config;
};
