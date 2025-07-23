import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"

const EventTemplate = ({ data }) => {
  const event = data.markdownRemark
  const eventDate = new Date(event.frontmatter.eventDate)
  const isUpcoming = eventDate > new Date()
  const isPast = eventDate < new Date()

  return (
    <Layout 
      title={event.frontmatter.title}
      description={event.excerpt}
    >
      <article style={{ maxWidth: 800, margin: `0 auto`, padding: `2rem 1rem` }}>
        {/* Event Header */}
        <header style={{ marginBottom: `3rem` }}>
          <div style={{ marginBottom: `1rem` }}>
            <Link 
              to="/events"
              style={{
                color: `#667eea`,
                textDecoration: `none`,
                fontSize: `0.9rem`,
                fontWeight: `bold`,
              }}
            >
              ← Back to Events
            </Link>
          </div>
          
          <h1 style={{ 
            fontSize: `2.5rem`,
            lineHeight: `1.2`,
            marginBottom: `1rem`,
            color: `#2d3748`,
          }}>
            {event.frontmatter.title}
          </h1>
          
          {/* Event Status */}
          <div style={{ marginBottom: `1.5rem` }}>
            {isUpcoming && (
              <span style={{
                background: `#c6f6d5`,
                color: `#22543d`,
                padding: `0.5rem 1rem`,
                borderRadius: `20px`,
                fontSize: `0.9rem`,
                fontWeight: `bold`,
                display: `inline-block`,
              }}>
                🗓️ Upcoming Event
              </span>
            )}
            {isPast && (
              <span style={{
                background: `#e2e8f0`,
                color: `#4a5568`,
                padding: `0.5rem 1rem`,
                borderRadius: `20px`,
                fontSize: `0.9rem`,
                fontWeight: `bold`,
                display: `inline-block`,
              }}>
                📅 Past Event
              </span>
            )}
          </div>

          {/* Event Details Box */}
          <div style={{
            background: `#f7fafc`,
            border: `1px solid #e2e8f0`,
            borderRadius: `8px`,
            padding: `2rem`,
            marginBottom: `2rem`,
          }}>
            <h3 style={{ 
              marginBottom: `1.5rem`,
              color: `#2d3748`,
              borderBottom: `2px solid #667eea`,
              paddingBottom: `0.5rem`,
            }}>
              Event Details
            </h3>
            
            <div style={{
              display: `grid`,
              gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
              gap: `1.5rem`,
            }}>
              <div>
                <div style={{ 
                  display: `flex`,
                  alignItems: `center`,
                  gap: `0.5rem`,
                  marginBottom: `0.5rem`,
                }}>
                  <span style={{ fontSize: `1.2rem` }}>📅</span>
                  <strong>Date & Time</strong>
                </div>
                <div style={{ color: `#4a5568`, marginLeft: `1.7rem` }}>
                  {event.frontmatter.eventDate && (
                    <div>{new Date(event.frontmatter.eventDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</div>
                  )}
                  {event.frontmatter.eventTime && (
                    <div>{event.frontmatter.eventTime}</div>
                  )}
                </div>
              </div>

              <div>
                <div style={{ 
                  display: `flex`,
                  alignItems: `center`,
                  gap: `0.5rem`,
                  marginBottom: `0.5rem`,
                }}>
                  <span style={{ fontSize: `1.2rem` }}>📍</span>
                  <strong>Location</strong>
                </div>
                <div style={{ color: `#4a5568`, marginLeft: `1.7rem` }}>
                  {event.frontmatter.location || 'Location TBA'}
                </div>
              </div>

              <div>
                <div style={{ 
                  display: `flex`,
                  alignItems: `center`,
                  gap: `0.5rem`,
                  marginBottom: `0.5rem`,
                }}>
                  <span style={{ fontSize: `1.2rem` }}>👥</span>
                  <strong>Organizer</strong>
                </div>
                <div style={{ color: `#4a5568`, marginLeft: `1.7rem` }}>
                  {event.frontmatter.organizer || 'Village Administration'}
                </div>
              </div>

              <div>
                <div style={{ 
                  display: `flex`,
                  alignItems: `center`,
                  gap: `0.5rem`,
                  marginBottom: `0.5rem`,
                }}>
                  <span style={{ fontSize: `1.2rem` }}>📰</span>
                  <strong>Posted</strong>
                </div>
                <div style={{ color: `#4a5568`, marginLeft: `1.7rem` }}>
                  {event.frontmatter.date}
                </div>
              </div>
            </div>
          </div>
          
          <hr style={{ border: `none`, borderTop: `2px solid #e2e8f0` }} />
        </header>

        {/* Event Content */}
        <div 
          style={{
            lineHeight: `1.8`,
            fontSize: `1.1rem`,
            color: `#2d3748`,
          }}
          dangerouslySetInnerHTML={{ __html: event.html }}
        />

        {/* Action Buttons */}
        {isUpcoming && (
          <div style={{
            background: `#e6fffa`,
            border: `1px solid #81e6d9`,
            borderRadius: `8px`,
            padding: `2rem`,
            marginTop: `3rem`,
            textAlign: `center`,
          }}>
            <h4 style={{ marginBottom: `1rem`, color: `#234e52` }}>
              Interested in Attending?
            </h4>
            <p style={{ marginBottom: `1.5rem`, color: `#285e61` }}>
              For more information or to register for this event, please contact us:
            </p>
            <div style={{ display: `flex`, gap: `1rem`, justifyContent: `center`, flexWrap: `wrap` }}>
              <a 
                href="tel:+98XXXXXXXX"
                style={{
                  background: `#38b2ac`,
                  color: `white`,
                  padding: `0.75rem 1.5rem`,
                  textDecoration: `none`,
                  borderRadius: `5px`,
                  fontWeight: `bold`,
                }}
              >
                📞 Call Village Office
              </a>
              <Link 
                to="/contact"
                style={{
                  background: `white`,
                  color: `#38b2ac`,
                  padding: `0.75rem 1.5rem`,
                  textDecoration: `none`,
                  borderRadius: `5px`,
                  fontWeight: `bold`,
                  border: `2px solid #38b2ac`,
                }}
              >
                ✉️ Send Message
              </Link>
            </div>
          </div>
        )}

        {/* Event Footer */}
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
            <h4 style={{ marginBottom: `1rem` }}>Share this event</h4>
            <div style={{ display: `flex`, gap: `1rem`, flexWrap: `wrap` }}>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: event.frontmatter.title,
                      text: `Join us for ${event.frontmatter.title} on ${event.frontmatter.eventDate}`,
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
                Share Event
              </button>
              <button
                onClick={() => {
                  // Create calendar event data
                  const startDate = new Date(event.frontmatter.eventDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
                  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.frontmatter.title)}&dates=${startDate}/${startDate}&location=${encodeURIComponent(event.frontmatter.location || '')}`
                  window.open(calendarUrl, '_blank')
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
                Add to Calendar
              </button>
            </div>
          </div>

          <div style={{
            background: `#e2e8f0`,
            padding: `1.5rem`,
            borderRadius: `8px`,
            textAlign: `center`,
          }}>
            <h4>More Events</h4>
            <p style={{ marginBottom: `1rem` }}>
              Discover more upcoming events in Dangepia Village
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
              View All Events
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
        eventDate
        eventTime
        location
        organizer
        featured
      }
    }
  }
`

export default EventTemplate
