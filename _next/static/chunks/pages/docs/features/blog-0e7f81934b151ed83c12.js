_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[22],{"5lVW":function(e,a,t){"use strict";t.r(a),t.d(a,"frontMatter",(function(){return b})),t.d(a,"default",(function(){return O}));var n=t("Fcif"),c=t("dV/x"),s=t("mXGw"),m=t.n(s),o=t("/FXl"),p=t("5CzT"),d=t.n(p),b=(m.a.createElement,{title:"Creating a Blog",layout:"docs",description:void 0,date:null,author:"",email:"",__resourcePath:"docs/features/blog.mdx",__scans:{}}),r={frontMatter:b},j=d.a;function O(e){var a=e.components,t=Object(c.a)(e,["components"]);return Object(o.mdx)(j,Object(n.a)({},r,t,{components:a,mdxType:"MDXLayout"}),Object(o.mdx)("p",null,"Adding a blog with ",Object(o.mdx)("inlineCode",{parentName:"p"},"ignite")," is super easy.\nAll you have to do is start adding ",Object(o.mdx)("inlineCode",{parentName:"p"},".mdx")," files to a folder names ",Object(o.mdx)("inlineCode",{parentName:"p"},"pages/blog")," and set up the blog index page."),Object(o.mdx)("h2",{id:"blog-index-page"},Object(o.mdx)("a",Object(n.a)({parentName:"h2"},{className:'header-link no-underline text-gray-900" hover:underline',href:"#blog-index-page"}),"Blog Index Page")),Object(o.mdx)("p",null,"Create a file in your ",Object(o.mdx)("inlineCode",{parentName:"p"},"pages/")," folder named ",Object(o.mdx)("inlineCode",{parentName:"p"},"blog.js"),".\nThis simplest way to get a blog index running is by using the sample component ",Object(o.mdx)("inlineCode",{parentName:"p"},"ignite")," provides"),Object(o.mdx)("pre",{className:"language-js"},Object(o.mdx)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"import")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"BlogIndex")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"from")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token string"}),'"next-ignite"'),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword"}),"const")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token function-variable function"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token maybe-class-name"}),"Blog"))," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"=")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token arrow operator"}),"=>")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"<"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"BlogIndex")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"/"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),">"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"export")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"default")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"Blog"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n")),Object(o.mdx)("p",null,"If you want more control of what this page looks like you can use the lower level functions ",Object(o.mdx)("inlineCode",{parentName:"p"},"ignite")," provides."),Object(o.mdx)("p",null,"In this file add the following to render a simple list of your blog posts:"),Object(o.mdx)("pre",{className:"language-jsx"},Object(o.mdx)("code",Object(n.a)({parentName:"pre"},{className:"language-jsx"}),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"import")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"Link")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"from")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token string"}),'"next/link"'),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token comment"}),"// getBlogPosts will return the blogs in reverse creation order"),"\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"import")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{")," getBlogPosts",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),",")," makeNavBarLayout ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"from")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token string"}),'"next-ignite"'),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"import")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{")," useMDXComponents ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"from")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token string"}),'"@mdx-js/react"'),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token comment"}),"// Make a layout with the navbar at the"),"\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword"}),"const")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"NavBarLayout")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"=")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token function"}),"makeNavBarLayout"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token comment"}),"// Get all the blog posts"),"\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword"}),"const")," posts ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"=")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token function"}),"getBlogPosts"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword"}),"const")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token function-variable function"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token maybe-class-name"}),"Blog"))," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"=")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token arrow operator"}),"=>")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{"),"\n  ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token comment"}),"// Make sure to use the components defined for you docs!"),"\n  ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword"}),"const")," components ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"=")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token function"}),"useMDXComponents"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n\n  ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword"}),"return")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),"\n    ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token tag"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token tag"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"<"),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token class-name"}),"NavBarLayout")),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),">")),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token plain-text"}),"\n      "),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token tag"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token tag"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"<"),"components.h1"),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),">")),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token plain-text"}),"Blog"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token tag"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token tag"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"</"),"components.h1"),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),">")),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token plain-text"}),"\n\n      "),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token tag"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token tag"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"<"),"components.ul"),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),">")),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token plain-text"}),"\n        "),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{"),"posts",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"."),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token method function property-access"}),"map"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token parameter"}),"page"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token arrow operator"}),"=>")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),"\n          ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token tag"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token tag"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"<"),"li")," ",Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token attr-name"}),"key"),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token script language-javascript"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token script-punctuation punctuation"}),"="),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"{"),"page",Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"."),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token property-access"}),"__resourcePath"),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"}")),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),">")),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token plain-text"}),"\n            "),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token tag"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token tag"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"<"),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token class-name"}),"Link"))," ",Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token attr-name"}),"passHref")," ",Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token attr-name"}),"href"),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token script language-javascript"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token script-punctuation punctuation"}),"="),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"{"),"page",Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"."),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token property-access"}),"__resourcePath"),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"}")),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),">")),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token plain-text"}),"\n              "),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token tag"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token tag"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"<"),"components.a"),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),">")),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{"),"page",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"."),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token property-access"}),"title"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token tag"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token tag"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"</"),"components.a"),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),">")),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token plain-text"}),"\n            "),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token tag"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token tag"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"</"),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token class-name"}),"Link")),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),">")),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token plain-text"}),"\n          "),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token tag"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token tag"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"</"),"li"),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),">")),"\n        ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token plain-text"}),"\n      "),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token tag"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token tag"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"</"),"components.ul"),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),">")),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token plain-text"}),"\n    "),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token tag"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token tag"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),"</"),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token class-name"}),"NavBarLayout")),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token punctuation"}),">")),"\n  ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"export")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"default")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"Blog"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n")),Object(o.mdx)("p",null,"Once this is setup you're ready to start writing blog posts! \ud83c\udf89"),Object(o.mdx)("h2",{id:"blog-post-format"},Object(o.mdx)("a",Object(n.a)({parentName:"h2"},{className:'header-link no-underline text-gray-900" hover:underline',href:"#blog-post-format"}),"Blog Post Format")),Object(o.mdx)("p",null,"A blog post is just another ",Object(o.mdx)("inlineCode",{parentName:"p"},".mdx")," file, but it has a few more front-matter features."),Object(o.mdx)("p",null,"You should always include a title."),Object(o.mdx)("pre",{className:"language-yaml"},Object(o.mdx)("code",Object(n.a)({parentName:"pre"},{className:"language-yaml"}),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"---"),"\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token key atrule"}),"title"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),":")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token string"}),'"My First Blog Post"'),"\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"---"),"\n\n")),Object(o.mdx)("h3",{id:"author"},Object(o.mdx)("a",Object(n.a)({parentName:"h3"},{className:'header-link no-underline text-gray-900" hover:underline',href:"#author"}),"author")),Object(o.mdx)("p",null,"You can include an author in the blog post, otherwise this information will get pull from the commit.\nInclude an email to display an avatar using gravatar."),Object(o.mdx)("pre",{className:"language-yaml"},Object(o.mdx)("code",Object(n.a)({parentName:"pre"},{className:"language-yaml"}),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"---"),"\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token key atrule"}),"title"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),":")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token string"}),'"My First Blog Post"'),"\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token key atrule"}),"author"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),":")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token string"}),'"Andrew Lisowski"'),"\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token key atrule"}),"email"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),":")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token string"}),'"lisowski54@gmail.com"'),"\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"---"),"\n\n")),Object(o.mdx)("h3",{id:"date"},Object(o.mdx)("a",Object(n.a)({parentName:"h3"},{className:'header-link no-underline text-gray-900" hover:underline',href:"#date"}),"date")),Object(o.mdx)("p",null,"Specify the date the post was created.\nIf not supplied this information is pulled from the commit date."),Object(o.mdx)("pre",{className:"language-yaml"},Object(o.mdx)("code",Object(n.a)({parentName:"pre"},{className:"language-yaml"}),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"---"),"\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token key atrule"}),"date"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),":")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token string"}),'"Thu, 12 Mar 2020 23:00:02 -0700"'),"\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"---"),"\n\n")),Object(o.mdx)("h3",{id:"color"},Object(o.mdx)("a",Object(n.a)({parentName:"h3"},{className:'header-link no-underline text-gray-900" hover:underline',href:"#color"}),"color")),Object(o.mdx)("p",null,"A color to use as the backdrop for a post"),Object(o.mdx)("pre",{className:"language-yaml"},Object(o.mdx)("code",Object(n.a)({parentName:"pre"},{className:"language-yaml"}),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"---"),"\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token key atrule"}),"color"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),":")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token string"}),'"red"'),"\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"---"),"\n\n")),Object(o.mdx)("h3",{id:"image"},Object(o.mdx)("a",Object(n.a)({parentName:"h3"},{className:'header-link no-underline text-gray-900" hover:underline',href:"#image"}),"image")),Object(o.mdx)("p",null,"Instead of a color you can display an image as the backdrop."),Object(o.mdx)("pre",{className:"language-yaml"},Object(o.mdx)("code",Object(n.a)({parentName:"pre"},{className:"language-yaml"}),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"---"),"\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token key atrule"}),"image"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),":")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token string"}),'"http://image.com/example.png"'),"\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"---"),"\n\n")),Object(o.mdx)("h2",{id:"comments"},Object(o.mdx)("a",Object(n.a)({parentName:"h2"},{className:'header-link no-underline text-gray-900" hover:underline',href:"#comments"}),"Comments")),Object(o.mdx)("p",null,"To add comments to your blog ",Object(o.mdx)("a",Object(n.a)({parentName:"p"},{href:"https://disqus.com/"}),"first sign for any plan with disqus")," and then add the following to your ",Object(o.mdx)("inlineCode",{parentName:"p"},"_document.js"),"."),Object(o.mdx)("pre",{className:"language-js"},Object(o.mdx)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"import")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"React")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"from")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token string"}),'"react"'),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"import")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"Document"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),",")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"Html"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),",")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"Head"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),",")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"Main"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),",")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"NextScript")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"from")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token string"}),'"next/document"'),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword"}),"class")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token class-name"}),"MyDocument")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword"}),"extends")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token class-name"}),"Document")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{"),"\n  ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token function"}),"render"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{"),"\n    ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword"}),"return")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"("),"\n      ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"<"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"Html")," lang",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"="),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token string"}),'"en"'),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),">"),"\n        ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"<"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"Head")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"/"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),">"),"\n\n        ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"<"),"body",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),">"),"\n          ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"<"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"Main")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"/"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),">"),"\n          ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"<"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"NextScript")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"/"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),">"),"\n          ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"<"),"script\n            dangerouslySetInnerHTML",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"="),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"{"),"\n              __html",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),":")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token template-string"}),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token template-punctuation string"}),"`"),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token string"}),'\n                var disqus_config = function () {\n                  this.page.url = document.location.origin;\n                  this.page.identifier = document.location.pathname;\n                };\n\n                (function() {\n                  var d = document, s = d.createElement("script");\n                  s.src = YOUR_DISQUS_URL;\n                  s.setAttribute("data-timestamp", + new Date());\n                  (d.head || d.body).appendChild(s);\n                })();\n              '),Object(o.mdx)("span",Object(n.a)({parentName:"span"},{className:"token template-punctuation string"}),"`")),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),","),"\n            ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}"),"\n          ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"/"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),">"),"\n        ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"<"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"/"),"body",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),">"),"\n      ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"<"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),"/"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"Html"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token operator"}),">"),"\n    ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),")"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n  ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}"),"\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),"}"),"\n\n",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"export")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token keyword module"}),"default")," ",Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token maybe-class-name"}),"MyDocument"),Object(o.mdx)("span",Object(n.a)({parentName:"code"},{className:"token punctuation"}),";"),"\n")))}O.isMDXComponent=!0},"PVO/":function(e,a,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/docs/features/blog",function(){return t("5lVW")}])}},[["PVO/",0,1,2,3,4]]]);