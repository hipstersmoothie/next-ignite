import React from 'react';
import Router from 'next/router'

import { docsPages } from "../components/sidebar";
import Intro from "../pages/docs/intro.mdx";

export default () => {
  React.useEffect(() => {
    Router.push("/docs/intro");
  }, []);

  return null;
}
