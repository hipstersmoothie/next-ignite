import path from "path";

import { NavBar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";

// Get all pages
const requirePage = require.context("../pages/", true, /\.mdx$/);
const topLevelSections = Array.from(new Set(
  requirePage
    .keys()
    .map(key => path.relative("./", key).split("/")[0])
    // anything with a dot in it would be a file
    // we only care about directories
    .filter(key => !key.includes(".") && key !== 'docs')
));


export default () => ({ children: content }) => (
  <>
    <NavBar sections={topLevelSections} />
    {content}
  </>
);
