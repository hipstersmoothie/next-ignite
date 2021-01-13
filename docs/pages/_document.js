import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://www.unpkg.com/prism-themes@1.5.0/themes/prism-coldark-cold.css"
          />
          <link
            rel="stylesheet"
            href="https://www.unpkg.com/prism-themes@1.5.0/themes/prism-coldark-dark.css"
            media="(prefers-color-scheme: dark)"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                var disqus_config = function () {
                  this.page.url = document.location.origin;
                  this.page.identifier = document.location.pathname;
                };

                (function() {
                  var d = document, s = d.createElement("script");
                  s.src = "https://ignite-2.disqus.com/embed.js";
                  s.setAttribute("data-timestamp", + new Date());
                  (d.head || d.body).appendChild(s);
                })();
              `,
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
