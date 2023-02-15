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
    ]
};