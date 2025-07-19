import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"

const IndexPage = ({ data }) => {
  const latestNews = data.allMarkdownRemark.nodes.filter(node => 
    node.frontmatter.type === 'news'
  ).slice(0, 3)
  
  const upcomingEvents = data.allMarkdownRemark.nodes.filter(node => 
    node.frontmatter.type === 'event'
  ).slice(0, 3)

  return (
    <Layout>
      {/* Hero Section */}
      <section style={{
        background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
        color: `white`,
        padding: `4rem 1rem`,
        textAlign: `center`,
      }}>
        <div style={{ maxWidth: 960, margin: `0 auto` }}>
          <h1 style={{ fontSize: `3rem`, margin: `0 0 1rem 0` }}>
            Welcome to Dangepia Village
          </h1>
          <p style={{ fontSize: `1.2rem`, margin: `0 0 2rem 0` }}>
            Discover the beauty, culture, and community of our historic village
          </p>
          <div style={{ display: `flex`, gap: `1rem`, justifyContent: `center`, flexWrap: `wrap` }}>
            <Link 
              to="/about" 
              style={{
                background: `white`,
                color: `#667eea`,
                padding: `0.75rem 1.5rem`,
                textDecoration: `none`,
                borderRadius: `5px`,
                fontWeight: `bold`,
              }}
            >
              Learn More
            </Link>
            <Link 
              to="/contact" 
              style={{
                background: `transparent`,
                color: `white`,
                padding: `0.75rem 1.5rem`,
                textDecoration: `none`,
                borderRadius: `5px`,
                fontWeight: `bold`,
                border: `2px solid white`,
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section style={{ padding: `3rem 1rem` }}>
        <div style={{ maxWidth: 960, margin: `0 auto` }}>
          <h2 style={{ textAlign: `center`, marginBottom: `2rem` }}>
            Village Services
          </h2>
          <div style={{
            display: `grid`,
            gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
            gap: `2rem`,
          }}>
            <div style={{
              background: `#f7fafc`,
              padding: `1.5rem`,
              borderRadius: `8px`,
              textAlign: `center`,
              boxShadow: `0 2px 4px rgba(0,0,0,0.1)`,
            }}>
              <h3>Weather Information</h3>
              <p>Stay updated with local weather conditions</p>
              <Link to="/weather" style={{ color: `#667eea` }}>
                View Weather →
              </Link>
            </div>
            <div style={{
              background: `#f7fafc`,
              padding: `1.5rem`,
              borderRadius: `8px`,
              textAlign: `center`,
              boxShadow: `0 2px 4px rgba(0,0,0,0.1)`,
            }}>
              <h3>Village Maps</h3>
              <p>Explore our village and find locations</p>
              <Link to="/maps" style={{ color: `#667eea` }}>
                View Maps →
              </Link>
            </div>
            <div style={{
              background: `#f7fafc`,
              padding: `1.5rem`,
              borderRadius: `8px`,
              textAlign: `center`,
              boxShadow: `0 2px 4px rgba(0,0,0,0.1)`,
            }}>
              <h3>Village Gallery</h3>
              <p>See photos of our beautiful village</p>
              <Link to="/gallery" style={{ color: `#667eea` }}>
                View Gallery →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section style={{ background: `#f7fafc`, padding: `3rem 1rem` }}>
        <div style={{ maxWidth: 960, margin: `0 auto` }}>
          <h2 style={{ textAlign: `center`, marginBottom: `2rem` }}>
            Latest News
          </h2>
          <div style={{
            display: `grid`,
            gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
            gap: `2rem`,
          }}>
            {latestNews.length > 0 ? (
              latestNews.map((article, index) => (
                <div key={index} style={{
                  background: `white`,
                  padding: `1.5rem`,
                  borderRadius: `8px`,
                  boxShadow: `0 2px 4px rgba(0,0,0,0.1)`,
                }}>
                  <h3>{article.frontmatter.title}</h3>
                  <p style={{ color: `#666` }}>
                    {article.frontmatter.date}
                  </p>
                  <p>{article.excerpt}</p>
                  <Link to={article.fields.slug} style={{ color: `#667eea` }}>
                    Read More →
                  </Link>
                </div>
              ))
            ) : (
              <p style={{ textAlign: `center`, gridColumn: `1 / -1` }}>
                No news articles available yet.
              </p>
            )}
          </div>
          <div style={{ textAlign: `center`, marginTop: `2rem` }}>
            <Link 
              to="/news" 
              style={{
                background: `#667eea`,
                color: `white`,
                padding: `0.75rem 1.5rem`,
                textDecoration: `none`,
                borderRadius: `5px`,
                fontWeight: `bold`,
              }}
            >
              View All News
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section style={{ padding: `3rem 1rem` }}>
        <div style={{ maxWidth: 960, margin: `0 auto` }}>
          <h2 style={{ textAlign: `center`, marginBottom: `2rem` }}>
            Upcoming Events
          </h2>
          <div style={{
            display: `grid`,
            gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
            gap: `2rem`,
          }}>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <div key={index} style={{
                  background: `white`,
                  padding: `1.5rem`,
                  borderRadius: `8px`,
                  border: `1px solid #e2e8f0`,
                  boxShadow: `0 2px 4px rgba(0,0,0,0.1)`,
                }}>
                  <h3>{event.frontmatter.title}</h3>
                  <p style={{ color: `#666` }}>
                    {event.frontmatter.date}
                  </p>
                  <p>{event.excerpt}</p>
                  <Link to={event.fields.slug} style={{ color: `#667eea` }}>
                    Learn More →
                  </Link>
                </div>
              ))
            ) : (
              <p style={{ textAlign: `center`, gridColumn: `1 / -1` }}>
                No upcoming events scheduled.
              </p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      limit: 10
    ) {
      nodes {
        excerpt(pruneLength: 160)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          type
        }
      }
    }
  }
`

export default IndexPage
