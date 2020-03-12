import path from "path";

import { formatPath } from "./format-path";

const posts = require.context(PAGES_DIR + "/blog/", true, /\.mdx$/).keys();
const requireFrontMatters = require.context(MDX_DATA_DIR, true, /\.json$/);
const frontMatters = requireFrontMatters.keys().map(requireFrontMatters);
const blogPosts = posts
  .map(key => path.relative("./", key))
  .map(key =>
    frontMatters.find(f => f.__resourcePath === path.join("blog", key))
  )
  .map(post => ({ ...post, __resourcePath: formatPath(post.__resourcePath) }));

/** Get all the blog posts in the project */
export default () => blogPosts;
