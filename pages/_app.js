import React from "react";
import App from "next/app";
import makeClass from "clsx";
import { MDXProvider } from "@mdx-js/react";

import styles from "../css/components.module.css";
import "../css/tailwind.css";

import { Anchor } from "../components/anchor";
import { H1 } from "../components/h1";

const components = {
  a: Anchor,
  h1: H1,
  h2: ({ className, ...props }) => (
    <h2 className={makeClass(className, "text-2xl")} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul className={makeClass(className, styles.ul)} {...props} />
  )
};

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    );
  }
}

export default MyApp;
