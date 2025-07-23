import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"

const EventsPage = ({ data }) => {
  const events = data?.allMarkdownRemark?.nodes || []
  
  // Separate upcoming and past events
  const now = new Date()
  const upcomingEvents = events.filter(event => new Date(event.frontmatter.eventDate) >= now)
  const pastEvents = events.filter(event => new Date(event.frontmatter.eventDate) < now)

  const EventCard = ({ event, isPast = false }) => (
    <article style={{
      background: `white`,
      padding: `2rem`,
      borderRadius: `8px`,
      boxShadow: `0 2px 4px rgba(0,0,0,0.1)`,
      border: `1px solid #e2e8f0`,
      opacity: isPast ? 0.7 : 1,
    }}>
      <div style={{ 
        display: `flex`, 
        justifyContent: `space-between`, 
        alignItems: `flex-start`,
        marginBottom: `1rem`,
      }}>
        <h2 style={{ marginBottom: `0.5rem`, flex: 1 }}>
          <Link 
            to={event.fields?.slug || '#'}
            style={{ color: `#2d3748`, textDecoration: `none` }}
          >
            {event.frontmatter.title}
          </Link>
        </h2>
        {event.frontmatter.featured && (
          <span style={{
            background: `#667eea`,
            color: `white`,
            padding: `0.25rem 0.75rem`,
            borderRadius: `12px`,
            fontSize: `0.75rem`,
            fontWeight: `bold`,
            marginLeft: `1rem`,
          }}>
            Featured
          </span>
        )}
      </div>

      <div style={{ 
        display: `grid`,
        gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
        gap: `1rem`,
        marginBottom: `1rem`,
        padding: `1rem`,
        background: `#f7fafc`,
        borderRadius: `6px`,
      }}>
        <div>
          <strong style={{ color: `#4a5568`, fontSize: `0.85rem` }}>DATE</strong>
          <p style={{ margin: 0, color: `#2d3748` }}>{event.frontmatter.eventDate}</p>
        </div>
        {event.frontmatter.eventTime && (
          <div>
            <strong style={{ color: `#4a5568`, fontSize: `0.85rem` }}>TIME</strong>
            <p style={{ margin: 0, color: `#2d3748` }}>{event.frontmatter.eventTime}</p>
          </div>
        )}
        {event.frontmatter.location && (
          <div>
            <strong style={{ color: `#4a5568`, fontSize: `0.85rem` }}>LOCATION</strong>
            <p style={{ margin: 0, color: `#2d3748` }}>{event.frontmatter.location}</p>
          </div>
        )}
        {event.frontmatter.organizer && (
          <div>
            <strong style={{ color: `#4a5568`, fontSize: `0.85rem` }}>ORGANIZER</strong>
            <p style={{ margin: 0, color: `#2d3748` }}>{event.frontmatter.organizer}</p>
          </div>
        )}
      </div>

      <p style={{ 
        lineHeight: `1.6`,
        marginBottom: `1rem`,
        color: `#4a5568`,
      }}>
        {event.excerpt}
      </p>
      
      <div style={{ display: `flex`, justifyContent: `space-between`, alignItems: `center` }}>
        <Link 
          to={event.fields?.slug || '#'}
          style={{
            color: `#667eea`,
            textDecoration: `none`,
            fontWeight: `bold`,
          }}
        >
          {isPast ? 'View Event Details' : 'Learn More'} →
        </Link>
        <div style={{ 
          color: `#666`, 
          fontSize: `0.85rem`,
        }}>
          {isPast && <span style={{ color: `#e53e3e` }}>Past Event</span>}
          {!isPast && new Date(event.frontmatter.eventDate) > new Date() && (
            <span style={{ color: `#38a169` }}>Upcoming</span>
          )}
        </div>
      </div>
    </article>
  )

  return (
    <Layout title="رویدادها" description="رویدادها، جشنواره‌ها و گردهمایی‌های جامعه روستای دانگپیا را کشف کنید">
      {/* Hero Section */}
      <HeroSection 
        title="رویدادها"
        subtitle="در فعالیت‌ها و برنامه‌های جامعه شرکت کنید"
        showButtons={false}
        showScrollIndicator={true}
      />
      
      <div style={{ maxWidth: 960, margin: `0 auto`, padding: `2rem 1rem` }}>

        {/* Upcoming Events Section */}
        {upcomingEvents.length > 0 && (
          <section style={{ marginBottom: `3rem` }}>
            <h2 style={{ 
              color: `#2d3748`, 
              borderBottom: `2px solid #667eea`, 
              paddingBottom: `0.5rem`,
              marginBottom: `2rem`,
            }}>
              Upcoming Events
            </h2>
            <div style={{
              display: `grid`,
              gap: `2rem`,
            }}>
              {upcomingEvents.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* Past Events Section */}
        {pastEvents.length > 0 && (
          <section style={{ marginBottom: `3rem` }}>
            <h2 style={{ 
              color: `#2d3748`, 
              borderBottom: `2px solid #a0aec0`, 
              paddingBottom: `0.5rem`,
              marginBottom: `2rem`,
            }}>
              Past Events
            </h2>
            <div style={{
              display: `grid`,
              gap: `2rem`,
            }}>
              {pastEvents.map((event, index) => (
                <EventCard key={index} event={event} isPast={true} />
              ))}
            </div>
          </section>
        )}

        {/* No Events Message */}
        {events.length === 0 && (
          <div style={{
            background: `#f7fafc`,
            padding: `3rem`,
            borderRadius: `8px`,
            textAlign: `center`,
          }}>
            <h3>No Events Scheduled</h3>
            <p>
              We don't have any events scheduled at the moment. Check back soon for updates on upcoming community gatherings!
            </p>
          </div>
        )}

        {/* Event Categories Section */}
        <section style={{
          marginTop: `3rem`,
          padding: `2rem`,
          background: `#f7fafc`,
          borderRadius: `8px`,
        }}>
          <h3>Event Categories</h3>
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
              Community Meetings
            </span>
            <span style={{
              background: `white`,
              padding: `0.5rem 1rem`,
              borderRadius: `20px`,
              fontSize: `0.9rem`,
              border: `1px solid #e2e8f0`,
            }}>
              Festivals
            </span>
            <span style={{
              background: `white`,
              padding: `0.5rem 1rem`,
              borderRadius: `20px`,
              fontSize: `0.9rem`,
              border: `1px solid #e2e8f0`,
            }}>
              Cultural Events
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
            <span style={{
              background: `white`,
              padding: `0.5rem 1rem`,
              borderRadius: `20px`,
              fontSize: `0.9rem`,
              border: `1px solid #e2e8f0`,
            }}>
              Workshops
            </span>
          </div>
        </section>

        {/* Quick Actions */}
        <section style={{
          marginTop: `2rem`,
          padding: `1.5rem`,
          background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
          borderRadius: `8px`,
          color: `white`,
          textAlign: `center`,
        }}>
          <h3 style={{ color: `white`, marginBottom: `1rem` }}>Stay Connected</h3>
          <p style={{ marginBottom: `1.5rem`, opacity: 0.9 }}>
            Don't miss out on village events and activities. Follow our news and announcements.
          </p>
          <div style={{ display: `flex`, gap: `1rem`, justifyContent: `center`, flexWrap: `wrap` }}>
            <Link 
              to="/news"
              style={{
                background: `rgba(255,255,255,0.2)`,
                color: `white`,
                padding: `0.75rem 1.5rem`,
                borderRadius: `6px`,
                textDecoration: `none`,
                fontWeight: `bold`,
                border: `1px solid rgba(255,255,255,0.3)`,
              }}
            >
              Read News
            </Link>
            <Link 
              to="/contact"
              style={{
                background: `white`,
                color: `#667eea`,
                padding: `0.75rem 1.5rem`,
                borderRadius: `6px`,
                textDecoration: `none`,
                fontWeight: `bold`,
              }}
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "event" } } }
      sort: { frontmatter: { eventDate: ASC } }
    ) {
      nodes {
        excerpt(pruneLength: 200)
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          eventDate(formatString: "MMMM DD, YYYY")
          eventTime
          location
          organizer
          featured
        }
      }
    }
  }
`

export default EventsPage
