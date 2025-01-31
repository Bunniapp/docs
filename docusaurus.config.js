// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const math = require("remark-math");
const katex = require("rehype-katex");

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "Bunni Docs",
    url: "https://docs.bunni.xyz",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.svg",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "bunniapp", // Usually your GitHub org/user name.
    projectName: "docs", // Usually your repo name.

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },

    presets: [
        [
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve("./sidebars.js"),
                    remarkPlugins: [math],
                    rehypePlugins: [katex],
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
                },
            }),
        ],
    ],

    stylesheets: [
        {
            href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
            type: "text/css",
            integrity:
                "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
            crossorigin: "anonymous",
        },
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: "Bunni Docs",
                logo: {
                    alt: "Bunni",
                    src: "img/logo.png",
                },
                items: [
                    {
                        type: "doc",
                        docId: "v2/overview",
                        position: "left",
                        label: "Introduction",
                    },
                    {
                        type: "doc",
                        docId: "v2/technical/overview",
                        position: "left",
                        label: "Contracts",
                    },
                    {
                        type: "doc",
                        docId: "v2/guides/creating-a-pool/initialization",
                        position: "left",
                        label: "Guides",
                    },
                    {
                        href: "https://github.com/bunniapp/docs",
                        label: "GitHub",
                        position: "right",
                    },
                ],
            },
            footer: {
                style: "dark",
                links: [
                    {
                        title: "Community",
                        items: [
                            {
                                label: "Discord",
                                href: "https://discord.gg/bunnixyz",
                            },
                            {
                                label: "Twitter",
                                href: "https://twitter.com/bunni_xyz",
                            },
                        ],
                    },
                    {
                        title: "More",
                        items: [
                            {
                                label: "Home page",
                                href: "https://bunni.xyz",
                            },
                        ],
                    },
                ],
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
                additionalLanguages: ['solidity'],
            },
            colorMode: {
                // "light" | "dark"
                defaultMode: "dark",

                // Should we use the prefers-color-scheme media-query,
                // using user system preferences, instead of the hardcoded defaultMode
                respectPrefersColorScheme: true,
            },
        }),
};

module.exports = config;
