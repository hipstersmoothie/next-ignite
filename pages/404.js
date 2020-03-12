import React from 'react';
import Router from 'next/router'

const requirePage = require.context(PAGES_DIR, true, /\.mdx$/);

export default function Custom404(props) {
  const path = Router.router?.asPath.replace(/^\/+/g, '').split('/')[0]
  const page = requirePage.keys().find(key => key.includes(`${path}/intro`))

  React.useEffect(() => {
    if (!page) {
      return;
    }

    // Redirect them to an intro page if found
    Router.push(page.replace('./', '/').replace('.mdx', ''));
  }, []);

  return page ? null : <div>Oops, looks like we can't find that page!</div>;
}