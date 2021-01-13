import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useMDXComponents } from "@mdx-js/react";
import makeClass from "clsx";
import ago from "s-ago";

import getBlogPosts from "../utils/get-blog-posts";
import NavBarLayout from "../layouts/nav-bar";
import Avatar from "./avatar";
import { postFixHTML } from "../utils/format-path";

const posts = getBlogPosts();
const dateFormat = new Intl.DateTimeFormat("default", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

interface BlogIndexProps {
  /** The color of the header */
  color?: string;
}

export default ({ color = "primary" }: BlogIndexProps) => {
  const components = useMDXComponents();

  return (
    <NavBarLayout>
      <Head>
        <title>{process.env.PROJECT_NAME} Blog</title>
      </Head>

      <div className={`bg-${color}-600 flex items-center justify-center h-48`}>
        <components.h1 className="text-white" style={{ marginBottom: 0 }}>
          Blog
        </components.h1>
      </div>

      <ul
        className="px-4 mt-8 mb-12 lg:max-w-6xl lg:mx-auto w-full lg:mt-16"
        style={{
          display: "grid",
          gridGap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px,1fr))",
        }}
      >
        {posts.map((page) => (
          <li key={page.__resourcePath}>
            <Link href={postFixHTML(page.__resourcePath)}>
              <a
                className={makeClass(
                  "rounded border border-gray-500 py-8 px-10 flex items-center focus:outline-none focus-visible:ring",
                  "dark:bg-gray-900"
                )}
              >
                <Avatar email={page.email} className="-ml-4 mr-4" />

                <div>
                  <h2
                    className={makeClass(
                      "text-2xl font-medium text-gray-800 leading-relaxed mb-1",
                      "dark:text-gray-100"
                    )}
                  >
                    {page.title}
                  </h2>
                  {page.description && (
                    <p
                      className={makeClass(
                        "text-xl text-gray-800 mb-3 font-light",
                        "dark:text-gray-300"
                      )}
                    >
                      {page.description}
                    </p>
                  )}
                  <p>
                    {page.author && (
                      <span
                        className={makeClass(
                          "text-gray-800 text-lg font-light",
                          "dark:text-gray-400"
                        )}
                      >
                        {page.author}{" on "}
                      </span>
                    )}
                    <time
                      className="text-gray-600 dark:text-gray-500 font-light"
                      dateTime={page.date}
                    >
                      {page.author && " on "}
                      {dateFormat.format(new Date(page.date))}
                    </time>
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
