import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"
import { EnhancedNewsSection } from "../components/news"
import PageHeader from "../components/PageHeader"

const NewsPage = ({ data }) => {
  const newsArticles = data?.allMarkdownRemark?.nodes || []
  const totalArticles = newsArticles.length

  // Sample archive data - this could come from GraphQL in the future
  const archiveData = [
    { month: 'آذر ۱۴۰۳', description: 'آخرین اخبار ماه', count: 3 },
    { month: 'آبان ۱۴۰۳', description: 'رویدادهای پاییزی', count: 5 },
    { month: 'مهر ۱۴۰۳', description: 'شروع فصل جدید', count: 2 },
  ]

  // Sample upcoming events - this could come from GraphQL in the future
  const upcomingEvents = [
    {
      title: 'جشنواره فصلی',
      date: '۱۵ آذر ۱۴۰۳',
      description: 'جشن و شادی برای تمام اهالی روستا'
    },
    {
      title: 'جلسه شورای روستا',
      date: '۲۰ آذر ۱۴۰۳',
      description: 'جلسه ماهانه برای بررسی مسائل روستا'
    },
    {
      title: 'کارگاه آموزشی',
      date: '۲۵ آذر ۱۴۰۳',
      description: 'آموزش مهارت‌های نوین کشاورزی'
    },
  ]

  return (
    <Layout title="آخرین اخبار" description="از جدیدترین رویدادها و اخبار روستای دانگپیا مطلع باشید">
      {/* Hero Section */}
      <HeroSection 
        title="آخرین اخبار"
        subtitle="از جدیدترین رویدادها و اخبار روستا مطلع باشید"
        showButtons={false}
        showScrollIndicator={true}
      />
      
      {/* Main News Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <PageHeader 
            title="مرکز اخبار روستا"
            subtitle={`آخرین اطلاعات، رویدادها و اعلامیه‌های مهم روستای دانگپیا را اینجا دنبال کنید${totalArticles > 0 ? ` (${totalArticles} خبر)` : ''}`}
          />
          
          <EnhancedNewsSection 
            articles={newsArticles}
            showStats={true}
            showSearch={true}
            showSort={true}
            showFilter={true}
            gridColumns="lg:grid-cols-2 xl:grid-cols-3"
          />
        </div>
      </section>

      {/* Archive & Events Sidebar Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Archive Section */}
            <div className="card hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <svg className="w-6 h-6 ml-3 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  آرشیو اخبار
                </h3>
                <div className="text-sm text-gray-500">
                  مجموع: {archiveData.reduce((sum, item) => sum + item.count, 0)} خبر
                </div>
              </div>
              <div className="space-y-4">
                {archiveData.map((item, index) => (
                  <div key={index} className="group flex justify-between items-center p-4 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-200 cursor-pointer">
                    <div>
                      <span className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                        {item.month}
                      </span>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                        {item.count} خبر
                      </span>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Events */}
            <div className="card border-r-4 border-secondary-500 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <svg className="w-6 h-6 ml-3 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  رویدادهای پیش رو
                </h3>
                <div className="text-sm text-gray-500">
                  {upcomingEvents.length} رویداد
                </div>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="group border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-secondary-600 transition-colors duration-200">
                          {event.title}
                        </h4>
                        <p className="text-sm text-gray-500 mb-2">
                          {event.description}
                        </p>
                      </div>
                      <div className="text-left mr-4">
                        <div className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-xs font-medium">
                          {event.date}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link 
                to="/events" 
                className="btn-secondary w-full mt-6 inline-flex items-center justify-center group"
              >
                مشاهده همه رویدادها
                <svg className="mr-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="gradient-bg text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 100 100">
            <defs>
              <pattern id="news-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#news-pattern)"/>
          </svg>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              از آخرین اخبار مطلع باشید
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              با مراجعه منظم به این صفحه، از آخرین اخبار، رویدادها و اطلاعیه‌های مهم روستای دانگپیا مطلع شوید
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/contact"
                className="btn-secondary inline-flex items-center px-8 py-3 text-lg font-semibold group"
              >
                ارتباط با ما
                <svg className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
              <Link 
                to="/events"
                className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 inline-flex items-center px-8 py-3 text-lg font-semibold group"
              >
                مشاهده رویدادها
                <svg className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </Link>
            </div>
            
            {totalArticles > 0 && (
              <div className="mt-8 p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
                <p className="text-green-100">
                  در حال حاضر <span className="font-bold text-white">{totalArticles}</span> خبر در آرشیو موجود است
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "news" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        excerpt(pruneLength: 200)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          author
          category
        }
      }
    }
  }
`

export default NewsPage
