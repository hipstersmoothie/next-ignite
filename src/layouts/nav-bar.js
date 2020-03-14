import React from "react";

import { NavBar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import { getHasHomepage, getTopLevelSections } from "../layout-utils";

const hasHomePage = getHasHomepage();
const topLevelSections = getTopLevelSections();

export default () => ({ children: content }) => (
  <div id="ignite" className="min-h-screen flex flex-col">
    <NavBar sections={topLevelSections} hasHomePage={hasHomePage} />
    {content}
  </div>
);
