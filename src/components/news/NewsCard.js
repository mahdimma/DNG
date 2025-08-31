import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

const NewsCard = ({ article, index, className = "" }) => {
  // Handle both old and new prop structures for backward compatibility
  const title = article?.frontmatter?.title || article?.title || 'بدون عنوان'
  const date = article?.frontmatter?.date || article?.date || 'نامشخص'
  const author = article?.frontmatter?.author || article?.author
  const excerpt = article?.excerpt || 'خلاصه‌ای در دسترس نیست'
  const slug = article?.fields?.slug || article?.slug || '#'
  const category = article?.frontmatter?.category || article?.category

  return (
    <article className={`card group hover:shadow-lg transition-all duration-300 ${className}`}>
      <div className="flex items-center mb-4">
        <div className="w-2 h-2 bg-primary-500 rounded-full ml-2"></div>
        <span className="text-sm text-gray-500">
          {date}
        </span>
        {author && (
          <span className="text-sm text-gray-400 mr-2">
            توسط {author}
          </span>
        )}
      </div>
      
      <h2 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-200">
        <Link 
          to={slug}
          className="hover:no-underline"
        >
          {title}
        </Link>
      </h2>
      
      <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
        {excerpt}
      </p>
      
      <div className="flex items-center justify-between">
        <Link 
          to={slug}
          className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center group"
        >
          ادامه مطلب
          <svg className="mr-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        
        {category && (
          <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
            {category}
          </span>
        )}
      </div>
    </article>
  )
}

NewsCard.propTypes = {
  article: PropTypes.oneOfType([
    PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.string,
        author: PropTypes.string,
        category: PropTypes.string,
      }),
      excerpt: PropTypes.string,
      fields: PropTypes.shape({
        slug: PropTypes.string,
      }),
    }),
    PropTypes.shape({
      title: PropTypes.string,
      date: PropTypes.string,
      author: PropTypes.string,
      excerpt: PropTypes.string,
      slug: PropTypes.string,
      category: PropTypes.string,
    }),
  ]).isRequired,
  index: PropTypes.number,
  className: PropTypes.string,
}

export default NewsCard
