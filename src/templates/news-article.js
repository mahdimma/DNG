import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"

const NewsArticleTemplate = ({ data }) => {
  const article = data.markdownRemark

  return (
    <Layout 
      title={article.frontmatter.title}
      description={article.excerpt}
    >
      <article style={{ maxWidth: 800, margin: `0 auto`, padding: `2rem 1rem` }}>
        {/* Article Header */}
        <header style={{ marginBottom: `3rem` }}>
          <div style={{ marginBottom: `1rem` }}>
            <Link 
              to="/news"
              style={{
                color: `#667eea`,
                textDecoration: `none`,
                fontSize: `0.9rem`,
                fontWeight: `bold`,
              }}
            >
              ← Back to News
            </Link>
          </div>
          
          <h1 style={{ 
            fontSize: `2.5rem`,
            lineHeight: `1.2`,
            marginBottom: `1rem`,
            color: `#2d3748`,
          }}>
            {article.frontmatter.title}
          </h1>
          
          <div style={{
            display: `flex`,
            flexWrap: `wrap`,
            gap: `1rem`,
            alignItems: `center`,
            color: `#4a5568`,
            fontSize: `0.9rem`,
            marginBottom: `1rem`,
          }}>
            <time dateTime={article.frontmatter.date}>
              Published on {article.frontmatter.date}
            </time>
            {article.frontmatter.author && (
              <>
                <span>•</span>
                <span>By {article.frontmatter.author}</span>
              </>
            )}
            {article.frontmatter.category && (
              <>
                <span>•</span>
                <span style={{
                  background: `#e2e8f0`,
                  padding: `0.25rem 0.5rem`,
                  borderRadius: `12px`,
                  fontSize: `0.8rem`,
                  textTransform: `capitalize`,
                }}>
                  {article.frontmatter.category}
                </span>
              </>
            )}
          </div>
          
          {article.frontmatter.featured && (
            <div style={{
              background: `#c6f6d5`,
              color: `#22543d`,
              padding: `0.5rem 1rem`,
              borderRadius: `5px`,
              fontSize: `0.9rem`,
              fontWeight: `bold`,
              display: `inline-block`,
              marginBottom: `1rem`,
            }}>
              ⭐ Featured Article
            </div>
          )}
          
          <hr style={{ border: `none`, borderTop: `2px solid #e2e8f0` }} />
        </header>

        {/* Article Content */}
        <div 
          style={{
            lineHeight: `1.8`,
            fontSize: `1.1rem`,
            color: `#2d3748`,
          }}
          dangerouslySetInnerHTML={{ __html: article.html }}
        />

        {/* Article Footer */}
        <footer style={{ 
          marginTop: `4rem`,
          paddingTop: `2rem`,
          borderTop: `1px solid #e2e8f0`,
        }}>
          <div style={{
            background: `#f7fafc`,
            padding: `1.5rem`,
            borderRadius: `8px`,
            marginBottom: `2rem`,
          }}>
            <h4 style={{ marginBottom: `1rem` }}>Share this article</h4>
            <div style={{ display: `flex`, gap: `1rem`, flexWrap: `wrap` }}>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: article.frontmatter.title,
                      url: window.location.href,
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                    alert('Link copied to clipboard!')
                  }
                }}
                style={{
                  background: `#667eea`,
                  color: `white`,
                  border: `none`,
                  padding: `0.5rem 1rem`,
                  borderRadius: `5px`,
                  cursor: `pointer`,
                  fontSize: `0.9rem`,
                }}
              >
                Share Article
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  alert('Link copied to clipboard!')
                }}
                style={{
                  background: `white`,
                  color: `#667eea`,
                  border: `2px solid #667eea`,
                  padding: `0.5rem 1rem`,
                  borderRadius: `5px`,
                  cursor: `pointer`,
                  fontSize: `0.9rem`,
                }}
              >
                Copy Link
              </button>
            </div>
          </div>

          <div style={{
            background: `#e2e8f0`,
            padding: `1.5rem`,
            borderRadius: `8px`,
            textAlign: `center`,
          }}>
            <h4>Stay Updated</h4>
            <p style={{ marginBottom: `1rem` }}>
              Don't miss the latest news from Dangepia Village
            </p>
            <Link 
              to="/news"
              style={{
                background: `#667eea`,
                color: `white`,
                padding: `0.75rem 1.5rem`,
                textDecoration: `none`,
                borderRadius: `5px`,
                fontWeight: `bold`,
                display: `inline-block`,
              }}
            >
              View All News
            </Link>
          </div>
        </footer>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt(pruneLength: 200)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        author
        category
        featured
      }
    }
  }
`

export default NewsArticleTemplate
