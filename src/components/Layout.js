import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled, { createGlobalStyle } from "styled-components"
import Header from "./Header"
import Footer from "./Footer"

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  html {
    direction: rtl;
    text-align: right;
  }
  
  body {
    font-family: 'Tahoma', 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    direction: rtl;
  }
  
  a {
    text-decoration: none;
  }
  
  ul, ol {
    padding-right: 1rem;
    padding-left: 0;
  }
`

const Layout = ({ children, title, description }) => {
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

  return (
    <>
      <GlobalStyle />
      <Helmet>
        <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
        <meta name="description" content={description || siteDescription} />
        <meta property="og:title" content={title ? `${title} | ${siteTitle}` : siteTitle} />
        <meta property="og:description" content={description || siteDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title ? `${title} | ${siteTitle}` : siteTitle} />
        <meta name="twitter:description" content={description || siteDescription} />
        <html lang="fa" dir="rtl" />
      </Helmet>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header siteTitle={siteTitle} />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
