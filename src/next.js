const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const parseGithubUrl = require("parse-github-url");
const glob = require('fast-glob');

const rehypePrism = require("@mapbox/rehype-prism");
const autoLink = require("rehype-autolink-headings");
const a11yEmoji = require("rehype-accessible-emojis");
const slug = require("rehype-slug");

const emoji = require("remark-emoji");

const isProduction = process.env.NODE_ENV === "production";
const pages = [];

if (isProduction) {
  fs.writeFileSync("search.json", JSON.stringify([]));
}

const getFullGitHubUrl = url => {
  const repo = parseGithubUrl(url);

  if (repo.href.startsWith("http")) {
    return repo.href;
  }

  return `https://github.com/${repo.repo}`;
};

const getCreationDate = file =>
  execSync(`git log --format=%aD ${path.join("docs/pages", file)} | tail -1`, {
    encoding: "utf8"
  });

const getAuthor = file =>
  execSync(
    `git log --format="%an || %ae" ${path.join("docs/pages", file)} | tail -1`,
    {
      encoding: "utf8"
    }
  ).split(" || ");

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
          className: 'header-link no-underline text-gray-900" hover:underline'
        }
      }
    ],
    a11yEmoji,
    [rehypePrism, { ignoreMissing: true }]
  ],
  onContent: page => {
    if (isProduction) {
      pages.push(page);
      fs.writeFileSync("search.json", JSON.stringify(pages));
    }
  },
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
        email: rest.email || email
      };
    },
    phase: "both"
  }
});

// ignite config options
// basePath - the sub-path your site is deployed to
// name - The name of the project you are documenting
// repo - The repo the documentation is for
// order - string array of top level section order
module.exports = (igniteConfig = {}) => (nextConfig = {}) => {
  const debug = process.env.NODE_ENV !== "production";
  const BASE_PATH = debug ? "" : igniteConfig.basePath;
  const logo = glob.sync('./docs/public/logo.*')[0]

  return withMdxEnhanced({
    ...nextConfig,
    experimental: {
      basePath: BASE_PATH
    },
    publicRuntimeConfig: {
      assetPrefix: BASE_PATH
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.plugins.push(
        new webpack.DefinePlugin({
          BASE_PATH: JSON.stringify(BASE_PATH),
          PROJECT_NAME: JSON.stringify(igniteConfig.name),
          PROJECT_LOGO: JSON.stringify(logo? path.basename(logo): 'logo.svg'),
          REPO_URL: JSON.stringify(getFullGitHubUrl(igniteConfig.repo)),
          PAGES_DIR: JSON.stringify(path.resolve("./docs/pages")),
          MDX_DATA_DIR: JSON.stringify(path.resolve("./docs/.mdx-data")),
          SECTION_ORDER: JSON.stringify(igniteConfig.order || ['docs', 'blog']),
        })
      );

      // Don't clobber previous plugins' webpack functions
      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    }
  });
};
