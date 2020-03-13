import React from 'react';
import path from "path";

import { NavBar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";

// Get all pages
const requirePage = require.context(PAGES_DIR, true, /\.mdx$/);
const topLevelSections = Array.from(new Set(
  requirePage
    .keys()
    .map(key => path.relative("./", key).split("/")[0])
    // anything with a dot in it would be a file
    // we only care about directories
    .filter(key => !key.includes(".") && key !== 'docs')
));

export default () => ({ children: content }) => (
  <div id="ignite" className="min-h-screen flex flex-col">
    <NavBar sections={topLevelSections} />
    {content}
  </div>
);
