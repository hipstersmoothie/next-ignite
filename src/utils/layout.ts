import path from "path";

declare var PAGES_DIR: string;
declare var SECTION_ORDER: string[];

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
        .filter(key => !key.includes("."))
        .sort((a, b) => {
          if (!SECTION_ORDER.includes(a) && !SECTION_ORDER.includes(b)) {
            return a.localeCompare(b);
          }

          if (!SECTION_ORDER.includes(a)) {
            return 1;
          }

          if (!SECTION_ORDER.includes(b)) {
            return -1;
          }

          return SECTION_ORDER.indexOf(a) - SECTION_ORDER.indexOf(b)
        })
    )
  );
};
