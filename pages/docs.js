import React from 'react';
import Router from 'next/router'

import makeSidebarAndNavBarLayout from "../layouts/sidebar-and-navbar";
import { docsPages } from "../components/sidebar";
import Intro from "../pages/docs/intro.mdx";

const SidebarAndNavBarLayout = makeSidebarAndNavBarLayout();

export default () => {
  React.useEffect(() => {
    Router.push("/docs/intro");
  }, []);

  return null;
}
