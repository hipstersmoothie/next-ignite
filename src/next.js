const fs = require("fs");
const path = require("path");
const rehypePrism = require("@mapbox/rehype-prism");
const emoji = require("remark-emoji");
const a11yEmoji = require("rehype-accessible-emojis");
const { execSync } = require("child_process");

const isProduction = process.env.NODE_ENV === "production";
const pages = [];

if (isProduction) {
  fs.writeFileSync("search.json", JSON.stringify([]));
}

const getCreationDate = (file) =>
  execSync(`git log --format=%aD ${path.join("docs/pages", file)} | tail -1`, {
    encoding: "utf8"
  });

const withMdxEnhanced = require("next-mdx-enhanced")({
  layoutPath: path.resolve("./dist/esm/layouts"),
  remarkPlugins: [emoji],
  rehypePlugins: [a11yEmoji, [rehypePrism, { ignoreMissing: true }]],
  onContent: page => {
    if (isProduction) {
      pages.push(page);
      fs.writeFileSync("search.json", JSON.stringify(pages));
    }
  },
  extendFrontMatter: {
    process: (_, frontMatter) => {
      let { __resourcePath, date, layout } = frontMatter;
      const creationDate = getCreationDate(__resourcePath);

      
      if (!layout) {
        const defaultLayout = __resourcePath.split("/")[0];
        console.log({defaultLayout},  path.join(__dirname, `layouts/${defaultLayout}.js`), fs.existsSync(
          path.join(__dirname, `layouts/${defaultLayout}.js`)
        ))

        if (__resourcePath === "index.mdx") {
          layout = "home-page";
        } else if (__resourcePath.includes("_sidebar.mdx")) {
          return {};
        } else if (
          fs.existsSync(
            path.join(__dirname, `layouts/${defaultLayout}.js`)
          )
        ) {
          layout = defaultLayout;
        } else {
          layout = "docs";
        }
      }

      return {
        layout, 
        date: date || creationDate
      }
    },
    phase: "both"
  }
});

module.exports = (nextConfig = {}) =>
  withMdxEnhanced({
    ...nextConfig,
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.plugins.push(
        new webpack.DefinePlugin({
          PROJECT_NAME: JSON.stringify("ignite"),
          PAGES_DIR: JSON.stringify(path.resolve("./docs/pages")),
          MDX_DATA_DIR: JSON.stringify(path.resolve("./docs/.mdx-data"))
        })
      );

      // Don't clobber previous plugins' webpack functions
      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    }
  });
