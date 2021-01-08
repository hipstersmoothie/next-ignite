import React from "react";
import path from "path";
import { useMDXComponents, MDXProviderComponents } from "@mdx-js/react";
import makeClass from "clsx";

import { Sidebar } from "../components/sidebar";
import NavBarLayout from "./nav-bar";
import { Page } from "../utils/types";
import getFrontMatters from "../utils/get-front-matters";

const CONTENT_AREA =
  "pt-8 pb-32 px-4 lg:mx-auto max-w-full md:max-w-screen-sm lg:max-w-screen-md";
const CODE_BLOCK_REGEX = /([^`]*)`([^`]*)`(.*)/m;

function constructTitleFromMarkdown(
  components: MDXProviderComponents,
  str: string
) {
  if (!str) {
    return;
  }

  const children = [];
  let rest = str.replace(/\\`/g, "`");

  while (CODE_BLOCK_REGEX.test(rest)) {
    const [, before, inCodeBlock, after] = rest.match(CODE_BLOCK_REGEX);

    children.push(before);
    children.push(<components.inlineCode>{inCodeBlock}</components.inlineCode>);
    rest = after;
  }

  children.push(rest);

  return <div>{children}</div>;
}

const DocsLayout = ({
  children: content,
  frontMatter,
}: React.PropsWithChildren<{ frontMatter: Page }>) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const components = useMDXComponents();
  const resource = frontMatter.__resourcePath.split("/")[0];
  // Find pages that match the current route
  const frontMatters = getFrontMatters();
  const links = ((process.env.PAGES as any) as string[])
    .map((key) => path.relative("./", key))
    .filter((key) => key.startsWith(resource))
    .map((key) => frontMatters.find((f) => f.__resourcePath === key));

  return (
    <NavBarLayout menuState={[menuOpen, setMenuOpen]}>
      <div className="flex flex-1 w-full max-w-screen-sm lg:max-w-screen-xl mx-auto">
        <Sidebar links={links} folder={resource} />

        <main
          className={makeClass(
            "DocSearch-content",
            CONTENT_AREA,
            "flex-1",
            "lg:block",
            menuOpen && "hidden"
          )}
        >
          <components.h1>
            {constructTitleFromMarkdown(components, frontMatter.title)}
          </components.h1>
          {content}
        </main>
      </div>
    </NavBarLayout>
  );
};

export default DocsLayout;
