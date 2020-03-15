import React from "react";
import Router from "next/router";

declare var PAGES_DIR: string;
const requirePage = require.context(PAGES_DIR, true, /\.mdx$/);

/** Redirect the application to the intro page of a docs section */
export default function useFirstPageRedirect(page = "intro") {
  const path = Router.router?.asPath.replace(/^\/+/g, "").split("/")[0];
  const redirectPage = requirePage
    .keys()
    .find(key => key.includes(`${path}/${page}`));

  React.useEffect(() => {
    if (!redirectPage) {
      return;
    }

    // Redirect them to an intro page if found
    Router.push(redirectPage.replace("./", "/").replace(".mdx", ""));
  }, []);

  return redirectPage;
}
