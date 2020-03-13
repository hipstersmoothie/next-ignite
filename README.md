# next-mdx-enhanced Dynamic Documentation Example

- add a blog just by adding a `blog/` folder and some mdx files in `pages/`
- Add multiple top level docs sections just by adding more folders and mdx in `pages/`
- Home Page (Break out into JS easy as hell)
- Simple search (only work after a full production build)
- Dynamically match `layouts` + add fallbacks based on routes

## Getting Started

```sh
yarn
yarn dev
```

## Setup

1. Setup Tailwind CSS
2. Setup 404 Page `pages/404.js`:

   ```js
   import React from "react";
   import { useFirstPageRedirect } from "next-ignite/lib";

   export default function Custom404(props) {
     const page = useFirstPageRedirect();

     return page ? null : <div>Oops, looks like we can't find that page!</div>;
   }
   ```

3. Configure Your Component Provide in `_app.js`:

   ```js
   import React from "react";
   import App from "next/app";
   import { MDXProvider } from "@mdx-js/react";
   import igniteComponents from '../src/mdx-components'

   import "../css/tailwind.css";

   import { Anchor } from "../components/anchor";
   import { H1 } from "../components/h1";

   // Override any of the base components
   const components = {
     ...igniteComponents,
     a: Anchor,
     h1: H1
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
   ```

// TODO docs for setting up blog
// TODO for more top level sections
// TODO custom sidebar
