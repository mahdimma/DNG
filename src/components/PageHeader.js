import React from "react"

const PageHeader = ({ 
  title, 
  subtitle, 
  className = "",
  children 
}) => {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  )
}

export default PageHeader
