const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

// Define schema for optional frontmatter fields
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  
  const typeDefs = `
    type MarkdownRemarkFrontmatter {
      image: String
      description: String
    }
  `;
  
  createTypes(typeDefs);
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const type = node.frontmatter && node.frontmatter.type;
    const baseSlug = createFilePath({ node, getNode, basePath: "content", trailingSlash: false });
    let slug = baseSlug;
    if (type === "news") {
      slug = `/news${baseSlug}`;
    } else if (type === "event") {
      slug = `/event${baseSlug}`;
    }
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              type
              title
              date
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const allNodes = result.data.allMarkdownRemark.edges;
  const newsNodes = allNodes.filter(({ node }) => node.frontmatter.type === "news");
  const eventNodes = allNodes.filter(({ node }) => node.frontmatter.type === "event");

  // Create news article pages with navigation context
  newsNodes.forEach(({ node }, index) => {
    if (!node.fields || !node.fields.slug) {
      return;
    }

    const previous = index === newsNodes.length - 1 ? null : newsNodes[index + 1].node;
    const next = index === 0 ? null : newsNodes[index - 1].node;

    createPage({
      path: node.fields.slug,
      component: path.resolve("src/templates/news-article.js"),
      context: {
        slug: node.fields.slug,
        previous,
        next,
      },
    });
  });

  // Create event pages
  eventNodes.forEach(({ node }) => {
    if (!node.fields || !node.fields.slug) {
      return;
    }

    createPage({
      path: node.fields.slug,
      component: path.resolve("src/templates/event.js"),
      context: {
        slug: node.fields.slug,
      },
    });
  });
};
