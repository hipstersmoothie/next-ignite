import getFrontMatters from "./get-front-matters";
import { BlogPost } from "./types";

/** Get all the blog posts in the project */
const getBlogPosts = () => {
  try {
    const frontMatters = getFrontMatters();

    return (JSON.parse(process.env.BLOG_POSTS) as string[])
      .map((key) => frontMatters.find((f) => f.__resourcePath === key))
      .filter((post): post is BlogPost => Boolean(post))
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
