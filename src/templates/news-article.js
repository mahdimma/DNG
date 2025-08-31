import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import PageHeader from "../components/PageHeader"

const NewsArticleTemplate = ({ data, pageContext }) => {
  const article = data.markdownRemark
  const { next, previous } = pageContext
  const [shareStatus, setShareStatus] = useState('')

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: article.frontmatter.title,
          text: article.excerpt,
          url: window.location.href,
        })
        setShareStatus('مقاله با موفقیت به اشتراک گذاشته شد!')
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setShareStatus('لینک در کلیپ‌بورد کپی شد!')
      }
      setTimeout(() => setShareStatus(''), 3000)
    } catch (error) {
      setShareStatus('خطا در به اشتراک گذاری')
      setTimeout(() => setShareStatus(''), 3000)
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setShareStatus('لینک در کلیپ‌بورد کپی شد!')
      setTimeout(() => setShareStatus(''), 3000)
    } catch (error) {
      setShareStatus('خطا در کپی کردن لینک')
      setTimeout(() => setShareStatus(''), 3000)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const estimateReadingTime = (content) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return readingTime
  }

  const readingTime = estimateReadingTime(article.html.replace(/<[^>]*>/g, ''))

  return (
    <Layout 
      title={article.frontmatter.title}
      description={article.excerpt}
    >
      {/* Breadcrumb & Back Navigation */}
      <nav className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li><Link to="/" className="hover:text-primary-600">خانه</Link></li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <Link to="/news" className="hover:text-primary-600">اخبار</Link>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900">{article.frontmatter.title}</span>
              </li>
            </ol>
            <Link 
              to="/news"
              className="btn-outline inline-flex items-center px-4 py-2 text-sm"
            >
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              بازگشت به اخبار
            </Link>
          </div>
        </div>
      </nav>

      {/* Article Content */}
      <article className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Article Header */}
          <header className="mb-12">
            {article.frontmatter.featured && (
              <div className="flex items-center mb-6">
                <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium inline-flex items-center">
                  <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  خبر ویژه
                </div>
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {article.frontmatter.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600">
              <div className="flex items-center">
                <svg className="w-5 h-5 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time dateTime={article.frontmatter.date}>
                  {formatDate(article.frontmatter.date)}
                </time>
              </div>
              
              {article.frontmatter.author && (
                <div className="flex items-center">
                  <svg className="w-5 h-5 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>نویسنده: {article.frontmatter.author}</span>
                </div>
              )}
              
              <div className="flex items-center">
                <svg className="w-5 h-5 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{readingTime} دقیقه مطالعه</span>
              </div>
              
              {article.frontmatter.category && (
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  {article.frontmatter.category}
                </span>
              )}
            </div>
            
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </header>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.html }}
            />
          </div>

          {/* Article Footer */}
          <footer className="mt-16 pt-12 border-t border-gray-200">
            {/* Share Section */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                اشتراک‌گذاری این مقاله
              </h4>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleShare}
                  className="btn-primary inline-flex items-center px-4 py-2"
                >
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  به اشتراک گذاری
                </button>
                <button
                  onClick={handleCopyLink}
                  className="btn-outline inline-flex items-center px-4 py-2"
                >
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  کپی لینک
                </button>
              </div>
              {shareStatus && (
                <div className="mt-3 text-sm text-green-600 font-medium">
                  {shareStatus}
                </div>
              )}
            </div>

            {/* Navigation to Previous/Next Articles */}
            {(previous || next) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {previous && (
                  <Link 
                    to={previous.fields.slug}
                    className="group block p-6 bg-white border border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 ml-4">
                        <svg className="w-6 h-6 text-gray-400 group-hover:text-primary-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">مقاله قبلی</p>
                        <h5 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                          {previous.frontmatter.title}
                        </h5>
                      </div>
                    </div>
                  </Link>
                )}
                {next && (
                  <Link 
                    to={next.fields.slug}
                    className="group block p-6 bg-white border border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start text-left">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">مقاله بعدی</p>
                        <h5 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                          {next.frontmatter.title}
                        </h5>
                      </div>
                      <div className="flex-shrink-0 mr-4">
                        <svg className="w-6 h-6 text-gray-400 group-hover:text-primary-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            )}

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8 text-center">
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                از آخرین اخبار مطلع باشید
              </h4>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                برای دریافت جدیدترین اخبار، رویدادها و اطلاعیه‌های مهم روستای دانگپیا، به صفحه اخبار مراجعه کنید
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/news"
                  className="btn-primary inline-flex items-center px-6 py-3"
                >
                  مشاهده همه اخبار
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
                <Link 
                  to="/events"
                  className="btn-outline inline-flex items-center px-6 py-3"
                >
                  رویدادهای پیش رو
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt(pruneLength: 200)
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        author
        category
        featured
      }
    }
  }
`

export default NewsArticleTemplate
