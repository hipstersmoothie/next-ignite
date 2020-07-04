import React from "react";
import makeClass from "clsx";
import Head from "next/head";

import makeNavBarLayout from "./nav-bar";
import { BlogPost } from "../utils/types";
import Avatar from "../components/avatar";

const NavBarLayout = makeNavBarLayout();
const dateFormat = new Intl.DateTimeFormat("en-us", {
  year: "2-digit",
  month: "numeric",
  day: "numeric",
});

interface BlogPageFrontMatter extends BlogPost {
  /** Theme color for the home page */
  color?: string;
  /** Image to use instead of the color */
  image?: string;
}

/** A layout to render a basic home page */
export default (frontMatter: BlogPageFrontMatter) => ({
  children: content,
}: React.PropsWithChildren<{}>) => {
  const color = frontMatter.color || "primary";

  return (
    <NavBarLayout>
      <Head>
        <title>{frontMatter.title.replace(/\\`/g, "`")}</title>
      </Head>

      {frontMatter.image ? (
        <div
          className={`bg-${color}-500 bg-cover bg-no-repeat bg-center h-screen`}
          style={{
            maxHeight: "30vh",
            minHeight: 315,
            backgroundImage: `url(${frontMatter.image})`
          }}
        />
      ) : (
        <div className={`bg-${color}-500 pt-20 pb-24`} />
      )}
      
      <article
        className={makeClass(
          "DocSearch-content blog-post",
          "pt-6 pb-12 px-6 w-full max-w-screen-sm mx-auto rounded -mt-10 bg-white shadow-md text-gray-800",
          "lg:max-w-screen-md",
          "dark:bg-gray-900"
        )}
      >
        <div className="max-w-screen-sm lg:max-w-screen-md mx-auto text-center flex flex-col items-center">
          <Avatar email={frontMatter.email} className="-mt-12 mb-4" />
          <h1
            className={makeClass(
              "text-3xl font-light mb-4",
              "dark:text-gray-200"
            )}
          >
            {frontMatter.title}
          </h1>
          <p className="mb-6">
            <span className="dark:text-gray-300">{frontMatter.author}</span>{" "}
            <span className="text-gray-600">
              on {dateFormat.format(new Date(frontMatter.date))}
            </span>
          </p>
        </div>
        {content}
      </article>
    </NavBarLayout>
  );
};
