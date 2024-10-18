
import React from 'react'
import { graphql, Link } from 'gatsby'

export default function NewsPage({ data }) {
  return (
    <div>
      <h1>News</h1>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <h2><Link to={`/news/${node.fields.slug}`}>{node.frontmatter.title}</Link></h2>
          <p>{node.frontmatter.date}</p>
        </div>
      ))}
    </div>
  )
}

export const query = graphql`
  {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
          fields {
            slug
          }
          id
        }
      }
    }
  }
`
