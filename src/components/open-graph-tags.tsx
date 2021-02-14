import React from "react";
import { useRouter } from "next/router";
import join from "url-join";

import { Page } from "../utils/types";
import Head from "next/head";

export const OpenGraphTags = ({
  title,
  description,
  image,
}: Pick<Page, "description" | "image" | "title">) => {
  const router = useRouter();
  const url = join(process.env.DOCS_URL, router.pathname);

  return (
    <Head>
      {/* <!-- HTML Meta Tags --> */}
      <title>{title}</title>
      {description && <meta name="description" content={description} />}

      {/* <!-- Facebook Meta Tags --> */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      {description && <meta name="og:description" content={description} />}
      {image && <meta name="og:image" content={image} />}

      {/* <!-- Twitter Meta Tags --> */}
      <meta property="twitter:domain" content={new URL(url).hostname} />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}
    </Head>
  );
};
