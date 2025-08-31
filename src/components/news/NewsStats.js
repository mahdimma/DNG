import React from "react"
import PropTypes from "prop-types"

const NewsStats = ({ totalNews = 0, categories = [] }) => {
  const getCurrentDate = () => {
    const today = new Date()
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      calendar: 'persian'
    }
    return today.toLocaleDateString('fa-IR', options)
  }

  const stats = [
    {
      title: 'مجموع اخبار',
      value: totalNews,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'دسته‌بندی‌ها',
      value: Math.max(categories.length - 1, 0), // Subtract 1 for 'all' category
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a2 2 0 012-2z" />
        </svg>
      ),
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'آخرین بروزرسانی',
      value: getCurrentDate(),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]
  
  return (
    <section className="mb-12" aria-label="آمار اخبار">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1 font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900" dir="ltr">
                  {typeof stat.value === 'number' ? stat.value.toLocaleString('fa-IR') : stat.value}
                </p>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

NewsStats.propTypes = {
  totalNews: PropTypes.number,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      name: PropTypes.string,
    })
  ),
}

export default NewsStats
