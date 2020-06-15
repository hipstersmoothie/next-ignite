import path from "path";

import { formatPath } from "./format-path";
import getFrontMatters from "./get-front-matters";

declare var BLOG_POSTS: string[];

/** Get all the blog posts in the project */
export default () => {
  try {
    const frontMatters = getFrontMatters();

    return BLOG_POSTS.map((key) =>
      frontMatters.find((f) => f.__resourcePath === path.join("blog", key))
    ).map((post) => ({
      ...post,
      __resourcePath: formatPath(post.__resourcePath),
    }));
  } catch (error) {
    return [];
  }
};
