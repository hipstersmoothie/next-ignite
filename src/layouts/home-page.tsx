import React from "react";
import Link from "next/link";
import makeClass from "clsx";
import Head from "next/head";

import makeNavBarLayout from "./nav-bar";
import { Page } from "../utils/types";
import { formatPath } from "../utils/format-path";

declare var PROJECT_NAME: string;
const NavBarLayout = makeNavBarLayout();

interface HomePageFrontMatter extends Page {
  /** Theme color for the home page */
  color: string;
  /** Tagline for the homepage */
  tagline: string;
}

/** A layout to render a basic home page */
export default (frontMatter: HomePageFrontMatter) => ({
  children: content
}: React.PropsWithChildren<{}>) => {
  const color = frontMatter.color || "primary";

  return (
    <NavBarLayout>
      <Head>
        <title>{PROJECT_NAME}</title>
      </Head>
      <div
        className={makeClass(
          `bg-${color}-500 pt-20 pb-24`,
          `dark:bg-${color}-700`
        )}
      >
        <div className="max-w-screen-sm lg:max-w-screen-md mx-auto text-center text-white">
          <h1 className="text-6xl">{frontMatter.title || PROJECT_NAME}</h1>
          <h2
            className={makeClass(
              `text-2xl font-light text-${color}-100`,
              `dark:text-${color}-200`
            )}
          >
            {frontMatter.tagline}
          </h2>
        </div>
      </div>
      <div
        className={makeClass(
          "flex-1 pt-8 pb-32 px-6 max-w-screen-sm mx-auto",
          "lg:max-w-screen-md"
        )}
      >
        {content}
      </div>
      <div
        className={makeClass(
          "w-full flex items-center justify-center bg-gray-200 p-10 border-t-2 border-gray-300",
          "dark:bg-gray-800 dark:border-gray-700"
        )}
      >
        <Link href={formatPath("/docs")}>
          <a
            className={makeClass(
              `border-2 border-${color}-600 text-xl px-6 py-4 rounded text-${color}-700`,
              `focus:outline-none hover:text-white hover:bg-${color}-500 focus:text-white focus:bg-${color}-500`,
              `dark:border-${color}-400 dark:bg-${color}-200 dark-hover:bg-${color}-400`
            )}
          >
            Get Started
          </a>
        </Link>
      </div>
    </NavBarLayout>
  );
};
