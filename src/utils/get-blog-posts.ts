import path from "path";

import { formatPath } from "./format-path";
import getFrontMatters from "./get-front-matters";

declare var BLOG_POSTS: string[];

/** Get all the blog posts in the project */
export default () => {
  try {
    const frontMatters = getFrontMatters();

    return BLOG_POSTS.map((key) =>
      frontMatters.find((f) => f.__resourcePath === key)
    )
      .map((post) => ({
        ...post,
        __resourcePath: formatPath(post.__resourcePath),
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    return [];
  }
};
