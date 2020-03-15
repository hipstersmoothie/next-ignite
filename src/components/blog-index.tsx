import React from "react";
import Link from "next/link";
import { useMDXComponents } from "@mdx-js/react";
import gravatar from "gravatar";

import getBlogPosts from "../utils/get-blog-posts";
import makeNavBarLayout from "../layouts/nav-bar";

const NavBarLayout = makeNavBarLayout();
const posts = getBlogPosts();
const dateFormat = new Intl.DateTimeFormat("default", {
  hour: "numeric",
  minute: "numeric",
  year: '2-digit',
  month: 'numeric',
  day: 'numeric'
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

      <ul className="px-4 mt-8 mb-12 lg:flex lg:flex-col lg:flex-row lg:flex-wrap lg:max-w-screen-xl lg:mx-auto w-full justify-center">
        {posts.map(page => (
          <li key={page.__resourcePath} className="my-4 lg:w-1/3">
            <Link href={page.__resourcePath}>
              <a className="rounded border border-gray-300 py-8 px-10 flex items-center lg:mr-8">
                {page.email && (
                  <img
                    src={gravatar.url(page.email)}
                    className="rounded-full w-12 -ml-4 mr-4 border-2 border-gray-200"
                  />
                )}

                <div>
                  <h2 className="text-2xl font-medium text-gray-800 leading-relaxed">
                    {page.title}
                  </h2>
                  <p className="text-gray-800 text-lg font-light">
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
