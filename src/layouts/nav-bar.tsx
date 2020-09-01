import React from "react";
import Head from "next/head";

import { NavBar } from "../components/navbar";
import { MobileMenuContext } from "../utils/mobile-menu-context";
import { formatPath } from "../utils/format-path";
import { useDarkMode } from "../utils/is-dark-mode";

declare const FAVICON: string;
declare const FAVICON_DARK: string;
declare const HAS_HOMEPAGE: boolean;
declare const TOP_LEVEL_SECTIONS: string[];

interface NavBarProps {
  /** The state of the mobile menu */
  menuState?: [boolean, (newValue: boolean) => void];
  /** The page content */
  children: React.ReactNode;
}

/** Make a  basic navbar page layout */
const NavBarLayout = ({
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

  const isDark = useDarkMode();

  return (
    <MobileMenuContext.Provider value={props.menuState || menuState}>
      <Head>
        <link
          rel="shortcut icon"
          media="(prefers-color-scheme:dark)"
          href={formatPath(isDark ? FAVICON_DARK : FAVICON)}
        />
      </Head>

      <div id="ignite" className="min-h-screen flex flex-col dark:bg-gray-1000">
        <NavBar sections={TOP_LEVEL_SECTIONS} hasHomePage={HAS_HOMEPAGE} />
        {content}
      </div>
    </MobileMenuContext.Provider>
  );
};

export default NavBarLayout;
