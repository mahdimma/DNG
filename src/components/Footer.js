import React from "react"
import { Link } from "gatsby"

const Footer = () => (
  <footer style={{
    background: `#1a202c`,
    color: `white`,
    padding: `2rem 1rem`,
    marginTop: `2rem`,
  }}>
    <div style={{
      margin: `0 auto`,
      maxWidth: 960,
      display: `grid`,
      gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
      gap: `2rem`,
    }}>
      <div>
        <h3>Dangepia Village</h3>
        <p>
          Welcome to our beautiful village. Stay connected with the latest news,
          events, and services.
        </p>
      </div>
      <div>
        <h4>Quick Links</h4>
        <ul style={{ listStyle: `none`, padding: 0 }}>
          <li style={{ marginBottom: `0.5rem` }}>
            <Link to="/about" style={{ color: `#cbd5e0`, textDecoration: `none` }}>
              About Us
            </Link>
          </li>
          <li style={{ marginBottom: `0.5rem` }}>
            <Link to="/news" style={{ color: `#cbd5e0`, textDecoration: `none` }}>
              News
            </Link>
          </li>
          <li style={{ marginBottom: `0.5rem` }}>
            <Link to="/services" style={{ color: `#cbd5e0`, textDecoration: `none` }}>
              Services
            </Link>
          </li>
          <li style={{ marginBottom: `0.5rem` }}>
            <Link to="/contact" style={{ color: `#cbd5e0`, textDecoration: `none` }}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4>Legal</h4>
        <ul style={{ listStyle: `none`, padding: 0 }}>
          <li style={{ marginBottom: `0.5rem` }}>
            <Link to="/privacy-policy" style={{ color: `#cbd5e0`, textDecoration: `none` }}>
              Privacy Policy
            </Link>
          </li>
          <li style={{ marginBottom: `0.5rem` }}>
            <Link to="/terms-of-service" style={{ color: `#cbd5e0`, textDecoration: `none` }}>
              Terms of Service
            </Link>
          </li>
        </ul>
      </div>
    </div>
    <div style={{
      textAlign: `center`,
      marginTop: `2rem`,
      paddingTop: `2rem`,
      borderTop: `1px solid #4a5568`,
    }}>
      <p>
        © {new Date().getFullYear()} Dangepia Village. All rights reserved.
      </p>
    </div>
  </footer>
)

export default Footer
