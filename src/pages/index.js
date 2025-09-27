import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"

const IndexPage = ({ data }) => {
  const latestNews = data?.allMarkdownRemark?.nodes?.filter(node => 
    node.frontmatter?.type === 'news'
  ).slice(0, 3) || []
  
  const upcomingEvents = data?.allMarkdownRemark?.nodes?.filter(node => 
  node.frontmatter?.type === 'event' && 
  node.frontmatter?.eventDate &&
  new Date(node.frontmatter.eventDate) > new Date()
).slice(0, 3) || []

  return (
    <Layout title="خانه">
      {/* Hero Section */}
      <HeroSection 
        title="به روستای دنگپیا خوش آمدید"
        subtitle="زیبایی، فرهنگ و جامعه روستای تاریخی ما را کشف کنید"
        showButtons={true}
        primaryButton={{
          text: "بیشتر بخوانید",
          to: "/about",
          icon: "M15 19l-7-7 7-7"
        }}
        secondaryButton={{
          text: "تماس با ما", 
          to: "/contact",
          icon: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        }}
        showScrollIndicator={true}
      />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              امکانات روستا
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              روستای دنگپیا با امکانات مدرن و خدمات باکیفیت در خدمت ساکنان است
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center group">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">خدمات بهداشتی</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                دسترسی به خدمات پزشکی و بهداشتی با کیفیت برای همه ساکنان روستا.
              </p>
              <Link to="/services" className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center">
                اطلاعات بیشتر
                <svg className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            </div>

            <div className="card text-center group">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">مراکز آموزشی</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                مدارس و مراکز آموزشی مجهز برای تعلیم و تربیت کودکان و نوجوانان.
              </p>
              <Link to="/services" className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center">
                اطلاعات بیشتر
                <svg className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            </div>

            <div className="card text-center group">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">زیرساخت های مدرن</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                جاده های آسفالته، آب و برق و اینترنت پرسرعت در دسترس همگان.
              </p>
              <Link to="/services" className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center">
                اطلاعات بیشتر
                <svg className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              آخرین اخبار
            </h2>
            <p className="text-xl text-gray-600">
              از آخرین رویدادها و اخبار روستا مطلع باشید
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {latestNews.length > 0 ? (
              latestNews.map((node, index) => (
                <article key={index} className="card group">
                  <div className="flex items-center mb-4">
                    <div className="w-2 h-2 bg-primary-500 rounded-full ml-2"></div>
                    <span className="text-sm text-gray-500">
                      {node.frontmatter?.date || 'نامشخص'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-200">
                    {node.frontmatter?.title || 'بدون عنوان'}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {node.excerpt}
                  </p>
                  <Link 
                    to={`${node.fields?.slug || '#'}`}
                    className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center group"
                  >
                    ادامه مطلب
                    <svg className="mr-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Link>
                </article>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">هیچ خبری یافت نشد</h3>
                <p className="text-gray-600">در حال حاضر خبری برای نمایش وجود ندارد.</p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Link to="/news" className="btn-primary inline-flex items-center px-8 py-3">
              مشاهده همه اخبار
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              رویدادهای پیش رو
            </h2>
            <p className="text-xl text-gray-600">
              در رویدادها و فعالیت های جامعه شرکت کنید
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((node, index) => (
                <article key={index} className="card border-r-4 border-secondary-500 group">
                  <div className="flex items-center mb-4">
                    <div className="w-2 h-2 bg-secondary-500 rounded-full ml-2"></div>
                    <span className="text-sm text-gray-500">
                      {node.frontmatter?.date || 'نامشخص'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-secondary-600 transition-colors duration-200">
                    {node.frontmatter?.title || 'بدون عنوان'}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {node.excerpt}
                  </p>
                  <Link 
                    to={`${node.fields?.slug || '#'}`}
                    className="text-secondary-600 hover:text-secondary-700 font-semibold inline-flex items-center group"
                  >
                    جزئیات بیشتر
                    <svg className="mr-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Link>
                </article>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">هیچ رویدادی یافت نشد</h3>
                <p className="text-gray-600">در حال حاضر رویدادی برای نمایش وجود ندارد.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            بخشی از جامعه ما باشید
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            با ما در ارتباط باشید و از آخرین اخبار، رویدادها و فرصت‌های جامعه مطلع شوید
          </p>
          <Link 
            to="/contact" 
            className="btn-secondary inline-flex items-center px-8 py-3 text-lg font-semibold"
          >
            عضویت در جامعه
            <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
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
          eventDate(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`

export default IndexPage
