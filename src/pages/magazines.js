import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { Helmet } from "react-helmet"
import Layout from "../components/Layout"
import HeroSection from "../components/HeroSection"
import PageHeader from "../components/PageHeader"

const MagazinesPage = ({ data }) => {
  const magazines = data?.allMarkdownRemark?.nodes || []
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Get unique categories
  const categories = ["all", ...new Set(magazines.map(mag => mag.frontmatter.category).filter(Boolean))]

  // Filter magazines
  const filteredMagazines = magazines.filter(magazine => {
    const matchesSearch = magazine.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         magazine.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || magazine.frontmatter.category === selectedCategory
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
      title="نشریات روستا" 
      description="دسترسی به نشریات فصلی و ویژه‌نامه‌های منتشر شده توسط روستای دنگپیا"
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
                "name": "نشریات",
                "item": "https://dangepia.ir/magazines"
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <HeroSection 
        title="نشریات روستا"
        subtitle="دسترسی به نشریات فصلی و ویژه‌نامه‌های منتشر شده"
        showButtons={false}
        showScrollIndicator={true}
      />

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <PageHeader 
            title="مرکز نشریات و مجلات"
            subtitle={`مجموعه کامل نشریات فصلی و ویژه‌نامه‌های روستا${magazines.length > 0 ? ` (${magazines.length} نشریه)` : ''}`}
          />

          {/* Search and Filter */}
          <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="جستجوی نشریات..."
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
              نمایش {filteredMagazines.length} از {magazines.length} نشریه
            </div>
          </div>

          {/* Magazines Grid */}
          {filteredMagazines.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMagazines.map((magazine, index) => {
                const articleImage = magazine.frontmatter.image 
                  ? (magazine.frontmatter.image.startsWith('http://') || magazine.frontmatter.image.startsWith('https://'))
                    ? magazine.frontmatter.image
                    : `https://dangepia.ir${magazine.frontmatter.image}`
                  : "https://dangepia.ir/og-image.jpg"

                return (
                  <div 
                    key={index}
                    className="card hover:shadow-xl transition-all duration-300 group border-t-4 border-secondary-500"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-t-lg -mt-6 -mx-6 mb-4">
                      <img 
                        src={articleImage}
                        alt={magazine.frontmatter.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-secondary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                          {magazine.frontmatter.category || 'نشریه'}
                        </span>
                      </div>
                      {magazine.frontmatter.issue && (
                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800">
                          {magazine.frontmatter.issue}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-secondary-600 transition-colors duration-200 leading-tight">
                        {magazine.frontmatter.title}
                      </h3>

                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(magazine.frontmatter.date)}
                      </div>

                      <p className="text-gray-600 line-clamp-3">
                        {magazine.excerpt}
                      </p>

                      {/* Download Button */}
                      {magazine.frontmatter.pdfUrl && (
                        <a
                          href={magazine.frontmatter.pdfUrl}
                          download
                          className="btn-secondary w-full inline-flex items-center justify-center group/btn"
                          onClick={(e) => {
                            if (!magazine.frontmatter.pdfUrl.startsWith('http')) {
                              e.preventDefault()
                              alert('فایل PDF هنوز آپلود نشده است')
                            }
                          }}
                        >
                          <svg className="w-5 h-5 ml-2 group-hover/btn:translate-y-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          دانلود نشریه
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">نشریه‌ای یافت نشد</h3>
              <p className="text-gray-500">
                {searchTerm || selectedCategory !== "all" 
                  ? "با معیارهای جستجوی دیگری امتحان کنید" 
                  : "در حال حاضر نشریه‌ای منتشر نشده است"}
              </p>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-12 bg-gradient-to-r from-secondary-50 to-primary-50 rounded-xl p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              درباره نشریات روستا
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
              نشریات روستای دنگپیا شامل ویژه‌نامه‌های فصلی، نشریات مناسبتی و مجلات ویژه است که به صورت دوره‌ای منتشر می‌شود. این نشریات حاوی اخبار، گزارش‌ها، مصاحبه‌ها، مطالب فرهنگی و هنری روستا می‌باشد.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-secondary inline-flex items-center px-6 py-3">
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
      filter: { frontmatter: { type: { eq: "magazine" } } }
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
          issue
          image
          pdfUrl
        }
      }
    }
  }
`

export default MagazinesPage
