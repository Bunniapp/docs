"use strict";(self.webpackChunkbunni_docs=self.webpackChunkbunni_docs||[]).push([[8227],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var i=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,i,o=function(e,t){if(null==e)return{};var n,i,o={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=i.createContext({}),c=function(e){var t=i.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=c(e.components);return i.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=c(n),f=o,m=d["".concat(l,".").concat(f)]||d[f]||p[f]||r;return n?i.createElement(m,a(a({ref:t},u),{},{components:n})):i.createElement(m,a({ref:t},u))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,a=new Array(r);a[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var c=2;c<r;c++)a[c]=n[c];return i.createElement.apply(null,a)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4413:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>r,metadata:()=>s,toc:()=>c});var i=n(7462),o=(n(7294),n(3905));const r={title:"Overview",description:"Introduction to Bunni",hide_table_of_contents:!0,sidebar_position:1},a="What is Bunni?",s={unversionedId:"v1/introduction",id:"v1/introduction",title:"Overview",description:"Introduction to Bunni",source:"@site/docs/v1/introduction.md",sourceDirName:"v1",slug:"/v1/introduction",permalink:"/docs/v1/introduction",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"Overview",description:"Introduction to Bunni",hide_table_of_contents:!0,sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Rehypothication",permalink:"/docs/v2/guides/creating-a-pool/rehypothication"},next:{title:"Useful Links",permalink:"/docs/v1/links"}},l={},c=[{value:"Uniswap wrapper",id:"uniswap-wrapper",level:2},{value:"Vetokenomics system",id:"vetokenomics-system",level:2}],u={toc:c};function p(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,i.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"what-is-bunni"},"What is Bunni?"),(0,o.kt)("p",null,"Bunni is a liquidity engine for incentivizing Uniswap v3 liquidity."),(0,o.kt)("p",null,"Bunni has two parts: a protocol that wraps Uniswap liquidity positions into fungible ERC-20 tokens, and a vetokenomics system for incentivizing Bunni liquidity."),(0,o.kt)("p",null,"The combination of a robust incentivization system and concentrated liquidity makes Bunni on track to be the most efficient method for incentivizing DEX liquidity. "),(0,o.kt)("h2",{id:"uniswap-wrapper"},"Uniswap wrapper"),(0,o.kt)("p",null,"Officially Uniswap uses NFTs to represent liquidity positions, but it's a little-known fact that it doesn't have to be the case: anyone can build a contract that represents Uniswap positions in any form, be it an ERC-721 NFT, an ERC-1155 NFT, or ERC-20 tokens. This is thanks to the permissionlessness of the Uniswap core protocol."),(0,o.kt)("p",null,"Bunni has built the first such wrapper contract that represents Uniswap positions as ERC-20 tokens. This has numerous benefits over using NFTs:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Gas efficiency"),": LPs using the same price range & same pool share the same ERC-20 token, spreading the gas cost of providing liquidity over all LPs and thus making it much cheaper."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Easy composability"),": While it's possible to build financial applications on top of Uniswap NFTs, it is far easier to do so using ERC-20 LP tokens, since most existing financial applications are designed for tokens rather than NFTs. This is what enabled Bunni to adopt Curve's gauge system for Uniswap positions.")),(0,o.kt)("h2",{id:"vetokenomics-system"},"Vetokenomics system"),(0,o.kt)("p",null,"Bunni's native token, the ",(0,o.kt)("strong",{parentName:"p"},"Liquidity Incentive Token (LIT)"),", is used to incentivize liquidity on Bunni. Bunni has improved upon the vetokenomics used by Curve to reduce farming-and-dumping and increase longevity."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Balancer LP token as vote-locked token"),": Bunni uses the Balancer 80LIT-20WETH LP token as the lock token for obtaining veLIT."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Increased max boost"),": Bunni gives a max of 10x boost to LPs who have veLIT, instead of the 2.5x used by Curve & Balancer. This increases the advantage of holding veLIT."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Call option as reward token"),": Instead of using LIT as the reward token, Bunni uses call option tokens for LIT as the reward token. This has the benefit of enabling the protocol to accumulate a large cash reserve regardless of market conditions, as well as letting loyal holders buy LIT at a discount.")))}p.isMDXComponent=!0}}]);