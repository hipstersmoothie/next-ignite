import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import rehypePrism from "@mapbox/rehype-prism";
import autoLink from "rehype-autolink-headings";
import a11yEmoji from "rehype-accessible-emojis";
import slug from "rehype-slug";
import emoji from "remark-emoji";

import { getEnv } from "./utils/get-env";
import { IgniteConfig } from "./utils/types";
import { getAuthor } from "./utils/get-author";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

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
    process: (mdx: string, frontMatter) => {
      let { __resourcePath, date, layout, description, ...rest } = frontMatter;
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
          mdx.match(/---\n\n^([^#].+?)(?=^$)/sm) ||
          mdx.match(/\n\n^([^#].+?)(?=^$)/sm) ||
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

// ignite config options
// url - the url your site is deployed to
// name - The name of the project you are documenting
// repo - The repo the documentation is for
// order - string array of top level section order
// htmlUrls - Add .html to the end of each URL
module.exports = (igniteConfig: IgniteConfig = {}) => (nextConfig = {}) => {
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

  return withBundleAnalyzer(
    withMdxEnhanced({
      ...nextConfig,
      basePath,
      publicRuntimeConfig: {
        assetPrefix: basePath,
      },
      env: {
        ...env,
        browser: "true"
      },
    })
  );
};
