import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

const NewsArticle = ({ 
  article, 
  variant = "card", // "card", "list", "featured"
  showExcerpt = true,
  showCategory = true,
  showAuthor = true,
  showDate = true,
  className = ""
}) => {
  if (!article) return null

  const title = article?.frontmatter?.title || article?.title || 'بدون عنوان'
  const date = article?.frontmatter?.date || article?.date
  const author = article?.frontmatter?.author || article?.author
  const excerpt = article?.excerpt || ''
  const slug = article?.fields?.slug || article?.slug || '#'
  const category = article?.frontmatter?.category || article?.category
  const featured = article?.frontmatter?.featured || false

  const baseClasses = "group transition-all duration-300"
  
  const variantClasses = {
    card: "card hover:shadow-lg hover:-translate-y-1",
    list: "border-b border-gray-200 pb-6 mb-6 last:border-b-0 last:mb-0",
    featured: "card bg-gradient-to-br from-primary-50 to-secondary-50 border-l-4 border-primary-500"
  }

  const titleClasses = {
    card: "text-xl font-bold mb-4",
    list: "text-lg font-bold mb-2",
    featured: "text-2xl font-bold mb-4"
  }

  return (
    <article className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {/* Header */}
      <div className="flex items-center mb-4">
        <div className="w-2 h-2 bg-primary-500 rounded-full ml-2"></div>
        <div className="flex items-center text-sm text-gray-500 space-x-2 space-x-reverse">
          {showDate && date && (
            <span>{date}</span>
          )}
          {showAuthor && author && showDate && date && (
            <span>•</span>
          )}
          {showAuthor && author && (
            <span>توسط {author}</span>
          )}
        </div>
      </div>

      {/* Title */}
      <h2 className={`${titleClasses[variant]} text-gray-900 group-hover:text-primary-600 transition-colors duration-200`}>
        <Link 
          to={slug}
          className="hover:no-underline"
        >
          {title}
        </Link>
      </h2>

      {/* Excerpt */}
      {showExcerpt && excerpt && (
        <p className={`text-gray-600 leading-relaxed mb-6 ${variant === 'list' ? 'line-clamp-2' : 'line-clamp-3'}`}>
          {excerpt}
        </p>
      )}

      {/* Footer */}
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
        
        <div className="flex items-center space-x-2 space-x-reverse">
          {featured && (
            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
              ویژه
            </span>
          )}
          {showCategory && category && (
            <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
              {category}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

NewsArticle.propTypes = {
  article: PropTypes.oneOfType([
    PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.string,
        author: PropTypes.string,
        category: PropTypes.string,
        featured: PropTypes.bool,
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
      featured: PropTypes.bool,
    }),
  ]).isRequired,
  variant: PropTypes.oneOf(['card', 'list', 'featured']),
  showExcerpt: PropTypes.bool,
  showCategory: PropTypes.bool,
  showAuthor: PropTypes.bool,
  showDate: PropTypes.bool,
  className: PropTypes.string,
}

export default NewsArticle
