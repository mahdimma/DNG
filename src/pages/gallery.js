import React from "react";
import Layout from "../components/Layout";
// Import Gatsby image plugins
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const GalleryPage = () => {
  // Query images from the filesystem using GraphQL
  const data = useStaticQuery(graphql`
    query GalleryImages {
      allFile(
        filter: {
          relativeDirectory: { regex: "/gallery/" }
          extension: { regex: "/(jpg|jpeg|png|tiff)/" }
        }
      ) {
        nodes {
          childImageSharp {
            gatsbyImageData(
              width: 600
              height: 400
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
          name
          relativeDirectory
        }
      }
    }
  `);

  // Organize images by category based on folder structure
  const categories = [
    "village-life",
    "events-festivals",
    "nature-landscape",
    "historical-sites",
  ];

  const galleryCategories = categories.map((category) => {
    const images = data.allFile.nodes
      .filter((node) => node.relativeDirectory.includes(category))
      .map((node) => ({
        image: getImage(node.childImageSharp),
        name: node.name,
        src: node.name,
        alt: node.name,
        caption: node.name.replace(/-/g, " "),
      }));
    return {
      title: category
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      images,
    };
  });

  return (
    <Layout
      title="Gallery"
      description="Explore photos showcasing the beauty, culture, and life of Dangepia Village"
    >
      <div style={{ maxWidth: 1200, margin: `0 auto`, padding: `2rem 1rem` }}>
        <h1>Village Gallery</h1>
        <p style={{ fontSize: `1.1rem`, marginBottom: `3rem` }}>
          Discover the beauty of Dangepia Village through our photo gallery.
          From daily life to special events, these images capture the essence of
          our community.
        </p>

        {galleryCategories.map((category, categoryIndex) => (
          <section key={categoryIndex} style={{ marginBottom: `4rem` }}>
            <h2
              style={{
                borderBottom: `3px solid #667eea`,
                paddingBottom: `0.5rem`,
                marginBottom: `2rem`,
              }}
            >
              {category.title}
            </h2>

            <div
              style={{
                display: `grid`,
                gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
                gap: `2rem`,
              }}
            >
              {category.images.map((image, imageIndex) => (
                <div
                  key={imageIndex}
                  style={{
                    background: `white`,
                    borderRadius: `8px`,
                    overflow: `hidden`,
                    boxShadow: `0 4px 6px rgba(0,0,0,0.1)`,
                    transition: `transform 0.2s, box-shadow 0.2s`,
                    cursor: `pointer`,
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 25px rgba(0,0,0,0.15)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px rgba(0,0,0,0.1)";
                  }}
                >
                  <div
                    style={{
                      width: `100%`,
                      height: `250px`,
                      background: `linear-gradient(135deg, #f7fafc 0%, #e2e8f0 100%)`,
                      display: `flex`,
                      alignItems: `center`,
                      justifyContent: `center`,
                      color: `#4a5568`,
                      fontSize: `0.9rem`,
                    }}
                  >
                    <div style={{ textAlign: `center` }}>
                      <div style={{ fontSize: `2rem`, marginBottom: `0.5rem` }}>
                        📷
                      </div>
                      <div>{image.alt}</div>
                      <div style={{ fontSize: `0.8rem`, marginTop: `0.5rem` }}>
                        {image.src}
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: `1rem` }}>
                    <h4
                      style={{
                        margin: `0 0 0.5rem 0`,
                        color: `#2d3748`,
                      }}
                    >
                      {image.caption}
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        color: `#4a5568`,
                        fontSize: `0.9rem`,
                      }}
                    >
                      Click to view full size
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Photo Submission Section */}
        <section
          style={{
            background: `#f7fafc`,
            padding: `3rem`,
            borderRadius: `8px`,
            textAlign: `center`,
            marginTop: `4rem`,
          }}
        >
          <h3>Share Your Photos</h3>
          <p style={{ marginBottom: `2rem`, color: `#4a5568` }}>
            Have beautiful photos of our village? We'd love to feature them in
            our gallery! Submit your photos to be considered for inclusion.
          </p>
          <div
            style={{
              display: `flex`,
              gap: `1rem`,
              justifyContent: `center`,
              flexWrap: `wrap`,
            }}
          >
            <button
              style={{
                background: `#667eea`,
                color: `white`,
                padding: `0.75rem 1.5rem`,
                border: `none`,
                borderRadius: `5px`,
                fontWeight: `bold`,
                cursor: `pointer`,
                fontSize: `1rem`,
              }}
              onMouseOver={(e) => (e.target.style.background = "#5a67d8")}
              onMouseOut={(e) => (e.target.style.background = "#667eea")}
            >
              Submit Photos
            </button>
            <a
              href="/contact"
              style={{
                background: `white`,
                color: `#667eea`,
                padding: `0.75rem 1.5rem`,
                textDecoration: `none`,
                borderRadius: `5px`,
                fontWeight: `bold`,
                border: `2px solid #667eea`,
                display: `inline-block`,
              }}
            >
              Contact Us
            </a>
          </div>
        </section>

        {/* Photography Guidelines */}
        <section
          style={{
            background: `white`,
            padding: `2rem`,
            borderRadius: `8px`,
            border: `1px solid #e2e8f0`,
            marginTop: `2rem`,
          }}
        >
          <h4>Photo Submission Guidelines</h4>
          <ul style={{ color: `#4a5568`, lineHeight: `1.6` }}>
            <li>Photos should be high resolution (minimum 1920x1080)</li>
            <li>Images must be original and taken by the submitter</li>
            <li>Please include a brief description or caption</li>
            <li>
              Respect privacy - ensure people in photos have given consent
            </li>
            <li>Photos should showcase positive aspects of village life</li>
            <li>Accepted formats: JPG, PNG, TIFF</li>
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export default GalleryPage;
