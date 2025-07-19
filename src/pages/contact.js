import React, { useState } from "react"
import Layout from "../components/Layout"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to a server
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    // Reset form after a delay
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <Layout title="Contact Us" description="Get in touch with Dangepia Village officials and community leaders">
      <div style={{ maxWidth: 960, margin: `0 auto`, padding: `2rem 1rem` }}>
        <h1>Contact Us</h1>
        <p style={{ fontSize: `1.1rem`, marginBottom: `3rem` }}>
          We'd love to hear from you! Get in touch with us for any questions, concerns, 
          or suggestions about our village.
        </p>

        <div style={{
          display: `grid`,
          gridTemplateColumns: `1fr 1fr`,
          gap: `3rem`,
          '@media (max-width: 768px)': {
            gridTemplateColumns: `1fr`,
          }
        }}>
          {/* Contact Form */}
          <div>
            <h2>Send us a Message</h2>
            {isSubmitted ? (
              <div style={{
                background: `#c6f6d5`,
                color: `#22543d`,
                padding: `1rem`,
                borderRadius: `5px`,
                marginBottom: `2rem`,
                border: `1px solid #9ae6b4`,
              }}>
                Thank you for your message! We'll get back to you soon.
              </div>
            ) : null}
            
            <form onSubmit={handleSubmit} style={{ marginBottom: `2rem` }}>
              <div style={{ marginBottom: `1rem` }}>
                <label htmlFor="name" style={{ 
                  display: `block`, 
                  marginBottom: `0.5rem`,
                  fontWeight: `bold`,
                }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: `100%`,
                    padding: `0.75rem`,
                    border: `1px solid #e2e8f0`,
                    borderRadius: `5px`,
                    fontSize: `1rem`,
                  }}
                />
              </div>

              <div style={{ marginBottom: `1rem` }}>
                <label htmlFor="email" style={{ 
                  display: `block`, 
                  marginBottom: `0.5rem`,
                  fontWeight: `bold`,
                }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: `100%`,
                    padding: `0.75rem`,
                    border: `1px solid #e2e8f0`,
                    borderRadius: `5px`,
                    fontSize: `1rem`,
                  }}
                />
              </div>

              <div style={{ marginBottom: `1rem` }}>
                <label htmlFor="subject" style={{ 
                  display: `block`, 
                  marginBottom: `0.5rem`,
                  fontWeight: `bold`,
                }}>
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={{
                    width: `100%`,
                    padding: `0.75rem`,
                    border: `1px solid #e2e8f0`,
                    borderRadius: `5px`,
                    fontSize: `1rem`,
                  }}
                >
                  <option value="">Select a subject...</option>
                  <option value="general">General Inquiry</option>
                  <option value="services">Village Services</option>
                  <option value="complaint">Complaint</option>
                  <option value="suggestion">Suggestion</option>
                  <option value="event">Event Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div style={{ marginBottom: `1.5rem` }}>
                <label htmlFor="message" style={{ 
                  display: `block`, 
                  marginBottom: `0.5rem`,
                  fontWeight: `bold`,
                }}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  style={{
                    width: `100%`,
                    padding: `0.75rem`,
                    border: `1px solid #e2e8f0`,
                    borderRadius: `5px`,
                    fontSize: `1rem`,
                    resize: `vertical`,
                  }}
                  placeholder="Please describe your inquiry in detail..."
                />
              </div>

              <button
                type="submit"
                style={{
                  background: `#667eea`,
                  color: `white`,
                  padding: `0.75rem 2rem`,
                  border: `none`,
                  borderRadius: `5px`,
                  fontSize: `1rem`,
                  fontWeight: `bold`,
                  cursor: `pointer`,
                  transition: `background-color 0.2s`,
                }}
                onMouseOver={(e) => e.target.style.background = '#5a67d8'}
                onMouseOut={(e) => e.target.style.background = '#667eea'}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2>Contact Information</h2>
            
            <div style={{
              background: `#f7fafc`,
              padding: `2rem`,
              borderRadius: `8px`,
              marginBottom: `2rem`,
            }}>
              <h3 style={{ marginBottom: `1rem` }}>Village Office</h3>
              <div style={{ marginBottom: `1rem` }}>
                <strong>Address:</strong><br />
                Dangepia Village Office<br />
                Main Street, Dangepia<br />
                [Postal Code], [Province], Iran
              </div>
              <div style={{ marginBottom: `1rem` }}>
                <strong>Phone:</strong> +98-XXX-XXXX
              </div>
              <div style={{ marginBottom: `1rem` }}>
                <strong>Email:</strong> info@dangepia.ir
              </div>
              <div>
                <strong>Office Hours:</strong><br />
                Monday - Friday: 8:00 AM - 4:00 PM<br />
                Saturday: 9:00 AM - 1:00 PM<br />
                Sunday: Closed
              </div>
            </div>

            <div style={{
              background: `#f7fafc`,
              padding: `2rem`,
              borderRadius: `8px`,
              marginBottom: `2rem`,
            }}>
              <h3 style={{ marginBottom: `1rem` }}>Village Council</h3>
              <div style={{ marginBottom: `1rem` }}>
                <strong>Mayor:</strong> [Mayor Name]<br />
                <strong>Email:</strong> mayor@dangepia.ir
              </div>
              <div>
                <strong>Council Meetings:</strong><br />
                First Thursday of each month<br />
                7:00 PM at Village Hall
              </div>
            </div>

            <div style={{
              background: `#fed7d7`,
              padding: `2rem`,
              borderRadius: `8px`,
              border: `1px solid #feb2b2`,
            }}>
              <h3 style={{ color: `#c53030`, marginBottom: `1rem` }}>
                Emergency Contacts
              </h3>
              <div style={{ marginBottom: `0.5rem` }}>
                <strong>Police:</strong> 110
              </div>
              <div style={{ marginBottom: `0.5rem` }}>
                <strong>Fire Department:</strong> 125
              </div>
              <div style={{ marginBottom: `0.5rem` }}>
                <strong>Medical Emergency:</strong> 115
              </div>
              <div>
                <strong>Village Emergency Line:</strong> +98-XXX-XXXX
              </div>
            </div>
          </div>
        </div>

        {/* Map Section Placeholder */}
        <section style={{
          marginTop: `3rem`,
          background: `#f7fafc`,
          padding: `2rem`,
          borderRadius: `8px`,
          textAlign: `center`,
        }}>
          <h3>Find Us</h3>
          <p style={{ marginBottom: `1rem` }}>
            Visit our village office during business hours or attend our monthly council meetings.
          </p>
          <div style={{
            background: `#e2e8f0`,
            height: `300px`,
            borderRadius: `8px`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            color: `#4a5568`,
          }}>
            <div>
              <p>Interactive Map</p>
              <p style={{ fontSize: `0.9rem` }}>
                (Map integration would be added here)
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default ContactPage
