import React from 'react';
import Router from 'next/router'

const requirePage = require.context(PAGES_DIR, true, /\.mdx$/);

/** Redirect the application to the intro page of a docs section */
export default function useFirstPageRedirect() {
  const path = Router.router?.asPath.replace(/^\/+/g, '').split('/')[0]
  const page = requirePage.keys().find(key => key.includes(`${path}/intro`))

  React.useEffect(() => {
    if (!page) {
      return;
    }

    // Redirect them to an intro page if found
    Router.push(page.replace('./', '/').replace('.mdx', ''));
  }, []);

  return page;
}