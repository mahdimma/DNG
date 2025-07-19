import React from "react"
import Layout from "../components/Layout"

const ServicesPage = () => {
  const services = [
    {
      title: "Municipal Services",
      description: "Water supply, waste management, and municipal maintenance services.",
      contact: "Call: +98-XXX-XXXX",
      hours: "Monday - Friday: 8:00 AM - 4:00 PM"
    },
    {
      title: "Healthcare Services",
      description: "Local clinic providing basic healthcare services and emergency care.",
      contact: "Emergency: 115 | Clinic: +98-XXX-XXXX",
      hours: "24/7 Emergency | Clinic: 8:00 AM - 6:00 PM"
    },
    {
      title: "Educational Services",
      description: "Primary and secondary education facilities in our village.",
      contact: "School Office: +98-XXX-XXXX",
      hours: "Monday - Friday: 7:30 AM - 3:30 PM"
    },
    {
      title: "Transportation",
      description: "Public transportation schedules and routes to nearby cities.",
      contact: "Transport Office: +98-XXX-XXXX",
      hours: "Daily: 6:00 AM - 10:00 PM"
    },
    {
      title: "Cultural Center",
      description: "Community events, library services, and cultural activities.",
      contact: "Cultural Center: +98-XXX-XXXX",
      hours: "Tuesday - Sunday: 9:00 AM - 8:00 PM"
    },
    {
      title: "Agricultural Support",
      description: "Agricultural extension services and farming support for local farmers.",
      contact: "Agriculture Office: +98-XXX-XXXX",
      hours: "Monday - Friday: 7:00 AM - 3:00 PM"
    }
  ]

  return (
    <Layout title="Services" description="Explore the various services available to residents of Dangepia Village">
      <div style={{ maxWidth: 960, margin: `0 auto`, padding: `2rem 1rem` }}>
        <h1>Village Services</h1>
        <p style={{ fontSize: `1.1rem`, marginBottom: `3rem` }}>
          Dangepia Village provides a comprehensive range of services to meet the needs of our community.
          Below you'll find information about available services, contact details, and operating hours.
        </p>

        <div style={{
          display: `grid`,
          gridTemplateColumns: `repeat(auto-fit, minmax(350px, 1fr))`,
          gap: `2rem`,
          marginBottom: `3rem`,
        }}>
          {services.map((service, index) => (
            <div key={index} style={{
              background: `white`,
              padding: `2rem`,
              borderRadius: `8px`,
              boxShadow: `0 2px 4px rgba(0,0,0,0.1)`,
              border: `1px solid #e2e8f0`,
            }}>
              <h3 style={{ 
                color: `#2d3748`,
                marginBottom: `1rem`,
                borderBottom: `2px solid #667eea`,
                paddingBottom: `0.5rem`,
              }}>
                {service.title}
              </h3>
              <p style={{ 
                lineHeight: `1.6`,
                marginBottom: `1rem`,
                color: `#4a5568`,
              }}>
                {service.description}
              </p>
              <div style={{ 
                background: `#f7fafc`,
                padding: `1rem`,
                borderRadius: `5px`,
                marginBottom: `1rem`,
              }}>
                <strong style={{ color: `#2d3748` }}>Contact:</strong>
                <br />
                <span style={{ color: `#4a5568` }}>{service.contact}</span>
              </div>
              <div style={{ 
                background: `#f7fafc`,
                padding: `1rem`,
                borderRadius: `5px`,
              }}>
                <strong style={{ color: `#2d3748` }}>Hours:</strong>
                <br />
                <span style={{ color: `#4a5568` }}>{service.hours}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Contacts */}
        <section style={{
          background: `#fed7d7`,
          padding: `2rem`,
          borderRadius: `8px`,
          marginBottom: `3rem`,
          border: `1px solid #feb2b2`,
        }}>
          <h2 style={{ color: `#c53030`, marginBottom: `1rem` }}>
            Emergency Contacts
          </h2>
          <div style={{
            display: `grid`,
            gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
            gap: `1rem`,
          }}>
            <div>
              <strong>Police:</strong> 110
            </div>
            <div>
              <strong>Fire Department:</strong> 125
            </div>
            <div>
              <strong>Medical Emergency:</strong> 115
            </div>
            <div>
              <strong>Village Office:</strong> +98-XXX-XXXX
            </div>
          </div>
        </section>

        {/* Service Request */}
        <section style={{
          background: `#f7fafc`,
          padding: `2rem`,
          borderRadius: `8px`,
          textAlign: `center`,
        }}>
          <h3>Need to Request a Service?</h3>
          <p style={{ marginBottom: `1.5rem` }}>
            For service requests, complaints, or suggestions, please contact the village office
            or visit us during office hours.
          </p>
          <div style={{
            display: `flex`,
            gap: `1rem`,
            justifyContent: `center`,
            flexWrap: `wrap`,
          }}>
            <a 
              href="tel:+98XXXXXXXX"
              style={{
                background: `#667eea`,
                color: `white`,
                padding: `0.75rem 1.5rem`,
                textDecoration: `none`,
                borderRadius: `5px`,
                fontWeight: `bold`,
              }}
            >
              Call Village Office
            </a>
            <a 
              href="/contact"
              style={{
                background: `white`,
                color: `#667eea`,
                padding: `0.75rem 1.5rem`,
                textDecoration: `none`,
                borderRadius: `5px`,
                fontWeight: `bold`,
                border: `2px solid #667eea`,
              }}
            >
              Contact Form
            </a>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default ServicesPage
