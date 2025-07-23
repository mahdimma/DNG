import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"

const NotFoundPage = () => (
  <Layout title="Page Not Found">
    <HeroSection 
      title="404"
      subtitle="صفحه مورد نظر یافت نشد"
      showButtons={false}
      showScrollIndicator={true}
    />
    <div style={{
      textAlign: `center`,
      padding: `4rem 1rem`,
      maxWidth: 600,
      margin: `0 auto`,
    }}>
      <div style={{ fontSize: `6rem`, marginBottom: `1rem` }}>🏘️</div>
      <h1 style={{ fontSize: `3rem`, marginBottom: `1rem` }}>404</h1>
      <h2 style={{ marginBottom: `2rem`, color: `#4a5568` }}>
        Page Not Found
      </h2>
      <p style={{ 
        fontSize: `1.1rem`, 
        marginBottom: `2rem`,
        color: `#4a5568`,
        lineHeight: `1.6`,
      }}>
        Sorry, we couldn't find the page you're looking for. The page may have been moved, 
        deleted, or the URL might be incorrect.
      </p>
      
      <div style={{
        background: `#f7fafc`,
        padding: `2rem`,
        borderRadius: `8px`,
        marginBottom: `2rem`,
      }}>
        <h3 style={{ marginBottom: `1rem` }}>Here are some helpful links:</h3>
        <div style={{
          display: `grid`,
          gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
          gap: `1rem`,
        }}>
          <Link 
            to="/"
            style={{
              background: `white`,
              color: `#667eea`,
              padding: `1rem`,
              textDecoration: `none`,
              borderRadius: `5px`,
              border: `1px solid #e2e8f0`,
              fontWeight: `bold`,
              display: `block`,
            }}
          >
            🏠 Home
          </Link>
          <Link 
            to="/news"
            style={{
              background: `white`,
              color: `#667eea`,
              padding: `1rem`,
              textDecoration: `none`,
              borderRadius: `5px`,
              border: `1px solid #e2e8f0`,
              fontWeight: `bold`,
              display: `block`,
            }}
          >
            📰 News & Events
          </Link>
          <Link 
            to="/services"
            style={{
              background: `white`,
              color: `#667eea`,
              padding: `1rem`,
              textDecoration: `none`,
              borderRadius: `5px`,
              border: `1px solid #e2e8f0`,
              fontWeight: `bold`,
              display: `block`,
            }}
          >
            🏛️ Services
          </Link>
          <Link 
            to="/contact"
            style={{
              background: `white`,
              color: `#667eea`,
              padding: `1rem`,
              textDecoration: `none`,
              borderRadius: `5px`,
              border: `1px solid #e2e8f0`,
              fontWeight: `bold`,
              display: `block`,
            }}
          >
            📞 Contact
          </Link>
        </div>
      </div>

      <Link 
        to="/"
        style={{
          background: `#667eea`,
          color: `white`,
          padding: `1rem 2rem`,
          textDecoration: `none`,
          borderRadius: `5px`,
          fontWeight: `bold`,
          fontSize: `1.1rem`,
          display: `inline-block`,
        }}
      >
        ← Return to Homepage
      </Link>
    </div>
  </Layout>
)

export default NotFoundPage
