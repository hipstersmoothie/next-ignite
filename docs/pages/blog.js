import Link from "next/link";
import { getBlogPosts, makeNavBarLayout, igniteComponents } from "ignite";

const NavBarLayout = makeNavBarLayout();
const posts = getBlogPosts();

export default () => (
  <NavBarLayout>
    <h1>Blog Posts</h1>

    <ul>
      {posts.map(page => (
        <li key={page.__resourcePath}>
          <Link href={page.__resourcePath}>
            <igniteComponents.a>{page.title}</igniteComponents.a>
          </Link>
        </li>
      ))}
    </ul>
  </NavBarLayout>
);
