import React from 'react';
import useFirstPageRedirect from '../src/use-first-page-redirect';

export default function Custom404(props) {
  const page = useFirstPageRedirect();

  return page ? null : <div>Oops, looks like we can't find that page!</div>;
}