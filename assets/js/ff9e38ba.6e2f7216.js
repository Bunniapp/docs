"use strict";(self.webpackChunkbunni_docs=self.webpackChunkbunni_docs||[]).push([[7089],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(n),m=o,f=u["".concat(s,".").concat(m)]||u[m]||d[m]||r;return n?a.createElement(f,i(i({ref:t},p),{},{components:n})):a.createElement(f,i({ref:t},p))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var c=2;c<r;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},8460:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var a=n(7462),o=(n(7294),n(3905));const r={title:"Hooklets",hide_table_of_contents:!1,sidebar_position:9},i="Hooklets",l={unversionedId:"v2/concepts/hooklets",id:"v2/concepts/hooklets",title:"Hooklets",description:"Hooklets are a powerful feature in Bunni v2 that allow pool deployers to inject custom logic into various pool operations. This enables advanced strategies, customized behavior, and integration with external systems.",source:"@site/docs/v2/concepts/hooklets.md",sourceDirName:"v2/concepts",slug:"/v2/concepts/hooklets",permalink:"/docs/v2/concepts/hooklets",draft:!1,tags:[],version:"current",sidebarPosition:9,frontMatter:{title:"Hooklets",hide_table_of_contents:!1,sidebar_position:9},sidebar:"tutorialSidebar",previous:{title:"Volatility-based Swap Fee",permalink:"/docs/v2/concepts/fees"},next:{title:"Referral System",permalink:"/docs/v2/concepts/referral"}},s={},c=[{value:"Overview",id:"overview",level:2},{value:"Key Features",id:"key-features",level:2},{value:"Hooklet Interface",id:"hooklet-interface",level:2},{value:"Initialize Hooks",id:"initialize-hooks",level:3},{value:"Deposit Hooks",id:"deposit-hooks",level:3},{value:"Withdraw Hooks",id:"withdraw-hooks",level:3},{value:"Swap Hooks",id:"swap-hooks",level:3},{value:"Usage",id:"usage",level:2},{value:"Hooklet Flags",id:"hooklet-flags",level:2},{value:"Important Considerations",id:"important-considerations",level:2},{value:"Example Use Cases",id:"example-use-cases",level:2}],p={toc:c};function d(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"hooklets"},"Hooklets"),(0,o.kt)("p",null,"Hooklets are a powerful feature in Bunni v2 that allow pool deployers to inject custom logic into various pool operations. This enables advanced strategies, customized behavior, and integration with external systems."),(0,o.kt)("h2",{id:"overview"},"Overview"),(0,o.kt)("p",null,"Hooklets are smart contracts that implement the ",(0,o.kt)("inlineCode",{parentName:"p"},"IHooklet")," interface. Each Bunni pool can have one hooklet attached to it. The least significant bits of the hooklet's address are used to flag which hooklet functions should be called."),(0,o.kt)("h2",{id:"key-features"},"Key Features"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("strong",{parentName:"li"},"Operation Hooks"),": Hooklets can execute custom logic before and after key operations like initialization, deposits, withdrawals, and swaps."),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("strong",{parentName:"li"},"Fee and Price Overrides"),": Hooklets can override swap fees and spot prices before swaps, allowing for dynamic pricing strategies."),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("strong",{parentName:"li"},"Flexible Integration"),": Pool deployers can implement custom strategies without modifying the core Bunni contracts.")),(0,o.kt)("h2",{id:"hooklet-interface"},"Hooklet Interface"),(0,o.kt)("h3",{id:"initialize-hooks"},"Initialize Hooks"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-solidity"},"function beforeInitialize(address sender, IBunniHub.DeployBunniTokenParams calldata params)\n    external\n    returns (bytes4 selector);\n\nfunction afterInitialize(\n    address sender,\n    IBunniHub.DeployBunniTokenParams calldata params,\n    InitializeReturnData calldata returnData\n) external returns (bytes4 selector);\n")),(0,o.kt)("p",null,"These functions are called before and after a pool is initialized."),(0,o.kt)("h3",{id:"deposit-hooks"},"Deposit Hooks"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-solidity"},"function beforeDeposit(address sender, IBunniHub.DepositParams calldata params)\n    external\n    returns (bytes4 selector);\n\nfunction afterDeposit(\n    address sender,\n    IBunniHub.DepositParams calldata params,\n    DepositReturnData calldata returnData\n) external returns (bytes4 selector);\n")),(0,o.kt)("p",null,"These functions are called before and after a deposit operation."),(0,o.kt)("h3",{id:"withdraw-hooks"},"Withdraw Hooks"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-solidity"},"function beforeWithdraw(address sender, IBunniHub.WithdrawParams calldata params)\n    external\n    returns (bytes4 selector);\n\nfunction afterWithdraw(\n    address sender,\n    IBunniHub.WithdrawParams calldata params,\n    WithdrawReturnData calldata returnData\n) external returns (bytes4 selector);\n")),(0,o.kt)("p",null,"These functions are called before and after a withdraw operation."),(0,o.kt)("h3",{id:"swap-hooks"},"Swap Hooks"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-solidity"},"function beforeSwap(address sender, PoolKey calldata key, IPoolManager.SwapParams calldata params)\n    external\n    returns (bytes4 selector, bool feeOverriden, uint24 fee, bool priceOverridden, uint160 sqrtPriceX96);\n\nfunction beforeSwapView(address sender, PoolKey calldata key, IPoolManager.SwapParams calldata params)\n    external\n    view\n    returns (bytes4 selector, bool feeOverriden, uint24 fee, bool priceOverridden, uint160 sqrtPriceX96);\n\nfunction afterSwap(\n    address sender,\n    PoolKey calldata key,\n    IPoolManager.SwapParams calldata params,\n    SwapReturnData calldata returnData\n) external returns (bytes4 selector);\n")),(0,o.kt)("p",null,"These functions are called before and after a swap operation. The ",(0,o.kt)("inlineCode",{parentName:"p"},"beforeSwap")," function allows for overriding the swap fee and spot price. The ",(0,o.kt)("inlineCode",{parentName:"p"},"beforeSwapView")," function is a view version used for computing swap quotes."),(0,o.kt)("h2",{id:"usage"},"Usage"),(0,o.kt)("p",null,"To use a hooklet with a Bunni v2 pool:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Implement the ",(0,o.kt)("inlineCode",{parentName:"li"},"IHooklet")," interface in your custom contract."),(0,o.kt)("li",{parentName:"ol"},"Set the appropriate flags in the least significant bits of your hooklet's address to indicate which functions should be called."),(0,o.kt)("li",{parentName:"ol"},"When deploying a new Bunni pool, specify the hooklet's address in the ",(0,o.kt)("inlineCode",{parentName:"li"},"DeployBunniTokenParams"),".")),(0,o.kt)("h2",{id:"hooklet-flags"},"Hooklet Flags"),(0,o.kt)("p",null,"The following flags are used to determine which hooklet functions are called:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-solidity"},"uint160 internal constant BEFORE_INITIALIZE_FLAG = 1 << 9;\nuint160 internal constant AFTER_INITIALIZE_FLAG = 1 << 8;\nuint160 internal constant BEFORE_DEPOSIT_FLAG = 1 << 7;\nuint160 internal constant AFTER_DEPOSIT_FLAG = 1 << 6;\nuint160 internal constant BEFORE_WITHDRAW_FLAG = 1 << 5;\nuint160 internal constant AFTER_WITHDRAW_FLAG = 1 << 4;\nuint160 internal constant BEFORE_SWAP_FLAG = 1 << 3;\nuint160 internal constant BEFORE_SWAP_OVERRIDE_FEE_FLAG = 1 << 2;\nuint160 internal constant BEFORE_SWAP_OVERRIDE_PRICE_FLAG = 1 << 1;\nuint160 internal constant AFTER_SWAP_FLAG = 1;\n")),(0,o.kt)("h2",{id:"important-considerations"},"Important Considerations"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Hooklets should be thoroughly tested and audited, as they can significantly impact pool behavior."),(0,o.kt)("li",{parentName:"ol"},"The ",(0,o.kt)("inlineCode",{parentName:"li"},"beforeSwap")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"beforeSwapView")," functions should always return the same values for the same inputs to ensure consistency between quotes and actual swaps."),(0,o.kt)("li",{parentName:"ol"},"Fee and price overrides in the ",(0,o.kt)("inlineCode",{parentName:"li"},"beforeSwap")," function are only applied if the corresponding permission flags are set."),(0,o.kt)("li",{parentName:"ol"},"Hooklet calls are subject to gas limits, so complex operations should be carefully optimized.")),(0,o.kt)("h2",{id:"example-use-cases"},"Example Use Cases"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("strong",{parentName:"li"},"Dynamic Fee Adjustment"),": Implement a hooklet that adjusts swap fees based on market volatility or other external factors."),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("strong",{parentName:"li"},"Price Oracles"),": Use a hooklet to integrate external price feeds for more accurate pricing during low-liquidity periods."),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("strong",{parentName:"li"},"Trading Limits"),": Implement deposit, withdrawal, or swap limits based on custom criteria.")),(0,o.kt)("p",null,"By leveraging hooklets, Bunni v2 provides a flexible framework for customizing pool behavior and implementing advanced liquidity provision strategies."))}d.isMDXComponent=!0}}]);