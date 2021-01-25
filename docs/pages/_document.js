import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { formatPath } from "next-ignite";

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

          <meta name="application-name" content="next-ignite Docs" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="next-ignite Docs" />
          <meta
            name="description"
            content="The documentation for next-ignite"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#11151d" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#11151d" />
          <link rel="manifest" href={formatPath("/manifest.json")} />
          <link rel="shortcut icon" href="/images/favicon.ico" />

          <meta name="twitter:card" content="summary" />
          <meta
            name="twitter:url"
            content="https://hipstersmoothie.github.io/next-ignite/"
          />
          <meta name="twitter:title" content="next-ignite Docs" />
          <meta
            name="twitter:description"
            content="The documentation for next-ignite"
          />
          <meta name="twitter:creator" content="@hipstersmoothie" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="PWA App" />
          <meta
            property="og:description"
            content="The documentation for next-ignite"
          />
          <meta property="og:site_name" content="PWA App" />
          <meta
            property="og:url"
            content="https://hipstersmoothie.github.io/next-ignite/"
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
                  if (!document.getElementById('disqus_thread')) {
                    return;
                  }

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
