import Link from "next/link";
import path from "path";

import makeNavBarLayout from "../layouts/nav-bar";
import { formatPath } from "../utils/format-path";
import { Anchor } from "../components/anchor";

const NavBarLayout = makeNavBarLayout();
const posts = require.context("../pages/blog/", true, /\.mdx$/).keys();
const requireFrontMatters = require.context("../.mdx-data", true, /\.json$/);
const frontMatters = requireFrontMatters.keys().map(requireFrontMatters);

const BlogPostList = () => {
  const blogPosts = posts
    .map(key => path.relative("./", key))
    .map(key =>
      frontMatters.find(f => f.__resourcePath === path.join("blog", key))
    );

  return (
    <NavBarLayout>
      <h1>Blog Posts</h1>
      <ul>
        {blogPosts.map(page => (
          <li key={page.__resourcePath}>
            <Link href={formatPath(page.__resourcePath)}>
              <Anchor>{page.title}</Anchor>
            </Link>
          </li>
        ))}
      </ul>
    </NavBarLayout>
  );
};

export default BlogPostList;
