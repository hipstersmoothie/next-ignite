import path from "path";

import { formatPath } from "./format-path";
import { Resource } from "./types";

interface BlogPost extends Resource {
  title: string;
  author: string;
}

declare var PAGES_DIR: string;
declare var MDX_DATA_DIR: string;

const posts = require.context(PAGES_DIR + "/blog/", true, /\.mdx$/).keys();
const requireFrontMatters = require.context(MDX_DATA_DIR, true, /\.json$/);
const frontMatters = requireFrontMatters
  .keys()
  .map(requireFrontMatters) as BlogPost[];
const blogPosts = posts
  .map(key => path.relative("./", key))
  .map(key =>
    frontMatters.find(f => f.__resourcePath === path.join("blog", key))
  )
  .map(post => ({ ...post, __resourcePath: formatPath(post.__resourcePath) }));

/** Get all the blog posts in the project */
export default () => blogPosts;
