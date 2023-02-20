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
                backendUrl: 'http://localhost',
                backendWebsiteCode: 'local',
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
    ]
};