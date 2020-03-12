import Link from "next/link";
import makeNavBarLayout from "../layouts/nav-bar";

import { formatPath } from "../utils/format-path";
import { frontMatter as firstPost } from "../pages/blog/first.mdx";
import { frontMatter as secondPost } from "../pages/blog/second.mdx";
import { Anchor } from "../components/anchor";

const NavBarLayout = makeNavBarLayout();

const BlogPostList = () => {
  const blogPosts = [firstPost, secondPost];

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
