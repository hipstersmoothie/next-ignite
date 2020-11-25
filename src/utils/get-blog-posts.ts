import getFrontMatters from "./get-front-matters";
import { MarkdownPage } from "./types";

declare var BLOG_POSTS: string[];

/** Get all the blog posts in the project */
const getBlogPosts = () => {
  try {
    const frontMatters = getFrontMatters();

    return BLOG_POSTS.map((key) =>
      frontMatters.find((f) => f.__resourcePath === key)
    )
      .filter((post): post is MarkdownPage => Boolean(post))
      .map((post) => ({
        ...post,
        __resourcePath: post.__resourcePath.replace(/\.mdx$/, ""),
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    return [];
  }
};

export default getBlogPosts;
