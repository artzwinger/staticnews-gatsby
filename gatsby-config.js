/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    siteMetadata: {
        title: `⚡ Быстрые новости ⚡`,
        description: 'Быстрые новости',
        name: 'Быстрые новости',
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
                components: ['amp-sidebar'],
                excludedPaths: ['/404*'],
                pathIdentifier: '/amp/',
                relAmpHtmlPattern: '{{canonicalBaseUrl}}{{pathIdentifier}}{{pathname}}',
                useAmpClientIdApi: true,
            },
        },
        {
            resolve: `gatsby-plugin-yandex-metrika`,
            options: {
                trackingId: 92558241,
                webvisor: true,
                trackHash: true,
                afterBody: true,
                defer: false,
                useCDN: true,
            },
        },
        'gatsby-plugin-robots-txt'
    ]
};