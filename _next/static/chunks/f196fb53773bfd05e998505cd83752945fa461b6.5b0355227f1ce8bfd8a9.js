(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[5],{"/rW5":function(e,t,r){var a;!function(n){"use strict";function l(e,t){var r=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(r>>16)<<16|65535&r}function o(e,t,r,a,n,o){return l((u=l(l(t,e),l(a,o)))<<(c=n)|u>>>32-c,r);var u,c}function u(e,t,r,a,n,l,u){return o(t&r|~t&a,e,t,n,l,u)}function c(e,t,r,a,n,l,u){return o(t&a|r&~a,e,t,n,l,u)}function i(e,t,r,a,n,l,u){return o(t^r^a,e,t,n,l,u)}function d(e,t,r,a,n,l,u){return o(r^(t|~a),e,t,n,l,u)}function f(e,t){var r,a,n,o,f;e[t>>5]|=128<<t%32,e[14+(t+64>>>9<<4)]=t;var s=1732584193,m=-271733879,p=-1732584194,v=271733878;for(r=0;r<e.length;r+=16)a=s,n=m,o=p,f=v,s=u(s,m,p,v,e[r],7,-680876936),v=u(v,s,m,p,e[r+1],12,-389564586),p=u(p,v,s,m,e[r+2],17,606105819),m=u(m,p,v,s,e[r+3],22,-1044525330),s=u(s,m,p,v,e[r+4],7,-176418897),v=u(v,s,m,p,e[r+5],12,1200080426),p=u(p,v,s,m,e[r+6],17,-1473231341),m=u(m,p,v,s,e[r+7],22,-45705983),s=u(s,m,p,v,e[r+8],7,1770035416),v=u(v,s,m,p,e[r+9],12,-1958414417),p=u(p,v,s,m,e[r+10],17,-42063),m=u(m,p,v,s,e[r+11],22,-1990404162),s=u(s,m,p,v,e[r+12],7,1804603682),v=u(v,s,m,p,e[r+13],12,-40341101),p=u(p,v,s,m,e[r+14],17,-1502002290),s=c(s,m=u(m,p,v,s,e[r+15],22,1236535329),p,v,e[r+1],5,-165796510),v=c(v,s,m,p,e[r+6],9,-1069501632),p=c(p,v,s,m,e[r+11],14,643717713),m=c(m,p,v,s,e[r],20,-373897302),s=c(s,m,p,v,e[r+5],5,-701558691),v=c(v,s,m,p,e[r+10],9,38016083),p=c(p,v,s,m,e[r+15],14,-660478335),m=c(m,p,v,s,e[r+4],20,-405537848),s=c(s,m,p,v,e[r+9],5,568446438),v=c(v,s,m,p,e[r+14],9,-1019803690),p=c(p,v,s,m,e[r+3],14,-187363961),m=c(m,p,v,s,e[r+8],20,1163531501),s=c(s,m,p,v,e[r+13],5,-1444681467),v=c(v,s,m,p,e[r+2],9,-51403784),p=c(p,v,s,m,e[r+7],14,1735328473),s=i(s,m=c(m,p,v,s,e[r+12],20,-1926607734),p,v,e[r+5],4,-378558),v=i(v,s,m,p,e[r+8],11,-2022574463),p=i(p,v,s,m,e[r+11],16,1839030562),m=i(m,p,v,s,e[r+14],23,-35309556),s=i(s,m,p,v,e[r+1],4,-1530992060),v=i(v,s,m,p,e[r+4],11,1272893353),p=i(p,v,s,m,e[r+7],16,-155497632),m=i(m,p,v,s,e[r+10],23,-1094730640),s=i(s,m,p,v,e[r+13],4,681279174),v=i(v,s,m,p,e[r],11,-358537222),p=i(p,v,s,m,e[r+3],16,-722521979),m=i(m,p,v,s,e[r+6],23,76029189),s=i(s,m,p,v,e[r+9],4,-640364487),v=i(v,s,m,p,e[r+12],11,-421815835),p=i(p,v,s,m,e[r+15],16,530742520),s=d(s,m=i(m,p,v,s,e[r+2],23,-995338651),p,v,e[r],6,-198630844),v=d(v,s,m,p,e[r+7],10,1126891415),p=d(p,v,s,m,e[r+14],15,-1416354905),m=d(m,p,v,s,e[r+5],21,-57434055),s=d(s,m,p,v,e[r+12],6,1700485571),v=d(v,s,m,p,e[r+3],10,-1894986606),p=d(p,v,s,m,e[r+10],15,-1051523),m=d(m,p,v,s,e[r+1],21,-2054922799),s=d(s,m,p,v,e[r+8],6,1873313359),v=d(v,s,m,p,e[r+15],10,-30611744),p=d(p,v,s,m,e[r+6],15,-1560198380),m=d(m,p,v,s,e[r+13],21,1309151649),s=d(s,m,p,v,e[r+4],6,-145523070),v=d(v,s,m,p,e[r+11],10,-1120210379),p=d(p,v,s,m,e[r+2],15,718787259),m=d(m,p,v,s,e[r+9],21,-343485551),s=l(s,a),m=l(m,n),p=l(p,o),v=l(v,f);return[s,m,p,v]}function s(e){var t,r="",a=32*e.length;for(t=0;t<a;t+=8)r+=String.fromCharCode(e[t>>5]>>>t%32&255);return r}function m(e){var t,r=[];for(r[(e.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;var a=8*e.length;for(t=0;t<a;t+=8)r[t>>5]|=(255&e.charCodeAt(t/8))<<t%32;return r}function p(e){var t,r,a="0123456789abcdef",n="";for(r=0;r<e.length;r+=1)t=e.charCodeAt(r),n+=a.charAt(t>>>4&15)+a.charAt(15&t);return n}function v(e){return unescape(encodeURIComponent(e))}function g(e){return function(e){return s(f(m(e),8*e.length))}(v(e))}function h(e,t){return function(e,t){var r,a,n=m(e),l=[],o=[];for(l[15]=o[15]=void 0,n.length>16&&(n=f(n,8*e.length)),r=0;r<16;r+=1)l[r]=909522486^n[r],o[r]=1549556828^n[r];return a=f(l.concat(m(t)),512+8*t.length),s(f(o.concat(a),640))}(v(e),v(t))}function E(e,t,r){return t?r?h(t,e):p(h(t,e)):r?g(e):p(g(e))}void 0===(a=function(){return E}.call(t,r,t,e))||(e.exports=a)}()},"2sfC":function(e,t,r){"use strict";var a=r("63Ad");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(r("mXGw")),l=a(r("WJ/f")),o=a(r("PDtE"));var u=({email:e,className:t,size:r=12})=>e?n.default.createElement("img",{src:l.default.url(e),className:(0,o.default)("rounded-full border-2 border-gray-200","dark:border-gray-900",`w-${r} h-${r}`,t)}):null;t.default=u},"53Uz":function(e,t,r){"use strict";var a=r("63Ad");Object.defineProperty(t,"__esModule",{value:!0}),t.OpenGraphTags=void 0;var n=a(r("mXGw")),l=r("dAGg"),o=a(r("ghLh")),u=a(r("pWCa"));t.OpenGraphTags=({title:e,description:t,image:r})=>{const a=(0,l.useRouter)(),c=(0,o.default)("https://hipstersmoothie.github.io/next-ignite",a.pathname);return n.default.createElement(u.default,null,n.default.createElement("title",null,e),t&&n.default.createElement("meta",{name:"description",content:t}),n.default.createElement("meta",{property:"og:url",content:c}),n.default.createElement("meta",{property:"og:type",content:"website"}),n.default.createElement("meta",{property:"og:title",content:e}),t&&n.default.createElement("meta",{name:"og:description",content:t}),r&&n.default.createElement("meta",{name:"og:image",content:r}),c&&n.default.createElement("meta",{property:"twitter:domain",content:new URL(c).hostname}),n.default.createElement("meta",{property:"twitter:url",content:c}),n.default.createElement("meta",{name:"twitter:title",content:e}),t&&n.default.createElement("meta",{name:"twitter:description",content:t}),r&&n.default.createElement("meta",{name:"twitter:image",content:r}))}},"63Ad":function(e,t){e.exports=function(e){return e&&e.__esModule?e:{default:e}}},DZvb:function(e,t,r){"use strict";var a=r("63Ad");Object.defineProperty(t,"__esModule",{value:!0}),t.NavBar=void 0;var n=a(r("8VmE")),l=a(r("mXGw")),o=a(r("5dyF")),u=r("V5Fo"),c=r("/FXl"),i=a(r("PDtE")),d=r("z0Eq"),f=r("W2D5");const s=({className:e,...t})=>l.default.createElement("svg",(0,n.default)({className:(0,i.default)("fill-current w-5 h-5",e),xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},t),l.default.createElement("path",{d:"M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0"})),m=()=>{const{SearchInput:e}=(0,c.useMDXComponents)();return l.default.createElement("div",{className:"h-full flex items-center w-full lg:w-auto lg:flex-1 lg:mr-4 lg:pr-4"},l.default.createElement(e,null))};t.NavBar=({sections:e,hasHomePage:t})=>{const[r,a]=l.default.useContext(d.MobileMenuContext),{Logo:n,NavBarWrapper:i,NavBar:p,NavBarItem:v,MobileMenuButton:g}=(0,c.useMDXComponents)();return l.default.createElement(l.default.Fragment,null,l.default.createElement(i,null,l.default.createElement(p,null,t?l.default.createElement(o.default,{passHref:!0,href:(0,f.postFixHTML)("/index")},l.default.createElement(n,null)):l.default.createElement(n,null),l.default.createElement("div",{className:"w-full h-full flex items-center lg:flex flex-1 lg:pl-12 lg:pr-6 lg:mx-auto"},l.default.createElement(m,null),l.default.createElement(g,{open:r,setOpen:a,className:"lg:hidden"}),l.default.createElement("div",{className:"hidden lg:flex h-full"},e.map((e=>l.default.createElement(o.default,{passHref:!0,key:e,href:(0,f.postFixHTML)(`/${e}`)},l.default.createElement(v,null,(0,u.titleCase)(e))))),l.default.createElement(v,{href:"https://github.com/hipstersmoothie/next-ignite",target:"_blank","aria-label":"Open on GitHub"},l.default.createElement(s,null)))))),r&&l.default.createElement("div",{className:"lg:hidden"},e.map((e=>l.default.createElement(o.default,{passHref:!0,key:e,href:(0,f.postFixHTML)(`/${e}`)},l.default.createElement(v,null,(0,u.titleCase)(e))))),l.default.createElement(v,{href:"https://github.com/hipstersmoothie/next-ignite",target:"_blank"},l.default.createElement(s,{className:"mr-2"}),"Open on GitHub")))}},FANl:function(e,t,r){"use strict";var a=r("63Ad");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(r("mXGw")),l=a(r("pWCa")),o=r("I08b"),u=r("DZvb"),c=r("z0Eq"),i=r("W2D5"),d=r("TfCl");var f=({children:e,...t})=>{const r=n.default.useState(!1);n.default.useEffect((()=>{if("undefined"!==typeof document)return document.addEventListener("keydown",e),()=>{document.removeEventListener("keydown",e)};function e(e){"/"===e.key&&(document.getElementById("search").focus(),e.preventDefault())}}),[]);const a=(0,d.useDarkMode)();return n.default.createElement(c.MobileMenuContext.Provider,{value:t.menuState||r},n.default.createElement(l.default,null,n.default.createElement("link",{rel:"shortcut icon",media:"(prefers-color-scheme:dark)",href:(0,i.formatPath)(a?"images/favicon-dark.png":"images/favicon.ico")})),n.default.createElement(o.SkipNavLink,null),n.default.createElement("div",{id:"ignite",className:"min-h-screen flex flex-col bg-white dark:bg-gray-1000"},n.default.createElement(u.NavBar,{sections:JSON.parse('["docs","blog"]'),hasHomePage:"true"}),e))};t.default=f},MNOf:function(e,t,r){"use strict";function a(e,t){return Object.prototype.hasOwnProperty.call(e,t)}e.exports=function(e,t,r,l){t=t||"&",r=r||"=";var o={};if("string"!==typeof e||0===e.length)return o;var u=/\+/g;e=e.split(t);var c=1e3;l&&"number"===typeof l.maxKeys&&(c=l.maxKeys);var i=e.length;c>0&&i>c&&(i=c);for(var d=0;d<i;++d){var f,s,m,p,v=e[d].replace(u,"%20"),g=v.indexOf(r);g>=0?(f=v.substr(0,g),s=v.substr(g+1)):(f=v,s=""),m=decodeURIComponent(f),p=decodeURIComponent(s),a(o,m)?n(o[m])?o[m].push(p):o[m]=[o[m],p]:o[m]=p}return o};var n=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}},THQi:function(e,t,r){"use strict";var a=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};e.exports=function(e,t,r,u){return t=t||"&",r=r||"=",null===e&&(e=void 0),"object"===typeof e?l(o(e),(function(o){var u=encodeURIComponent(a(o))+r;return n(e[o])?l(e[o],(function(e){return u+encodeURIComponent(a(e))})).join(t):u+encodeURIComponent(a(e[o]))})).join(t):u?encodeURIComponent(a(u))+r+encodeURIComponent(a(e)):""};var n=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)};function l(e,t){if(e.map)return e.map(t);for(var r=[],a=0;a<e.length;a++)r.push(t(e[a],a));return r}var o=Object.keys||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.push(r);return t}},TfCl:function(e,t,r){"use strict";var a=r("63Ad");Object.defineProperty(t,"__esModule",{value:!0}),t.isDarkMode=function(){if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches)return!0;return!1},t.useDarkMode=function(){const[e,t]=n.default.useState(!1);return(0,l.default)((()=>{const e=window.matchMedia("(prefers-color-scheme: dark)"),r=()=>{t(window.matchMedia("(prefers-color-scheme: dark)").matches)};return r(),e.addListener(r),()=>{e.removeListener(r)}}),[]),e};var n=a(r("mXGw")),l=a(r("YO29"))},UKnr:function(e,t,r){"use strict";t.decode=t.parse=r("MNOf"),t.encode=t.stringify=r("THQi")},W2D5:function(e,t,r){"use strict";var a=r("63Ad");Object.defineProperty(t,"__esModule",{value:!0}),t.formatPath=function(e){return n.default.join("/next-ignite",`/${e.replace(/\.mdx$/,"")}`)},t.postFixHTML=function(e){return e;if(e.startsWith("#"))return e;if(n.default.basename(e).includes("#"))return e.replace("#",".html#");return`${e}.html`};var n=a(r("O2/E"))},"WJ/f":function(e,t,r){e.exports=r("kbhq")},kbhq:function(e,t,r){var a=r("/rW5"),n=r("UKnr"),l=/^[0-9a-f]{32}$/;function o(e,t){if(e)return"boolean"===typeof e.protocol?e.protocol:"http"!==e.protocol&&("https"===e.protocol||void 0)}function u(e){return(e="string"===typeof e?e.trim().toLowerCase():"unspecified").match(l)?e:a(e)}function c(e){var t=n.stringify(function(e){var t={},r={protocol:1,format:1};for(var a in e)r[a]||(t[a]=e[a]);return t}(e));return t&&"?"+t||""}e.exports={url:function(e,t,r){var a="//www.gravatar.com/avatar/";t&&t.cdn?(a=t.cdn+"/avatar/",delete t.cdn):(t&&t.protocol&&(r=o(t)),"undefined"!==typeof r&&(a=r?"https://s.gravatar.com/avatar/":"http://www.gravatar.com/avatar/"));var n=c(t);return a+u(e)+n},profile_url:function(e,t,r){var a=void 0!=t&&void 0!=t.format?String(t.format):"json";if(t&&t.cdn)n=t.cdn+"/",delete t.cdn;else{t&&t.protocol&&(r=o(t));var n=r?"https://secure.gravatar.com/":"http://www.gravatar.com/"}var l=c(t);return n+u(e)+"."+a+l}}},n01q:function(e,t,r){"use strict";var a=r("63Ad");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(r("mXGw")),l=a(r("PDtE")),o=a(r("pWCa")),u=r("I08b"),c=a(r("FANl")),i=a(r("2sfC")),d=r("53Uz");const f=new Intl.DateTimeFormat("en-us",{year:"numeric",month:"short",day:"numeric"});var s=({children:e,frontMatter:t})=>{const r=t.color||"primary";return n.default.createElement(n.default.Fragment,null,n.default.createElement(d.OpenGraphTags,t),n.default.createElement(c.default,null,n.default.createElement(o.default,null,n.default.createElement("title",null,t.title.replace(/\\`/g,"`")),n.default.createElement("meta",{property:"og:type",content:"article"})),n.default.createElement(u.SkipNavContent,null),t.image?n.default.createElement("div",{className:`bg-${r}-500 bg-cover bg-no-repeat bg-center h-screen`,style:{maxHeight:"30vh",minHeight:315,backgroundImage:`url(${t.image})`}}):n.default.createElement("div",{className:`bg-${r}-600 h-48`}),n.default.createElement("article",{className:(0,l.default)("DocSearch-content blog-post","pt-6 pb-12 px-6 mx-4 rounded-xl -mt-10 mb-16 bg-white shadow-md text-gray-800","lg:max-w-screen-md lg:mx-auto lg:w-full","dark:bg-gray-900 border dark:border-gray-500")},n.default.createElement("div",{className:"mx-auto text-center flex flex-col items-center"},n.default.createElement(i.default,{email:t.email,className:"-mt-12 mb-4"}),n.default.createElement("h1",{className:(0,l.default)("lvl1 text-3xl font-light mb-2 lg:mb-4","dark:text-gray-200")},t.title),n.default.createElement("p",{className:"mb-6"},n.default.createElement("span",{className:"dark:text-gray-300"},t.author)," ",n.default.createElement("time",{className:"text-gray-600 dark:text-gray-500",dateTime:t.date},"on ",f.format(new Date(t.date))))),e),n.default.createElement("div",{id:"disqus_thread",className:"px-6 lg:max-w-screen-md lg:mx-auto w-full mb-16 lg:mb-28"})))};t.default=s},z0Eq:function(e,t,r){"use strict";var a=r("63Ad");Object.defineProperty(t,"__esModule",{value:!0}),t.MobileMenuContext=void 0;const n=a(r("mXGw")).default.createContext([!1,()=>{}]);t.MobileMenuContext=n}}]);