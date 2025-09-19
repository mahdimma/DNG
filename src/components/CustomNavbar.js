import React, { useState, useEffect, useRef } from "react"
import { Link } from "gatsby"

const CustomNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const mobileMenuRef = useRef(null)
  const dropdownRefs = useRef({})

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close mobile menu
      if (isMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
      
      // Close dropdowns
      if (openDropdown && dropdownRefs.current[openDropdown] && 
          !dropdownRefs.current[openDropdown].contains(event.target)) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen, openDropdown])

  // Close menus on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenDropdown(null)
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName)
  }

  const navItems = [
    { name: "خانه", path: "/" },
    { name: "درباره ما", path: "/about" },
    {
      name: "محتوا",
      dropdown: [
        { name: "اخبار", path: "/news" },
        { name: "رویدادها", path: "/events" },
        { name: "گالری تصاویر", path: "/gallery" }
      ]
    },
    {
      name: "خدمات",
      dropdown: [
        { name: "خدمات", path: "/services" },
        { name: "نقشه", path: "/maps" },
        { name: "آب و هوا", path: "/weather" }
      ]
    },
    { name: "تماس با ما", path: "/contact" }
  ]

  return (
    <nav className="w-full">
      {/* Desktop Navigation */}
      <ul className="hidden md:flex md:space-x-reverse md:space-x-1 lg:space-x-2">
        {navItems.map((item) => (
          <li key={item.name} className="relative">
            {item.dropdown ? (
              <div ref={el => dropdownRefs.current[item.name] = el}>
                <button
                  aria-expanded={openDropdown === item.name}
                  aria-haspopup="true"
                  onClick={() => toggleDropdown(item.name)}
                  className="text-white hover:text-green-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10 flex items-center"
                >
                  {item.name}
                  <svg 
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {openDropdown === item.name && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 overflow-hidden">
                    {item.dropdown.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          to={subItem.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link
                to={item.path}
                className="text-white hover:text-green-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10 block"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile menu button */}
      <div className="md:hidden flex justify-end">
        <button
          aria-label={isMenuOpen ? "بستن منو" : "باز کردن منو"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-green-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
        >
          {isMenuOpen ? (
            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="md:hidden absolute top-full left-0 right-0 z-50 px-4 py-2 bg-white/90 backdrop-blur-md rounded-lg shadow-lg mt-2"
        >
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                {item.dropdown ? (
                  <div ref={el => dropdownRefs.current[item.name] = el}>
                    <button
                      aria-expanded={openDropdown === item.name}
                      className="text-gray-800 hover:text-green-700 w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-white/80 flex items-center justify-between"
                      onClick={() => toggleDropdown(item.name)}
                    >
                      {item.name}
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={openDropdown === item.name ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                      </svg>
                    </button>
                    
                    {openDropdown === item.name && (
                      <ul className="mt-1 space-y-1 pr-4">
                        {item.dropdown.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              to={subItem.path}
                              className="text-gray-700 hover:text-green-700 block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 hover:bg-white/80"
                              onClick={() => {
                                setOpenDropdown(null)
                                setIsMenuOpen(false)
                              }}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className="text-gray-800 hover:text-green-700 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-white/80"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

export default CustomNavbar