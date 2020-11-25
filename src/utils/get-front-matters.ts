import { MarkdownPage } from "./types";

declare var MDX_DATA_DIR: string;
const requireFrontMatters = require.context(MDX_DATA_DIR, true, /\.json$/);

/** Get all the blog posts in the project */
const getFrontMatters = () => {
  try {
    return requireFrontMatters
      .keys()
      .map(requireFrontMatters) as MarkdownPage[];
  } catch (error) {
    return [];
  }
};

export default getFrontMatters;