_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[21],{OHxD:function(e,a,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/configuration",function(){return t("tWlf")}])},tWlf:function(e,a,t){"use strict";t.r(a),t.d(a,"frontMatter",(function(){return p})),t.d(a,"default",(function(){return j}));var n=t("Fcif"),c=t("dV/x"),o=t("mXGw"),r=t.n(o),m=t("/FXl"),s=t("5CzT"),d=t.n(s),p=(r.a.createElement,{title:"Configuration",layout:"docs",description:void 0,date:null,author:"",email:"",__resourcePath:"docs/configuration.mdx",__scans:{}}),l={frontMatter:p},i=d.a;function j(e){var a=e.components,t=Object(c.a)(e,["components"]);return Object(m.mdx)(i,Object(n.a)({},l,t,{components:a,mdxType:"MDXLayout"}),Object(m.mdx)("p",null,"For the most part you should not have to create a project specific configuration for you docs.\nIf you do, the following documents all of the available options."),Object(m.mdx)("h2",{id:"configuration-file"},Object(m.mdx)("a",Object(n.a)({parentName:"h2"},{className:'header-link no-underline text-gray-900" hover:underline',href:"#configuration-file"}),"Configuration File")),Object(m.mdx)("p",null,Object(m.mdx)("inlineCode",{parentName:"p"},"ignite")," uses ",Object(m.mdx)("a",Object(n.a)({parentName:"p"},{href:"https://www.npmjs.com/package/cosmiconfig"}),"cosmiconfig")," to load its configuration file.\nWe support all formats that the default ",Object(m.mdx)("inlineCode",{parentName:"p"},"cosmiconfig")," configuration supports."),Object(m.mdx)("p",null,"The two most commons ways to configure ",Object(m.mdx)("inlineCode",{parentName:"p"},"ignite")," is either through a json ",Object(m.mdx)("inlineCode",{parentName:"p"},".igniterc")," at the root of your project:"),Object(m.mdx)("pre",{className:"language-json"},Object(m.mdx)("code",Object(n.a)({parentName:"pre"},{className:"language-json"}),Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{"),"\n  ",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token property"}),'"name"'),Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),":")," ",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token string"}),'"My Project"'),"\n",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}"),"\n")),Object(m.mdx)("p",null,"or if you're project is in JavaScript, directly in the ",Object(m.mdx)("inlineCode",{parentName:"p"},"package.json"),":"),Object(m.mdx)("pre",{className:"language-json"},Object(m.mdx)("code",Object(n.a)({parentName:"pre"},{className:"language-json"}),Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{"),"\n  ",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token property"}),'"name"'),Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),":")," ",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token string"}),'"npm-package"'),Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),","),"\n  ",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token property"}),'"ignite"'),Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),":")," ",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{"),"\n    ",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token property"}),'"name"'),Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),":")," ",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token string"}),'"My Project"'),"\n  ",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}"),"\n",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}"),"\n")),Object(m.mdx)("h2",{id:"options"},Object(m.mdx)("a",Object(n.a)({parentName:"h2"},{className:'header-link no-underline text-gray-900" hover:underline',href:"#options"}),"Options")),Object(m.mdx)("h3",{id:"repo"},Object(m.mdx)("a",Object(n.a)({parentName:"h3"},{className:'header-link no-underline text-gray-900" hover:underline',href:"#repo"}),"Repo")),Object(m.mdx)("p",null,"The repo that contains your project.\nThis can be a short slug if on public GitHub."),Object(m.mdx)("pre",{className:"language-json"},Object(m.mdx)("code",Object(n.a)({parentName:"pre"},{className:"language-json"}),Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{"),"\n  ",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token property"}),'"repo"'),Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),":")," ",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token string"}),'"hipstersmoothie/my-repo"'),"\n",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}"),"\n")),Object(m.mdx)("h3",{id:"name"},Object(m.mdx)("a",Object(n.a)({parentName:"h3"},{className:'header-link no-underline text-gray-900" hover:underline',href:"#name"}),"Name")),Object(m.mdx)("p",null,"The name of your project.\nThis value is used in multiple places in the docs."),Object(m.mdx)("pre",{className:"language-json"},Object(m.mdx)("code",Object(n.a)({parentName:"pre"},{className:"language-json"}),Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{"),"\n  ",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token property"}),'"name"'),Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),":")," ",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token string"}),'"My Project"'),"\n",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}"),"\n")),Object(m.mdx)("h3",{id:"url"},Object(m.mdx)("a",Object(n.a)({parentName:"h3"},{className:'header-link no-underline text-gray-900" hover:underline',href:"#url"}),"URL")),Object(m.mdx)("p",null,"The url you will be deploying to."),Object(m.mdx)("pre",{className:"language-json"},Object(m.mdx)("code",Object(n.a)({parentName:"pre"},{className:"language-json"}),Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{"),"\n  ",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token property"}),'"basePath"'),Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),":")," ",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token string"}),'"https://my.com/pages/your-project"'),"\n",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}"),"\n")),Object(m.mdx)("h3",{id:"order"},Object(m.mdx)("a",Object(n.a)({parentName:"h3"},{className:'header-link no-underline text-gray-900" hover:underline',href:"#order"}),"Order")),Object(m.mdx)("p",null,"Control the order of the top level section in the navbar.\nEach item in the array should be a name of one of your top-level documentation folders.\nAny unordered sections will be put after your provided order in alphabetical order."),Object(m.mdx)("pre",{className:"language-json5"},Object(m.mdx)("code",Object(n.a)({parentName:"pre"},{className:"language-json5"}),Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{"),"\n  ",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token comment"}),"// The Default"),"\n  ",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token property"}),'"order"'),Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),":")," ",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"["),Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token string"}),'"docs"'),Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),",")," ",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token string"}),'"blog"'),Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"]"),Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),","),"\n",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}"),"\n")),Object(m.mdx)("h3",{id:"html-urls"},Object(m.mdx)("a",Object(n.a)({parentName:"h3"},{className:'header-link no-underline text-gray-900" hover:underline',href:"#html-urls"}),"HTML Urls")),Object(m.mdx)("p",null,"Add ",Object(m.mdx)("inlineCode",{parentName:"p"},".html")," to the end of each internal URL."),Object(m.mdx)("pre",{className:"language-json5"},Object(m.mdx)("code",Object(n.a)({parentName:"pre"},{className:"language-json5"}),Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{"),"\n  ",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token property"}),'"htmlUrls"'),Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),":")," ",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token boolean"}),"true"),Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),","),"\n",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}"),"\n")),Object(m.mdx)("h3",{id:"purgecss"},Object(m.mdx)("a",Object(n.a)({parentName:"h3"},{className:'header-link no-underline text-gray-900" hover:underline',href:"#purgecss"}),"PurgeCSS")),Object(m.mdx)("p",null,"By default ",Object(m.mdx)("inlineCode",{parentName:"p"},"next-ignite")," will purge CSS it doesn't use."),Object(m.mdx)("p",null,"You can turn off this behavior:"),Object(m.mdx)("pre",{className:"language-json5"},Object(m.mdx)("code",Object(n.a)({parentName:"pre"},{className:"language-json5"}),Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{"),"\n  ",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token property"}),'"purge"'),Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),":")," ",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token boolean"}),"false"),Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),","),"\n",Object(m.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}"),"\n")),Object(m.mdx)("h2",{id:"files"},Object(m.mdx)("a",Object(n.a)({parentName:"h2"},{className:'header-link no-underline text-gray-900" hover:underline',href:"#files"}),"Files")),Object(m.mdx)("h2",{id:"docspubliclogopng"},Object(m.mdx)("a",Object(n.a)({parentName:"h2"},{className:'header-link no-underline text-gray-900" hover:underline',href:"#docspubliclogopng"}),Object(m.mdx)("inlineCode",{parentName:"a"},"docs/public/logo.png"))),Object(m.mdx)("p",null,"The logo for your project."),Object(m.mdx)("h2",{id:"docspubliclogo-darkpng"},Object(m.mdx)("a",Object(n.a)({parentName:"h2"},{className:'header-link no-underline text-gray-900" hover:underline',href:"#docspubliclogo-darkpng"}),Object(m.mdx)("inlineCode",{parentName:"a"},"docs/public/logo-dark.png"))),Object(m.mdx)("p",null,"The logo for your project when the OS is in dark mode."),Object(m.mdx)("h2",{id:"docspublicimagesfavicon"},Object(m.mdx)("a",Object(n.a)({parentName:"h2"},{className:'header-link no-underline text-gray-900" hover:underline',href:"#docspublicimagesfavicon"}),Object(m.mdx)("inlineCode",{parentName:"a"},"docs/public/images/favicon.*"))),Object(m.mdx)("p",null,"The favicon for your project."),Object(m.mdx)("h2",{id:"docspublicimagesfavicon-dark"},Object(m.mdx)("a",Object(n.a)({parentName:"h2"},{className:'header-link no-underline text-gray-900" hover:underline',href:"#docspublicimagesfavicon-dark"}),Object(m.mdx)("inlineCode",{parentName:"a"},"docs/public/images/favicon-dark.*"))),Object(m.mdx)("p",null,"The favicon for your project when the OS is in dark mode."))}j.isMDXComponent=!0}},[["OHxD",0,1,2,3,4]]]);