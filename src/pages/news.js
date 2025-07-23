import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"

const NewsPage = ({ data }) => {
  const newsArticles = data?.allMarkdownRemark?.nodes || []

  return (
    <Layout title="News" description="Stay updated with the latest news and announcements from Dangepia Village">
      <div style={{ maxWidth: 960, margin: `0 auto`, padding: `2rem 1rem` }}>
        <h1>Village News</h1>
        <p style={{ fontSize: `1.1rem`, marginBottom: `2rem` }}>
          Stay informed about the latest happenings, announcements, and updates from our village community.
        </p>

        <div style={{
          display: `grid`,
          gap: `2rem`,
        }}>
          {newsArticles.length > 0 ? (
            newsArticles.map((article, index) => (
              <article key={index} style={{
                background: `white`,
                padding: `2rem`,
                borderRadius: `8px`,
                boxShadow: `0 2px 4px rgba(0,0,0,0.1)`,
                border: `1px solid #e2e8f0`,
              }}>
                <h2 style={{ marginBottom: `0.5rem` }}>
                  <Link 
                    to={article.fields.slug}
                    style={{ color: `#2d3748`, textDecoration: `none` }}
                  >
                    {article.frontmatter.title}
                  </Link>
                </h2>
                <div style={{ 
                  color: `#666`, 
                  marginBottom: `1rem`,
                  fontSize: `0.9rem`,
                }}>
                  <span>Published on {article.frontmatter.date}</span>
                  {article.frontmatter.author && (
                    <span> by {article.frontmatter.author}</span>
                  )}
                </div>
                <p style={{ 
                  lineHeight: `1.6`,
                  marginBottom: `1rem`,
                  color: `#4a5568`,
                }}>
                  {article.excerpt}
                </p>
                <Link 
                  to={article.fields?.slug || '#'}
                  style={{
                    color: `#667eea`,
                    textDecoration: `none`,
                    fontWeight: `bold`,
                  }}
                >
                  Read Full Article →
                </Link>
              </article>
            ))
          ) : (
            <div style={{
              background: `#f7fafc`,
              padding: `3rem`,
              borderRadius: `8px`,
              textAlign: `center`,
            }}>
              <h3>No News Articles Yet</h3>
              <p>
                We haven't published any news articles yet. Check back soon for updates!
              </p>
            </div>
          )}
        </div>

        {/* Archive or Categories Section */}
        <section style={{
          marginTop: `3rem`,
          padding: `2rem`,
          background: `#f7fafc`,
          borderRadius: `8px`,
        }}>
          <h3>News Categories</h3>
          <div style={{
            display: `flex`,
            gap: `1rem`,
            flexWrap: `wrap`,
            marginTop: `1rem`,
          }}>
            <span style={{
              background: `white`,
              padding: `0.5rem 1rem`,
              borderRadius: `20px`,
              fontSize: `0.9rem`,
              border: `1px solid #e2e8f0`,
            }}>
              Community Updates
            </span>
            <span style={{
              background: `white`,
              padding: `0.5rem 1rem`,
              borderRadius: `20px`,
              fontSize: `0.9rem`,
              border: `1px solid #e2e8f0`,
            }}>
              Events
            </span>
            <span style={{
              background: `white`,
              padding: `0.5rem 1rem`,
              borderRadius: `20px`,
              fontSize: `0.9rem`,
              border: `1px solid #e2e8f0`,
            }}>
              Announcements
            </span>
            <span style={{
              background: `white`,
              padding: `0.5rem 1rem`,
              borderRadius: `20px`,
              fontSize: `0.9rem`,
              border: `1px solid #e2e8f0`,
            }}>
              Village Council
            </span>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "news" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        excerpt(pruneLength: 200)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          author
        }
      }
    }
  }
`

export default NewsPage
