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
                backendUrl: 'https://pkh5reak9f.execute-api.eu-central-1.amazonaws.com',
                backendWebsiteCode: 'fastfastnews',
                perPage: 50,
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
                defer: true,
                useCDN: true,
            },
        },
        'gatsby-plugin-robots-txt'
    ]
};