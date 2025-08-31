import React from "react"
import NewsCard from "./NewsCard"
import PropTypes from "prop-types"

const LoadingSkeleton = () => (
  <div className="card animate-pulse">
    <div className="flex items-center mb-4">
      <div className="w-2 h-2 bg-gray-300 rounded-full ml-2"></div>
      <div className="h-4 bg-gray-300 rounded w-24"></div>
    </div>
    <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
    <div className="space-y-2 mb-6">
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 rounded w-4/6"></div>
    </div>
    <div className="flex justify-between items-center">
      <div className="h-4 bg-gray-300 rounded w-24"></div>
      <div className="h-6 bg-gray-300 rounded-full w-16"></div>
    </div>
  </div>
)

const NewsGrid = ({ articles = [], loading = false, columns = "lg:grid-cols-2" }) => {
  if (loading) {
    return (
      <div className={`grid grid-cols-1 ${columns} gap-8`}>
        {Array.from({ length: 4 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <p className="text-gray-500">هیچ خبری یافت نشد</p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 ${columns} gap-8`}>
      {articles.map((article, index) => (
        <NewsCard 
          key={article.id || article.fields?.slug || index} 
          article={article} 
          index={index} 
        />
      ))}
    </div>
  )
}

NewsGrid.propTypes = {
  articles: PropTypes.array,
  loading: PropTypes.bool,
  columns: PropTypes.string,
}

export default NewsGrid
