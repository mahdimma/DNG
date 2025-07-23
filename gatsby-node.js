const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

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
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              type
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (!node.fields || !node.fields.slug) {
      // Skip nodes without a slug
      return;
    }
    const templatePath = node.frontmatter.type === "news"
      ? path.resolve("src/templates/news-article.js")
      : path.resolve("src/templates/event.js");

    createPage({
      path: node.fields.slug,
      component: templatePath,
      context: {
        slug: node.fields.slug,
      },
    });
  });
};
