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
      className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 shadow-lg sticky top-0 z-50"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      {/* Theme color for mobile browsers (improves UX, indirect SEO) */}
      <meta name="theme-color" content="#10b981" /> {/* Tailwind's green-500 */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-18">
          {/* Logo/Site Title with complete Organization Schema */}
          <div
            itemScope
            itemType="https://schema.org/Organization"
            className="flex-shrink-0 group"
          >
            <Link
              to="/"
              className="flex items-center gap-3 text-2xl font-bold text-white hover:text-green-100 transition-all duration-300 group-hover:scale-105"
              aria-label={`${siteTitle} – بازگشت به صفحه اصلی`}
              itemProp="url"
            >
              <div className="w-10 h-10 bg-white/30 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-white/40 transition-all duration-300 p-1.5">
                <img src="/logo.png" alt="Dangepia Logo" className="w-full h-full object-contain" />
              </div>
              <span itemProp="name" className="hidden sm:block">{siteTitle}</span>
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