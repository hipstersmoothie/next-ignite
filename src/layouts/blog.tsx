import React from "react";
import makeClass from "clsx";
import Head from "next/head";
import { SkipNavContent } from "@reach/skip-nav";

import NavBarLayout from "./nav-bar";
import { BlogPost } from "../utils/types";
import Avatar from "../components/avatar";

const dateFormat = new Intl.DateTimeFormat("en-us", {
  year: "2-digit",
  month: "short",
  day: "numeric",
});

interface BlogPageFrontMatter extends BlogPost {
  /** Theme color for the home page */
  color?: string;
  /** Image to use instead of the color */
  image?: string;
}

/** A layout to render a basic home page */
const BlogLayout = ({
  children: content,
  frontMatter,
}: React.PropsWithChildren<{ frontMatter: BlogPageFrontMatter }>) => {
  const color = frontMatter.color || "primary";

  return (
    <NavBarLayout>
      <Head>
        <title>{frontMatter.title.replace(/\\`/g, "`")}</title>
      </Head>

      <SkipNavContent />
      {frontMatter.image ? (
        <div
          className={`bg-${color}-500 bg-cover bg-no-repeat bg-center h-screen`}
          style={{
            maxHeight: "30vh",
            minHeight: 315,
            backgroundImage: `url(${frontMatter.image})`,
          }}
        />
      ) : (
        <div className={`bg-${color}-600 h-48`} />
      )}

      <article
        className={makeClass(
          "DocSearch-content blog-post",
          "pt-6 pb-12 px-6 mx-4 rounded-xl -mt-10 mb-16 lg:mb-28 bg-white shadow-md text-gray-800",
          "lg:max-w-screen-md lg:mx-auto lg:w-full",
          "dark:bg-gray-900 border dark:border-gray-500"
        )}
      >
        <div className="mx-auto text-center flex flex-col items-center">
          <Avatar email={frontMatter.email} className="-mt-12 mb-4" />
          <h1
            className={makeClass(
              "lvl1 text-3xl font-light mb-2 lg:mb-4",
              "dark:text-gray-200"
            )}
          >
            {frontMatter.title}
          </h1>
          <p className="mb-6">
            <span className="dark:text-gray-300">{frontMatter.author}</span>{" "}
            <time className="text-gray-600 dark:text-gray-500" dateTime={frontMatter.date}>
              on {dateFormat.format(new Date(frontMatter.date))}
            </time>
          </p>
        </div>
        {content}
      </article>
    </NavBarLayout>
  );
};

export default BlogLayout;
