import Link from "next/link";
import { getBlogPosts, makeNavBarLayout } from "ignite";
import { useMDXComponents } from "@mdx-js/react";

const NavBarLayout = makeNavBarLayout();
const posts = getBlogPosts();

export default () => {
  const components = useMDXComponents();

  return (
    <NavBarLayout>
      <components.h1>Blog Posts</components.h1>

      <components.ul>
        {posts.map(page => (
          <li key={page.__resourcePath}>
            <Link href={page.__resourcePath}>
              <components.a>{page.title}</components.a>
            </Link>
          </li>
        ))}
      </components.ul>
    </NavBarLayout>
  );
};
