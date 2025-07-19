import React from "react"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
  <header style={{
    background: `#2c5282`,
    marginBottom: `1.45rem`,
  }}>
    <div style={{
      margin: `0 auto`,
      maxWidth: 960,
      padding: `1.45rem 1.0875rem`,
    }}>
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <nav style={{ marginTop: `1rem` }}>
        <ul style={{
          display: `flex`,
          listStyle: `none`,
          margin: 0,
          padding: 0,
          gap: `1rem`,
        }}>
          <li>
            <Link to="/" style={{ color: `white`, textDecoration: `none` }}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" style={{ color: `white`, textDecoration: `none` }}>
              About
            </Link>
          </li>
          <li>
            <Link to="/news" style={{ color: `white`, textDecoration: `none` }}>
              News
            </Link>
          </li>
          <li>
            <Link to="/services" style={{ color: `white`, textDecoration: `none` }}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/contact" style={{ color: `white`, textDecoration: `none` }}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/gallery" style={{ color: `white`, textDecoration: `none` }}>
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/maps" style={{ color: `white`, textDecoration: `none` }}>
              Maps
            </Link>
          </li>
          <li>
            <Link to="/weather" style={{ color: `white`, textDecoration: `none` }}>
              Weather
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
)

export default Header
