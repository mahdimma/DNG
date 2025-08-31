import React from "react"
import PropTypes from "prop-types"

const FilterResultsInfo = ({ 
  totalResults,
  filteredResults,
  searchTerm,
  activeCategory,
  sortBy,
  sortOrder,
  onClearFilters,
  className = ""
}) => {
  const hasActiveFilters = searchTerm.trim() || activeCategory !== 'all'
  
  if (!hasActiveFilters) return null

  const getResultText = () => {
    let text = `${filteredResults} خبر یافت شد`
    
    if (filteredResults !== totalResults) {
      text += ` از مجموع ${totalResults} خبر`
    }

    const filters = []
    if (searchTerm.trim()) {
      filters.push(`برای "${searchTerm}"`)
    }
    if (activeCategory !== 'all') {
      filters.push(`در دسته‌بندی "${activeCategory}"`)
    }

    if (filters.length > 0) {
      text += ` ${filters.join(' و ')}`
    }

    return text
  }

  const getSortText = () => {
    const sortLabels = {
      date: 'تاریخ',
      title: 'عنوان',
      category: 'دسته‌بندی'
    }

    const orderLabels = {
      desc: 'نزولی',
      asc: 'صعودی'
    }

    return `مرتب‌شده بر اساس ${sortLabels[sortBy]} (${orderLabels[sortOrder]})`
  }

  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <p className="text-blue-800 font-medium">
            {getResultText()}
          </p>
          {(sortBy !== 'date' || sortOrder !== 'desc') && (
            <p className="text-blue-600 text-sm">
              {getSortText()}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {filteredResults === 0 && (
            <div className="flex items-center text-orange-600 text-sm">
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              نتیجه‌ای یافت نشد
            </div>
          )}
          
          <button
            onClick={onClearFilters}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200 inline-flex items-center"
            aria-label="پاک کردن همه فیلترها"
          >
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            پاک کردن فیلترها
          </button>
        </div>
      </div>

      {/* Quick Filter Actions */}
      {hasActiveFilters && filteredResults > 0 && (
        <div className="mt-3 pt-3 border-t border-blue-200">
          <div className="flex flex-wrap gap-2">
            {searchTerm.trim() && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                جستجو: {searchTerm}
              </span>
            )}
            {activeCategory !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                دسته: {activeCategory}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

FilterResultsInfo.propTypes = {
  totalResults: PropTypes.number.isRequired,
  filteredResults: PropTypes.number.isRequired,
  searchTerm: PropTypes.string,
  activeCategory: PropTypes.string,
  sortBy: PropTypes.string,
  sortOrder: PropTypes.string,
  onClearFilters: PropTypes.func.isRequired,
  className: PropTypes.string,
}

FilterResultsInfo.defaultProps = {
  searchTerm: '',
  activeCategory: 'all',
  sortBy: 'date',
  sortOrder: 'desc',
}

export default FilterResultsInfo
