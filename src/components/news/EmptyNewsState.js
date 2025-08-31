import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

const EmptyNewsState = ({ title, description, showCTA = true, icon = "news" }) => {
  const icons = {
    news: (
      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    search: (
      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    filter: (
      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
      </svg>
    )
  }

  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          {icons[icon] || icons.news}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {title || 'هیچ خبری یافت نشد'}
        </h3>
        
        <p className="text-gray-600 leading-relaxed mb-8">
          {description || 'در حال حاضر خبری برای نمایش وجود ندارد. لطفا بعدا مراجعه کنید.'}
        </p>
        
        {showCTA && (
          <div className="space-y-4">
            <Link 
              to="/"
              className="btn-primary inline-flex items-center px-6 py-3 text-base font-medium"
            >
              بازگشت به صفحه اصلی
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
            
            <div className="text-sm">
              <Link 
                to="/contact"
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
              >
                یا با ما تماس بگیرید
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

EmptyNewsState.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  showCTA: PropTypes.bool,
  icon: PropTypes.oneOf(['news', 'search', 'filter']),
}

export default EmptyNewsState
