import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useMDXComponents } from "@mdx-js/react";
import makeClass from "clsx";
import Markdown from "markdown-to-jsx";

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

const MarkdownPreview = ({ page }) => {
  const components = useMDXComponents();

  return (
    <Markdown
      className="blog-description"
      options={{
        overrides: {
          ...components,
          code: components.inlineCode,
        } as any,
      }}
    >
      {page.description}
    </Markdown>
  );
};

const SmallCard = ({ page }) => {
  return (
    <div
      className={makeClass(
        "small-blog-card h-full rounded-xl overflow-hidden border shadow-md flex flex-col",
        "hover:bg-gray-100",
        "dark:border-gray-600 dark:hover:bg-gray-900"
      )}
    >
      <div className={"h-full py-8 px-10 flex items-start"}>
        <div className="self-stretch  flex flex-col justify-between">
          <div className="flex-1 relative flex flex-col  max-h-48">
            <h2
              className={makeClass(
                "text-2xl font-medium text-gray-800 leading-relaxed mb-1",
                "dark:text-gray-100"
              )}
            >
              {page.title}
            </h2>
            {page.description && (
              <div
                className={makeClass(
                  "text-xl text-gray-800 font-light leading-8 overflow-hidden flex-1",
                  "dark:text-gray-300"
                )}
                style={{ minHeight: "3rem" }}
              >
                <MarkdownPreview page={page} />
                <div className="content-fade absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-white dark:from-gray-1000" />
              </div>
            )}
          </div>

          <div
            className={makeClass(
              "text-gray-800 text-lg font-light flex items-center mt-6",
              "dark:text-gray-400"
            )}
          >
            {page.email && (
              <Avatar email={page.email} className="mr-3" size={10} />
            )}

            <div className="flex flex-col">
              {page.author && <div className="font-medium">{page.author}</div>}
              <span className="text-gray-600 dark:text-gray-500 font-light text-sm mb-1">
                <time dateTime={page.date}>
                  {dateFormat.format(new Date(page.date))}
                </time>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BigCard = ({ page }) => {
  return (
    <div
      className={makeClass(
        "big-blog-card rounded-xl overflow-hidden border shadow-md flex flex-col relative h-96",
        "dark:border-gray-600"
      )}
      style={{
        backgroundImage: `url(${page.image})`,
      }}
    >
      <div className="content-fade absolute inset-0 h-full bg-gradient-to-t from-gray-1000 via-gray-800 to-transparent opacity-75" />

      <div className={"h-full py-8 px-10 flex items-start z-10"}>
        <div className="self-stretch  flex flex-col justify-between">
          <div
            className="flex-1 flex flex-col justify-end relative"
            style={{ minHeight: "6rem" }}
          >
            <h2
              className={makeClass(
                "text-2xl font-medium text-gray-100 leading-relaxed mb-3",
                "lg:text-4xl"
              )}
            >
              {page.title}
            </h2>

            {page.description && (
              <div className="text-xl text-gray-300 text-white font-light leading-8 overflow-hidden max-h-24">
                <MarkdownPreview page={page} />
              </div>
            )}
          </div>

          <div className="text-gray-200 text-lg font-light flex items-center mt-6">
            {page.email && (
              <Avatar email={page.email} className="mr-3" size={10} />
            )}

            <div className="flex flex-col">
              {page.author && <div className="font-medium">{page.author}</div>}
              <span className="text-gray-400 font-light text-sm mb-1">
                <time dateTime={page.date}>
                  {dateFormat.format(new Date(page.date))}
                </time>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
        className={makeClass(
          "px-4 mt-8 mb-12 lg:mb-20 w-full grid gap-6",
          posts.length >= 2 && "md:grid-cols-2",
          posts.length >= 3 && "lg:grid-cols-3",
          "lg:max-w-6xl lg:mx-auto lg:mt-16"
        )}
      >
        {posts.map((page, index) => {
          const isBigCard = page.image && index === 0;

          return (
            <li
              key={page.__resourcePath}
              className={makeClass(
                isBigCard && "md:row-span-2",
                isBigCard && page.image && "md:col-span-3"
              )}
            >
              <Link passHref href={postFixHTML(page.__resourcePath)}>
                <a className="h-full w-full focus:outline-none focus-visible:ring block rounded-xl">
                  {isBigCard ? (
                    <BigCard page={page} />
                  ) : (
                    <SmallCard page={page} />
                  )}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </NavBarLayout>
  );
};
