import React from "react"
import PropTypes from "prop-types"

const NewsSort = ({ sortBy = 'date', sortOrder = 'desc', onSortChange }) => {
  const sortOptions = [
    { value: 'date', label: 'تاریخ انتشار' },
    { value: 'title', label: 'عنوان' },
    { value: 'category', label: 'دسته‌بندی' },
  ]

  const handleSortChange = (newSortBy) => {
    const newSortOrder = sortBy === newSortBy && sortOrder === 'desc' ? 'asc' : 'desc'
    if (onSortChange) {
      onSortChange(newSortBy, newSortOrder)
    }
  }

  const getSortIcon = (option) => {
    if (sortBy !== option.value) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      )
    }
    
    return sortOrder === 'desc' ? (
      <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    )
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700 flex items-center">
          <svg className="w-4 h-4 ml-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
          </svg>
          مرتب‌سازی بر اساس:
        </h3>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                sortBy === option.value
                  ? 'bg-primary-100 text-primary-700 border border-primary-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              aria-label={`مرتب‌سازی بر اساس ${option.label}`}
            >
              {option.label}
              <span className="mr-1">
                {getSortIcon(option)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

NewsSort.propTypes = {
  sortBy: PropTypes.string,
  sortOrder: PropTypes.oneOf(['asc', 'desc']),
  onSortChange: PropTypes.func,
}

export default NewsSort
