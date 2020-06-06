const { createProxyMiddleware } = require("http-proxy-middleware");


/* use dotenv to access env variable in gatsby-config.js */
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    siteMetadata: {
        title: `${process.env.GATSBY_SITE_URL}` || 'Mariedet Blog',
        author: {
            name: `Marie DETOUCHE`,
            summary: `cycling and travelling around`,
        },
        description: `${process.env.GATSBY_SITE_DESCRIPTION}`,
        siteUrl: `${process.env.GATSBY_SITE_URL}`,
    },
    developMiddleware: app => {
        app.use(
            "/.netlify/functions/",
            createProxyMiddleware ({
                target: "http://localhost:9000",
                pathRewrite: {
                    "/.netlify/functions/": "",
                },
            })
        )
    },
    plugins: [
        /* a plugin to generate a robots.txt */
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                host: `${process.env.GATSBY_SITE_URL}`,
                policy: [{userAgent: '*', allow: '/'}]
            }
        },
        /* a plugin to generate a sitemap */
        `gatsby-plugin-sitemap`,
        /* a plugin for instagram post  */
        {
            resolve: `gatsby-source-instagram`,
            options: {
                username: `mariedet`,
            }
        },
        /* sass and scss inside gatsby */
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-plugin-material-ui`,
            // If you want to use styled components, in conjunction to Material-UI, you should:
            // - Change the injection order
            // - Add the plugin
            options: {
                stylesProvider: {
                    injectFirst: true,
                },
            }
        },
        /* use NETLIFI as a backend */
        {
            resolve: `gatsby-plugin-netlify-cms`,
            options: {
                /**
                 * One convention is to place your Netlify CMS customization code in a
                 * `src/cms` directory.
                 */
                modulePath: `${__dirname}/src/cms/cms.js`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/blog`,
                name: `blog`
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/assets`,
                name: `assets`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            //maxWidth: 590,
                            maxWidth: 1000,
                        },
                    },
                    {
                        resolve: `gatsby-remark-responsive-iframe`,
                        options: {
                            wrapperStyle: `margin-bottom: 1.0725rem`,
                        },
                    },
                    `gatsby-remark-prismjs`,
                    `gatsby-remark-copy-linked-files`,
                    `gatsby-remark-smartypants`,
                    /* transform html images to react component */
                    {
                        resolve: `gatsby-remark-rehype-images`,
                        options: {
                            tag: 'rehype-image'
                        }
                    }
                ],
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID || "none"
            },
        },
        `gatsby-plugin-feed`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `${process.env.GATSBY_SITE_URL}` || 'Mariedet Blog',
                short_name: `${process.env.GATSBY_SITE_URL}` || 'Mariedet Blog',
                description: `${process.env.GATSBY_SITE_DESCRIPTION}`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `content/assets/favicon.png`,
            },
        },
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography`,
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}
