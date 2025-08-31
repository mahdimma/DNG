import React, { useState, useMemo, useCallback } from "react"
import PropTypes from "prop-types"
import NewsGrid from "./NewsGrid"
import NewsFilter from "./NewsFilter"
import EmptyNewsState from "./EmptyNewsState"
import NewsStats from "./NewsStats"
import SearchBox from "./SearchBox"

const NewsSection = ({ articles = [], loading = false, showStats = true, showSearch = true }) => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Filter articles based on category and search term
  const filteredArticles = useMemo(() => {
    if (!articles || articles.length === 0) return []

    let filtered = [...articles]

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(article => 
        article.frontmatter?.category === activeCategory
      )
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(article => {
        const title = article.frontmatter?.title?.toLowerCase() || ''
        const excerpt = article.excerpt?.toLowerCase() || ''
        const category = article.frontmatter?.category?.toLowerCase() || ''
        
        return title.includes(searchLower) || 
               excerpt.includes(searchLower) || 
               category.includes(searchLower)
      })
    }

    return filtered
  }, [articles, activeCategory, searchTerm])

  // Extract unique categories from articles
  const categories = useMemo(() => {
    if (!articles || articles.length === 0) return []
    
    const uniqueCategories = new Set()
    articles.forEach(article => {
      if (article.frontmatter?.category) {
        uniqueCategories.add(article.frontmatter.category)
      }
    })

    return [
      { slug: 'all', name: 'همه اخبار' },
      ...Array.from(uniqueCategories).map(cat => ({
        slug: cat,
        name: cat
      }))
    ]
  }, [articles])

  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category)
  }, [])

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value)
  }, [])

  const clearFilters = useCallback(() => {
    setSearchTerm('')
    setActiveCategory('all')
  }, [])

  const hasActiveFilters = searchTerm.trim() || activeCategory !== 'all'

  if (loading) {
    return (
      <div className="space-y-8">
        {showStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                    <div className="h-6 bg-gray-300 rounded w-12"></div>
                  </div>
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        )}
        <NewsGrid articles={[]} loading={true} />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Stats Section */}
      {showStats && (
        <NewsStats 
          totalNews={articles?.length || 0}
          categories={categories}
        />
      )}

      {/* Search Section */}
      {showSearch && (
        <section className="mb-8">
          <SearchBox
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            className="max-w-md mx-auto"
          />
        </section>
      )}

      {/* Filter Section */}
      <NewsFilter 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Results Info */}
      {hasActiveFilters && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <p className="text-blue-800">
              {filteredArticles.length} خبر یافت شد
              {searchTerm.trim() && ` برای "${searchTerm}"`}
              {activeCategory !== 'all' && ` در دسته‌بندی "${activeCategory}"`}
            </p>
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
              aria-label="پاک کردن فیلترها"
            >
              پاک کردن فیلترها
            </button>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <NewsGrid articles={filteredArticles} />
      ) : (
        <EmptyNewsState 
          title={hasActiveFilters ? 'هیچ نتیجه‌ای یافت نشد' : 'هیچ خبری یافت نشد'}
          description={
            hasActiveFilters 
              ? 'لطفا کلمات کلیدی یا فیلترهای دیگری امتحان کنید.'
              : 'در حال حاضر خبری برای نمایش وجود ندارد. لطفا بعدا مراجعه کنید.'
          }
          showCTA={!hasActiveFilters}
        />
      )}
    </div>
  )
}

NewsSection.propTypes = {
  articles: PropTypes.array,
  loading: PropTypes.bool,
  showStats: PropTypes.bool,
  showSearch: PropTypes.bool,
}

export default NewsSection
