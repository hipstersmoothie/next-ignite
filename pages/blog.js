import Link from "next/link";

import getBlogPosts from "../src/get-blog-posts";
import makeNavBarLayout from "../src/layouts/nav-bar";
import { Anchor } from "../components/anchor";

const NavBarLayout = makeNavBarLayout();
const posts = getBlogPosts();

export default () => (
  <NavBarLayout>
    <h1>Blog Posts</h1>

    <ul>
      {posts.map(page => (
        <li key={page.__resourcePath}>
          <Link href={page.__resourcePath}>
            <Anchor>{page.title}</Anchor>
          </Link>
        </li>
      ))}
    </ul>
  </NavBarLayout>
);
