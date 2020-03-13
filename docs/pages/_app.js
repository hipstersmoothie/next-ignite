import React from "react";
import App from "next/app";
import makeClass from "clsx";
import { MDXProvider } from "@mdx-js/react";
import { igniteComponents } from "ignite";

import styles from "../css/components.module.css";
import "ignite/dist/main.css";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <MDXProvider components={igniteComponents}>
        <Component {...pageProps} />
      </MDXProvider>
    );
  }
}

export default MyApp;
