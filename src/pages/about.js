import React from "react"
import Layout from "../components/Layout"

const AboutPage = () => {
  return (
    <Layout title="About Us" description="Learn about Dangepia Village, its history, culture, and community">
      <div style={{ maxWidth: 960, margin: `0 auto`, padding: `2rem 1rem` }}>
        <h1>About Dangepia Village</h1>
        
        <section style={{ marginBottom: `3rem` }}>
          <h2>Our History</h2>
          <p>
            Dangepia Village has a rich history spanning centuries. Founded in the early days,
            our village has been a center of community, culture, and tradition. The village
            has preserved its historical charm while embracing modern amenities for its residents.
          </p>
        </section>

        <section style={{ marginBottom: `3rem` }}>
          <h2>Our Community</h2>
          <p>
            Our village is home to a vibrant community of families who have lived here for
            generations, as well as newcomers who have been welcomed with open arms. We pride
            ourselves on our strong sense of community, mutual support, and shared values.
          </p>
        </section>

        <section style={{ marginBottom: `3rem` }}>
          <h2>Culture & Traditions</h2>
          <p>
            Dangepia Village maintains its cultural heritage through various festivals,
            celebrations, and traditional practices. Our annual events bring the community
            together and help preserve our unique identity for future generations.
          </p>
        </section>

        <section style={{ marginBottom: `3rem` }}>
          <h2>Geography & Location</h2>
          <p>
            Located in a beautiful natural setting, Dangepia Village offers stunning views
            and a peaceful environment. The village is strategically positioned with good
            access to transportation while maintaining its rural charm.
          </p>
        </section>

        <section style={{ marginBottom: `3rem` }}>
          <h2>Village Leadership</h2>
          <p>
            Our village is governed by a dedicated council of community leaders who work
            tirelessly to ensure the well-being of all residents. The village council meets
            regularly to discuss community matters and plan for the future.
          </p>
        </section>

        <section>
          <h2>Vision for the Future</h2>
          <p>
            We are committed to sustainable development that preserves our heritage while
            providing modern amenities and opportunities for our residents. Our goal is to
            maintain the balance between tradition and progress.
          </p>
        </section>
      </div>
    </Layout>
  )
}

export default AboutPage
