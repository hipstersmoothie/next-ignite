import React from "react";
import Link from "next/link";
import makeClass from "clsx";
import Head from "next/head";

import NavBarLayout from "./nav-bar";
import { Page } from "../utils/types";
import { postFixHTML } from "../utils/format-path";

interface HomePageFrontMatter extends Page {
  /** Theme color for the home page */
  color: string;
  /** Tagline for the homepage */
  tagline: string;
  /** CTA for the homepage */
  cta: string;
}

/** A layout to render a basic home page */
const HomePageLayout = ({
  children: content,
  frontMatter,
}: React.PropsWithChildren<{ frontMatter: HomePageFrontMatter }>) => {
  const color = frontMatter.color || "primary";

  return (
    <NavBarLayout>
      <Head>
        <title>{process.env.PROJECT_NAME}</title>
      </Head>
      <div
        className={makeClass(
          `bg-${color}-500 pt-16 pb-16`,
          `dark:bg-${color}-700`
        )}
      >
        <div className="max-w-screen-sm lg:max-w-screen-md mx-auto text-center text-white">
          <h1 className="text-6xl">{frontMatter.title || process.env.PROJECT_NAME}</h1>
          <h2
            className={makeClass(
              `text-2xl font-light text-${color}-100`,
              `dark:text-${color}-200`
            )}
          >
            {frontMatter.tagline}
          </h2>
          <Link href={postFixHTML("/docs")}>
            <a
              className={makeClass(
                `px-6 py-4 rounded text-${color}-700 font-medium bg-white inline-flex my-12`,
                `focus:outline-none, hover:shadow-xl`
              )}
            >
              {frontMatter.cta || "Get started"}
            </a>
          </Link>
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
    </NavBarLayout>
  );
};

export default HomePageLayout;
