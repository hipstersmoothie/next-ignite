import React from "react";
import App from "next/app";
import { MDXProvider } from "@mdx-js/react";
import { igniteComponents } from "next-ignite";

import "prismjs/themes/prism.css";
import "next-ignite/dist/main.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={igniteComponents}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}

export default MyApp;
