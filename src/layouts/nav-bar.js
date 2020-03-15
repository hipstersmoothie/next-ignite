import React from "react";

import { NavBar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import { getHasHomepage, getTopLevelSections } from "../layout-utils";
import { MobileMenuContext } from "../mobile-menu-context";

const hasHomePage = getHasHomepage();
const topLevelSections = getTopLevelSections();

export default () => ({ children: content, ...props }) => {
  const menuState = React.useState(false);

  return (
    <MobileMenuContext.Provider value={props.menuState || menuState}>
      <div id="ignite" className="min-h-screen flex flex-col">
        <NavBar sections={topLevelSections} hasHomePage={hasHomePage} />
        {content}
      </div>
    </MobileMenuContext.Provider>
  );
};
