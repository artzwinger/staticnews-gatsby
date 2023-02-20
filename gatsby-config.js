/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    siteMetadata: {
        title: `Авто новости`,
        name: 'Автоновости',
        siteUrl: `https://www.fastfastnews.ru`
    },
    plugins: ["gatsby-plugin-image", "gatsby-plugin-sitemap", "gatsby-plugin-sharp", "gatsby-transformer-sharp",
        {
            resolve: `source-plugin`,
            options: {
                backendUrl: 'http://3.75.152.17',
                backendWebsiteCode: 'fastfastnews',
            },
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                "icon": "src/images/icon.png"
            }
        },
        {
            resolve: `gatsby-plugin-google-amp`,
            options: {
                canonicalBaseUrl: 'https://www.fastfastnews.ru/',
                components: [],
                excludedPaths: ['/404*'],
                pathIdentifier: '/amp/',
                relAmpHtmlPattern: '{{canonicalBaseUrl}}{{pathIdentifier}}{{pathname}}',
                useAmpClientIdApi: true,
            },
        },
        {
            resolve: 'gatsby-plugin-no-javascript-utils',
            options: {
                noScript: true,
                noSourcemaps: true,
                removeGeneratorTag: true,
                removeHeadDataAttrs: true,
                noInlineStyles: false,
                removeGatsbyAnnouncer: true,
            },
        },
    ]
};