import path from "path";

declare var PAGES_DIR: string;

export const getHasHomepage = () =>
  require.context(PAGES_DIR, false, /index\.(mdx|js|jsx|ts|tsx)$/).keys()
    .length > 0;

export const getTopLevelSections = () => {
  const requirePage = require.context(PAGES_DIR, true, /\.mdx$/);

  return Array.from(
    new Set(
      requirePage
        .keys()
        .map(key => path.relative("./", key).split("/")[0])
        // anything with a dot in it would be a file
        // we only care about directories
        .filter(key => !key.includes(".") && key !== "docs")
    )
  );
};
