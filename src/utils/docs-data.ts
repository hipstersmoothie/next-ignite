import fs from "fs";
import path from "path";
import glob from "fast-glob";

export const DOCS_DIR = path.resolve("./docs");
export const OUT_DIR = path.join(DOCS_DIR, "out");
export const PAGES_DIR = path.resolve("./docs/pages");
export const MDX_DATA_DIR = path.resolve("./docs/.mdx-data");

export const getPages = () => glob.sync(path.join(PAGES_DIR, "/**/*.mdx"));
export const getBlogPosts = () =>
  glob.sync(path.join(PAGES_DIR, "blog", "/**/*.mdx"));
export const getHasHomepage = () =>
  Boolean(glob.sync(path.join(PAGES_DIR, "index.+(mdx|js|jsx|ts|tsx)")).length);

export const getTopLevelSections = (order = ["docs", "blog"]) => {
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

export const getFrontMatters = () => {
  const frontMatters = glob.sync(path.join(MDX_DATA_DIR, "*.json"));

  return frontMatters.map((m) => {
    const data = JSON.parse(fs.readFileSync(m, "utf-8"));

    return {
      __resourcePath: data.__resourcePath,
      date: data.date,
      title: data.title,
      author: data.author,
      email: data.email,
    };
  });
};
