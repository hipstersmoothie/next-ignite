import { MarkdownPage } from "./types";

let requireFrontMatters;

try {
  requireFrontMatters = require.context(
    process.env.MDX_DATA_DIR,
    true,
    /\.json$/
  );
} catch (error) {}

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
