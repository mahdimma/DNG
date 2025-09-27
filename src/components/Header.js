import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import CustomNavbar from "./CustomNavbar"

const Header = ({ siteTitle }) => {
  // Fetch site metadata (URL, social, logo, etc.) for structured data
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          siteUrl
          description
          social {
            twitter
            linkedin
            instagram
          }
        }
      }
      file(relativePath: { eq: "logo.png" }) {
        publicURL
      }
    }
  `)

  const { siteUrl, social } = data.site.siteMetadata
  const logoUrl = data.file?.publicURL || `${siteUrl}/logo.png` // Fallback if logo not found

  // Build sameAs array for social profiles (Schema.org)
  const sameAs = [
    social?.twitter,
    social?.linkedin,
    social?.instagram,
  ].filter(Boolean)

  return (
    <header
      className="gradient-bg shadow-lg sticky top-0 z-50"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      {/* Theme color for mobile browsers (improves UX, indirect SEO) */}
      <meta name="theme-color" content="#10b981" /> {/* Tailwind's green-500 */}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Site Title with complete Organization Schema */}
          <div
            itemScope
            itemType="https://schema.org/Organization"
            className="flex-shrink-0"
          >
            <Link
              to="/"
              className="text-2xl font-bold text-white hover:text-green-100 transition-colors duration-200"
              aria-label={`${siteTitle} – بازگشت به صفحه اصلی`}
              itemProp="url"
              aria-current="page"
            >
              <span itemProp="name">{siteTitle}</span>
            </Link>

            {/* Hidden structured data for Organization */}
            <meta itemProp="url" content={siteUrl} />
            <meta itemProp="logo" content={logoUrl} />
            <meta itemProp="sameAs" content={sameAs} />
            {/* Optional: Add if you have a legal name different from siteTitle */}
            {/* <meta itemProp="legalName" content="Your Legal Business Name" /> */}
          </div>

          {/* Custom Navbar */}
          <CustomNavbar />
        </div>
      </div>
    </header>
  )
}

export default Header