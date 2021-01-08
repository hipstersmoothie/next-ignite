import { MarkdownPage } from "./types";

let frontMatters: MarkdownPage[] = [];

try {
  const context = require.context(process.env.MDX_DATA_DIR, true, /\.json$/);
  frontMatters = context.keys().map(context) as MarkdownPage[];
} catch (error) {
}

/** Get all the blog posts in the project */
const getFrontMatters = () => {
  try {
    return frontMatters;
  } catch (error) {
    return [];
  }
};

export default getFrontMatters;
