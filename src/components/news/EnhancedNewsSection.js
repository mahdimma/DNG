import React from "react"
import PropTypes from "prop-types"
import useNews from "../../hooks/useNews"
import NewsGrid from "./NewsGrid"
import NewsFilter from "./NewsFilter"
import NewsSort from "./NewsSort"
import EmptyNewsState from "./EmptyNewsState"
import NewsStats from "./NewsStats"

const EnhancedNewsSection = ({ 
  articles = [], 
  loading = false, 
  showStats = true, 
  showSearch = true,
  showSort = true,
  gridColumns = "lg:grid-cols-2"
}) => {
  const {
    articles: filteredArticles,
    categories,
    activeCategory,
    searchTerm,
    sortBy,
    sortOrder,
    hasActiveFilters,
    totalArticles,
    filteredCount,
    handleCategoryChange,
    handleSearchChange,
    handleSortChange,
    clearFilters,
  } = useNews(articles)

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
        <NewsGrid articles={[]} loading={true} columns={gridColumns} />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Stats Section */}
      {showStats && (
        <NewsStats 
          totalNews={totalArticles}
          categories={categories}
        />
      )}

      {/* Search Section */}
      {showSearch && (
        <section className="mb-8">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="جستجو در اخبار..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="form-input pl-12 pr-4 w-full"
                aria-label="جستجو در اخبار"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter Section */}
      <NewsFilter 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Sort Section */}
      {showSort && filteredArticles.length > 1 && (
        <NewsSort
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
      )}

      {/* Results Info */}
      {hasActiveFilters && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <p className="text-blue-800">
              {filteredCount} خبر یافت شد از مجموع {totalArticles} خبر
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
        <NewsGrid articles={filteredArticles} columns={gridColumns} />
      ) : (
        <EmptyNewsState 
          title={hasActiveFilters ? 'هیچ نتیجه‌ای یافت نشد' : 'هیچ خبری یافت نشد'}
          description={
            hasActiveFilters 
              ? 'لطفا کلمات کلیدی یا فیلترهای دیگری امتحان کنید.'
              : 'در حال حاضر خبری برای نمایش وجود ندارد. لطفا بعدا مراجعه کنید.'
          }
          showCTA={!hasActiveFilters}
          icon={hasActiveFilters ? 'search' : 'news'}
        />
      )}
    </div>
  )
}

EnhancedNewsSection.propTypes = {
  articles: PropTypes.array,
  loading: PropTypes.bool,
  showStats: PropTypes.bool,
  showSearch: PropTypes.bool,
  showSort: PropTypes.bool,
  showFilter: PropTypes.bool,
  gridColumns: PropTypes.string,
  className: PropTypes.string,
}

export default EnhancedNewsSection
