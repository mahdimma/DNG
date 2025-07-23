import React, { useState } from "react"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="gradient-bg shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Site Title */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-2xl font-bold text-white hover:text-green-100 transition-colors duration-200"
            >
              {siteTitle}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-reverse space-x-8">
            <Link 
              to="/" 
              className="text-white hover:text-green-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10"
            >
              خانه
            </Link>
            <Link 
              to="/about" 
              className="text-white hover:text-green-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10"
            >
              درباره ما
            </Link>
            <Link 
              to="/news" 
              className="text-white hover:text-green-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10"
            >
              اخبار
            </Link>
            <Link 
              to="/services" 
              className="text-white hover:text-green-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10"
            >
              خدمات
            </Link>
            <Link 
              to="/contact" 
              className="text-white hover:text-green-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10"
            >
              تماس با ما
            </Link>
            <Link 
              to="/gallery" 
              className="text-white hover:text-green-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10"
            >
              گالری تصاویر
            </Link>
            <Link 
              to="/maps" 
              className="text-white hover:text-green-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10"
            >
              نقشه
            </Link>
            <Link 
              to="/weather" 
              className="text-white hover:text-green-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10"
            >
              آب و هوا
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-green-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">باز کردن منوی اصلی</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/10 backdrop-blur-sm rounded-lg mb-4">
              <Link 
                to="/" 
                className="text-white hover:text-green-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                خانه
              </Link>
              <Link 
                to="/about" 
                className="text-white hover:text-green-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                درباره ما
              </Link>
              <Link 
                to="/news" 
                className="text-white hover:text-green-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                اخبار
              </Link>
              <Link 
                to="/services" 
                className="text-white hover:text-green-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                خدمات
              </Link>
              <Link 
                to="/contact" 
                className="text-white hover:text-green-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                تماس با ما
              </Link>
              <Link 
                to="/gallery" 
                className="text-white hover:text-green-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                گالری تصاویر
              </Link>
              <Link 
                to="/maps" 
                className="text-white hover:text-green-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                نقشه
              </Link>
              <Link 
                to="/weather" 
                className="text-white hover:text-green-100 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                آب و هوا
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
