import React from "react";
import Router from "next/router";

declare var BASE_PATH: string;
declare var PAGES_DIR: string;
const requirePage = require.context(PAGES_DIR, true, /\.mdx$/);

/** Redirect the application to the intro page of a docs section */
export default function useFirstPageRedirect(page = "intro") {
  const path = Router.router?.asPath.replace(BASE_PATH, '').replace(/^\/+/g, "").split("/")[0];
  const redirectPage = requirePage
    .keys()
    .find(key => key.includes(`${path}/${page}`));
  const [ret, setRet] = React.useState('no-op')

  React.useEffect(() => {
    if (!redirectPage) {
      setRet(undefined)
      return;
    }

    // Redirect them to an intro page if found
    Router.push(redirectPage.replace("./", "/").replace(".mdx", ""));
    // Delay return until after first render so the 404 page doesn't always render
    setRet(redirectPage)
  }, []);

  return ret;
}
