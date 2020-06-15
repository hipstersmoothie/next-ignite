const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const parseGithubUrl = require("parse-github-url");
const glob = require("fast-glob");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const rehypePrism = require("@mapbox/rehype-prism");
const autoLink = require("rehype-autolink-headings");
const a11yEmoji = require("rehype-accessible-emojis");
const slug = require("rehype-slug");

const emoji = require("remark-emoji");

const PAGES_DIR = path.resolve("./docs/pages");
const MDX_DATA_DIR = path.resolve("./docs/.mdx-data");
const pages = [];

const getFullGitHubUrl = (url) => {
  const repo = parseGithubUrl(url);

  if (repo.href.startsWith("http")) {
    return repo.href;
  }

  return `https://github.com/${repo.repo}`;
};

const getCreationDate = (file) =>
  execSync(`git log --format=%aD ${path.join("docs/pages", file)} | tail -1`, {
    encoding: "utf8",
  });

const getAuthor = (file) =>
  execSync(
    `git log --format="%an || %ae" ${path.join("docs/pages", file)} | tail -1`,
    {
      encoding: "utf8",
    }
  ).split(" || ");

const getHasHomepage = () =>
  Boolean(glob.sync(path.join(PAGES_DIR, "index.+(mdx|js|jsx|ts|tsx)")).length);

const getPages = () => glob.sync(path.join(PAGES_DIR, "/**/*.mdx"));
const getBlogPosts = () => glob.sync(path.join(PAGES_DIR, "blog", "/**/*.mdx"));

const getTopLevelSections = (order = ["docs", "blog"]) => {
  const requirePage = getPages();

  return Array.from(
    new Set(
      requirePage
        .map((key) => path.relative(PAGES_DIR, key))
        // anything with a dot in it would be a file
        // we only care about directories
        .filter((key) => key.includes("/"))
        .map((key) => key.split("/")[0])
        .sort((a, b) => {
          if (!order.includes(a) && !order.includes(b)) {
            return a.localeCompare(b);
          }

          if (!order.includes(a)) {
            return 1;
          }

          if (!order.includes(b)) {
            return -1;
          }

          return order.indexOf(a) - order.indexOf(b);
        })
    )
  );
};

const getFrontMatters = () => {
  const frontMatters = glob.sync(path.join(MDX_DATA_DIR, "*.json"));

  return frontMatters.map((m) => {
    const data = JSON.parse(fs.readFileSync(m));

    return {
      __resourcePath: data.__resourcePath,
      date: data.date,
      title: data.title,
      author: data.author,
      email: data.email,
    };
  });
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

// ignite config options
// basePath - the sub-path your site is deployed to
// name - The name of the project you are documenting
// repo - The repo the documentation is for
// order - string array of top level section order
module.exports = (igniteConfig = {}) => (nextConfig = {}) => {
  const debug = process.env.NODE_ENV !== "production";
  const BASE_PATH = debug ? "" : igniteConfig.basePath;
  const logo = glob.sync("./docs/public/logo.*")[0];
  const darkLogo = glob.sync("./docs/public/logo-dark.*")[0];

  return withBundleAnalyzer(
    withMdxEnhanced({
      ...nextConfig,
      experimental: {
        basePath: BASE_PATH,
      },
      publicRuntimeConfig: {
        assetPrefix: BASE_PATH,
      },
      webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, webpack }
      ) => {
        config.plugins.push(
          new webpack.DefinePlugin({
            BASE_PATH: JSON.stringify(BASE_PATH),
            PROJECT_NAME: JSON.stringify(igniteConfig.name),
            PROJECT_LOGO: JSON.stringify(
              logo ? path.basename(logo) : "logo.svg"
            ),
            PROJECT_LOGO_DARK: JSON.stringify(
              darkLogo ? path.basename(darkLogo) : "logo.svg"
            ),
            REPO_URL: JSON.stringify(getFullGitHubUrl(igniteConfig.repo)),
            PAGES_DIR: JSON.stringify(PAGES_DIR),
            PAGES: JSON.stringify(
              getPages().map((p) => path.relative(PAGES_DIR, p))
            ),
            BLOG_POSTS: JSON.stringify(
              getBlogPosts().map((p) => path.relative(PAGES_DIR, p))
            ),
            MDX_DATA_DIR: JSON.stringify(MDX_DATA_DIR),
            HAS_HOMEPAGE: JSON.stringify(getHasHomepage()),
            TOP_LEVEL_SECTIONS: JSON.stringify(
              getTopLevelSections(igniteConfig.order)
            ),
          })
        );

        // Don't clobber previous plugins' webpack functions
        if (typeof nextConfig.webpack === "function") {
          return nextConfig.webpack(config, options);
        }

        return config;
      },
    })
  );
};
