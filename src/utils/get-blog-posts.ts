import path from "path";

import { formatPath } from "./format-path";
import { BlogPost } from "./types";

declare var BLOG_POSTS: string[];
declare var FRONT_MATTERS: BlogPost[];

/** Get all the blog posts in the project */
export default () => {
  try {
    return BLOG_POSTS.map((key) =>
      FRONT_MATTERS.find((f) => f.__resourcePath === key)
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
