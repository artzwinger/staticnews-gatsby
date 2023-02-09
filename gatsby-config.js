/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    siteMetadata: {
        title: `Static news`,
        siteUrl: `https://www.yourdomain.tld`
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
    ]
};