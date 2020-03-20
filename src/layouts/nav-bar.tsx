import React from "react";

import { NavBar } from "../components/navbar";
import { getHasHomepage, getTopLevelSections } from "../utils/layout";
import { MobileMenuContext } from "../utils/mobile-menu-context";

const hasHomePage = getHasHomepage();
const topLevelSections = getTopLevelSections();

interface NavBarProps {
  /** The state of the mobile menu */
  menuState?: [boolean, (newValue: boolean) => void];
  /** The page content */
  children: React.ReactNode;
}

/** Make a  basic navbar page layout */
export default () => ({
  children: content,
  ...props
}: NavBarProps & React.PropsWithChildren<{}>) => {
  const menuState = React.useState(false);

  React.useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    function focusSearch(e: KeyboardEvent) {
      if (e.key === "/") {
        document.getElementById("search").focus();
        e.preventDefault();
      }
    }

    document.addEventListener("keydown", focusSearch);

    return () => {
      document.removeEventListener("keydown", focusSearch);
    };
  }, []);

  return (
    <MobileMenuContext.Provider value={props.menuState || menuState}>
      <div id="ignite" className="min-h-screen flex flex-col">
        <NavBar sections={topLevelSections} hasHomePage={hasHomePage} />
        {content}
      </div>
    </MobileMenuContext.Provider>
  );
};
