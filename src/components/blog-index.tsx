import React from "react";
import Link from "next/link";
import { useMDXComponents } from "@mdx-js/react";
import makeClass from "clsx";

import getBlogPosts from "../utils/get-blog-posts";
import makeNavBarLayout from "../layouts/nav-bar";
import Avatar from "./avatar";

const NavBarLayout = makeNavBarLayout();
const posts = getBlogPosts();
const dateFormat = new Intl.DateTimeFormat("default", {
  hour: "numeric",
  minute: "numeric",
  year: "2-digit",
  month: "numeric",
  day: "numeric"
});

interface BlogIndexProps {
  /** The color of the header */
  color?: string;
}

export default ({ color = "blue" }: BlogIndexProps) => {
  const components = useMDXComponents();

  return (
    <NavBarLayout>
      <div className={`bg-${color}-600 flex items-center justify-center p-16`}>
        <components.h1 className="text-white">Blog</components.h1>
      </div>

      <ul
        className="px-4 mt-8 mb-12 lg:max-w-screen-xl lg:mx-auto w-full lg:mt-16"
        style={{
          display: "grid",
          gridGap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px,1fr))"
        }}
      >
        {posts.map(page => (
          <li key={page.__resourcePath}>
            <Link href={page.__resourcePath}>
              <a className={makeClass("rounded border border-gray-300 py-8 px-10 flex items-center", "dark:bg-gray-900")}>
                <Avatar email={page.email} className="-ml-4 mr-4" />

                <div>
                  <h2
                    className={makeClass(
                      "text-2xl font-medium text-gray-800 leading-relaxed",
                      "dark:text-gray-300"
                    )}
                  >
                    {page.title}
                  </h2>
                  <p className={makeClass("text-gray-800 text-lg font-light", "dark:text-gray-400")}>
                    {page.author}
                  </p>
                  <p className="text-gray-600 text-sm font-light">
                    {dateFormat.format(new Date(page.date))}
                  </p>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </NavBarLayout>
  );
};
