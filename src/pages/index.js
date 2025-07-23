import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/Layout"

const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 1rem;
  text-align: center;
`

const HeroContent = styled.div`
  max-width: 960px;
  margin: 0 auto;
  
  h1 {
    font-size: 3rem;
    margin: 0 0 1rem 0;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.2rem;
    margin: 0 0 2rem 0;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`

const Button = styled(Link)`
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: all 0.3s;
  
  &.primary {
    background: white;
    color: #667eea;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
  }
  
  &.secondary {
    background: transparent;
    color: white;
    border: 2px solid white;
    
    &:hover {
      background: white;
      color: #667eea;
    }
  }
`

const Section = styled.section`
  padding: 3rem 1rem;
  max-width: 960px;
  margin: 0 auto;
`

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #2d3748;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  h3 {
    color: #2d3748;
    margin-bottom: 1rem;
  }
  
  p {
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
`

const ReadMoreLink = styled(Link)`
  color: #667eea;
  text-decoration: none;
  font-weight: bold;
  
  &:hover {
    text-decoration: underline;
  }
`

const CenterButton = styled.div`
  text-align: center;
`

const IndexPage = ({ data }) => {
  const latestNews = data?.allMarkdownRemark?.nodes?.filter(node => 
    node.frontmatter?.type === 'news'
  ).slice(0, 3) || []
  
  const upcomingEvents = data?.allMarkdownRemark?.nodes?.filter(node => 
    node.frontmatter?.type === 'event'
  ).slice(0, 3) || []

  return (
    <Layout title="خانه">
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <h1>
            به روستای دانگپیا خوش آمدید
          </h1>
          <p>
            زیبایی، فرهنگ و جامعه روستای تاریخی ما را کشف کنید
          </p>
          <ButtonGroup>
            <Button to="/about" className="primary">
              بیشتر بخوانید
            </Button>
            <Button to="/contact" className="secondary">
              تماس با ما
            </Button>
          </ButtonGroup>
        </HeroContent>
      </HeroSection>

      {/* Latest News Section */}
      <Section>
        <SectionTitle>آخرین اخبار</SectionTitle>
        <Grid>
          {latestNews.length > 0 ? (
            latestNews.map((node, index) => (
              <Card key={index}>
                <h3>{node.frontmatter?.title || 'بدون عنوان'}</h3>
                <p>
                  تاریخ: {node.frontmatter?.date || 'نامشخص'}
                </p>
                <p>{node.excerpt}</p>
                <ReadMoreLink to={`/news/${node.fields?.slug || '#'}`}>
                  ادامه مطلب ←
                </ReadMoreLink>
              </Card>
            ))
          ) : (
            <Card>
              <h3>هیچ خبری یافت نشد</h3>
              <p>در حال حاضر خبری برای نمایش وجود ندارد.</p>
            </Card>
          )}
        </Grid>
        <CenterButton>
          <Button to="/news" className="primary">
            مشاهده همه اخبار
          </Button>
        </CenterButton>
      </Section>

      {/* Upcoming Events Section */}
      <Section style={{ backgroundColor: '#f7fafc' }}>
        <SectionTitle>رویدادهای پیش رو</SectionTitle>
        <Grid>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((node, index) => (
              <Card key={index}>
                <h3>{node.frontmatter?.title || 'بدون عنوان'}</h3>
                <p>
                  تاریخ: {node.frontmatter?.date || 'نامشخص'}
                </p>
                <p>{node.excerpt}</p>
                <ReadMoreLink to={`/events/${node.fields?.slug || '#'}`}>
                  جزئیات بیشتر ←
                </ReadMoreLink>
              </Card>
            ))
          ) : (
            <Card>
              <h3>هیچ رویدادی یافت نشد</h3>
              <p>در حال حاضر رویدادی برای نمایش وجود ندارد.</p>
            </Card>
          )}
        </Grid>
      </Section>

      {/* Village Features Section */}
      <Section>
        <SectionTitle>امکانات روستا</SectionTitle>
        <Grid>
          <Card>
            <h3>خدمات بهداشتی</h3>
            <p>
              دسترسی به خدمات پزشکی و بهداشتی با کیفیت برای همه ساکنان روستا.
            </p>
            <ReadMoreLink to="/services">
              اطلاعات بیشتر ←
            </ReadMoreLink>
          </Card>
          <Card>
            <h3>مراکز آموزشی</h3>
            <p>
              مدارس و مراکز آموزشی مجهز برای تعلیم و تربیت کودکان و نوجوانان.
            </p>
            <ReadMoreLink to="/services">
              اطلاعات بیشتر ←
            </ReadMoreLink>
          </Card>
          <Card>
            <h3>زیرساخت های مدرن</h3>
            <p>
              جاده های آسفالته، آب و برق و اینترنت پرسرعت در دسترس همگان.
            </p>
            <ReadMoreLink to="/services">
              اطلاعات بیشتر ←
            </ReadMoreLink>
          </Card>
        </Grid>
      </Section>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      limit: 10
    ) {
      nodes {
        excerpt(pruneLength: 160)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          type
        }
      }
    }
  }
`

export default IndexPage
