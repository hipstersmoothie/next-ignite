import path from "path";
import { useMDXComponents } from "@mdx-js/react";

import { Sidebar } from "../components/sidebar";
import makeNavBarLayout from "./nav-bar";

const NavBarLayout = makeNavBarLayout();
const requireFrontMatters = require.context(MDX_DATA_DIR, true, /\.json$/);
// Get all pages
const requirePage = require.context(PAGES_DIR, true, /\.mdx$/);
// Get all frontMatter data
const frontMatters = requireFrontMatters.keys().map(requireFrontMatters);

export default frontMatter => ({ children: content }) => {
  const components = useMDXComponents();
  const resource = frontMatter.__resourcePath.split("/")[0];
  // Find pages that match the current route
  const links = requirePage
    .keys()
    .map(key => path.relative("./", key))
    .filter(key => key.startsWith(resource))
    .map(key => frontMatters.find(f => f.__resourcePath === key));

  return (
    <NavBarLayout>
      <div className="flex">
        <Sidebar links={links} folder={resource} />

        <div className="flex-1">
          <components.h1>{frontMatter.title}</components.h1>
          {content}
        </div>
      </div>
    </NavBarLayout>
  );
};
