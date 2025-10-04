/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  pathPrefix: "/DANG", // Commented out - deploying to root domain
  siteMetadata: {
    title: `روستای دنگپیا`,
    description: `وبسایت رسمی روستای دنگپیا`,
    author: `@dangepia`,
    siteUrl: `https://dangepia.ir`,
    social: {
    twitter: "https://twitter.com/yourprofile",
    linkedin: "https://linkedin.com/in/yourprofile",
    instagram: "https://instagram.com/yourprofile"
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: '/',
        createLinkInHead: true,
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
            allMarkdownRemark {
              nodes {
                fields {
                  slug
                }
                frontmatter {
                  date
                  type
                }
              }
            }
          }
        `,
        resolveSiteUrl: () => 'https://dangepia.ir',
        resolvePages: ({
          allSitePage: { nodes: allPages },
          allMarkdownRemark: { nodes: allPosts },
        }) => {
          const postMap = allPosts.reduce((acc, post) => {
            const { slug } = post.fields
            const { date, type } = post.frontmatter
            acc[slug] = { date, type }
            return acc
          }, {})

          return allPages.map((page) => {
            return { ...page, ...postMap[page.path] }
          })
        },
        serialize: ({ path, date, type }) => {
          let priority = 0.5
          let changefreq = 'monthly'

          // Higher priority for news and events
          if (type === 'news') {
            priority = 0.8
            changefreq = 'daily'
          } else if (type === 'event') {
            priority = 0.9
            changefreq = 'weekly'
          } else if (path === '/' || path === '/news' || path === '/events') {
            priority = 1.0
            changefreq = 'daily'
          }

          return {
            url: path,
            lastmod: date || new Date().toISOString(),
            changefreq,
            priority,
          }
        },
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://dangepia.ir',
        sitemap: 'https://dangepia.ir/sitemap-index.xml',
        policy: [
          {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/private/', '/page-data/', '/.cache/', '/public/'],
          },
          {
            userAgent: 'Googlebot-News',
            allow: '/news/',
            crawlDelay: 0,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-postcss`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `news`,
        path: `${__dirname}/content/news`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `events`,
        path: `${__dirname}/content/events`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-plugin-sharp`,
        ],
      },
    },
  ],
}
