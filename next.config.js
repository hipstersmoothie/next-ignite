const fs = require("fs");

const isProduction = process.env.NODE_ENV === "production";
const pages = [];

if (isProduction) {
  fs.writeFileSync("search.json", JSON.stringify([]));
}
\
const withMdxEnhanced = require("next-mdx-enhanced")({
  onContent: page => {
    if (isProduction) {
      pages.push(page);
      fs.writeFileSync("search.json", JSON.stringify(pages));
    }
  }
});

module.exports = withMdxEnhanced({});
