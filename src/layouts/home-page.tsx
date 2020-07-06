import React from 'react';
import Link from 'next/link';
import makeClass from 'clsx';
import Head from 'next/head';

import makeNavBarLayout from './nav-bar';
import { Page } from '../utils/types';
import { formatPath } from '../utils/format-path';

declare var PROJECT_NAME: string;
const NavBarLayout = makeNavBarLayout();

interface HomePageFrontMatter extends Page {
  /** Theme color for the home page */
  color: string;
  /** Tagline for the homepage */
  tagline: string;
  /** CTA for the homepage */
  cta: string;
}

/** A layout to render a basic home page */
export default (frontMatter: HomePageFrontMatter) => ({
  children: content,
}: React.PropsWithChildren<{}>) => {
  const color = frontMatter.color || 'primary';

  return (
    <NavBarLayout>
      <Head>
        <title>{PROJECT_NAME}</title>
      </Head>
      <div
        className={makeClass(
          `bg-${color}-500 pt-16 pb-16`,
          `dark:bg-${color}-700`
        )}
      >
        <div className='max-w-screen-sm lg:max-w-screen-md mx-auto text-center text-white'>
          <h1 className='text-6xl'>{frontMatter.title || PROJECT_NAME}</h1>
          <h2
            className={makeClass(
              `text-2xl font-light text-${color}-100`,
              `dark:text-${color}-200`
            )}
          >
            {frontMatter.tagline}
          </h2>
          <Link href={formatPath('/docs')}>
            <a
              className={makeClass(
                `px-6 py-4 rounded text-${color}-700 font-medium bg-white inline-flex my-12`,
                `focus:outline-none, hover:shadow-xl`
              )}
            >
              {frontMatter.cta || 'Get started'}
            </a>
          </Link>
        </div>
      </div>
      <div
        className={makeClass(
          'flex-1 pt-8 pb-32 px-6 max-w-screen-sm mx-auto',
          'lg:max-w-screen-md'
        )}
      >
        {content}
      </div>
    </NavBarLayout>
  );
};
