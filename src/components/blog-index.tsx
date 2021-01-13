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

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

const posts = getBlogPosts();
const dateFormat = new Intl.DateTimeFormat("default", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

const SmallCard = ({ page }) => {
  const components = useMDXComponents();

  return (
    <div
      className={makeClass(
        "h-full rounded-xl overflow-hidden border border-gray-400 flex flex-col",
        "focus:outline-none focus-visible:ring",
        "dark:border-gray-600"
      )}
    >
      <div className={"h-full py-8 px-10 flex items-start"}>
        <div className="self-stretch  flex flex-col justify-between">
          <div className="flex-1 relative flex flex-col">
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
                  "text-xl text-gray-800 mb-3 font-light leading-8 overflow-hidden flex-1 max-h-24",
                  "dark:text-gray-300"
                )}
                style={{ minHeight: "3rem" }}
              >
                <Markdown
                  style={{ margin: 0 }}
                  options={{
                    overrides: {
                      ...components,
                      code: components.inlineCode,
                    } as any,
                  }}
                >
                  {page.description}
                </Markdown>
                <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-white dark:from-gray-1000" />
              </p>
            )}
          </div>

          <div
            className={makeClass(
              "text-gray-800 text-lg font-light flex items-center mt-6",
              "dark:text-gray-400"
            )}
          >
            {page.email && (
              <Avatar email={page.email} className="mr-3" width="w-10" />
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
  const components = useMDXComponents();

  return (
    <a
      className={makeClass(
        "rounded-xl overflow-hidden border border-gray-400 flex flex-col relative h-96",
        "focus:outline-none focus-visible:ring",
        "dark:border-gray-600"
      )}
      style={{
        backgroundImage: `url(${page.image})`,
      }}
    >
      <div className="absolute inset-0 h-full bg-gradient-to-t from-gray-1000 via-gray-800 to-transparent opacity-75" />

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
              <p
                className="blog-description text-xl text-gray-300 text-white font-light leading-8 overflow-hidden max-h-24"
                style={{ color: "white" }}
              >
                <Markdown
                  style={{ margin: 0 }}
                  options={{
                    overrides: {
                      ...components,
                      code: components.inlineCode,
                    } as any,
                  }}
                >
                  {page.description}
                </Markdown>
              </p>
            )}
          </div>

          <div className="text-gray-200 dark:text-gray-400 text-lg font-light flex items-center mt-6">
            {page.email && (
              <Avatar email={page.email} className="mr-3" width="w-10" />
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
    </a>
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

      <div className={`bg-${color}-300 dark:bg-${color}-600 flex items-center justify-center h-48`}>
        <components.h1 className="text-white" style={{ marginBottom: 0 }}>
          Blog
        </components.h1>
      </div>

      <ul
        className={makeClass(
          "px-4 mt-8 mb-12 w-full grid gap-6",
          "md:grid-cols-2 lg:grid-cols-3",
          "lg:max-w-6xl lg:mx-auto lg:mt-16"
        )}
        style={
          {
            // gridTemplateColumns: "repeat(auto-fit, minmax(350px,1fr))",
          }
        }
      >
        {shuffleArray(posts).map((page, index) => {
          const isBigCard = page.image && index === 0;

          return (
            <li
              key={page.__resourcePath}
              className={makeClass(
                isBigCard && "md:row-span-2",
                isBigCard && page.image && "md:col-span-3"
              )}
            >
              <Link href={postFixHTML(page.__resourcePath)}>
                <a className="h-full w-full">
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
