import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ children, title, description, image, url }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `)

  const siteTitle = data.site.siteMetadata?.title
  const siteDescription = data.site.siteMetadata?.description
  const siteUrl = data.site.siteMetadata?.siteUrl || 'https://dangepia.ir'
  const ogImage = image || `${siteUrl}/og-image.jpg`
  const pageUrl = url || siteUrl

  return (
    <>
      <Helmet>
        <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
        <meta name="description" content={description || siteDescription} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={title ? `${title} | ${siteTitle}` : siteTitle} />
        <meta property="og:description" content={description || siteDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content={siteTitle} />
        <meta property="og:locale" content="fa_IR" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={title ? `${title} | ${siteTitle}` : siteTitle} />
        <meta name="twitter:description" content={description || siteDescription} />
        <meta name="twitter:image" content={ogImage} />
        
        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="روستای دنگپیا" />
        <meta name="keywords" content="دنگپیا, روستا, مازندران, آمل, دابودشت, اخبار, رویدادها, جامعه محلی" />
        <link rel="canonical" href={pageUrl} />
        
        {/* Favicon - Logo in browser tab */}
        <link rel="icon" type="image/png" sizes="32x32" href={`${siteUrl}/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${siteUrl}/favicon-16x16.png`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${siteUrl}/apple-touch-icon.png`} />
        <link rel="manifest" href={`${siteUrl}/site.webmanifest`} />
        
        <html lang="fa" dir="rtl" />
      </Helmet>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header siteTitle={siteTitle} />
        <main className="flex-1 animate-fade-in">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
