import React from "react"
import PropTypes from "prop-types"

const NewsFilter = ({ categories = [], activeCategory = 'all', onCategoryChange }) => {
  const defaultCategories = [
    { slug: 'all', name: 'همه اخبار' },
    { slug: 'community', name: 'اخبار جامعه' },
    { slug: 'events', name: 'رویدادها' },
    { slug: 'announcements', name: 'اطلاعیه‌ها' },
    { slug: 'council', name: 'شورای روستا' },
    { slug: 'infrastructure', name: 'زیرساخت' },
    { slug: 'culture', name: 'فرهنگ' }
  ]
  
  const displayCategories = categories && categories.length > 0 ? categories : defaultCategories

  const handleCategoryClick = (categorySlug) => {
    if (onCategoryChange) {
      onCategoryChange(categorySlug)
    }
  }

  return (
    <section className="mb-12">
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 ml-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a2 2 0 012-2z" />
          </svg>
          دسته‌بندی اخبار
        </h3>
        
        <div className="flex flex-wrap gap-3" role="group" aria-label="فیلتر دسته‌بندی اخبار">
          {displayCategories.map((category) => {
            const isActive = activeCategory === category.slug
            return (
              <button
                key={category.slug}
                onClick={() => handleCategoryClick(category.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  isActive
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700'
                }`}
                aria-pressed={isActive}
                aria-label={`فیلتر بر اساس دسته‌بندی ${category.name}`}
              >
                {category.name}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

NewsFilter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  activeCategory: PropTypes.string,
  onCategoryChange: PropTypes.func,
}

export default NewsFilter
