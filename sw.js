if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let n=Promise.resolve();return s[e]||(n=new Promise((async n=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=n}else importScripts(e),n()}))),n.then((()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]}))},n=(n,s)=>{Promise.all(n.map(e)).then((e=>s(1===e.length?e[0]:e)))},s={require:Promise.resolve(n)};self.define=(n,t,c)=>{s[n]||(s[n]=Promise.resolve().then((()=>{let s={};const i={uri:location.origin+n.slice(1)};return Promise.all(t.map((n=>{switch(n){case"exports":return s;case"module":return i;default:return e(n)}}))).then((e=>{const n=c(...e);return s.default||(s.default=n),s}))})))}}define("./sw.js",["./workbox-8778d57b"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/next-ignite/_next/static/RqVmcez7Ec31nIKHwyI4U/_buildManifest.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/RqVmcez7Ec31nIKHwyI4U/_ssgManifest.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/09fbb3be71fa92f83f07cbc6afd209a2bb5cd273.def26798b1b48c440169.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/251a3493fba69f61aa50ae53d1016846ac8de4e1.5e80baf935a75c9dc901.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/684981fb.ddce25b62cf34b951439.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/7f8312e792aa19d44f74f5d232d71f2d094cecde.fdeeebee72a9f481fde9.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/f196fb53773bfd05e998505cd83752945fa461b6.5b0355227f1ce8bfd8a9.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/ffd4daddbb32ad1e02d714eb0ba3bd454f8be05f.d7996fdeb0e77724f113.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/framework.da2bfb5fc8a36e66c8a8.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/main-9ff4017bbe1e207c7fef.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/pages/_app-595124dd5291cbc0986a.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/pages/_error-9efcdd05a24e5f575b1f.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/pages/blog-8b7b4562d8cfbd58f077.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/pages/blog/first-8de47b6e4fa24aa82cc5.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/pages/blog/second-9caa98624ebfc300f719.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/pages/docs-26e9cbf214a2862396f8.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/pages/docs/_sidebar-bf0ad7a575bd4278937c.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/pages/docs/advanced-features/javascript-pages-fb029b44a79d81764bee.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/pages/docs/advanced-features/layouts-e443697e295fffbc1280.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/pages/docs/advanced-features/next-24b93ed6dc987efa33d2.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/pages/docs/advanced-features/pwa-ae48105b10df7bc26207.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/pages/docs/advanced-features/theming-986a83cb295523c75c1f.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/pages/docs/cli-b017845878fe69e1c79e.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/pages/docs/configuration-e3cd75d5bc9b7a21e95c.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/pages/docs/features/blog-422405799e9ae163c4a9.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/pages/docs/features/custom-sidebar-841e12c4bf8d46a64752.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/pages/docs/features/home-page-18cfcd5b0a14b519ec0f.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/pages/docs/features/markdown-components-2b3751799f725bb16bd0.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/pages/docs/features/multi-docs-8a4b0d76ced13af7f0ca.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/pages/docs/getting-started-bbd8dd93df28285a6d6f.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/pages/index-515f73b9821e5a605ae9.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/polyfills-5af7641f77cdae061009.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/chunks/webpack-50bee04d1dc61f8adf5b.js",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/_next/static/css/e2768f2a0f7d217d7b0d.css",revision:"RqVmcez7Ec31nIKHwyI4U"},{url:"/next-ignite/images/favicon-dark.png",revision:"d6a87f0f92a5c774bf9eff445adcccdc"},{url:"/next-ignite/images/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/next-ignite/logo.svg",revision:"f536dad8df73cd045ccc664333937d8e"},{url:"/next-ignite/manifest.json",revision:"b50fc2a92474f3ed673d8736ea46dc38"},{"url":"/next-ignite/404.html","revision":"8cf0caea6510dd1e4f907e7f0f5d2f2c"},{"url":"/next-ignite/blog.html","revision":"59f62c18afe4850b40ce6da63e65ca44"},{"url":"/next-ignite/docs.html","revision":"e1e3a82e7d3404ff51786b703e916bba"},{"url":"/next-ignite/index.html","revision":"bae5809de608d55515607baa049f7f17"},{"url":"/next-ignite/blog/first.html","revision":"b900c939398d8d94da906d0cb453dbf5"},{"url":"/next-ignite/blog/second.html","revision":"af4037c46af89f9dd34a019a06e43909"},{"url":"/next-ignite/docs/_sidebar.html","revision":"ca6c0f9d9f65153b69308b23d5b713d3"},{"url":"/next-ignite/docs/cli.html","revision":"ada09d07648cc1db9db24a7e579b405d"},{"url":"/next-ignite/docs/configuration.html","revision":"15ec00bdf2ca42d5ad52168370e24f4b"},{"url":"/next-ignite/docs/getting-started.html","revision":"bcfeae286f096b7cc534627dfa2bfb31"},{"url":"/next-ignite/docs/advanced-features/javascript-pages.html","revision":"217f5d4fdf1b96fde30704ee3b74ed07"},{"url":"/next-ignite/docs/advanced-features/layouts.html","revision":"96604cfe0034a1d198ec659ce1db4cc2"},{"url":"/next-ignite/docs/advanced-features/next.html","revision":"c810c0304815b93bf222574aac17c480"},{"url":"/next-ignite/docs/advanced-features/pwa.html","revision":"02b7699b46fec5d29e14ca3029474eab"},{"url":"/next-ignite/docs/advanced-features/theming.html","revision":"5c5fda87e4db637987b6403237049c48"},{"url":"/next-ignite/docs/features/blog.html","revision":"660302e50a2f2597c028e88a4faacedc"},{"url":"/next-ignite/docs/features/custom-sidebar.html","revision":"c4a6d295dffa44bfd866d283b9b1ef16"},{"url":"/next-ignite/docs/features/home-page.html","revision":"71c75e393fa042436b0cd3fcc4ddd0db"},{"url":"/next-ignite/docs/features/markdown-components.html","revision":"a989d0f484ac0a5d9792ff315dae6064"},{"url":"/next-ignite/docs/features/multi-docs.html","revision":"c7974ef76ddb931f56a36560d5bf3c5f"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/next-ignite",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
