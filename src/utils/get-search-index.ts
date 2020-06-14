import { MarkdownPage } from "./types";

declare var MDX_DATA_DIR: string;

/** Get the search index */
export const getSearchIndex = () => {
  try {
    const requireSearchIndex = require.context(
      MDX_DATA_DIR,
      true,
      /search\.json$/
    );

    return requireSearchIndex
      .keys()
      .map(requireSearchIndex)
      .reduce<MarkdownPage[]>(
        (acc, item) => [...acc, ...(item as MarkdownPage[])],
        []
      );
  } catch (error) {
    return [];
  }
};
