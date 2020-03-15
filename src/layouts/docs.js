import React from "react";
import path from "path";
import { useMDXComponents } from "@mdx-js/react";
import makeClass from "clsx";

import { NavBar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import makeNavBarLayout from "./nav-bar";
import { getHasHomepage, getTopLevelSections } from "../layout-utils";
import { MobileMenuContext } from "../mobile-menu-context";

const NavBarLayout = makeNavBarLayout();
const requireFrontMatters = require.context(MDX_DATA_DIR, true, /\.json$/);
// Get all pages
const requirePage = require.context(PAGES_DIR, true, /\.mdx$/);
// Get all frontMatter data
const frontMatters = requireFrontMatters.keys().map(requireFrontMatters);
const hasHomePage = getHasHomepage();
const topLevelSections = getTopLevelSections();

const CONTENT_AREA =
  "pt-8 pb-32 px-4 lg:mx-auto max-w-full md:max-w-screen-sm lg:max-w-screen-md";

export default frontMatter => ({ children: content }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const components = useMDXComponents();
  const resource = frontMatter.__resourcePath.split("/")[0];
  // Find pages that match the current route
  const links = requirePage
    .keys()
    .map(key => path.relative("./", key))
    .filter(key => key.startsWith(resource))
    .map(key => frontMatters.find(f => f.__resourcePath === key));

  return hasHomePage ? (
    <NavBarLayout menuState={[menuOpen, setMenuOpen]}>
      <div className="flex flex-1 w-full max-w-screen-sm lg:max-w-screen-xl mx-auto">
        <Sidebar links={links} folder={resource} />

        <div
          className={makeClass(
            CONTENT_AREA,
            "flex-1",
            "lg:block",
            menuOpen && "hidden"
          )}
        >
          <components.h1>{frontMatter.title}</components.h1>
          {content}
        </div>
      </div>
    </NavBarLayout>
  ) : (
    <div className="flex flex-1 min-h-screen max-w-screen-xl mx-auto w-full">
      <Sidebar links={links} folder={resource} />

      <div className="flex-1">
        <NavBar sections={topLevelSections} hasHomePage={hasHomePage} />

        <div
          className={makeClass(CONTENT_AREA, "lg:block", menuOpen && "hidden")}
        >
          <components.h1>{frontMatter.title}</components.h1>
          {content}
        </div>
      </div>
    </div>
  );
};
