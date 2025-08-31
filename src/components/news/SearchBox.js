import React, { useState, useRef } from "react"
import PropTypes from "prop-types"

const SearchBox = ({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "جستجو در اخبار...",
  className = "",
  showClearButton = true,
  autoFocus = false
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)

  const handleClear = () => {
    const fakeEvent = { target: { value: '' } }
    onSearchChange(fakeEvent)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClear()
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className={`relative transition-all duration-200 ${
        isFocused ? 'transform scale-105' : ''
      }`}>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={onSearchChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoFocus={autoFocus}
          className={`form-input pl-12 pr-4 w-full ${
            isFocused 
              ? 'ring-2 ring-primary-500 border-primary-500' 
              : 'border-gray-300 hover:border-gray-400'
          } transition-all duration-200`}
          aria-label={placeholder}
          role="searchbox"
        />
        
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <svg 
            className={`w-5 h-5 transition-colors duration-200 ${
              isFocused ? 'text-primary-500' : 'text-gray-400'
            }`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>

        {/* Clear Button */}
        {showClearButton && searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="پاک کردن جستجو"
            type="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search Suggestions/Tips */}
      {isFocused && !searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10">
          <p className="text-sm text-gray-600 mb-2">نکات جستجو:</p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• جستجو در عنوان، خلاصه و نویسنده</li>
            <li>• استفاده از کلمات کلیدی مرتبط</li>
            <li>• جستجوی دسته‌بندی‌ها</li>
          </ul>
        </div>
      )}
    </div>
  )
}

SearchBox.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  showClearButton: PropTypes.bool,
  autoFocus: PropTypes.bool,
}

export default SearchBox
