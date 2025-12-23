import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { Helmet } from "react-helmet"
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"
import PageHeader from "../components/PageHeader"

const LettersPage = ({ data }) => {
  const letters = data?.allMarkdownRemark?.nodes || []
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Get unique categories
  const categories = ["all", ...new Set(letters.map(letter => letter.frontmatter.category).filter(Boolean))]

  // Filter letters
  const filteredLetters = letters.filter(letter => {
    const matchesSearch = letter.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         letter.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || letter.frontmatter.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Layout 
      title="گزارشات روستا" 
      description="دسترسی به گزارشات، اسناد و نامه‌های منتشر شده توسط شورای روستای دنگپیا"
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "خانه",
                "item": "https://dangepia.ir"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "گزارشات",
                "item": "https://dangepia.ir/letters"
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <HeroSection 
        title="گزارشات روستا"
        subtitle="دسترسی به گزارش‌ها، اسناد و نامه‌های منتشر شده توسط شورای روستا"
        showButtons={false}
        showScrollIndicator={true}
      />

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <PageHeader 
            title="مرکز گزارشات و اسناد"
            subtitle={`مجموعه کامل گزارشات منتشر شده توسط شورای روستا${letters.length > 0 ? ` (${letters.length} سند)` : ''}`}
          />

          {/* Search and Filter */}
          <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="جستجوی گزارشات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Category Filter */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">همه دسته‌بندی‌ها</option>
                  {categories.filter(cat => cat !== "all").map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-gray-600">
              نمایش {filteredLetters.length} از {letters.length} گزارش
            </div>
          </div>

          {/* Letters Grid */}
          {filteredLetters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLetters.map((letter, index) => {
                const articleImage = letter.frontmatter.image 
                  ? (letter.frontmatter.image.startsWith('http://') || letter.frontmatter.image.startsWith('https://'))
                    ? letter.frontmatter.image
                    : `https://dangepia.ir${letter.frontmatter.image}`
                  : "https://dangepia.ir/og-image.jpg"

                return (
                  <div 
                    key={index}
                    className="card hover:shadow-xl transition-all duration-300 group border-t-4 border-primary-500"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-t-lg -mt-6 -mx-6 mb-4">
                      <img 
                        src={articleImage}
                        alt={letter.frontmatter.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                          {letter.frontmatter.category || 'گزارش'}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 leading-tight">
                        {letter.frontmatter.title}
                      </h3>

                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(letter.frontmatter.date)}
                      </div>

                      <p className="text-gray-600 line-clamp-3">
                        {letter.excerpt}
                      </p>

                      {/* Download Button */}
                      {letter.frontmatter.pdfUrl && (
                        <a
                          href={letter.frontmatter.pdfUrl}
                          download
                          className="btn-primary w-full inline-flex items-center justify-center group/btn"
                          onClick={(e) => {
                            // If URL is not absolute, prevent default and show alert
                            if (!letter.frontmatter.pdfUrl.startsWith('http')) {
                              e.preventDefault()
                              alert('فایل PDF هنوز آپلود نشده است')
                            }
                          }}
                        >
                          <svg className="w-5 h-5 ml-2 group-hover/btn:translate-y-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          دانلود PDF
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">گزارشی یافت نشد</h3>
              <p className="text-gray-500">
                {searchTerm || selectedCategory !== "all" 
                  ? "با معیارهای جستجوی دیگری امتحان کنید" 
                  : "در حال حاضر گزارشی منتشر نشده است"}
              </p>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-12 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              درباره گزارشات
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
              گزارشات شامل گزارش‌های عملکرد، صورت‌های مالی، طرح‌های توسعه و سایر اسناد رسمی منتشر شده توسط شورای روستای دنگپیا می‌باشد. تمامی این اسناد به صورت شفاف در اختیار شما عزیزان قرار می‌گیرد.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary inline-flex items-center px-6 py-3">
                تماس با شورا
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
              <Link to="/news" className="btn-outline inline-flex items-center px-6 py-3">
                مشاهده اخبار
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "letter" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        excerpt(pruneLength: 150)
        fields {
          slug
        }
        frontmatter {
          date
          title
          category
          image
          pdfUrl
        }
      }
    }
  }
`

export default LettersPage
